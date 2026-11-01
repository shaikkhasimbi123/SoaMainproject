import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Mail, Phone, MapPin, Globe, Shield, Terminal } from "lucide-react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "var(--color-primary-navy)",
        color: "#F8FAFC",
        paddingTop: "4rem",
        paddingBottom: "2rem",
        borderTop: "1px solid rgba(255, 255, 255, 0.08)",
        marginTop: "auto"
      }}
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "2.5rem",
            marginBottom: "3rem"
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem", marginBottom: "1rem" }}>
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "var(--radius-md)",
                  backgroundColor: "var(--color-primary-blue)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF"
                }}
              >
                <GraduationCap size={20} />
              </div>
              <span style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "1.3rem", color: "#FFFFFF" }}>
                Academia<span style={{ color: "var(--color-secondary-blue)" }}>X</span>
              </span>
            </div>
            <p style={{ color: "#94A3B8", fontSize: "0.875rem", lineHeight: 1.6, marginBottom: "1rem" }}>
              Learn Today. Lead Tomorrow. Enterprise Higher Education Course Enrollment, Dynamic Capacity Management, and Fee Processing Platform.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.75rem", color: "#38BDF8" }}>
              <Terminal size={14} /> AcademiaX Digital Learning
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.875rem" }}>
              <li>
                <Link to="/" style={{ color: "#CBD5E1" }}>Home</Link>
              </li>
              <li>
                <Link to="/courses" style={{ color: "#CBD5E1" }}>Course Catalog</Link>
              </li>
              <li>
                <Link to="/about" style={{ color: "#CBD5E1" }}>About AcademiaX</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: "#CBD5E1" }}>Contact & Support</Link>
              </li>
              <li>
                <Link to="/login" style={{ color: "#CBD5E1" }}>Student / Faculty Login</Link>
              </li>
            </ul>
          </div>

          {/* Academic Categories */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Course Disciplines
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.65rem", fontSize: "0.875rem" }}>
              <li>
                <Link to="/courses?dept=Computer+Science" style={{ color: "#CBD5E1" }}>Computer Science & Eng</Link>
              </li>
              <li>
                <Link to="/courses?dept=Artificial+Intelligence" style={{ color: "#CBD5E1" }}>Artificial Intelligence & ML</Link>
              </li>
              <li>
                <Link to="/courses?dept=Data+Science" style={{ color: "#CBD5E1" }}>Data Science & Analytics</Link>
              </li>
              <li>
                <Link to="/courses?dept=Cloud+Computing" style={{ color: "#CBD5E1" }}>Cloud Systems & DevOps</Link>
              </li>
              <li>
                <Link to="/courses?dept=Cybersecurity" style={{ color: "#CBD5E1" }}>Cybersecurity & Forensics</Link>
              </li>
            </ul>
          </div>

          {/* Contact & Verification */}
          <div>
            <h4 style={{ color: "#FFFFFF", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem" }}>
              Institutional Info
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "#CBD5E1" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <MapPin size={16} style={{ color: "var(--color-secondary-blue)", flexShrink: 0, marginTop: "2px" }} />
                <span>AcademiaX Academic Senate, Knowledge Corridor, Bengaluru, KA 560001</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Mail size={16} style={{ color: "var(--color-secondary-blue)", flexShrink: 0 }} />
                <span>registrar@academiax.edu.in</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <Phone size={16} style={{ color: "var(--color-secondary-blue)", flexShrink: 0 }} />
                <span>+91 (080) 2841-9900</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                <Shield size={16} style={{ color: "var(--color-success)", flexShrink: 0 }} />
                <span style={{ fontSize: "0.75rem", color: "#86EFAC" }}>Simulated Academic Demonstration</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            paddingTop: "1.5rem",
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            fontSize: "0.8rem",
            color: "#94A3B8"
          }}
        >
          <div>
            © {new Date().getFullYear()} AcademiaX Digital Learning Platform. Higher Education Course Enrollment & Tuition Processing System.
          </div>
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <span>AcademiaX Platform</span>
            <span>Course Catalog</span>
            <span>Student Portal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
