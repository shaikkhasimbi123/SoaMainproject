import React, { useState } from "react";
import { Users, Search, Filter, ShieldCheck, UserCheck, Power, Trash2, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatDate } from "../utils/formatters";

const ManageUsers = () => {
  const { users, currentUser, toggleUserStatus, deleteUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");
  const [selectedUserForAction, setSelectedUserForAction] = useState(null);
  const [actionType, setActionType] = useState(null); // 'toggle' or 'delete'
  const [actionMessage, setActionMessage] = useState("");

  const filtered = users.filter((u) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q || u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || (u.id && u.id.toLowerCase().includes(q));
    const matchRole = roleFilter === "All" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleConfirmAction = () => {
    if (!selectedUserForAction) return;

    if (actionType === "toggle") {
      const res = toggleUserStatus(selectedUserForAction.id);
      if (res.success) {
        setActionMessage(`Status updated for ${selectedUserForAction.name}.`);
      } else {
        alert(res.message);
      }
    } else if (actionType === "delete") {
      const res = deleteUser(selectedUserForAction.id);
      if (res.success) {
        setActionMessage(`User ${selectedUserForAction.name} removed from registry.`);
      } else {
        alert(res.message);
      }
    }

    setSelectedUserForAction(null);
    setActionType(null);
    setTimeout(() => setActionMessage(""), 4000);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <Users size={16} /> User Registry
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          User & Identity Management
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Manage student accounts, faculty profiles, and administrative credentials.
        </p>
      </div>

      {actionMessage && (
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} style={{ color: "var(--color-text-secondary)" }} />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              style={{ padding: "0.5rem 0.85rem" }}
            >
              <option value="All">All Roles</option>
              <option value="student">Students Only</option>
              <option value="instructor">Instructors Only</option>
              <option value="admin">Administrators Only</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Email Address</th>
                <th>Role</th>
                <th>Department</th>
                <th>Registration Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => {
                const isCurrentAdmin = u.id === currentUser?.id;

                return (
                  <tr key={u.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{u.id}</td>
                    <td style={{ fontWeight: 600 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                        <img
                          src={u.avatar}
                          alt={u.name}
                          style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                        />
                        <span>{u.name}</span>
                        {isCurrentAdmin && <span className="badge badge-info" style={{ fontSize: "0.65rem" }}>You</span>}
                      </div>
                    </td>
                    <td>{u.email}</td>
                    <td><StatusBadge status={u.role} /></td>
                    <td>{u.department}</td>
                    <td>{formatDate(u.registeredAt)}</td>
                    <td><StatusBadge status={u.status} /></td>
                    <td>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        <button
                          onClick={() => {
                            setSelectedUserForAction(u);
                            setActionType("toggle");
                          }}
                          disabled={isCurrentAdmin}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
                          title={isCurrentAdmin ? "Cannot deactivate yourself" : "Toggle active/inactive status"}
                        >
                          <Power size={13} style={{ color: u.status === "Active" ? "var(--color-success)" : "var(--color-text-muted)" }} />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserForAction(u);
                            setActionType("delete");
                          }}
                          disabled={isCurrentAdmin}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem", color: "var(--color-error)" }}
                          title={isCurrentAdmin ? "Cannot delete yourself" : "Delete account"}
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!selectedUserForAction}
        onClose={() => setSelectedUserForAction(null)}
        onConfirm={handleConfirmAction}
        title={actionType === "delete" ? "Delete User Account" : "Change User Status"}
        message={
          actionType === "delete"
            ? `Are you sure you want to permanently delete account ${selectedUserForAction?.name} (${selectedUserForAction?.email})?`
            : `Are you sure you want to ${selectedUserForAction?.status === "Active" ? "deactivate" : "activate"} user ${selectedUserForAction?.name}?`
        }
        confirmText={actionType === "delete" ? "Confirm Delete" : "Update Status"}
        type={actionType === "delete" ? "danger" : "warning"}
      />
    </div>
  );
};

export default ManageUsers;
