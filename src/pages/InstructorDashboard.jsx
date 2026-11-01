import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Award,
  Layers,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { formatINR } from "../utils/formatters";

const InstructorDashboard = () => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();
  const { enrollments, getSeatsForCourse, getInstructorEnrollments } = useEnrollment();

  // Courses assigned to this instructor (or matching department for demo richness)
  const myCourses = courses.filter(
    (c) => c.instructorId === currentUser?.id || c.instructor.toLowerCase().includes(currentUser?.name?.toLowerCase().split(" ")[0] || "")
  );

  const myCourseIds = myCourses.map((c) => c.id);
  const instructorEnrollments = getInstructorEnrollments(myCourseIds);

  const totalAssignedCourses = myCourses.length;
  const totalEnrolledStudents = instructorEnrollments.filter((e) => e.status !== "Cancelled").length;
  const totalCapacity = myCourses.reduce((sum, c) => sum + Number(c.capacity || 0), 0);
  const totalAvailableSeats = Math.max(0, totalCapacity - totalEnrolledStudents);

  // Utilization chart data
  const chartData = myCourses.map((c) => {
    const seats = getSeatsForCourse(c);
    return {
      name: c.id,
      title: c.title,
      enrolled: seats.enrolledSeats,
      capacity: seats.capacity
    };
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Banner */}
      <div
        className="card"
        style={{
          padding: "2rem",
          background: "linear-gradient(135deg, var(--color-primary-navy) 0%, #1E3A8A 100%)",
          color: "#FFFFFF",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1.5rem"
        }}
      >
        <div>
          <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "#93C5FD", marginBottom: "0.25rem" }}>
            FACULTY MANAGEMENT CONSOLE
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.35rem" }}>
            Welcome, {currentUser?.name}
          </h1>
          <p style={{ color: "#CBD5E1", fontSize: "0.95rem" }}>
            Faculty ID: <strong>{currentUser?.id}</strong> • {currentUser?.department}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/instructor/courses" className="btn" style={{ backgroundColor: "#FFFFFF", color: "var(--color-primary-navy)", fontWeight: 700 }}>
            <PlusCircle size={16} /> Manage Courses
          </Link>
          <Link to="/instructor/students" className="btn btn-secondary" style={{ fontWeight: 700 }}>
            <Users size={16} /> View Roster ({totalEnrolledStudents})
          </Link>
        </div>
      </div>

      {/* Metric Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem"
        }}
      >
        <StatCard
          title="Assigned Courses"
          value={totalAssignedCourses}
          subtitle="Department curriculum"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Enrolled Students"
          value={totalEnrolledStudents}
          subtitle="Active scholars across cohorts"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Total Cohort Capacity"
          value={totalCapacity}
          subtitle="Approved maximum seats"
          icon={Layers}
          color="purple"
        />
        <StatCard
          title="Available Seats"
          value={totalAvailableSeats}
          subtitle="Open for new enrollments"
          icon={Clock}
          color="navy"
        />
      </div>

      {/* Course Utilization Chart */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.25rem" }}>
          Cohort Seat Utilization Breakdown
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
          Live active enrollments compared against approved course capacity
        </p>

        <div style={{ width: "100%", height: 280 }}>
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} />
                <YAxis stroke="var(--color-text-muted)" fontSize={12} />
                <Tooltip
                  formatter={(val, name) => [val, name === "enrolled" ? "Enrolled Seats" : "Total Capacity"]}
                  contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-card-border)", borderRadius: "8px" }}
                />
                <Bar dataKey="capacity" fill="#E2E8F0" name="Total Capacity" radius={[4, 4, 0, 0]} />
                <Bar dataKey="enrolled" fill="#2563EB" name="Active Enrollments" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
              No assigned courses to analyze
            </div>
          )}
        </div>
      </div>

      {/* Courses Overview Table */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>My Assigned Programs</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-secondary)" }}>
              Direct overview of capacities, deadlines, and tuition fees
            </p>
          </div>
          <Link to="/instructor/courses" className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
            Open Course Studio <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Tuition Fee</th>
                <th>Capacity</th>
                <th>Enrolled</th>
                <th>Available</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.map((c) => {
                const seats = getSeatsForCourse(c);
                return (
                  <tr key={c.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{c.id}</td>
                    <td style={{ fontWeight: 600 }}>{c.title}</td>
                    <td style={{ fontWeight: 700 }}>{formatINR(c.tuitionFee)}</td>
                    <td>{seats.capacity}</td>
                    <td><span className="badge badge-info">{seats.enrolledSeats}</span></td>
                    <td>
                      <span className={`badge ${seats.isFull ? "badge-error" : seats.isNearlyFull ? "badge-warning" : "badge-success"}`}>
                        {seats.availableSeats}
                      </span>
                    </td>
                    <td><StatusBadge status={c.status} /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InstructorDashboard;
