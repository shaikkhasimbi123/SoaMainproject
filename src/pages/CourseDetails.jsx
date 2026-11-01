import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Calendar,
  Users,
  Award,
  CheckCircle,
  AlertTriangle,
  ArrowLeft,
  FileText,
  UserCheck,
  Shield,
  BookOpen,
  Sparkles
} from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import { formatINR, formatDate } from "../utils/formatters";
import { isEnrollmentDeadlinePassed } from "../utils/enrollmentUtils";
import StatusBadge from "../components/StatusBadge";
import Modal from "../components/Modal";
import DTIBreakdownModal from "../components/DTIBreakdownModal";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getCourseById } = useCourses();
  const { getSeatsForCourse, enrollStudent, enrollments } = useEnrollment();
  const { currentUser, isAuthenticated } = useAuth();

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDTIModal, setShowDTIModal] = useState(false);
  const [enrollmentResult, setEnrollmentResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const course = getCourseById(id);

  if (!course) {
    return (
      <div className="container" style={{ padding: "6rem 0", textAlign: "center" }}>
        <h2 style={{ fontSize: "2rem", fontWeight: 800, marginBottom: "1rem" }}>Course Not Found</h2>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: "2rem" }}>
          The requested course ID '{id}' does not exist or has been archived.
        </p>
        <Link to="/courses" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Course Catalog
        </Link>
      </div>
    );
  }

  const { capacity, availableSeats, enrolledSeats, isFull, isNearlyFull, utilizationRate } =
    getSeatsForCourse(course);

  const isDeadlinePassed = isEnrollmentDeadlinePassed(course.enrollmentDeadline);
  const isInactive = course.status !== "Active";

  const isAlreadyEnrolled =
    currentUser?.role === "student" &&
    enrollments.some(
      (e) => e.courseId === course.id && e.studentId === currentUser.id && e.status !== "Cancelled"
    );

  const canEnroll = !isFull && !isDeadlinePassed && !isInactive && !isAlreadyEnrolled;

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/courses/${course.id}`);
      return;
    }

    if (currentUser.role !== "student") {
      alert(`You are logged in as an ${currentUser.role}. Course enrollment is reserved exclusively for students.`);
      return;
    }

    setEnrollmentResult(null);
    setShowConfirmModal(true);
  };

  const handleConfirmEnrollment = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const res = enrollStudent({ course, student: currentUser });
      setEnrollmentResult(res);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div style={{ paddingBottom: "5rem" }}>
      {/* Top Breadcrumb & Hero Banner */}
      <div
        style={{
          background: "linear-gradient(135deg, var(--color-primary-navy) 0%, #1E3A8A 100%)",
          color: "#FFFFFF",
          padding: "3rem 0 3.5rem"
        }}
      >
        <div className="container">
          <Link
            to="/courses"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#93C5FD",
              fontSize: "0.85rem",
              fontWeight: 600,
              marginBottom: "1.5rem"
            }}
          >
            <ArrowLeft size={16} /> Back to Course Catalog
          </Link>

          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1rem" }}>
            <span className="badge" style={{ backgroundColor: "rgba(255, 255, 255, 0.15)", color: "#FFFFFF" }}>
              {course.department}
            </span>
            <span className="badge" style={{ backgroundColor: "rgba(59, 130, 246, 0.4)", color: "#93C5FD" }}>
              {course.level || "Intermediate"}
            </span>
            <span className="badge" style={{ backgroundColor: "rgba(16, 185, 129, 0.3)", color: "#6EE7B7" }}>
              {course.credits || 3} Credits
            </span>
            <span className="badge" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "#FFFFFF" }}>
              ID: {course.id}
            </span>
          </div>

          <h1 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, maxWidth: "840px", marginBottom: "1rem" }}>
            {course.title}
          </h1>

          <p style={{ fontSize: "1.1rem", color: "#CBD5E1", maxWidth: "800px", lineHeight: 1.6 }}>
            {course.description}
          </p>
        </div>
      </div>

      {/* Main Content & Sticky Enrollment Sidebar Grid */}
      <div className="container" style={{ marginTop: "2.5rem" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2.5rem"
          }}
          className="course-details-layout"
        >
          {/* Left Details Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem" }}>
            {/* Overview / Full Description */}
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1rem" }}>Course Overview</h2>
              <p style={{ fontSize: "0.975rem", color: "var(--color-text-secondary)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
                {course.fullDescription || course.description}
              </p>

              {/* Course Highlights */}
              {course.highlights && (
                <div>
                  <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.75rem" }}>Program Highlights</h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.75rem" }}>
                    {course.highlights.map((h, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "var(--color-text-primary)" }}>
                        <Sparkles size={16} style={{ color: "var(--color-primary-blue)", flexShrink: 0 }} />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Learning Outcomes */}
            {course.learningOutcomes && (
              <div className="card" style={{ padding: "2rem" }}>
                <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                  What You Will Learn
                </h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
                  {course.learningOutcomes.map((item, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                      <CheckCircle size={18} style={{ color: "var(--color-success)", flexShrink: 0, marginTop: "2px" }} />
                      <span style={{ fontSize: "0.925rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prerequisites & Requirements */}
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "0.75rem" }}>
                Academic Prerequisites
              </h2>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                {course.prerequisites || "No prior prerequisites specified for this fundamental program."}
              </p>
            </div>

            {/* Instructor Profile */}
            <div className="card" style={{ padding: "2rem" }}>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                Course Instructor
              </h2>
              <div style={{ display: "flex", alignItems: "center", gap: "1.25rem" }}>
                <div
                  style={{
                    width: "68px",
                    height: "68px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-light-blue)",
                    color: "var(--color-primary-blue)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.5rem",
                    fontWeight: 800
                  }}
                >
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
                    {course.instructor}
                  </h3>
                  <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                    Senior Faculty Member • {course.department}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                    Faculty ID: {course.instructorId || "INS-VERIFIED"}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sticky Enrollment Card Column */}
          <div>
            <div
              className="card"
              style={{
                position: "sticky",
                top: "calc(var(--navbar-height) + 1.5rem)",
                padding: "1.75rem",
                boxShadow: "var(--shadow-xl)"
              }}
            >
              {/* Image Preview */}
              <div style={{ width: "100%", height: "180px", borderRadius: "var(--radius-md)", overflow: "hidden", marginBottom: "1.25rem" }}>
                <img
                  src={course.image}
                  alt={course.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>

              {/* Price */}
              <div style={{ marginBottom: "1.25rem" }}>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", textTransform: "uppercase", fontWeight: 700 }}>
                  Institutional Tuition Fee
                </div>
                <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                  <span
                    style={{
                      fontSize: "2rem",
                      fontWeight: 800,
                      color: "var(--color-primary-navy)",
                      fontFamily: "var(--font-heading)"
                    }}
                  >
                    {formatINR(course.tuitionFee)}
                  </span>
                  <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>per semester</span>
                </div>

                {/* Inspect DTI Button */}
                <button
                  onClick={() => setShowDTIModal(true)}
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "0.8rem",
                    color: "var(--color-primary-blue)",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.35rem",
                    padding: "0.25rem 0"
                  }}
                >
                  <FileText size={14} /> Inspect Course Fee Breakdown →
                </button>
              </div>

              {/* Cohort Seat Progress */}
              <div style={{ backgroundColor: "var(--color-bg)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", fontWeight: 600, marginBottom: "0.4rem" }}>
                  <span>Cohort Capacity</span>
                  <span>{availableSeats} seats left of {capacity}</span>
                </div>
                <div style={{ width: "100%", height: "8px", backgroundColor: "var(--color-card-border)", borderRadius: "var(--radius-full)", overflow: "hidden" }}>
                  <div
                    style={{
                      width: `${utilizationRate}%`,
                      height: "100%",
                      backgroundColor: isFull ? "var(--color-error)" : isNearlyFull ? "var(--color-warning)" : "var(--color-primary-blue)"
                    }}
                  />
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", marginTop: "0.35rem" }}>
                  {utilizationRate}% capacity reserved ({enrolledSeats} active students)
                </div>
              </div>

              {/* Course Meta Info */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-card-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Clock size={15} /> Duration:
                  </span>
                  <span style={{ fontWeight: 600 }}>{course.duration}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-card-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-text-secondary)", display: "flex", alignItems: "center", gap: "0.35rem" }}>
                    <Calendar size={15} /> Enrollment Deadline:
                  </span>
                  <span style={{ fontWeight: 600, color: isDeadlinePassed ? "var(--color-error)" : "inherit" }}>
                    {formatDate(course.enrollmentDeadline)}
                  </span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-card-border)", paddingBottom: "0.5rem" }}>
                  <span style={{ color: "var(--color-text-secondary)" }}>Status:</span>
                  <StatusBadge status={course.status} />
                </div>
              </div>

              {/* Action Button */}
              {isAlreadyEnrolled ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <div className="badge badge-success" style={{ padding: "0.65rem", justifyContent: "center", width: "100%" }}>
                    <CheckCircle size={15} /> You are enrolled in this course
                  </div>
                  <Link to="/student/payments" className="btn btn-outline" style={{ width: "100%", justifyContent: "center" }}>
                    View Tuition & Payment Status
                  </Link>
                </div>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleEnrollClick}
                  disabled={!canEnroll}
                  style={{ width: "100%", padding: "0.85rem", fontSize: "1rem", justifyContent: "center" }}
                >
                  {isFull
                    ? "Cohort Full (0 Seats)"
                    : isDeadlinePassed
                    ? "Enrollment Deadline Expired"
                    : isInactive
                    ? "Course Inactive"
                    : "Enroll in Course"}
                </button>
              )}

              {/* Warning explanations */}
              {isFull && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-error)", textAlign: "center", marginTop: "0.75rem" }}>
                  This course has reached its maximum quota of {capacity} scholars.
                </p>
              )}
              {isDeadlinePassed && (
                <p style={{ fontSize: "0.75rem", color: "var(--color-error)", textAlign: "center", marginTop: "0.75rem" }}>
                  The administrative enrollment period closed on {formatDate(course.enrollmentDeadline)}.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Enrollment Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="Confirm Course Enrollment"
        subtitle={`AcademiaX Academic Portal • ${course.id}`}
        maxWidth="520px"
      >
        {enrollmentResult ? (
          /* Enrollment Result View */
          <div style={{ textAlign: "center", padding: "1rem 0" }}>
            {enrollmentResult.success ? (
              <div>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-success-bg)",
                    color: "var(--color-success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem"
                  }}
                >
                  <CheckCircle size={32} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                  Enrollment Reserved!
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
                  Your enrollment record <strong>{enrollmentResult.enrollment.enrollmentId}</strong> has been created.
                  Seat capacity has been updated in the shared registry. Complete your tuition settlement to confirm your seat.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "1.5rem" }}>
                  <Link
                    to="/student/payments"
                    className="btn btn-primary"
                    style={{ justifyContent: "center", padding: "0.75rem" }}
                  >
                    Proceed to Tuition Settlement ({formatINR(course.tuitionFee)})
                  </Link>
                  <Link
                    to="/student/courses"
                    className="btn btn-outline"
                    style={{ justifyContent: "center", padding: "0.75rem" }}
                  >
                    View My Courses
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                <div
                  style={{
                    width: "56px",
                    height: "56px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-error-bg)",
                    color: "var(--color-error)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 1rem"
                  }}
                >
                  <AlertTriangle size={32} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>
                  Enrollment Unsuccessful
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", marginBottom: "1.25rem" }}>
                  {enrollmentResult.message}
                </p>
                <button className="btn btn-outline" onClick={() => setShowConfirmModal(false)}>
                  Dismiss
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Confirmation Prompt */
          <div>
            <div style={{ backgroundColor: "var(--color-bg)", padding: "1rem", borderRadius: "var(--radius-md)", marginBottom: "1.25rem" }}>
              <div style={{ fontWeight: 700, fontSize: "1rem", marginBottom: "0.25rem" }}>{course.title}</div>
              <div style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
                Department: {course.department} • Instructor: {course.instructor}
              </div>
              <div style={{ marginTop: "0.5rem", fontSize: "0.95rem", fontWeight: 800, color: "var(--color-primary-navy)" }}>
                Tuition Fee: {formatINR(course.tuitionFee)}
              </div>
            </div>

            <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.5, marginBottom: "1.5rem" }}>
              By confirming, you will register for this cohort. A provisional enrollment record will be created and one seat will be deducted from the cohort capacity. You will then be prompted to settle your tuition fee.
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
              <button className="btn btn-outline" onClick={() => setShowConfirmModal(false)} disabled={isSubmitting}>
                Cancel
              </button>
              <button className="btn btn-primary" onClick={handleConfirmEnrollment} disabled={isSubmitting}>
                {isSubmitting ? "Reserving Seat..." : "Confirm & Reserve Seat"}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* DTI Modal */}
      <DTIBreakdownModal
        isOpen={showDTIModal}
        onClose={() => setShowDTIModal(false)}
        course={course}
        onProceedToEnroll={() => {
          if (canEnroll) handleEnrollClick();
        }}
      />

      <style>{`
        @media (min-width: 960px) {
          .course-details-layout {
            grid-template-columns: 2fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetails;
