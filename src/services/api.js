/**
 * AcademiaX Microservices API Client
 * Connects to API Gateway (/api) with MySQL 8.0 Persistence,
 * RFC 7519 JWT Authentication, and Gateway Load Balancing.
 */

const API_GATEWAY_URL = "/api";

export const checkBackendHealth = async () => {
  try {
    const res = await fetch(`${API_GATEWAY_URL}/health`, {
      method: "GET",
      signal: AbortSignal.timeout(3000)
    });
    return res.ok;
  } catch (err) {
    return false;
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("academiax_token");
  const headers = { "Content-Type": "application/json" };
  if (token) {
    headers["Authorization"] = token.startsWith("Bearer ") ? token : `Bearer ${token}`;
  }
  return headers;
};

export const apiService = {
  // 1. Auth Microservice (Connected to MySQL: academiax_auth_db)
  auth: {
    login: async (credentials) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials)
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("academiax_token", data.token);
        }
        return data;
      } catch (e) {
        console.warn("[API Auth] Live connection error:", e);
        return null;
      }
    },
    register: async (userData) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/register`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData)
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem("academiax_token", data.token);
        }
        return data;
      } catch (e) {
        console.warn("[API Register] Live connection error:", e);
        return null;
      }
    },
    verifyToken: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/verify`, {
          method: "GET",
          headers: getAuthHeaders()
        });
        return await res.json();
      } catch (e) {
        return { valid: false };
      }
    },
    getAllUsers: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/users`, {
          headers: getAuthHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    toggleStatus: async (userId) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/users/${userId}/toggle`, {
          method: "PUT",
          headers: getAuthHeaders()
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    deleteUser: async (userId) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/auth/users/${userId}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    }
  },

  // 2. Course Microservice (Connected to MySQL: academiax_course_db)
  courses: {
    getAll: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/courses`);
        if (!res.ok) throw new Error("Fetch failed");
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    getById: async (id) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/courses/${id}`);
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    create: async (courseData) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/courses`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(courseData)
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    update: async (id, courseData) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/courses/${id}`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify(courseData)
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    delete: async (id) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/courses/${id}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    }
  },

  // 3. Enrollment Microservice (Connected to MySQL: academiax_enrollment_db)
  enrollments: {
    getAll: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/enrollments`, {
          headers: getAuthHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    create: async (payload) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/enrollments`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(payload)
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    cancel: async (enrollmentId, reason) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/enrollments/${enrollmentId}/cancel`, {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({ reason })
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    delete: async (enrollmentId) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/enrollments/${enrollmentId}`, {
          method: "DELETE",
          headers: getAuthHeaders()
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    }
  },

  // 4. Payment Microservice (Connected to MySQL: academiax_payment_db)
  payments: {
    getAll: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/payments`, {
          headers: getAuthHeaders()
        });
        if (!res.ok) return null;
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    process: async (paymentData) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/payments/process`, {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(paymentData)
        });
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    getDTI: async (courseId, amount) => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/payments/dti?courseId=${courseId}&amount=${amount}`);
        return await res.json();
      } catch (e) {
        return null;
      }
    }
  },

  // 5. Gateway & Load Balancer Telemetry
  gateway: {
    getLoadBalancerStatus: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/loadbalancer/status`);
        return await res.json();
      } catch (e) {
        return null;
      }
    },
    getServices: async () => {
      try {
        const res = await fetch(`${API_GATEWAY_URL}/gateway/services`);
        return await res.json();
      } catch (e) {
        return null;
      }
    }
  }
};
