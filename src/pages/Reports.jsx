import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  BookOpen,
  Users,
  CreditCard,
  Layers,
  BarChart3,
  Calendar,
  CheckCircle2
} from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { usePayment } from "../context/PaymentContext";
import { formatINR } from "../utils/formatters";
import { exportToCSV } from "../utils/csvExport";

const Reports = () => {
  const { courses } = useCourses();
  const { enrollments, getSeatsForCourse } = useEnrollment();
  const { payments } = usePayment();

  const [downloadMsg, setDownloadMsg] = useState("");

  const notifyDownload = (name) => {
    setDownloadMsg(`CSV report "${name}" generated and downloaded successfully.`);
    setTimeout(() => setDownloadMsg(""), 4000);
  };

  // 1. Capacity Report Data
  const capacityReportData = courses.map((c) => {
    const s = getSeatsForCourse(c);
    return {
      courseId: c.id,
      title: c.title,
      department: c.department,
      capacity: s.capacity,
      enrolled: s.enrolledSeats,
      available: s.availableSeats,
      utilization: `${s.utilizationRate}%`,
      status: c.status
    };
  });

  const exportCapacityCSV = () => {
    const headers = [
      { key: "courseId", label: "Course ID" },
      { key: "title", label: "Course Title" },
      { key: "department", label: "Department" },
      { key: "capacity", label: "Cohort Capacity" },
      { key: "enrolled", label: "Enrolled Seats" },
      { key: "available", label: "Available Seats" },
      { key: "utilization", label: "Utilization Rate" },
      { key: "status", label: "Course Status" }
    ];
    exportToCSV("academiax_course_capacity_report", capacityReportData, headers);
    notifyDownload("Course Capacity Audit");
  };

  // 2. Enrollment Summary Report Data
  const exportEnrollmentsCSV = () => {
    const headers = [
      { key: "enrollmentId", label: "Enrollment ID" },
      { key: "studentName", label: "Student Name" },
      { key: "studentId", label: "Student ID" },
      { key: "courseId", label: "Course ID" },
      { key: "courseTitle", label: "Course Title" },
      { key: "enrollmentDate", label: "Date" },
      { key: "amount", label: "Fee (INR)" },
      { key: "status", label: "Status" },
      { key: "paymentStatus", label: "Payment Status" }
    ];
    exportToCSV("academiax_enrollments_master_audit", enrollments, headers);
    notifyDownload("Master Enrollments Registry");
  };

  // 3. Tuition Payments Report Data
  const exportPaymentsCSV = () => {
    const headers = [
      { key: "paymentId", label: "Payment ID" },
      { key: "transactionReference", label: "Transaction Reference" },
      { key: "studentName", label: "Student Name" },
      { key: "courseTitle", label: "Course" },
      { key: "amount", label: "Settlement Amount (INR)" },
      { key: "paymentMethod", label: "Method" },
      { key: "paymentStatus", label: "Status" },
      { key: "paymentDate", label: "Timestamp" }
    ];
    exportToCSV("academiax_tuition_settlement_ledger", payments, headers);
    notifyDownload("Tuition Financial Ledger");
  };

  // 4. Department Summary Report Data
  const deptSummary = courses.reduce((acc, c) => {
    if (!acc[c.department]) {
      acc[c.department] = { dept: c.department, courses: 0, totalCapacity: 0, totalEnrolled: 0 };
    }
    const s = getSeatsForCourse(c);
    acc[c.department].courses += 1;
    acc[c.department].totalCapacity += s.capacity;
    acc[c.department].totalEnrolled += s.enrolledSeats;
    return acc;
  }, {});

  const deptData = Object.values(deptSummary);

  const exportDepartmentCSV = () => {
    const headers = [
      { key: "dept", label: "Department / Category" },
      { key: "courses", label: "Total Courses" },
      { key: "totalCapacity", label: "Total Capacity" },
      { key: "totalEnrolled", label: "Total Enrolled Scholars" }
    ];
    exportToCSV("academiax_department_distribution_report", deptData, headers);
    notifyDownload("Department Analytics");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <FileSpreadsheet size={16} /> Institutional Intelligence
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          Administrative Reports & CSV Exporter
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Generate verifiable institutional audit files directly in the browser across courses, capacity, enrollments, and tuition payments.
        </p>
      </div>

      {downloadMsg && (
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{downloadMsg}</span>
        </div>
      )}

      {/* Report Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* Card 1 */}
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-light-blue)", color: "var(--color-primary-blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <BookOpen size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem" }}>Course Capacity Utilization</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              Detailed breakdown of cohort quotas, active enrolled students, remaining seats, and capacity utilization percentages.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportCapacityCSV} style={{ width: "100%" }}>
            <Download size={15} /> Download Capacity CSV
          </button>
        </div>

        {/* Card 2 */}
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Users size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem" }}>Master Enrollment Registry</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              Comprehensive log of all student registrations, dates, payment statuses, and historical cancellations.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportEnrollmentsCSV} style={{ width: "100%" }}>
            <Download size={15} /> Download Enrollments CSV
          </button>
        </div>

        {/* Card 3 */}
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-warning-bg)", color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <CreditCard size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem" }}>Tuition Financial Audit</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              Ledger of all successful and declined tuition transactions, unique TXN references, and settled sums.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportPaymentsCSV} style={{ width: "100%" }}>
            <Download size={15} /> Download Financial CSV
          </button>
        </div>

        {/* Card 4 */}
        <div className="card" style={{ padding: "1.75rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <div style={{ width: "42px", height: "42px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-accent-purple-bg)", color: "var(--color-accent-purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1rem" }}>
              <Layers size={20} />
            </div>
            <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.35rem" }}>Department Analytics</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1.25rem" }}>
              Aggregated metrics for engineering, artificial intelligence, cloud computing, and business domains.
            </p>
          </div>
          <button className="btn btn-primary" onClick={exportDepartmentCSV} style={{ width: "100%" }}>
            <Download size={15} /> Download Department CSV
          </button>
        </div>
      </div>

      {/* Preview Table of Capacity */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.35rem" }}>
          Live Capacity Utilization Preview
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
          Live snapshot of cohort quotas derived from real application records
        </p>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Title</th>
                <th>Department</th>
                <th>Capacity</th>
                <th>Enrolled</th>
                <th>Available</th>
                <th>Utilization</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {capacityReportData.slice(0, 8).map((row) => (
                <tr key={row.courseId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{row.courseId}</td>
                  <td style={{ fontWeight: 600 }}>{row.title}</td>
                  <td>{row.department}</td>
                  <td>{row.capacity}</td>
                  <td><span className="badge badge-info">{row.enrolled}</span></td>
                  <td>
                    <span className={`badge ${row.available === 0 ? "badge-error" : "badge-success"}`}>
                      {row.available}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700 }}>{row.utilization}</td>
                  <td><StatusBadge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
