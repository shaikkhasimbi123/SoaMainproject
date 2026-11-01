import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Clock, User, Calendar, BookOpen, CreditCard, ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useCourses } from "../context/CourseContext";
import StatusBadge from "../components/StatusBadge";
import { formatINR, formatDate } from "../utils/formatters";

const MyCourses = () => {
  const { currentUser } = useAuth();
  const { getStudentEnrollments } = useEnrollment();
  const { getCourseById } = useCourses();

  const myEnrollments = getStudentEnrollments(currentUser?.id).filter(
    (e) => e.status !== "Cancelled"
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
          <GraduationCap size={16} /> My Active Programs
        </div>
        <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
          Enrolled Academic Courses
        </h1>
        <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
          Your current course registrations, lecture schedules, and tuition confirmation status.
        </p>
      </div>

      {myEnrollments.length > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2rem"
          }}
        >
          {myEnrollments.map((enr) => {
            const course = getCourseById(enr.courseId);

            return (
              <div key={enr.enrollmentId} className="card card-interactive" style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ height: "160px", overflow: "hidden", position: "relative" }}>
                  <img
                    src={course?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"}
                    alt={enr.courseTitle}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
                    <StatusBadge status={enr.paymentStatus === "Successful" ? "Confirmed" : "Pending Payment"} />
                  </div>
                </div>

                <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.35rem" }}>
                      <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
                        {enr.courseId} • {enr.enrollmentId}
                      </span>
                      <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "var(--color-primary-navy)" }}>
                        {formatINR(enr.amount)}
                      </span>
                    </div>

                    <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.5rem" }}>
                      {enr.courseTitle}
                    </h3>

                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "0.5rem" }}>
                      <User size={14} style={{ color: "var(--color-primary-blue)" }} />
                      <span>{course?.instructor || "Department Faculty"}</span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "var(--color-text-muted)", marginBottom: "1rem" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Clock size={13} /> {course?.duration || "12 Weeks"}
                      </span>
                      <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                        <Calendar size={13} /> Enrolled: {formatDate(enr.enrollmentDate)}
                      </span>
                    </div>
                  </div>

                  <div style={{ borderTop: "1px solid var(--color-card-border)", paddingTop: "1rem", display: "flex", gap: "0.5rem" }}>
                    <Link
                      to={`/courses/${enr.courseId}`}
                      className="btn btn-outline"
                      style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}
                    >
                      <BookOpen size={14} /> Course Page
                    </Link>

                    {enr.paymentStatus === "Pending" ? (
                      <Link
                        to="/student/payments"
                        className="btn btn-primary"
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}
                      >
                        <CreditCard size={14} /> Settle Fee
                      </Link>
                    ) : (
                      <Link
                        to="/student/payments"
                        className="btn btn-secondary"
                        style={{ flex: 1, padding: "0.5rem", fontSize: "0.85rem" }}
                      >
                        Receipt
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="card" style={{ padding: "4rem 2rem", textAlign: "center" }}>
          <BookOpen size={48} style={{ color: "var(--color-primary-blue)", margin: "0 auto 1rem" }} />
          <h3 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            No Active Course Enrollments
          </h3>
          <p style={{ color: "var(--color-text-secondary)", maxWidth: "420px", margin: "0 auto 1.5rem" }}>
            You haven't enrolled in any academic programs yet. Browse our verified course catalog and reserve your seat.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Explore Course Catalog
          </Link>
        </div>
      )}
    </div>
  );
};

export default MyCourses;
