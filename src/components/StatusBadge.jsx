import React from "react";
import { CheckCircle2, Clock, XCircle, AlertTriangle, ShieldCheck, UserCheck } from "lucide-react";

const StatusBadge = ({ status, type = "status" }) => {
  if (!status) return null;

  const normalized = String(status).toLowerCase();

  // Enrollment Statuses
  if (normalized === "confirmed" || normalized === "successful" || normalized === "paid" || normalized === "active") {
    return (
      <span className="badge badge-success">
        <CheckCircle2 size={12} />
        {status}
      </span>
    );
  }

  if (normalized === "pending payment" || normalized === "pending" || normalized === "nearly full") {
    return (
      <span className="badge badge-warning">
        <Clock size={12} />
        {status}
      </span>
    );
  }

  if (normalized === "cancelled" || normalized === "failed" || normalized === "inactive" || normalized === "full") {
    return (
      <span className="badge badge-error">
        <XCircle size={12} />
        {status}
      </span>
    );
  }

  if (normalized === "expired") {
    return (
      <span className="badge badge-error">
        <AlertTriangle size={12} />
        Deadline Passed
      </span>
    );
  }

  // Roles
  if (normalized === "admin") {
    return (
      <span className="badge badge-purple">
        <ShieldCheck size={12} />
        Admin
      </span>
    );
  }

  if (normalized === "instructor") {
    return (
      <span className="badge badge-info">
        <UserCheck size={12} />
        Instructor
      </span>
    );
  }

  if (normalized === "student") {
    return (
      <span className="badge" style={{ background: "var(--color-light-blue)", color: "var(--color-primary-navy)" }}>
        Student
      </span>
    );
  }

  return <span className="badge badge-info">{status}</span>;
};

export default StatusBadge;
