import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  History,
  Search,
  Filter,
  FileText,
  CreditCard,
  XCircle,
  AlertTriangle,
  RotateCcw,
  CheckCircle2
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useCourses } from "../context/CourseContext";
import StatusBadge from "../components/StatusBadge";
import ConfirmDialog from "../components/ConfirmDialog";
import DTIBreakdownModal from "../components/DTIBreakdownModal";
import { formatINR, formatDate } from "../utils/formatters";

const EnrollmentHistory = () => {
  const { currentUser } = useAuth();
  const { getStudentEnrollments, cancelEnrollment } = useEnrollment();
  const { getCourseById } = useCourses();

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedEnrollmentForCancel, setSelectedEnrollmentForCancel] = useState(null);
  const [selectedCourseForDTI, setSelectedCourseForDTI] = useState(null);
  const [isCancelling, setIsCancelling] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState("");

  const studentEnrollments = getStudentEnrollments(currentUser?.id);

  // Filtered Enrollments
  const filteredEnrollments = useMemo(() => {
    return studentEnrollments.filter((e) => {
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        e.enrollmentId.toLowerCase().includes(query) ||
        e.courseTitle.toLowerCase().includes(query) ||
        e.courseId.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        e.status === statusFilter ||
        (statusFilter === "Pending" && e.paymentStatus === "Pending");

      return matchesSearch && matchesStatus;
    });
  }, [studentEnrollments, searchQuery, statusFilter]);

  const handleConfirmCancel = () => {
    if (!selectedEnrollmentForCancel) return;
    setIsCancelling(true);

    setTimeout(() => {
      const res = cancelEnrollment(
        selectedEnrollmentForCancel.enrollmentId,
        "Student voluntary withdrawal"
      );
      setIsCancelling(false);
      setSelectedEnrollmentForCancel(null);

      if (res.success) {
        setActionSuccessMsg(`Enrollment ${selectedEnrollmentForCancel.enrollmentId} cancelled. Reserved seat returned to cohort capacity.`);
        setTimeout(() => setActionSuccessMsg(""), 5000);
      }
    }, 500);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <History size={16} /> Academic Records
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          Enrollment History & Capacity Ledger
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Track cohort seat reservations, payment statuses, and course tuition fee receipts.
        </p>
      </div>

      {actionSuccessMsg && (
        <div
          style={{
            padding: "1rem 1.25rem",
            backgroundColor: "var(--color-success-bg)",
            color: "var(--color-success)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(22, 163, 74, 0.3)",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            fontSize: "0.9rem",
            fontWeight: 600
          }}
        >
          <CheckCircle2 size={20} />
          <span>{actionSuccessMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div
        className="card"
        style={{
          padding: "1.25rem",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem"
        }}
      >
        <div style={{ position: "relative", flex: "1 1 280px" }}>
          <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
          <input
            type="text"
            placeholder="Search by Enrollment ID or course title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ width: "100%", paddingLeft: "2.5rem" }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <Filter size={16} style={{ color: "var(--color-text-secondary)" }} />
          <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>
            Status:
          </span>
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

      {/* Enrollment Table */}
      <div className="card" style={{ padding: "1.5rem" }}>
        {filteredEnrollments.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Enrollment ID</th>
                  <th>Course Information</th>
                  <th>Enrollment Date</th>
                  <th>Tuition Fee</th>
                  <th>Enrollment Status</th>
                  <th>Payment Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredEnrollments.map((item) => {
                  const courseObj = getCourseById(item.courseId);
                  const isCancelled = item.status === "Cancelled";

                  return (
                    <tr key={item.enrollmentId}>
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>
                        {item.enrollmentId}
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>{item.courseTitle}</div>
                        <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                          {item.courseId}
                        </div>
                      </td>
                      <td>{formatDate(item.enrollmentDate)}</td>
                      <td style={{ fontWeight: 700 }}>{formatINR(item.amount)}</td>
                      <td><StatusBadge status={item.status} /></td>
                      <td><StatusBadge status={item.paymentStatus} /></td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                          {/* Pay Tuition Action */}
                          {item.paymentStatus === "Pending" && !isCancelled && (
                            <Link
                              to="/student/payments"
                              className="btn btn-primary"
                              style={{ padding: "0.35rem 0.75rem", fontSize: "0.78rem" }}
                              title="Settle tuition fee"
                            >
                              <CreditCard size={13} /> Pay
                            </Link>
                          )}

                          {/* DTI Modal Action */}
                          {courseObj && (
                            <button
                              onClick={() => setSelectedCourseForDTI(courseObj)}
                              className="btn btn-outline"
                              style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
                              title="Inspect Course Fee Breakdown"
                            >
                              <FileText size={13} /> Fee Details
                            </button>
                          )}

                          {/* Cancel Enrollment Action */}
                          {!isCancelled && (
                            <button
                              onClick={() => setSelectedEnrollmentForCancel(item)}
                              className="btn btn-outline"
                              style={{
                                padding: "0.35rem 0.65rem",
                                fontSize: "0.78rem",
                                color: "var(--color-error)",
                                borderColor: "rgba(220, 38, 38, 0.3)"
                              }}
                              title="Cancel enrollment and release reserved seat"
                            >
                              <XCircle size={13} /> Cancel
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-muted)" }}>
            <p>No enrollment records matching your current filter.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("All");
              }}
              style={{ marginTop: "1rem" }}
            >
              <RotateCcw size={14} /> Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Cancellation Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!selectedEnrollmentForCancel}
        onClose={() => setSelectedEnrollmentForCancel(null)}
        onConfirm={handleConfirmCancel}
        title="Confirm Enrollment Cancellation"
        message={`Are you sure you want to cancel enrollment ${selectedEnrollmentForCancel?.enrollmentId} for "${selectedEnrollmentForCancel?.courseTitle}"? Your reserved seat will be immediately returned to the cohort capacity for other students to register.`}
        confirmText="Yes, Cancel Enrollment"
        cancelText="Keep Enrollment"
        type="danger"
        isLoading={isCancelling}
      />

      {/* DTI Breakdown Modal */}
      <DTIBreakdownModal
        isOpen={!!selectedCourseForDTI}
        onClose={() => setSelectedCourseForDTI(null)}
        course={selectedCourseForDTI}
      />
    </div>
  );
};

export default EnrollmentHistory;
