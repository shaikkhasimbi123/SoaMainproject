import React from "react";
import { Link } from "react-router-dom";
import { Bell, Check, Trash2, ExternalLink, ShieldCheck, CheckCheck } from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import { useAuth } from "../context/AuthContext";
import { formatDate, formatDateTime } from "../utils/formatters";

const Notifications = () => {
  const { currentUser } = useAuth();
  const {
    getNotificationsForUser,
    markAsRead,
    markAllAsRead,
    clearNotification,
    clearAllNotifications
  } = useNotifications();

  const userNotifications = getNotificationsForUser(currentUser?.id);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", maxWidth: "800px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Bell size={16} /> Notification Center
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
            Alerts & Academic Notices
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Real-time updates regarding your course enrollments, tuition receipts, and deadlines.
          </p>
        </div>

        {userNotifications.length > 0 && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button className="btn btn-outline" onClick={markAllAsRead} style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem" }}>
              <CheckCheck size={14} /> Mark All Read
            </button>
            <button className="btn btn-outline" onClick={clearAllNotifications} style={{ fontSize: "0.8rem", padding: "0.45rem 0.85rem", color: "var(--color-error)" }}>
              <Trash2 size={14} /> Clear All
            </button>
          </div>
        )}
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        {userNotifications.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {userNotifications.map((n) => (
              <div
                key={n.id}
                style={{
                  padding: "1.25rem",
                  borderRadius: "var(--radius-md)",
                  border: "1px solid var(--color-card-border)",
                  backgroundColor: n.read ? "var(--color-bg)" : "rgba(37, 99, 235, 0.05)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                  transition: "background var(--transition-fast)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    {!n.read && (
                      <span
                        style={{
                          width: "8px",
                          height: "8px",
                          borderRadius: "50%",
                          backgroundColor: "var(--color-primary-blue)",
                          display: "inline-block"
                        }}
                      />
                    )}
                    <span style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)" }}>
                      {n.title}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                    {formatDateTime(n.date)}
                  </span>
                </div>

                <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                  {n.message}
                </p>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
                  <div>
                    {n.link && (
                      <Link
                        to={n.link}
                        className="btn btn-outline"
                        style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                      >
                        Take Action <ExternalLink size={12} />
                      </Link>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    {!n.read && (
                      <button
                        onClick={() => markAsRead(n.id)}
                        style={{ fontSize: "0.78rem", color: "var(--color-primary-blue)", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.25rem" }}
                      >
                        <Check size={12} /> Mark read
                      </button>
                    )}
                    <button
                      onClick={() => clearNotification(n.id)}
                      style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", display: "flex", alignItems: "center", gap: "0.25rem" }}
                      title="Delete notification"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-muted)" }}>
            <Bell size={40} style={{ margin: "0 auto 0.75rem", opacity: 0.5 }} />
            <p style={{ fontSize: "0.95rem" }}>No notifications at this time.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
