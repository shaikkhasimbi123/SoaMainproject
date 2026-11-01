import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  GraduationCap,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Zap,
  ShieldCheck,
  AlertCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get("redirect");

  const { login, quickLogin } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await login(email, password);
      setIsSubmitting(false);

      if (res && res.success) {
        if (redirectPath) {
          navigate(redirectPath);
        } else {
          switch (res.user.role) {
            case "admin":
              navigate("/admin/dashboard");
              break;
            case "instructor":
              navigate("/instructor/dashboard");
              break;
            case "student":
            default:
              navigate("/student/dashboard");
              break;
          }
        }
      } else {
        setErrorMsg(res?.message || "Invalid credentials. Please verify your email and password.");
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg("An unexpected authentication error occurred.");
    }
  };

  const handleQuickRole = (role) => {
    const res = quickLogin(role);
    if (res.success) {
      if (redirectPath) {
        navigate(redirectPath);
      } else {
        navigate(role === "admin" ? "/admin/dashboard" : role === "instructor" ? "/instructor/dashboard" : "/student/dashboard");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        background: "radial-gradient(circle at 50% 0%, rgba(37, 99, 235, 0.08) 0%, transparent 70%)"
      }}
    >
      <div
        className="card"
        style={{
          width: "100%",
          maxWidth: "480px",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-xl)"
        }}
      >
        {/* Brand Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div
            style={{
              width: "48px",
              height: "48px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 1rem"
            }}
          >
            <GraduationCap size={28} />
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Welcome Back</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Sign in to your AcademiaX Digital Learning portal
          </p>
        </div>

        {/* Demo Fast Login Buttons */}
        <div
          style={{
            backgroundColor: "var(--color-bg)",
            border: "1px solid var(--color-card-border)",
            borderRadius: "var(--radius-md)",
            padding: "1rem",
            marginBottom: "1.5rem"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", marginBottom: "0.75rem" }}>
            <Zap size={14} /> 1-CLICK DEMO ACCESS (CHOOSE ROLE)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.25rem", fontSize: "0.78rem", flexDirection: "column", gap: "2px" }}
              onClick={() => handleQuickRole("student")}
            >
              <span style={{ fontWeight: 800 }}>Student</span>
              <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>Aarav</span>
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.25rem", fontSize: "0.78rem", flexDirection: "column", gap: "2px" }}
              onClick={() => handleQuickRole("instructor")}
            >
              <span style={{ fontWeight: 800 }}>Instructor</span>
              <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>Dr. Priya</span>
            </button>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: "0.5rem 0.25rem", fontSize: "0.78rem", flexDirection: "column", gap: "2px" }}
              onClick={() => handleQuickRole("admin")}
            >
              <span style={{ fontWeight: 800 }}>Admin</span>
              <span style={{ fontSize: "0.68rem", color: "var(--color-text-muted)" }}>Dean Vance</span>
            </button>
          </div>
        </div>

        {errorMsg && (
          <div
            style={{
              padding: "0.75rem 1rem",
              backgroundColor: "var(--color-error-bg)",
              color: "var(--color-error)",
              borderRadius: "var(--radius-md)",
              fontSize: "0.85rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "1.25rem"
            }}
          >
            <AlertCircle size={16} />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <Mail
                size={18}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)"
                }}
              />
              <input
                type="email"
                placeholder="student@academiax.demo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                required
              />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
              <label style={{ fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                Password
              </label>
              <Link to="/forgot-password" style={{ fontSize: "0.8rem", color: "var(--color-primary-blue)", fontWeight: 600 }}>
                Forgot Password?
              </Link>
            </div>
            <div style={{ position: "relative" }}>
              <Lock
                size={18}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)"
                }}
              />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "100%", paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)"
                }}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                style={{ cursor: "pointer" }}
              />
              <span>Remember demo session</span>
            </label>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.85rem", fontSize: "1rem" }}
          >
            {isSubmitting ? "Authenticating..." : "Sign In to AcademiaX"}
          </button>
        </form>

        {/* Demo Credentials Cheat Sheet */}
        <div style={{ marginTop: "1.5rem", borderTop: "1px solid var(--color-card-border)", paddingTop: "1.25rem", fontSize: "0.78rem", color: "var(--color-text-muted)" }}>
          <div style={{ fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.25rem" }}>
            SAMPLE CREDENTIALS FOR TESTING:
          </div>
          <div>Student: <code>student@academiax.demo</code> • <code>Student123!</code></div>
          <div>Instructor: <code>instructor@academiax.demo</code> • <code>Instructor123!</code></div>
          <div>Admin: <code>admin@academiax.demo</code> • <code>Admin123!</code></div>
        </div>

        {/* Security Disclaimer Notice */}
        <div
          style={{
            marginTop: "1.5rem",
            backgroundColor: "rgba(100, 116, 139, 0.08)",
            padding: "0.75rem",
            borderRadius: "var(--radius-sm)",
            fontSize: "0.72rem",
            color: "var(--color-text-secondary)",
            lineHeight: 1.4
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: "2px" }}>
            <ShieldCheck size={12} /> ACADEMIC DEMONSTRATION NOTICE
          </div>
          This application implements simulated browser session storage for evaluation and educational demonstration.
        </div>

        {/* Register Link */}
        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem" }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ fontWeight: 700 }}>
            Register as a Student
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
