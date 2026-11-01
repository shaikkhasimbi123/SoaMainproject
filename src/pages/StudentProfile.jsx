import React, { useState } from "react";
import { User, Mail, Hash, BookOpen, Phone, Save, ShieldCheck, Sun, Moon, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const StudentProfile = () => {
  const { currentUser, updateProfile } = useAuth();
  const { isDark, toggleTheme } = useTheme();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "+91 98765 43210",
    department: currentUser?.department || "Computer Science",
    semester: currentUser?.semester || "6th Semester"
  });

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <User size={16} /> Student Credentials
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          My Student Profile & Preferences
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Manage your personal academic information, contact numbers, and portal theme preferences.
        </p>
      </div>

      {savedSuccess && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-success-bg)",
            color: "var(--color-success)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(22, 163, 74, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={18} />
          <span>Profile changes updated successfully in active session.</span>
        </div>
      )}

      {/* Main Profile Form Card */}
      <div className="card" style={{ padding: "2rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "2rem", borderBottom: "1px solid var(--color-card-border)", paddingBottom: "1.5rem" }}>
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid var(--color-primary-blue)" }}
          />
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 800 }}>{currentUser?.name}</h3>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              ID: <strong>{currentUser?.id}</strong> • Role: <strong>{currentUser?.role?.toUpperCase()}</strong>
            </div>
            <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "2px" }}>
              Member since: {currentUser?.registeredAt || "2026-08-15"}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Full Legal Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: "100%" }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Institutional Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                style={{ width: "100%", backgroundColor: "var(--color-bg)", opacity: 0.8 }}
                title="Email is fixed to demo user identity"
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Academic Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Current Semester
              </label>
              <input
                type="text"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
              Mobile Phone
            </label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "1rem" }}>
            <button type="submit" className="btn btn-primary" style={{ padding: "0.75rem 1.5rem" }}>
              <Save size={16} /> Save Profile Changes
            </button>
          </div>
        </form>
      </div>

      {/* Theme and Preferences */}
      <div className="card" style={{ padding: "2rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}>
          Display & Portal Theme
        </h3>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "1rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
              Current Theme: {isDark ? "Dark Theme" : "Light Theme"}
            </div>
            <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)" }}>
              Toggle between modern SaaS light mode and high-contrast dark mode.
            </div>
          </div>
          <button className="btn btn-outline" onClick={toggleTheme}>
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
            <span>Switch to {isDark ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      {/* Security Disclaimer */}
      <div
        className="card"
        style={{
          padding: "1.5rem",
          border: "1px dashed var(--color-warning)",
          backgroundColor: "rgba(245, 158, 11, 0.05)"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--color-warning)", marginBottom: "0.5rem" }}>
          <ShieldCheck size={18} /> Password Updates in Frontend Demo
        </div>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          In accordance with educational demonstration guidelines, password updates are restricted to ensure standard demo credentials (<code>Student123!</code>) remain functional for evaluators. Production deployments would connect to Spring Boot Auth microservice BCrypt hash stores.
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;
