import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GraduationCap, Mail, Lock, User, Hash, BookOpen, AlertCircle, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    studentId: "",
    department: "Computer Science",
    semester: "1st Semester",
    password: "",
    confirmPassword: "",
    role: "student"
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      const res = await register(formData);
      setIsSubmitting(false);

      if (res && res.success) {
        navigate("/student/dashboard");
      } else if (res && res.errors) {
        setErrors(res.errors);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrors({ form: "An unexpected registration error occurred." });
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
          maxWidth: "540px",
          padding: "2.5rem 2rem",
          boxShadow: "var(--shadow-xl)"
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "1.75rem" }}>
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
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Student Registration</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Join AcademiaX to access course enrollments and academic dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
          {/* Full Name */}
          <div>
            <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
              Full Name *
            </label>
            <div style={{ position: "relative" }}>
              <User size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
              <input
                type="text"
                name="name"
                placeholder="Aarav Sharma"
                value={formData.name}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                required
              />
            </div>
            {errors.name && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.name}</span>}
          </div>

          {/* Email */}
          <div>
            <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
              Institutional / Personal Email *
            </label>
            <div style={{ position: "relative" }}>
              <Mail size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
              <input
                type="email"
                name="email"
                placeholder="aarav.sharma@example.edu"
                value={formData.email}
                onChange={handleChange}
                style={{ width: "100%", paddingLeft: "2.5rem" }}
                required
              />
            </div>
            {errors.email && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.email}</span>}
          </div>

          {/* Student ID & Department */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Student ID (Optional)
              </label>
              <div style={{ position: "relative" }}>
                <Hash size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input
                  type="text"
                  name="studentId"
                  placeholder="STU-2026-9901"
                  value={formData.studentId}
                  onChange={handleChange}
                  style={{ width: "100%", paddingLeft: "2.5rem" }}
                />
              </div>
              {errors.studentId && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.studentId}</span>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Department
              </label>
              <select name="department" value={formData.department} onChange={handleChange} style={{ width: "100%" }}>
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Business and Management">Business and Management</option>
              </select>
            </div>
          </div>

          {/* Passwords */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Password *
              </label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={formData.password}
                onChange={handleChange}
                style={{ width: "100%" }}
                required
              />
              {errors.password && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.password}</span>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{ width: "100%" }}
                required
              />
              {errors.confirmPassword && (
                <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* Role Policy Notice */}
          <div style={{ backgroundColor: "var(--color-bg)", padding: "0.75rem", borderRadius: "var(--radius-sm)", fontSize: "0.75rem", color: "var(--color-text-secondary)" }}>
            <strong>Institutional Policy:</strong> Self-registration assigns the <strong>Student</strong> role. Instructor and Administrator privileges are controlled for demo safety and can be tested via the demo login menu.
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
            style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", marginTop: "0.5rem" }}
          >
            {isSubmitting ? "Creating Student Account..." : "Create Student Account"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem" }}>
          Already have an account?{" "}
          <Link to="/login" style={{ fontWeight: 700 }}>
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
