import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  History,
  CreditCard,
  Bell,
  User,
  Settings,
  LogOut,
  Users,
  BarChart3,
  FileSpreadsheet,
  Layers,
  CheckCircle,
  HelpCircle
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../context/NotificationContext";
import StatusBadge from "./StatusBadge";

const Sidebar = ({ role = "student" }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const { unreadCount } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  const renderStudentLinks = () => (
    <>
      <div className="sidebar-group-title">ACADEMIC WORKSPACE</div>
      <Link to="/student/dashboard" className={`sidebar-link ${isActive("/student/dashboard") ? "active" : ""}`}>
        <LayoutDashboard size={18} /> Overview
      </Link>
      <Link to="/courses" className={`sidebar-link ${isActive("/courses") ? "active" : ""}`}>
        <BookOpen size={18} /> Browse Courses
      </Link>
      <Link to="/student/courses" className={`sidebar-link ${isActive("/student/courses") ? "active" : ""}`}>
        <GraduationCap size={18} /> My Courses
      </Link>
      <Link to="/student/enrollments" className={`sidebar-link ${isActive("/student/enrollments") ? "active" : ""}`}>
        <History size={18} /> Enrollment History
      </Link>

      <div className="sidebar-group-title">FINANCIAL & PAYMENTS</div>
      <Link to="/student/payments" className={`sidebar-link ${isActive("/student/payments") ? "active" : ""}`}>
        <CreditCard size={18} /> Tuition Payments
      </Link>

      <div className="sidebar-group-title">PREFERENCES</div>
      <Link to="/student/notifications" className={`sidebar-link ${isActive("/student/notifications") ? "active" : ""}`}>
        <Bell size={18} /> Notifications
        {unreadCount(currentUser?.id) > 0 && (
          <span className="badge badge-error" style={{ marginLeft: "auto", fontSize: "0.68rem" }}>
            {unreadCount(currentUser?.id)}
          </span>
        )}
      </Link>
      <Link to="/student/profile" className={`sidebar-link ${isActive("/student/profile") ? "active" : ""}`}>
        <User size={18} /> Student Profile
      </Link>
    </>
  );

  const renderInstructorLinks = () => (
    <>
      <div className="sidebar-group-title">FACULTY WORKSPACE</div>
      <Link to="/instructor/dashboard" className={`sidebar-link ${isActive("/instructor/dashboard") ? "active" : ""}`}>
        <LayoutDashboard size={18} /> Faculty Overview
      </Link>
      <Link to="/instructor/courses" className={`sidebar-link ${isActive("/instructor/courses") ? "active" : ""}`}>
        <BookOpen size={18} /> My Assigned Courses
      </Link>
      <Link to="/instructor/students" className={`sidebar-link ${isActive("/instructor/students") ? "active" : ""}`}>
        <Users size={18} /> Enrolled Students
      </Link>
      <Link to="/courses" className={`sidebar-link ${isActive("/courses") ? "active" : ""}`}>
        <Layers size={18} /> Public Catalog
      </Link>
    </>
  );

  const renderAdminLinks = () => (
    <>
      <div className="sidebar-group-title">ADMINISTRATION</div>
      <Link to="/admin/dashboard" className={`sidebar-link ${isActive("/admin/dashboard") ? "active" : ""}`}>
        <LayoutDashboard size={18} /> Executive Overview
      </Link>
      <Link to="/admin/courses" className={`sidebar-link ${isActive("/admin/courses") ? "active" : ""}`}>
        <BookOpen size={18} /> Manage Courses
      </Link>
      <Link to="/admin/users" className={`sidebar-link ${isActive("/admin/users") ? "active" : ""}`}>
        <Users size={18} /> User Management
      </Link>
      <Link to="/admin/enrollments" className={`sidebar-link ${isActive("/admin/enrollments") ? "active" : ""}`}>
        <History size={18} /> Manage Enrollments
      </Link>

      <div className="sidebar-group-title">FINANCIAL AUDIT</div>
      <Link to="/admin/payments" className={`sidebar-link ${isActive("/admin/payments") ? "active" : ""}`}>
        <CreditCard size={18} /> Manage Payments
      </Link>
      <Link to="/admin/reports" className={`sidebar-link ${isActive("/admin/reports") ? "active" : ""}`}>
        <FileSpreadsheet size={18} /> Reports & CSV Export
      </Link>
    </>
  );

  return (
    <aside
      className="sidebar"
      style={{
        width: "var(--sidebar-width)",
        backgroundColor: "var(--color-card)",
        borderRight: "1px solid var(--color-card-border)",
        height: "calc(100vh - var(--navbar-height))",
        position: "sticky",
        top: "var(--navbar-height)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "1.25rem 1rem",
        overflowY: "auto",
        transition: "width var(--transition-normal)"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
        {/* User Card in Sidebar */}
        <div
          style={{
            padding: "0.75rem",
            backgroundColor: "var(--color-bg)",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--color-card-border)",
            marginBottom: "1rem",
            display: "flex",
            alignItems: "center",
            gap: "0.65rem"
          }}
        >
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
          />
          <div style={{ overflow: "hidden" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-text-primary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {currentUser?.name}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", marginTop: "2px" }}>
              <StatusBadge status={currentUser?.role} />
            </div>
          </div>
        </div>

        {role === "admin"
          ? renderAdminLinks()
          : role === "instructor"
          ? renderInstructorLinks()
          : renderStudentLinks()}
      </div>

      {/* Logout button */}
      <div style={{ borderTop: "1px solid var(--color-card-border)", paddingTop: "1rem", marginTop: "1rem" }}>
        <button
          onClick={handleLogout}
          className="sidebar-link"
          style={{
            width: "100%",
            color: "var(--color-error)",
            cursor: "pointer",
            border: "none",
            background: "none"
          }}
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>

      <style>{`
        .sidebar-group-title {
          font-size: 0.68rem;
          font-weight: 800;
          color: var(--color-text-muted);
          letter-spacing: 0.06em;
          padding: 0.75rem 0.75rem 0.25rem;
          text-transform: uppercase;
        }
        .sidebar-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.65rem 0.85rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: all var(--transition-fast);
        }
        .sidebar-link:hover {
          background-color: var(--color-light-blue);
          color: var(--color-primary-blue);
        }
        .sidebar-link.active {
          background: linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%);
          color: #FFFFFF;
          box-shadow: 0 4px 10px rgba(37, 99, 235, 0.25);
        }
      `}</style>
    </aside>
  );
};

export default Sidebar;
