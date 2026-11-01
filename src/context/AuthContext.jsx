import React, { createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem, removeStorageItem, STORAGE_KEYS } from "../utils/storage";
import { INITIAL_USERS } from "../data/initialUsers";
import { validateRegistration } from "../utils/validation";
import { apiService } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    return getStorageItem(STORAGE_KEYS.USERS, INITIAL_USERS);
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return getStorageItem(STORAGE_KEYS.SESSION, null);
  });

  // Sync users with MySQL database on mount
  useEffect(() => {
    apiService.auth.getAllUsers().then((remoteUsers) => {
      if (Array.isArray(remoteUsers) && remoteUsers.length > 0) {
        setUsers(remoteUsers);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.USERS, users);
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      setStorageItem(STORAGE_KEYS.SESSION, currentUser);
    } else {
      removeStorageItem(STORAGE_KEYS.SESSION);
    }
  }, [currentUser]);

  const login = async (email, password) => {
    const trimmedEmail = email?.trim().toLowerCase();

    // 1. Attempt live authentication directly with MySQL
    const remoteRes = await apiService.auth.login({ email: trimmedEmail, password });
    if (remoteRes && remoteRes.success && remoteRes.user) {
      const authenticatedUser = remoteRes.user;
      setCurrentUser(authenticatedUser);
      if (remoteRes.token) {
        setStorageItem("academiax_jwt_token", remoteRes.token);
      }
      return { success: true, user: authenticatedUser };
    } else if (remoteRes && remoteRes.success === false) {
      return { success: false, message: remoteRes.message || "Invalid credentials." };
    }

    // 2. Resilient local fallback if server unreachable
    const foundUser = users.find(
      (u) => u.email.toLowerCase() === trimmedEmail && u.password === password
    );

    if (!foundUser) {
      return { success: false, message: "Invalid email or password. Please verify demo credentials." };
    }

    if (foundUser.status === "Inactive") {
      return {
        success: false,
        message: "Your account has been deactivated. Please contact the administrator."
      };
    }

    // Never expose plain password in session state
    const { password: _, ...safeUser } = foundUser;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  const quickLogin = (role = "student") => {
    const target = users.find((u) => u.role === role && u.status === "Active");
    if (target) {
      const { password: _, ...safeUser } = target;
      setCurrentUser(safeUser);
      return { success: true, user: safeUser };
    }
    return { success: false, message: `No active demo user found for role: ${role}` };
  };

  const register = async (formData) => {
    const validation = validateRegistration(formData, users);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    // Role safety: Public registration is restricted to 'student'
    const role = formData.role === "instructor" ? "instructor" : "student";
    const newId =
      formData.studentId?.trim() ||
      (role === "student"
        ? `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`
        : `INS-2026-${Math.floor(100 + Math.random() * 900)}`);

    const newUser = {
      id: newId,
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role,
      department: formData.department || "General Engineering & Applied Sciences",
      semester: formData.semester || "1st Semester",
      registeredAt: new Date().toISOString().slice(0, 10),
      status: "Active",
      phone: formData.phone || "+91 98000 00000",
      avatar:
        role === "student"
          ? "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"
          : "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80"
    };

    // 1. Save directly into MySQL database via API
    const remoteRes = await apiService.auth.register(newUser);
    if (remoteRes && remoteRes.success && remoteRes.user) {
      const savedUser = remoteRes.user;
      setUsers((prev) => [...prev.filter((u) => u.email !== savedUser.email), savedUser]);
      setCurrentUser(savedUser);
      if (remoteRes.token) {
        setStorageItem("academiax_jwt_token", remoteRes.token);
      }
      return { success: true, user: savedUser };
    } else if (remoteRes && remoteRes.success === false) {
      return { success: false, errors: { email: remoteRes.message || "Registration failed in MySQL database." } };
    }

    // 2. Resilient local fallback if server unreachable
    setUsers((prev) => [...prev, newUser]);
    const { password: _, ...safeUser } = newUser;
    setCurrentUser(safeUser);
    return { success: true, user: safeUser };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return false;

    setUsers((prev) =>
      prev.map((u) => (u.id === currentUser.id ? { ...u, ...updatedFields } : u))
    );

    setCurrentUser((prev) => ({ ...prev, ...updatedFields }));
    return true;
  };

  const toggleUserStatus = (userId) => {
    if (currentUser?.id === userId) {
      return { success: false, message: "Administrative safety lock: You cannot deactivate your own active session." };
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          const nextStatus = u.status === "Active" ? "Inactive" : "Active";
          return { ...u, status: nextStatus };
        }
        return u;
      })
    );
    return { success: true };
  };

  const deleteUser = (userId) => {
    if (currentUser?.id === userId) {
      return { success: false, message: "Administrative safety lock: You cannot delete your own account." };
    }
    setUsers((prev) => prev.filter((u) => u.id !== userId));
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        isAuthenticated: !!currentUser,
        role: currentUser?.role || null,
        login,
        quickLogin,
        register,
        logout,
        updateProfile,
        toggleUserStatus,
        deleteUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
