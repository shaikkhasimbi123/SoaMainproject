import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, ArrowLeft, Info, CheckCircle2 } from "lucide-react";
import { isValidEmail } from "../utils/validation";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem"
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
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800 }}>Account Recovery</h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.9rem", marginTop: "0.25rem" }}>
            Educational Demo Password Recovery Simulation
          </p>
        </div>

        {submitted ? (
          <div>
            <div
              style={{
                backgroundColor: "var(--color-light-blue)",
                padding: "1.25rem",
                borderRadius: "var(--radius-md)",
                border: "1px solid rgba(37, 99, 235, 0.2)",
                marginBottom: "1.5rem"
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--color-primary-navy)", marginBottom: "0.5rem" }}>
                <Info size={18} style={{ color: "var(--color-primary-blue)" }} /> Demonstration Notice
              </div>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                In a production environment, a secure cryptographic reset token would be dispatched to <strong>{email}</strong> via an institutional SMTP service.
              </p>
              <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginTop: "0.5rem" }}>
                Because this is an educational demo system, you can immediately log in using the built-in test credentials below.
              </p>
            </div>

            <div style={{ backgroundColor: "var(--color-bg)", padding: "1rem", borderRadius: "var(--radius-md)", fontSize: "0.8rem", marginBottom: "1.5rem" }}>
              <div style={{ fontWeight: 700, marginBottom: "0.35rem" }}>Default Demo Password:</div>
              <div>Student: <code>Student123!</code></div>
              <div>Instructor: <code>Instructor123!</code></div>
              <div>Admin: <code>Admin123!</code></div>
            </div>

            <Link to="/login" className="btn btn-primary" style={{ width: "100%", justifyContent: "center" }}>
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              Enter your registered institutional email. We will simulate the password reset instruction dispatch.
            </p>

            <div>
              <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
                <input
                  type="email"
                  placeholder="student@academiax.demo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: "100%", paddingLeft: "2.5rem" }}
                  required
                />
              </div>
              {error && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{error}</span>}
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
              Simulate Password Recovery
            </button>

            <div style={{ textAlign: "center", marginTop: "0.5rem" }}>
              <Link to="/login" style={{ fontSize: "0.875rem", display: "inline-flex", alignItems: "center", gap: "0.35rem" }}>
                <ArrowLeft size={14} /> Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
