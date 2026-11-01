import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  CreditCard,
  Smartphone,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  Printer,
  Download,
  ShieldCheck,
  ArrowRight,
  FileSpreadsheet,
  Lock,
  Zap,
  Sparkles
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { usePayment } from "../context/PaymentContext";
import { useCourses } from "../context/CourseContext";
import { formatINR, formatDate, formatDateTime, calculateDTI } from "../utils/formatters";
import { PAYMENT_METHODS } from "../utils/paymentUtils";
import { exportToCSV } from "../utils/csvExport";
import StatusBadge from "../components/StatusBadge";
import DTIBreakdownModal from "../components/DTIBreakdownModal";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { currentUser } = useAuth();
  const { getStudentEnrollments } = useEnrollment();
  const { processPayment, getPaymentsForStudent } = usePayment();
  const { getCourseById } = useCourses();

  const myEnrollments = getStudentEnrollments(currentUser?.id).filter((e) => e.status !== "Cancelled");
  const myPayments = getPaymentsForStudent(currentUser?.id);

  // Default selected enrollment: first pending enrollment or first enrollment
  const preselectedId = searchParams.get("enrollmentId");
  const [selectedEnrollmentId, setSelectedEnrollmentId] = useState(
    preselectedId || myEnrollments.find((e) => e.paymentStatus === "Pending")?.enrollmentId || myEnrollments[0]?.enrollmentId || ""
  );

  const [selectedMethod, setSelectedMethod] = useState("UPI Demo");
  const [forceOutcome, setForceOutcome] = useState("success"); // 'success' or 'failure'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [showDTIModal, setShowDTIModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pay"); // 'pay' or 'history'

  const currentEnrollment = myEnrollments.find((e) => e.enrollmentId === selectedEnrollmentId);
  const currentCourse = currentEnrollment ? getCourseById(currentEnrollment.courseId) : null;
  const isAlreadyPaid = currentEnrollment?.paymentStatus === "Successful";

  const dti = currentCourse
    ? calculateDTI(currentCourse.tuitionFee, currentCourse.dti)
    : calculateDTI(currentEnrollment?.amount || 0);

  const handleProcessPayment = async () => {
    if (!currentEnrollment || !currentCourse) return;
    setPaymentError("");
    setIsProcessing(true);

    const result = await processPayment({
      enrollment: currentEnrollment,
      course: currentCourse,
      student: currentUser,
      paymentMethod: selectedMethod,
      forceOutcome
    });

    setIsProcessing(false);

    if (result.success) {
      navigate(`/student/receipt/${result.record.paymentId}`);
    } else {
      setPaymentError(result.error || "Simulated payment authorization failed.");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      { key: "paymentId", label: "Payment ID" },
      { key: "transactionReference", label: "Transaction Reference" },
      { key: "courseTitle", label: "Course Title" },
      { key: "amount", label: "Tuition Amount (INR)" },
      { key: "paymentMethod", label: "Method" },
      { key: "paymentStatus", label: "Payment Status" },
      { key: "paymentDate", label: "Timestamp" }
    ];
    exportToCSV(`academiax_student_payments_${currentUser?.id}`, myPayments, headers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Header */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <CreditCard size={16} /> Financial Operations
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          Tuition Settlement & Fee Breakdown
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Simulated institutional payment gateway integrated with AcademiaX ledger.
        </p>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", borderBottom: "1px solid var(--color-card-border)", gap: "1rem" }}>
        <button
          onClick={() => setActiveTab("pay")}
          style={{
            padding: "0.75rem 1.25rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: activeTab === "pay" ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
            borderBottom: activeTab === "pay" ? "2px solid var(--color-primary-blue)" : "none",
            background: "none"
          }}
        >
          Settle Tuition Fee
        </button>
        <button
          onClick={() => setActiveTab("history")}
          style={{
            padding: "0.75rem 1.25rem",
            fontWeight: 700,
            fontSize: "0.95rem",
            color: activeTab === "history" ? "var(--color-primary-blue)" : "var(--color-text-secondary)",
            borderBottom: activeTab === "history" ? "2px solid var(--color-primary-blue)" : "none",
            background: "none"
          }}
        >
          Payment Ledger & Receipts ({myPayments.length})
        </button>
      </div>

      {activeTab === "pay" ? (
        myEnrollments.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {/* Left: Enrollment & DTI Breakdown */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.5rem" }}>
                <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "1rem" }}>
                  1. Select Enrollment for Settlement
                </h3>

                <select
                  value={selectedEnrollmentId}
                  onChange={(e) => {
                    setSelectedEnrollmentId(e.target.value);
                    setPaymentError("");
                  }}
                  style={{ width: "100%", padding: "0.75rem", marginBottom: "1.25rem", fontWeight: 600 }}
                >
                  {myEnrollments.map((enr) => (
                    <option key={enr.enrollmentId} value={enr.enrollmentId}>
                      {enr.enrollmentId} • {enr.courseTitle} ({formatINR(enr.amount)}) - [{enr.paymentStatus}]
                    </option>
                  ))}
                </select>

                {currentEnrollment && (
                  <div style={{ backgroundColor: "var(--color-bg)", padding: "1.25rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-card-border)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <div style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                          {currentEnrollment.courseId} • ENROLLMENT: {currentEnrollment.enrollmentId}
                        </div>
                        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--color-text-primary)", marginTop: "2px" }}>
                          {currentEnrollment.courseTitle}
                        </h4>
                      </div>
                      <StatusBadge status={currentEnrollment.paymentStatus} />
                    </div>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem", paddingTop: "0.75rem", borderTop: "1px solid var(--color-card-border)" }}>
                      <span style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>Student:</span>
                      <span style={{ fontWeight: 600 }}>{currentUser?.name} ({currentUser?.id})</span>
                    </div>
                  </div>
                )}
              </div>

              {/* DTI Breakdown Card */}
              {currentEnrollment && (
                <div className="card" style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <FileText size={18} style={{ color: "var(--color-primary-blue)" }} />
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700 }}>Itemized Fee Breakdown</h3>
                    </div>
                    <button
                      onClick={() => setShowDTIModal(true)}
                      style={{ fontSize: "0.78rem", color: "var(--color-primary-blue)", fontWeight: 700 }}
                    >
                      Expand Fee Breakdown →
                    </button>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", fontSize: "0.875rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                      <span>Base Academic Tuition:</span>
                      <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{formatINR(dti.baseTuition)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                      <span>Advanced Computing / Lab Surcharge:</span>
                      <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{formatINR(dti.techLabSurcharge)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                      <span>Digital Library & Research Resources:</span>
                      <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{formatINR(dti.digitalLibraryFee)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", color: "var(--color-text-secondary)" }}>
                      <span>Assessment & Proctored Exam Levy:</span>
                      <span style={{ fontWeight: 600, color: "var(--color-text-primary)" }}>{formatINR(dti.examLevy)}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        borderTop: "1px solid var(--color-card-border)",
                        paddingTop: "0.75rem",
                        marginTop: "0.25rem",
                        fontWeight: 800,
                        fontSize: "1rem"
                      }}
                    >
                      <span>Total Amount Payable:</span>
                      <span style={{ color: "var(--color-primary-blue)", fontSize: "1.15rem" }}>{formatINR(dti.total)}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right: Payment Gateway Simulation */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div className="card" style={{ padding: "1.75rem" }}>
                <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                  2. Choose Simulated Payment Method
                </h3>
                <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
                  Select an educational simulated payment channel. No real banking credentials needed.
                </p>

                {/* Method Radio Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.5rem" }}>
                  {PAYMENT_METHODS.map((m) => {
                    const isSelected = selectedMethod === m.name;
                    return (
                      <div
                        key={m.id}
                        onClick={() => setSelectedMethod(m.name)}
                        style={{
                          padding: "1rem",
                          borderRadius: "var(--radius-md)",
                          border: isSelected ? "2px solid var(--color-primary-blue)" : "1px solid var(--color-card-border)",
                          backgroundColor: isSelected ? "var(--color-light-blue)" : "var(--color-card)",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.85rem",
                          transition: "all var(--transition-fast)"
                        }}
                      >
                        <div
                          style={{
                            width: "36px",
                            height: "36px",
                            borderRadius: "50%",
                            backgroundColor: isSelected ? "var(--color-primary-blue)" : "var(--color-bg)",
                            color: isSelected ? "#FFFFFF" : "var(--color-text-primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                          }}
                        >
                          {m.id === "upi" ? <Smartphone size={18} /> : m.id === "card" ? <CreditCard size={18} /> : <Building size={18} />}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-text-primary)" }}>{m.name}</div>
                          <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{m.description}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Simulation Deterministic Switch (for evaluation testing) */}
                <div style={{ backgroundColor: "var(--color-bg)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.5rem", border: "1px dashed var(--color-card-border)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", fontWeight: 800, color: "var(--color-primary-blue)", marginBottom: "0.5rem" }}>
                    <Zap size={13} /> DEMO OUTCOME CONTROL (FOR VIVA / EVALUATION)
                  </div>
                  <div style={{ display: "flex", gap: "1rem", fontSize: "0.85rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="outcome"
                        checked={forceOutcome === "success"}
                        onChange={() => setForceOutcome("success")}
                      />
                      <span style={{ fontWeight: 600, color: "var(--color-success)" }}>Simulate Success</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.35rem", cursor: "pointer" }}>
                      <input
                        type="radio"
                        name="outcome"
                        checked={forceOutcome === "failure"}
                        onChange={() => setForceOutcome("failure")}
                      />
                      <span style={{ fontWeight: 600, color: "var(--color-error)" }}>Simulate Gateway Failure</span>
                    </label>
                  </div>
                </div>

                {paymentError && (
                  <div
                    style={{
                      padding: "0.75rem 1rem",
                      backgroundColor: "var(--color-error-bg)",
                      color: "var(--color-error)",
                      borderRadius: "var(--radius-md)",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      marginBottom: "1.25rem"
                    }}
                  >
                    <AlertCircle size={16} />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Action button */}
                {isAlreadyPaid ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <div className="badge badge-success" style={{ padding: "0.75rem", width: "100%", justifyContent: "center" }}>
                      <CheckCircle2 size={16} /> Tuition settled successfully
                    </div>
                    <Link
                      to={`/student/receipt/${myPayments.find((p) => p.enrollmentId === currentEnrollment.enrollmentId)?.paymentId}`}
                      className="btn btn-outline"
                      style={{ justifyContent: "center" }}
                    >
                      <FileText size={16} /> View Official Receipt
                    </Link>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary"
                    onClick={handleProcessPayment}
                    disabled={isProcessing || !currentEnrollment}
                    style={{ width: "100%", padding: "0.95rem", fontSize: "1rem", justifyContent: "center" }}
                  >
                    {isProcessing ? "Authorizing Simulated Transaction..." : `Pay Tuition Fee ${formatINR(dti.total)}`}
                  </button>
                )}

                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "1rem" }}>
                  <Lock size={12} /> 256-bit Simulated SSL Encryption • AcademiaX Ledger
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card" style={{ padding: "3rem", textAlign: "center" }}>
            <p style={{ color: "var(--color-text-secondary)", marginBottom: "1rem" }}>
              No active enrollment records available for tuition settlement.
            </p>
            <Link to="/courses" className="btn btn-primary">
              Enroll in a Course First
            </Link>
          </div>
        )
      ) : (
        /* Payment Ledger Tab */
        <div className="card" style={{ padding: "1.75rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Student Payment Ledger</h3>
              <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
                Verified transactions and receipts recorded on this device
              </p>
            </div>
            <button className="btn btn-outline" onClick={handleExportCSV}>
              <FileSpreadsheet size={16} /> Export CSV
            </button>
          </div>

          {myPayments.length > 0 ? (
            <div className="table-responsive">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Payment ID</th>
                    <th>Transaction Ref</th>
                    <th>Course Title</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th>Date & Time</th>
                    <th>Status</th>
                    <th>Receipt</th>
                  </tr>
                </thead>
                <tbody>
                  {myPayments.map((p) => (
                    <tr key={p.paymentId}>
                      <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{p.paymentId}</td>
                      <td style={{ fontFamily: "var(--font-mono)", fontSize: "0.8rem" }}>{p.transactionReference}</td>
                      <td style={{ fontWeight: 600 }}>{p.courseTitle}</td>
                      <td style={{ fontWeight: 700 }}>{formatINR(p.amount)}</td>
                      <td>{p.paymentMethod}</td>
                      <td style={{ fontSize: "0.8rem" }}>{formatDateTime(p.paymentDate)}</td>
                      <td><StatusBadge status={p.paymentStatus} /></td>
                      <td>
                        {p.paymentStatus === "Successful" && (
                          <Link
                            to={`/student/receipt/${p.paymentId}`}
                            className="btn btn-outline"
                            style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
                          >
                            <FileText size={12} /> Receipt
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-text-muted)" }}>
              No payments recorded yet.
            </div>
          )}
        </div>
      )}

      {/* DTI Modal */}
      <DTIBreakdownModal
        isOpen={showDTIModal}
        onClose={() => setShowDTIModal(false)}
        course={currentCourse}
      />
    </div>
  );
};

export default PaymentPage;
