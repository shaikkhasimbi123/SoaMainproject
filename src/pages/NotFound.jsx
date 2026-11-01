import React from "react";
import { Link } from "react-router-dom";
import { AlertTriangle, Home, BookOpen } from "lucide-react";

const NotFound = () => {
  return (
    <div
      style={{
        minHeight: "calc(100vh - var(--navbar-height))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1.5rem",
        textAlign: "center"
      }}
    >
      <div className="card" style={{ maxWidth: "500px", padding: "3rem 2rem", boxShadow: "var(--shadow-xl)" }}>
        <div
          style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            backgroundColor: "var(--color-warning-bg)",
            color: "var(--color-warning)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 1.25rem"
          }}
        >
          <AlertTriangle size={36} />
        </div>

        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "0.5rem" }}>
          404 - Page Not Found
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem", lineHeight: 1.6, marginBottom: "2rem" }}>
          The academic route or document you requested does not exist in the AcademiaX portal.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} /> Return Home
          </Link>
          <Link to="/courses" className="btn btn-outline">
            <BookOpen size={16} /> Explore Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
