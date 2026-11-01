import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Check, ExternalLink } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatters";

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useAuth();
  const { getNotificationsForUser, markAsRead, markAllAsRead, unreadCount } = useNotifications();
  const dropdownRef = useRef(null);

  const userNotifications = getNotificationsForUser(currentUser?.id);
  const count = unreadCount(currentUser?.id);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "38px",
          height: "38px",
          borderRadius: "var(--radius-md)",
          border: "1px solid var(--color-card-border)",
          background: "var(--color-card)",
          color: "var(--color-text-primary)",
          position: "relative"
        }}
        title="Notifications"
        aria-label="View notifications"
      >
        <Bell size={18} />
        {count > 0 && (
          <span
            style={{
              position: "absolute",
              top: "-4px",
              right: "-4px",
              background: "var(--color-error)",
              color: "#FFF",
              fontSize: "0.68rem",
              fontWeight: 800,
              width: "18px",
              height: "18px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 2px 4px rgba(220, 38, 38, 0.4)"
            }}
          >
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            width: "340px",
            background: "var(--color-card)",
            border: "1px solid var(--color-card-border)",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-xl)",
            zIndex: 1000,
            overflow: "hidden"
          }}
        >
          <div
            style={{
              padding: "0.875rem 1rem",
              borderBottom: "1px solid var(--color-card-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "0.95rem" }}>Notifications</span>
              {count > 0 && <span className="badge badge-info">{count} new</span>}
            </div>
            {count > 0 && (
              <button
                onClick={markAllAsRead}
                style={{
                  fontSize: "0.75rem",
                  color: "var(--color-primary-blue)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: "0.25rem"
                }}
              >
                <Check size={12} /> Mark all read
              </button>
            )}
          </div>

          <div style={{ maxHeight: "320px", overflowY: "auto" }}>
            {userNotifications.length === 0 ? (
              <div style={{ padding: "2rem 1rem", textAlign: "center", color: "var(--color-text-muted)" }}>
                No notifications yet.
              </div>
            ) : (
              userNotifications.slice(0, 5).map((n) => (
                <div
                  key={n.id}
                  onClick={() => markAsRead(n.id)}
                  style={{
                    padding: "0.875rem 1rem",
                    borderBottom: "1px solid var(--color-card-border)",
                    backgroundColor: n.read ? "transparent" : "rgba(37, 99, 235, 0.05)",
                    transition: "background var(--transition-fast)",
                    cursor: "pointer"
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <span style={{ fontWeight: n.read ? 600 : 700, fontSize: "0.875rem", color: "var(--color-text-primary)" }}>
                      {n.title}
                    </span>
                    <span style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>
                      {formatDate(n.date)}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "0.4rem", lineHeight: 1.4 }}>
                    {n.message}
                  </p>
                  {n.link && (
                    <Link
                      to={n.link}
                      onClick={() => setIsOpen(false)}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-primary-blue)",
                        fontWeight: 600,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.25rem"
                      }}
                    >
                      View Details <ExternalLink size={11} />
                    </Link>
                  )}
                </div>
              ))
            )}
          </div>

          <div
            style={{
              padding: "0.75rem",
              textAlign: "center",
              background: "rgba(37, 99, 235, 0.02)",
              borderTop: "1px solid var(--color-card-border)"
            }}
          >
            <Link
              to={currentUser?.role === "student" ? "/student/notifications" : "#"}
              onClick={() => setIsOpen(false)}
              style={{ fontSize: "0.825rem", fontWeight: 600, color: "var(--color-primary-blue)" }}
            >
              See all notifications →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
