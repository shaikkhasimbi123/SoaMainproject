import React from "react";
import { Link } from "react-router-dom";
import {
  GraduationCap,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ArrowRight,
  Calendar,
  Sparkles,
  FileText
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useAuth } from "../context/AuthContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { usePayment } from "../context/PaymentContext";
import { useCourses } from "../context/CourseContext";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { formatINR, formatDate } from "../utils/formatters";

const StudentDashboard = () => {
  const { currentUser } = useAuth();
  const { getStudentEnrollments } = useEnrollment();
  const { getPaymentsForStudent } = usePayment();
  const { courses } = useCourses();

  const myEnrollments = getStudentEnrollments(currentUser?.id);
  const myPayments = getPaymentsForStudent(currentUser?.id);

  // Derived live metrics
  const totalEnrollments = myEnrollments.length;
  const activeCourses = myEnrollments.filter((e) => e.status !== "Cancelled").length;
  const pendingPayments = myEnrollments.filter((e) => e.paymentStatus === "Pending" && e.status !== "Cancelled").length;
  const successfulPayments = myPayments.filter((p) => p.paymentStatus === "Successful").length;
  const totalPaidAmount = myPayments
    .filter((p) => p.paymentStatus === "Successful")
    .reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Chart Data: Status breakdown
  const statusCounts = myEnrollments.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});

  const pieData = Object.keys(statusCounts).map((key) => ({
    name: key,
    value: statusCounts[key]
  }));

  const PIE_COLORS = ["#2563EB", "#F59E0B", "#DC2626", "#16A34A"];

  // Chart Data: Course Tuition breakdown
  const tuitionBarData = myEnrollments
    .filter((e) => e.status !== "Cancelled")
    .slice(0, 5)
    .map((e) => ({
      name: e.courseId,
      amount: e.amount,
      paid: e.paymentStatus === "Successful" ? e.amount : 0
    }));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {/* Welcome Banner */}
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
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#93C5FD", fontSize: "0.85rem", fontWeight: 700, marginBottom: "0.5rem" }}>
            <Sparkles size={16} /> STUDENT ACADEMIC WORKSPACE
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.35rem" }}>
            Welcome back, {currentUser?.name}!
          </h1>
          <p style={{ color: "#CBD5E1", fontSize: "0.95rem" }}>
            Student ID: <strong>{currentUser?.id}</strong> • {currentUser?.department}
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link
            to="/courses"
            className="btn"
            style={{ backgroundColor: "#FFFFFF", color: "var(--color-primary-navy)", fontWeight: 700 }}
          >
            <BookOpen size={16} /> Browse New Courses
          </Link>
          <Link
            to="/student/payments"
            className="btn btn-secondary"
            style={{ fontWeight: 700 }}
          >
            <CreditCard size={16} /> Tuition Ledger
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem"
        }}
      >
        <StatCard
          title="Total Enrollments"
          value={totalEnrollments}
          subtitle="All-time registered cohorts"
          icon={GraduationCap}
          color="blue"
        />
        <StatCard
          title="Active Programs"
          value={activeCourses}
          subtitle="Currently attending"
          icon={BookOpen}
          color="green"
        />
        <StatCard
          title="Pending Payments"
          value={pendingPayments}
          subtitle="Action required for seat confirmation"
          icon={Clock}
          color={pendingPayments > 0 ? "amber" : "blue"}
          badge={pendingPayments > 0 ? "Pending" : null}
        />
        <StatCard
          title="Total Settled Tuition"
          value={formatINR(totalPaidAmount)}
          subtitle={`${successfulPayments} verified payments`}
          icon={CreditCard}
          color="navy"
        />
      </div>

      {/* Charts Section */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* Bar Chart */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Tuition Fee Allocation per Program
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Comparison of total tuition vs settled amount
          </p>

          <div style={{ width: "100%", height: 260 }}>
            {tuitionBarData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tuitionBarData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={12} />
                  <YAxis stroke="var(--color-text-muted)" fontSize={12} tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(val) => [formatINR(val), "Amount"]}
                    contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-card-border)", borderRadius: "8px" }}
                  />
                  <Bar dataKey="amount" fill="#93C5FD" name="Total Tuition" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="paid" fill="#2563EB" name="Settled (Paid)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
                No active tuition data to display
              </div>
            )}
          </div>
        </div>

        {/* Pie Chart */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.1rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Enrollment Status Distribution
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Breakdown across confirmed, pending, and cancelled states
          </p>

          <div style={{ width: "100%", height: 260 }}>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-card-border)", borderRadius: "8px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
                No enrollment records available
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Enrollments Table */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Recent Enrollments</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
              Current academic registrations and payment statuses
            </p>
          </div>
          <Link to="/student/enrollments" className="btn btn-outline" style={{ fontSize: "0.85rem", padding: "0.5rem 0.85rem" }}>
            View Full History <ArrowRight size={14} />
          </Link>
        </div>

        {myEnrollments.length > 0 ? (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Enrollment ID</th>
                  <th>Course Title</th>
                  <th>Enrollment Date</th>
                  <th>Tuition Fee</th>
                  <th>Enrollment Status</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {myEnrollments.slice(0, 5).map((e) => (
                  <tr key={e.enrollmentId}>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 600 }}>{e.enrollmentId}</td>
                    <td style={{ fontWeight: 600 }}>{e.courseTitle}</td>
                    <td>{formatDate(e.enrollmentDate)}</td>
                    <td style={{ fontWeight: 700 }}>{formatINR(e.amount)}</td>
                    <td><StatusBadge status={e.status} /></td>
                    <td><StatusBadge status={e.paymentStatus} /></td>
                    <td>
                      {e.paymentStatus === "Pending" && e.status !== "Cancelled" ? (
                        <Link
                          to="/student/payments"
                          className="btn btn-primary"
                          style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
                        >
                          Pay Tuition
                        </Link>
                      ) : e.paymentStatus === "Successful" ? (
                        <Link
                          to="/student/payments"
                          className="btn btn-outline"
                          style={{ padding: "0.4rem 0.75rem", fontSize: "0.78rem" }}
                        >
                          <FileText size={12} /> View Receipt
                        </Link>
                      ) : (
                        <span style={{ fontSize: "0.8rem", color: "var(--color-text-muted)" }}>N/A</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2.5rem 1rem", color: "var(--color-text-muted)" }}>
            <p>You have not enrolled in any courses yet.</p>
            <Link to="/courses" className="btn btn-primary" style={{ marginTop: "1rem" }}>
              Explore Courses
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
