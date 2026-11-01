import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  GraduationCap,
  Menu,
  X,
  User,
  LogOut,
  LayoutDashboard,
  Server,
  Zap,
  ChevronDown
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import NotificationBell from "./NotificationBell";
import StatusBadge from "./StatusBadge";
import { checkBackendHealth } from "../services/api";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [quickLoginOpen, setQuickLoginOpen] = useState(false);
  const [backendActive, setBackendActive] = useState(false);

  const { currentUser, isAuthenticated, logout, quickLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Check Spring Boot Microservices Health on mount
  useEffect(() => {
    checkBackendHealth().then((status) => setBackendActive(status));
  }, []);

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate("/");
  };

  const getDashboardLink = () => {
    if (!currentUser) return "/login";
    switch (currentUser.role) {
      case "instructor":
        return "/instructor/dashboard";
      case "admin":
        return "/admin/dashboard";
      case "student":
      default:
        return "/student/dashboard";
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        backgroundColor: "var(--color-card)",
        borderBottom: "1px solid var(--color-card-border)",
        backdropFilter: "blur(12px)",
        transition: "background var(--transition-normal)"
      }}
    >
      <div
        className="container"
        style={{
          height: "var(--navbar-height)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem"
        }}
      >
        {/* Brand Logo */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.65rem",
            textDecoration: "none"
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "var(--radius-md)",
              background: "linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#FFFFFF",
              boxShadow: "0 4px 10px rgba(37, 99, 235, 0.3)"
            }}
          >
            <GraduationCap size={24} />
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-heading)",
                fontWeight: 800,
                fontSize: "1.35rem",
                letterSpacing: "-0.02em",
                color: "var(--color-primary-navy)",
                lineHeight: 1.1
              }}
            >
              Academia<span style={{ color: "var(--color-primary-blue)" }}>X</span>
            </div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav
          style={{
            display: "none",
            alignItems: "center",
            gap: "1.5rem"
          }}
          className="desktop-nav"
        >
          <Link
            to="/"
            style={{
              fontWeight: 600,
              fontSize: "0.925rem",
              color: isActive("/") ? "var(--color-primary-blue)" : "var(--color-text-primary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Home
          </Link>
          <Link
            to="/courses"
            style={{
              fontWeight: 600,
              fontSize: "0.925rem",
              color: isActive("/courses") ? "var(--color-primary-blue)" : "var(--color-text-primary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Explore Courses
          </Link>
          <Link
            to="/about"
            style={{
              fontWeight: 600,
              fontSize: "0.925rem",
              color: isActive("/about") ? "var(--color-primary-blue)" : "var(--color-text-primary)",
              transition: "color var(--transition-fast)"
            }}
          >
            About
          </Link>
          <Link
            to="/contact"
            style={{
              fontWeight: 600,
              fontSize: "0.925rem",
              color: isActive("/contact") ? "var(--color-primary-blue)" : "var(--color-text-primary)",
              transition: "color var(--transition-fast)"
            }}
          >
            Contact
          </Link>
        </nav>

        {/* Right Actions */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          {/* Microservices Indicator */}
          <div
            className="backend-indicator"
            style={{
              display: "none",
              alignItems: "center",
              gap: "0.35rem",
              padding: "0.3rem 0.65rem",
              borderRadius: "var(--radius-full)",
              fontSize: "0.72rem",
              fontWeight: 700,
              backgroundColor: backendActive ? "var(--color-success-bg)" : "rgba(100, 116, 139, 0.1)",
              color: backendActive ? "var(--color-success)" : "var(--color-text-secondary)",
              border: "1px solid var(--color-card-border)"
            }}
            title={
              backendActive
                ? "Backend Connected on Port 8080 (API Gateway)"
                : "Standalone Demo Mode active"
            }
          >
            <Server size={12} />
            <span>{backendActive ? "Backend Online" : "System Ready"}</span>
          </div>

          <ThemeToggle />

          {isAuthenticated ? (
            <>
              <NotificationBell />

              {/* User Dropdown */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    padding: "0.35rem 0.65rem",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--color-card-border)",
                    backgroundColor: "var(--color-card)",
                    cursor: "pointer"
                  }}
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                  />
                  <div style={{ textAlign: "left", display: "none" }} className="desktop-user-name">
                    <div style={{ fontSize: "0.85rem", fontWeight: 700, lineHeight: 1.1, color: "var(--color-text-primary)" }}>
                      {currentUser.name.split(" ")[0]}
                    </div>
                    <StatusBadge status={currentUser.role} />
                  </div>
                  <ChevronDown size={14} style={{ color: "var(--color-text-muted)" }} />
                </button>

                {userDropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "220px",
                      background: "var(--color-card)",
                      border: "1px solid var(--color-card-border)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-xl)",
                      zIndex: 1000,
                      padding: "0.5rem 0",
                      animation: "fadeIn 0.15s ease-out"
                    }}
                  >
                    <div style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--color-card-border)" }}>
                      <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "var(--color-text-primary)" }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {currentUser.email}
                      </div>
                      <div style={{ marginTop: "0.35rem" }}>
                        <StatusBadge status={currentUser.role} />
                      </div>
                    </div>

                    <Link
                      to={getDashboardLink()}
                      onClick={() => setUserDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        padding: "0.65rem 1rem",
                        fontSize: "0.875rem",
                        color: "var(--color-text-primary)"
                      }}
                    >
                      <LayoutDashboard size={16} /> Dashboard
                    </Link>

                    {currentUser.role === "student" && (
                      <Link
                        to="/student/profile"
                        onClick={() => setUserDropdownOpen(false)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.65rem 1rem",
                          fontSize: "0.875rem",
                          color: "var(--color-text-primary)"
                        }}
                      >
                        <User size={16} /> Profile & Settings
                      </Link>
                    )}

                    <div style={{ borderTop: "1px solid var(--color-card-border)", marginTop: "0.25rem" }}>
                      <button
                        onClick={handleLogout}
                        style={{
                          width: "100%",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          padding: "0.65rem 1rem",
                          fontSize: "0.875rem",
                          color: "var(--color-error)",
                          textAlign: "left"
                        }}
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Dashboard Button */}
              <Link to={getDashboardLink()} className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.875rem" }}>
                Dashboard
              </Link>
            </>
          ) : (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Quick Demo Switcher */}
              <div style={{ position: "relative" }}>
                <button
                  onClick={() => setQuickLoginOpen(!quickLoginOpen)}
                  className="btn btn-secondary"
                  style={{ padding: "0.55rem 0.85rem", fontSize: "0.825rem" }}
                  title="One-click switch for Demo Evaluation"
                >
                  <Zap size={14} /> Demo Login
                </button>

                {quickLoginOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      width: "210px",
                      background: "var(--color-card)",
                      border: "1px solid var(--color-card-border)",
                      borderRadius: "var(--radius-lg)",
                      boxShadow: "var(--shadow-xl)",
                      zIndex: 1000,
                      padding: "0.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.35rem"
                    }}
                  >
                    <div style={{ fontSize: "0.72rem", fontWeight: 700, color: "var(--color-text-muted)", padding: "0.25rem 0.5rem" }}>
                      1-CLICK DEMO ROLES
                    </div>
                    <button
                      className="btn btn-outline"
                      style={{ justifyContent: "flex-start", padding: "0.45rem 0.65rem", fontSize: "0.8rem" }}
                      onClick={() => {
                        quickLogin("student");
                        setQuickLoginOpen(false);
                        navigate("/student/dashboard");
                      }}
                    >
                      🎓 As Student
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ justifyContent: "flex-start", padding: "0.45rem 0.65rem", fontSize: "0.8rem" }}
                      onClick={() => {
                        quickLogin("instructor");
                        setQuickLoginOpen(false);
                        navigate("/instructor/dashboard");
                      }}
                    >
                      👨‍🏫 As Instructor
                    </button>
                    <button
                      className="btn btn-outline"
                      style={{ justifyContent: "flex-start", padding: "0.45rem 0.65rem", fontSize: "0.8rem" }}
                      onClick={() => {
                        quickLogin("admin");
                        setQuickLoginOpen(false);
                        navigate("/admin/dashboard");
                      }}
                    >
                      🛡️ As Administrator
                    </button>
                  </div>
                )}
              </div>

              <Link to="/login" className="btn btn-outline" style={{ padding: "0.55rem 0.95rem", fontSize: "0.875rem" }}>
                Login
              </Link>
              <Link to="/register" className="btn btn-primary" style={{ padding: "0.55rem 1rem", fontSize: "0.875rem" }}>
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-toggle"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.5rem",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--color-card-border)",
              color: "var(--color-text-primary)"
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            borderTop: "1px solid var(--color-card-border)",
            backgroundColor: "var(--color-card)",
            padding: "1.25rem 1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <Link to="/" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
            Home
          </Link>
          <Link to="/courses" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
            Explore Courses
          </Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
            About AcademiaX
          </Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>
            Contact & Support
          </Link>

          {!isAuthenticated && (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginTop: "0.5rem" }}>
              <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="btn btn-outline" style={{ width: "100%" }}>
                Login
              </Link>
              <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ width: "100%" }}>
                Get Started
              </Link>
            </div>
          )}
        </div>
      )}

      {/* Responsive Inline CSS for Desktop vs Mobile Nav */}
      <style>{`
        @media (min-width: 860px) {
          .desktop-nav { display: flex !important; }
          .desktop-user-name { display: block !important; }
          .mobile-toggle { display: none !important; }
          .backend-indicator { display: inline-flex !important; }
        }
      `}</style>
    </header>
  );
};

export default Navbar;
