import React, { useState, useMemo } from "react";
import { History, Search, Filter, FileSpreadsheet, XCircle, CheckCircle2 } from "lucide-react";
import { useEnrollment } from "../context/EnrollmentContext";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import { formatINR, formatDate } from "../utils/formatters";
import { exportToCSV } from "../utils/csvExport";

const ManageEnrollments = () => {
  const { enrollments, cancelEnrollment } = useEnrollment();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [cancelTarget, setCancelTarget] = useState(null);
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => {
    return enrollments.filter((e) => {
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        e.enrollmentId.toLowerCase().includes(q) ||
        e.studentName.toLowerCase().includes(q) ||
        e.studentId.toLowerCase().includes(q) ||
        e.courseTitle.toLowerCase().includes(q);

      const matchStatus = statusFilter === "All" || e.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [enrollments, searchQuery, statusFilter]);

  const handleCancel = () => {
    if (!cancelTarget) return;
    const res = cancelEnrollment(cancelTarget.enrollmentId, "Administrative cancellation");
    setCancelTarget(null);

    if (res.success) {
      setMsg(`Enrollment ${cancelTarget.enrollmentId} cancelled. Capacity freed.`);
      setTimeout(() => setMsg(""), 4000);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      { key: "enrollmentId", label: "Enrollment ID" },
      { key: "studentId", label: "Student ID" },
      { key: "studentName", label: "Student Name" },
      { key: "courseId", label: "Course ID" },
      { key: "courseTitle", label: "Course Title" },
      { key: "enrollmentDate", label: "Date" },
      { key: "amount", label: "Fee (INR)" },
      { key: "status", label: "Status" },
      { key: "paymentStatus", label: "Payment Status" }
    ];
    exportToCSV("academiax_all_enrollments_report", filtered, headers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <History size={16} /> Cohort Registrations
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
            Enrollment Operations Ledger
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Audit active student registrations, seat consumption, and administrative cancellations.
          </p>
        </div>

        <button className="btn btn-outline" onClick={handleExportCSV}>
          <FileSpreadsheet size={16} /> Export Enrollments CSV
        </button>
      </div>

      {msg && (
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{msg}</span>
        </div>
      )}

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search by student, course, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} style={{ color: "var(--color-text-secondary)" }} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{ padding: "0.5rem 0.85rem" }}
            >
              <option value="All">All Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending Payment">Pending Payment</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Date</th>
                <th>Fee</th>
                <th>Status</th>
                <th>Payment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => (
                <tr key={item.enrollmentId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{item.enrollmentId}</td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.studentName}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{item.studentId}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{item.courseTitle}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{item.courseId}</div>
                  </td>
                  <td>{formatDate(item.enrollmentDate)}</td>
                  <td style={{ fontWeight: 700 }}>{formatINR(item.amount)}</td>
                  <td><StatusBadge status={item.status} /></td>
                  <td><StatusBadge status={item.paymentStatus} /></td>
                  <td>
                    {item.status !== "Cancelled" && (
                      <button
                        onClick={() => setCancelTarget(item)}
                        className="btn btn-outline"
                        style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem", color: "var(--color-error)" }}
                        title="Cancel enrollment"
                      >
                        <XCircle size={13} /> Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!cancelTarget}
        onClose={() => setCancelTarget(null)}
        onConfirm={handleCancel}
        title="Administrative Enrollment Cancellation"
        message={`Are you sure you want to cancel enrollment ${cancelTarget?.enrollmentId} for ${cancelTarget?.studentName}? The seat will be returned to course capacity.`}
        confirmText="Confirm Cancellation"
        type="danger"
      />
    </div>
  );
};

export default ManageEnrollments;
