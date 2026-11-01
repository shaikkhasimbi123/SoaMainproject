import React from "react";
import Modal from "./Modal";
import { formatINR, calculateDTI } from "../utils/formatters";
import { Receipt, FileText, CheckCircle2, ShieldCheck, Printer } from "lucide-react";

const DTIBreakdownModal = ({ isOpen, onClose, course, onProceedToEnroll = null }) => {
  if (!course) return null;

  const dti = calculateDTI(course.tuitionFee, course.dti);

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Course Tuition & Fee Breakdown"
      subtitle={`Academic Fee Itemization & Surcharge Breakdown • ${course.id}`}
      maxWidth="640px"
    >
      <div className="dti-invoice-card" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
        {/* Header Banner */}
        <div
          style={{
            padding: "0.875rem 1rem",
            backgroundColor: "var(--color-light-blue)",
            borderRadius: "var(--radius-md)",
            border: "1px solid rgba(37, 99, 235, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <FileText size={18} style={{ color: "var(--color-primary-blue)" }} />
            <div>
              <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--color-primary-navy)" }}>
                AcademiaX Institutional Fee Schedule
              </div>
              <div style={{ fontSize: "0.72rem", color: "var(--color-text-secondary)" }}>
                Origin: <code>Payment & Billing System</code>
              </div>
            </div>
          </div>
          <span className="badge badge-success">
            <ShieldCheck size={11} /> Verified Standard
          </span>
        </div>

        {/* Course Core Header */}
        <div>
          <h4 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>{course.title}</h4>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
            Department: <strong>{course.department}</strong> • Duration: <strong>{course.duration}</strong> • Credits: <strong>{course.credits || 3} Credits</strong>
          </p>
        </div>

        {/* Itemized Table */}
        <div style={{ border: "1px solid var(--color-card-border)", borderRadius: "var(--radius-md)", overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.875rem" }}>
            <thead>
              <tr style={{ background: "rgba(37, 99, 235, 0.04)", borderBottom: "1px solid var(--color-card-border)" }}>
                <th style={{ padding: "0.75rem 1rem", textAlign: "left", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                  Fee Component
                </th>
                <th style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                  Amount (INR)
                </th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ fontWeight: 600 }}>Base Academic Instruction Fee</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Faculty mentorship, live lectures & grading</div>
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 600 }}>
                  {formatINR(dti.baseTuition)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ fontWeight: 600 }}>Advanced Computing & Lab Surcharge</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Cloud sandboxes, GPU clusters & virtual environments</div>
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 600 }}>
                  {formatINR(dti.techLabSurcharge)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ fontWeight: 600 }}>Digital Library & Research Resources</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>IEEE / ACM digital repositories & curated books</div>
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 600 }}>
                  {formatINR(dti.digitalLibraryFee)}
                </td>
              </tr>
              <tr style={{ borderBottom: "1px solid var(--color-card-border)" }}>
                <td style={{ padding: "0.75rem 1rem" }}>
                  <div style={{ fontWeight: 600 }}>Institutional Exam & Credentialing Levy</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Proctored assessments and verifiable credential issuance</div>
                </td>
                <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontWeight: 600 }}>
                  {formatINR(dti.examLevy)}
                </td>
              </tr>
              <tr style={{ background: "rgba(37, 99, 235, 0.05)", fontWeight: 800 }}>
                <td style={{ padding: "0.875rem 1rem", fontSize: "0.95rem" }}>
                  Total Tuition Fee Amount
                </td>
                <td style={{ padding: "0.875rem 1rem", textAlign: "right", fontSize: "1.1rem", color: "var(--color-primary-blue)" }}>
                  {formatINR(dti.total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Installment Schedule */}
        <div style={{ backgroundColor: "var(--color-bg)", padding: "1rem", borderRadius: "var(--radius-md)", border: "1px solid var(--color-card-border)" }}>
          <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
            FLEXIBLE INSTALLMENT SCHEDULE (2-TRANCHE OPTION)
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.85rem" }}>
            <div style={{ background: "var(--color-card)", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-card-border)" }}>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.72rem" }}>Tranche 1 (Upon Enrollment)</div>
              <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>{formatINR(Math.round(dti.total * 0.5))}</div>
            </div>
            <div style={{ background: "var(--color-card)", padding: "0.65rem 0.85rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--color-card-border)" }}>
              <div style={{ color: "var(--color-text-muted)", fontSize: "0.72rem" }}>Tranche 2 (Mid-Term Audit)</div>
              <div style={{ fontWeight: 700, color: "var(--color-text-primary)" }}>{formatINR(dti.total - Math.round(dti.total * 0.5))}</div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" }}>
          <button className="btn btn-outline" onClick={handlePrint} title="Print Official Voucher">
            <Printer size={16} /> Print Voucher
          </button>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button className="btn btn-outline" onClick={onClose}>
              Close
            </button>
            {onProceedToEnroll && (
              <button
                className="btn btn-primary"
                onClick={() => {
                  onClose();
                  onProceedToEnroll(course);
                }}
              >
                Proceed to Enroll
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default DTIBreakdownModal;
