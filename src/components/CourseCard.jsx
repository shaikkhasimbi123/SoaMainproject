import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Clock, Users, User, ArrowRight, Calendar, AlertCircle, FileText } from "lucide-react";
import { formatINR, formatDate } from "../utils/formatters";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import { isEnrollmentDeadlinePassed } from "../utils/enrollmentUtils";
import StatusBadge from "./StatusBadge";
import DTIBreakdownModal from "./DTIBreakdownModal";

const CourseCard = ({ course, onEnrollClick = null }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { getSeatsForCourse, enrollments } = useEnrollment();
  const [imgSrc, setImgSrc] = useState(course.image);
  const [showDTI, setShowDTI] = useState(false);

  const { capacity, availableSeats, enrolledSeats, isFull, isNearlyFull, utilizationRate } =
    getSeatsForCourse(course);

  const isDeadlinePassed = isEnrollmentDeadlinePassed(course.enrollmentDeadline);
  const isInactive = course.status !== "Active";
  const isStudentEnrolled = currentUser?.role === "student" && enrollments.some(
    (e) => e.courseId === course.id && e.studentId === currentUser.id && e.status !== "Cancelled"
  );

  const canEnroll = !isFull && !isDeadlinePassed && !isInactive && !isStudentEnrolled;

  const handleEnrollButton = () => {
    if (!currentUser) {
      navigate(`/login?redirect=/courses/${course.id}`);
      return;
    }
    if (onEnrollClick) {
      onEnrollClick(course);
    } else {
      navigate(`/courses/${course.id}`);
    }
  };

  return (
    <div
      className="card card-interactive"
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        position: "relative"
      }}
    >
      {/* Thumbnail */}
      <div style={{ position: "relative", width: "100%", height: "190px", overflow: "hidden" }}>
        <img
          src={imgSrc}
          alt={course.title}
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
            )
          }
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.4s ease"
          }}
          loading="lazy"
        />

        {/* Category & Status Overlay Badges */}
        <div
          style={{
            position: "absolute",
            top: "0.75rem",
            left: "0.75rem",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.35rem"
          }}
        >
          <span
            className="badge"
            style={{
              backgroundColor: "rgba(16, 42, 67, 0.85)",
              color: "#FFFFFF",
              backdropFilter: "blur(4px)"
            }}
          >
            {course.department}
          </span>
          {course.level && (
            <span
              className="badge"
              style={{
                backgroundColor: "rgba(37, 99, 235, 0.85)",
                color: "#FFFFFF",
                backdropFilter: "blur(4px)"
              }}
            >
              {course.level}
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div style={{ position: "absolute", top: "0.75rem", right: "0.75rem" }}>
          {isInactive ? (
            <StatusBadge status="Inactive" />
          ) : isDeadlinePassed ? (
            <StatusBadge status="Expired" />
          ) : isFull ? (
            <StatusBadge status="Full" />
          ) : isNearlyFull ? (
            <span className="badge badge-warning">Only {availableSeats} Left</span>
          ) : (
            <span className="badge badge-success">{availableSeats} Seats</span>
          )}
        </div>
      </div>

      {/* Content */}
      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-between"
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.5rem"
            }}
          >
            <span style={{ fontSize: "0.75rem", fontFamily: "var(--font-mono)", color: "var(--color-text-muted)" }}>
              {course.id}
            </span>
            <button
              onClick={() => setShowDTI(true)}
              style={{
                fontSize: "0.75rem",
                color: "var(--color-primary-blue)",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.2rem"
              }}
              title="Inspect Course Fee Breakdown"
            >
              <FileText size={12} /> Fee Details
            </button>
          </div>

          <h3
            style={{
              fontSize: "1.1rem",
              fontWeight: 700,
              lineHeight: 1.35,
              marginBottom: "0.5rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden"
            }}
          >
            <Link to={`/courses/${course.id}`} style={{ color: "var(--color-text-primary)" }}>
              {course.title}
            </Link>
          </h3>

          <p
            style={{
              fontSize: "0.85rem",
              color: "var(--color-text-secondary)",
              marginBottom: "1rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              lineHeight: 1.45
            }}
          >
            {course.description}
          </p>

          {/* Instructor & Meta */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.825rem",
              color: "var(--color-text-secondary)",
              marginBottom: "0.75rem"
            }}
          >
            <User size={14} style={{ color: "var(--color-primary-blue)" }} />
            <span style={{ fontWeight: 500 }}>{course.instructor}</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              fontSize: "0.8rem",
              color: "var(--color-text-muted)",
              marginBottom: "1rem"
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Clock size={13} /> {course.duration}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
              <Calendar size={13} /> Closes: {formatDate(course.enrollmentDeadline)}
            </span>
          </div>

          {/* Seat Capacity Progress */}
          <div style={{ marginBottom: "1.25rem" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "0.75rem",
                marginBottom: "0.35rem",
                color: "var(--color-text-secondary)"
              }}
            >
              <span>Cohort Capacity</span>
              <span style={{ fontWeight: 600 }}>
                {enrolledSeats} / {capacity} Enrolled ({utilizationRate}%)
              </span>
            </div>
            <div
              style={{
                width: "100%",
                height: "6px",
                backgroundColor: "var(--color-card-border)",
                borderRadius: "var(--radius-full)",
                overflow: "hidden"
              }}
            >
              <div
                style={{
                  width: `${Math.min(100, utilizationRate)}%`,
                  height: "100%",
                  backgroundColor: isFull
                    ? "var(--color-error)"
                    : isNearlyFull
                    ? "var(--color-warning)"
                    : "var(--color-primary-blue)",
                  transition: "width 0.3s ease"
                }}
              />
            </div>
          </div>
        </div>

        {/* Price & Actions */}
        <div
          style={{
            borderTop: "1px solid var(--color-card-border)",
            paddingTop: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div>
            <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)", textTransform: "uppercase" }}>
              Tuition Fee
            </div>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--color-primary-navy)",
                fontFamily: "var(--font-heading)"
              }}
            >
              {formatINR(course.tuitionFee)}
            </div>
          </div>

          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Link to={`/courses/${course.id}`} className="btn btn-outline" style={{ padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}>
              Details
            </Link>

            {isStudentEnrolled ? (
              <span className="badge badge-success" style={{ alignSelf: "center", padding: "0.45rem 0.65rem" }}>
                Enrolled
              </span>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleEnrollButton}
                disabled={!canEnroll}
                style={{ padding: "0.5rem 0.85rem", fontSize: "0.85rem" }}
              >
                {isFull
                  ? "Full"
                  : isDeadlinePassed
                  ? "Closed"
                  : isInactive
                  ? "Inactive"
                  : "Enroll"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DTI Modal */}
      <DTIBreakdownModal
        isOpen={showDTI}
        onClose={() => setShowDTI(false)}
        course={course}
        onProceedToEnroll={(c) => {
          if (canEnroll) handleEnrollButton();
        }}
      />
    </div>
  );
};

export default CourseCard;
