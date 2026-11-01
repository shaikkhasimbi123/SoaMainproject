import React from "react";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  BookOpen,
  Users,
  CreditCard,
  Layers,
  FileSpreadsheet,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ArrowRight
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
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { usePayment } from "../context/PaymentContext";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import { formatINR, formatDate } from "../utils/formatters";

const AdminDashboard = () => {
  const { users, currentUser } = useAuth();
  const { courses } = useCourses();
  const { enrollments, getSeatsForCourse } = useEnrollment();
  const { payments } = usePayment();

  // Statistical calculations
  const totalCourses = courses.length;
  const totalStudents = users.filter((u) => u.role === "student").length;
  const totalInstructors = users.filter((u) => u.role === "instructor").length;
  const totalActiveEnrollments = enrollments.filter((e) => e.status !== "Cancelled").length;

  const successfulPayments = payments.filter((p) => p.paymentStatus === "Successful");
  const totalCollectedRevenue = successfulPayments.reduce((sum, p) => sum + Number(p.amount || 0), 0);
  const pendingEnrollments = enrollments.filter((e) => e.paymentStatus === "Pending" && e.status !== "Cancelled");
  const pendingRevenue = pendingEnrollments.reduce((sum, e) => sum + Number(e.amount || 0), 0);

  // Department distribution
  const deptCounts = courses.reduce((acc, c) => {
    acc[c.department] = (acc[c.department] || 0) + 1;
    return acc;
  }, {});

  const deptData = Object.keys(deptCounts).map((key) => ({
    name: key.length > 15 ? key.substring(0, 15) + "..." : key,
    fullName: key,
    courses: deptCounts[key]
  }));

  // Payment status distribution
  const paymentCounts = payments.reduce((acc, p) => {
    acc[p.paymentStatus] = (acc[p.paymentStatus] || 0) + 1;
    return acc;
  }, {});

  const paymentPieData = Object.keys(paymentCounts).map((key) => ({
    name: key,
    value: paymentCounts[key]
  }));

  const PIE_COLORS = ["#16A34A", "#DC2626", "#F59E0B"];

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
            EXECUTIVE ADMINISTRATION CONSOLE
          </div>
          <h1 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#FFFFFF", marginBottom: "0.35rem" }}>
            Academic Senate & Registrar Dashboard
          </h1>
          <p style={{ color: "#CBD5E1", fontSize: "0.95rem" }}>
            Dean Marcus Vance • Institutional Governance & Microservices Ledger
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
          <Link to="/admin/courses" className="btn" style={{ backgroundColor: "#FFFFFF", color: "var(--color-primary-navy)", fontWeight: 700 }}>
            <BookOpen size={16} /> Manage Courses
          </Link>
          <Link to="/admin/reports" className="btn btn-secondary" style={{ fontWeight: 700 }}>
            <FileSpreadsheet size={16} /> Audits & Reports
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1.25rem"
        }}
      >
        <StatCard
          title="Total Courses"
          value={totalCourses}
          subtitle="Catalog offerings"
          icon={BookOpen}
          color="blue"
        />
        <StatCard
          title="Enrolled Students"
          value={totalStudents}
          subtitle="Registered accounts"
          icon={Users}
          color="green"
        />
        <StatCard
          title="Faculty Instructors"
          value={totalInstructors}
          subtitle="Active department faculty"
          icon={Layers}
          color="purple"
        />
        <StatCard
          title="Cohort Reservations"
          value={totalActiveEnrollments}
          subtitle="Active student seats"
          icon={CheckCircle2}
          color="navy"
        />
        <StatCard
          title="Tuition Collected"
          value={formatINR(totalCollectedRevenue)}
          subtitle={`${successfulPayments.length} successful payments`}
          icon={CreditCard}
          color="green"
        />
        <StatCard
          title="Pending Tuition"
          value={formatINR(pendingRevenue)}
          subtitle={`${pendingEnrollments.length} pending payments`}
          icon={Clock}
          color="amber"
        />
      </div>

      {/* Charts Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
          gap: "1.5rem"
        }}
      >
        {/* Department Distribution */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Course Offerings by Department
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Academic curriculum allocation across engineering and management
          </p>

          <div style={{ width: "100%", height: 260 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" stroke="var(--color-text-muted)" fontSize={11} />
                <YAxis stroke="var(--color-text-muted)" fontSize={11} />
                <Tooltip
                  formatter={(val) => [val, "Courses"]}
                  contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-card-border)", borderRadius: "8px" }}
                />
                <Bar dataKey="courses" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Status Distribution */}
        <div className="card" style={{ padding: "1.75rem" }}>
          <h3 style={{ fontSize: "1.15rem", fontWeight: 700, marginBottom: "0.25rem" }}>
            Simulated Payment Gateway Audits
          </h3>
          <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", marginBottom: "1.5rem" }}>
            Transaction health across successful, pending, and declined settlements
          </p>

          <div style={{ width: "100%", height: 260 }}>
            {paymentPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {paymentPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: "var(--color-card)", borderColor: "var(--color-card-border)", borderRadius: "8px" }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)" }}>
                No payment transactions recorded
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Enrollments Table */}
      <div className="card" style={{ padding: "1.75rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.25rem" }}>
          <div>
            <h3 style={{ fontSize: "1.2rem", fontWeight: 700 }}>Recent Student Registrations</h3>
            <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
              Live entries submitted to the enrollment registry
            </p>
          </div>
          <Link to="/admin/enrollments" className="btn btn-outline" style={{ fontSize: "0.85rem" }}>
            Manage All Enrollments <ArrowRight size={14} />
          </Link>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Enrollment ID</th>
                <th>Student</th>
                <th>Course</th>
                <th>Tuition Fee</th>
                <th>Date</th>
                <th>Status</th>
                <th>Payment</th>
              </tr>
            </thead>
            <tbody>
              {enrollments.slice(0, 6).map((e) => (
                <tr key={e.enrollmentId}>
                  <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{e.enrollmentId}</td>
                  <td style={{ fontWeight: 600 }}>{e.studentName}</td>
                  <td>{e.courseTitle}</td>
                  <td style={{ fontWeight: 700 }}>{formatINR(e.amount)}</td>
                  <td>{formatDate(e.enrollmentDate)}</td>
                  <td><StatusBadge status={e.status} /></td>
                  <td><StatusBadge status={e.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
