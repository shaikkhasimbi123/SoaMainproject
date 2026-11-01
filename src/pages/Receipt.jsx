import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  GraduationCap,
  Printer,
  ArrowLeft,
  CheckCircle2,
  FileText,
  ShieldCheck,
  Calendar,
  CreditCard,
  Hash
} from "lucide-react";
import { usePayment } from "../context/PaymentContext";
import { useAuth } from "../context/AuthContext";
import { formatINR, formatDateTime, calculateDTI } from "../utils/formatters";
import StatusBadge from "../components/StatusBadge";

const Receipt = () => {
  const { paymentId } = useParams();
  const { getPaymentById } = usePayment();
  const { currentUser } = useAuth();

  const payment = getPaymentById(paymentId);

  if (!payment) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginBottom: "0.5rem" }}>Receipt Not Found</h2>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
          We could not locate transaction reference or receipt ID '{paymentId}'.
        </p>
        <Link to="/student/payments" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Payments Ledger
        </Link>
      </div>
    );
  }

  const dti = calculateDTI(payment.amount, payment.dtiBreakdown);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ padding: "2rem 0 4rem" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        {/* Navigation & Print Actions */}
        <div className="no-print" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <Link
            to="/student/payments"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.35rem", fontSize: "0.875rem", fontWeight: 600 }}
          >
            <ArrowLeft size={16} /> Back to Payments
          </Link>
          <button className="btn btn-primary" onClick={handlePrint} style={{ padding: "0.55rem 1.1rem" }}>
            <Printer size={16} /> Print Official Receipt
          </button>
        </div>

        {/* Official Receipt Card */}
        <div
          className="receipt-container card"
          style={{
            padding: "3rem 2.5rem",
            boxShadow: "var(--shadow-xl)",
            backgroundColor: "var(--color-card)",
            border: "1px solid var(--color-card-border)"
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "2px solid var(--color-card-border)",
              paddingBottom: "1.5rem",
              marginBottom: "1.75rem"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <div
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#FFFFFF"
                }}
              >
                <GraduationCap size={26} />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-heading)", fontSize: "1.4rem", fontWeight: 800, color: "var(--color-primary-navy)" }}>
                  Academia<span style={{ color: "var(--color-primary-blue)" }}>X</span>
                </div>
                <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)", letterSpacing: "0.04em", fontWeight: 700 }}>
                  HIGHER EDUCATION TUITION RECEIPT
                </div>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span className="badge badge-success" style={{ fontSize: "0.85rem", padding: "0.35rem 0.75rem" }}>
                <CheckCircle2 size={13} /> {payment.paymentStatus}
              </span>
              <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.35rem" }}>
                RECEIPT #{payment.paymentId}
              </div>
            </div>
          </div>

          {/* Transaction Metadata Grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              backgroundColor: "var(--color-bg)",
              padding: "1.25rem 1.5rem",
              borderRadius: "var(--radius-md)",
              marginBottom: "2rem",
              fontSize: "0.875rem"
            }}
          >
            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                STUDENT DETAILS
              </div>
              <div style={{ fontWeight: 700, fontSize: "1rem", color: "var(--color-text-primary)", marginTop: "2px" }}>
                {payment.studentName}
              </div>
              <div style={{ color: "var(--color-text-secondary)" }}>Student ID: {payment.studentId}</div>
              <div style={{ color: "var(--color-text-secondary)" }}>Enrollment Ref: {payment.enrollmentId}</div>
            </div>

            <div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                PAYMENT AUDIT
              </div>
              <div style={{ fontWeight: 700, fontFamily: "var(--font-mono)", fontSize: "0.9rem", color: "var(--color-text-primary)", marginTop: "2px" }}>
                {payment.transactionReference}
              </div>
              <div style={{ color: "var(--color-text-secondary)" }}>Method: {payment.paymentMethod}</div>
              <div style={{ color: "var(--color-text-secondary)" }}>Date: {formatDateTime(payment.paymentDate)}</div>
            </div>
          </div>

          {/* Program Enrolled */}
          <div style={{ marginBottom: "1.75rem" }}>
            <div style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>
              ACADEMIC PROGRAM
            </div>
            <div style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--color-primary-navy)" }}>
              {payment.courseTitle}
            </div>
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              Course Code: <code>{payment.courseId}</code> • AcademiaX Curriculum
            </div>
          </div>

          {/* Breakdown Table */}
          <div style={{ border: "1px solid var(--color-card-border)", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "2rem" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "rgba(37, 99, 235, 0.05)", borderBottom: "1px solid var(--color-card-border)" }}>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                    Tuition Fee Description
                  </th>
                  <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                    Amount (INR)
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>Base Academic Instruction Fee</td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>{formatINR(dti.baseTuition)}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>Advanced Computing & Lab Surcharge</td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>{formatINR(dti.techLabSurcharge)}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>Digital Library & Research Database Access</td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>{formatINR(dti.digitalLibraryFee)}</td>
                </tr>
                <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                  <td style={{ padding: "0.75rem 1rem" }}>Institutional Proctored Assessment Levy</td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right" }}>{formatINR(dti.examLevy)}</td>
                </tr>
                <tr style={{ background: "rgba(37, 99, 235, 0.05)", fontWeight: 800 }}>
                  <td style={{ padding: "1rem", fontSize: "1rem", color: "var(--color-primary-navy)" }}>
                    Total Settled Tuition Fee
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right", fontSize: "1.25rem", color: "var(--color-primary-blue)" }}>
                    {formatINR(dti.total)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Institutional Sign-off & Disclaimer */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              borderTop: "1px solid var(--color-card-border)",
              paddingTop: "1.5rem",
              fontSize: "0.8rem",
              color: "var(--color-text-secondary)"
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontWeight: 700, color: "var(--color-primary-navy)" }}>
                <ShieldCheck size={14} style={{ color: "var(--color-success)" }} /> AcademiaX Educational Registry
              </div>
              <div style={{ marginTop: "2px" }}>
                Origin: <code>AcademiaX Billing Gateway</code>
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", marginTop: "4px" }}>
                * This document serves as simulated institutional proof of course tuition settlement.
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <div style={{ fontWeight: 700, color: "var(--color-primary-navy)" }}>Dean Marcus Vance</div>
              <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Registrar & Bursar General</div>
            </div>
          </div>
        </div>

        {/* Post-receipt Links */}
        <div className="no-print" style={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "2rem" }}>
          <Link to="/student/courses" className="btn btn-primary">
            View My Enrolled Courses
          </Link>
          <Link to="/courses" className="btn btn-outline">
            Browse More Courses
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Receipt;
