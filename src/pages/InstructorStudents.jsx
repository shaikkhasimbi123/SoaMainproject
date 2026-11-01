import React, { useState, useMemo } from "react";
import { Users, Search, Filter, FileSpreadsheet, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import StatusBadge from "../components/StatusBadge";
import { formatDate } from "../utils/formatters";
import { exportToCSV } from "../utils/csvExport";

const InstructorStudents = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState("All");

  const myCourses = courses.filter(
    (c) =>
      c.instructorId === currentUser?.id ||
      c.instructor.toLowerCase().includes(currentUser?.name?.toLowerCase().split(" ")[0] || "") ||
      currentUser?.role === "admin"
  );

  const myCourseIds = new Set(myCourses.map((c) => c.id));

  const relevantEnrollments = useMemo(() => {
    return enrollments.filter((e) => {
      const belongsToMyCourse = myCourseIds.has(e.courseId);
      if (!belongsToMyCourse) return false;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        e.studentName.toLowerCase().includes(query) ||
        e.studentId.toLowerCase().includes(query) ||
        e.courseTitle.toLowerCase().includes(query) ||
        e.enrollmentId.toLowerCase().includes(query);

      const matchesCourse = selectedCourseId === "All" || e.courseId === selectedCourseId;

      return matchesSearch && matchesCourse;
    });
  }, [enrollments, myCourseIds, searchQuery, selectedCourseId]);

  const handleExportCSV = () => {
    const headers = [
      { key: "studentId", label: "Student ID" },
      { key: "studentName", label: "Student Name" },
      { key: "courseId", label: "Course ID" },
      { key: "courseTitle", label: "Course Title" },
      { key: "enrollmentId", label: "Enrollment ID" },
      { key: "enrollmentDate", label: "Date" },
      { key: "status", label: "Enrollment Status" },
      { key: "paymentStatus", label: "Payment Status" }
    ];
    exportToCSV(`faculty_student_roster_${currentUser?.id}`, relevantEnrollments, headers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Users size={16} /> Faculty Roster
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
            Enrolled Students Directory
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Review enrolled students, payment confirmations, and cohort attendance.
          </p>
        </div>

        <button className="btn btn-outline" onClick={handleExportCSV}>
          <FileSpreadsheet size={16} /> Export Student Roster
        </button>
      </div>

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.25rem" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search by student name, ID, or course..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} style={{ color: "var(--color-text-secondary)" }} />
            <select
              value={selectedCourseId}
              onChange={(e) => setSelectedCourseId(e.target.value)}
              style={{ padding: "0.5rem 0.85rem" }}
            >
              <option value="All">All My Courses ({myCourses.length})</option>
              {myCourses.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.id} - {c.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        {relevantEnrollments.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Student ID</th>
                  <th>Student Name</th>
                  <th>Course Code & Title</th>
                  <th>Enrollment Date</th>
                  <th>Enrollment Status</th>
                  <th>Payment Status</th>
                </tr>
              </thead>
              <tbody>
                {relevantEnrollments.map((enr) => (
                  <tr key={enr.enrollmentId}>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{enr.studentId}</td>
                    <td style={{ fontWeight: 600 }}>{enr.studentName}</td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{enr.courseTitle}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)", fontFamily: "var(--font-mono)" }}>
                        {enr.courseId} • {enr.enrollmentId}
                      </div>
                    </td>
                    <td>{formatDate(enr.enrollmentDate)}</td>
                    <td><StatusBadge status={enr.status} /></td>
                    <td><StatusBadge status={enr.paymentStatus} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "3rem 1rem", color: "var(--color-text-muted)" }}>
            No students found matching your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorStudents;
