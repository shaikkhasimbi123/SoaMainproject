import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  BookOpen,
  Users,
  Award,
  CreditCard,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Layers,
  Database,
  Cloud,
  Cpu,
  Lock,
  Briefcase
} from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import { useAuth } from "../context/AuthContext";
import CourseCard from "../components/CourseCard";
import StatCard from "../components/StatCard";

const Home = () => {
  const navigate = useNavigate();
  const { courses } = useCourses();
  const { enrollments } = useEnrollment();
  const { users } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  // Live statistical derivations from stored state
  const totalCourses = courses.length;
  const categories = Array.from(new Set(courses.map((c) => c.department))).length;
  const totalStudents = users.filter((u) => u.role === "student").length;
  const successfulEnrollments = enrollments.filter((e) => e.status !== "Cancelled").length;

  const featuredCourses = courses.filter((c) => c.status === "Active").slice(0, 6);

  const handleHeroSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/courses?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate("/courses");
    }
  };

  const categoryList = [
    { name: "Computer Science", icon: Cpu, count: courses.filter((c) => c.department.includes("Computer")).length, color: "var(--color-primary-blue)" },
    { name: "Artificial Intelligence", icon: Sparkles, count: courses.filter((c) => c.department.includes("Artificial")).length, color: "#8B5CF6" },
    { name: "Data Science", icon: Database, count: courses.filter((c) => c.department.includes("Data")).length, color: "#EC4899" },
    { name: "Cloud Computing", icon: Cloud, count: courses.filter((c) => c.department.includes("Cloud")).length, color: "#06B6D4" },
    { name: "Cybersecurity", icon: Lock, count: courses.filter((c) => c.department.includes("Cyber")).length, color: "#EF4444" },
    { name: "Business and Management", icon: Briefcase, count: courses.filter((c) => c.department.includes("Business")).length, color: "#F59E0B" }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section
        style={{
          background: "radial-gradient(circle at 80% 20%, rgba(37, 99, 235, 0.12) 0%, rgba(16, 42, 67, 0.03) 100%)",
          padding: "4.5rem 0 3.5rem",
          borderBottom: "1px solid var(--color-card-border)"
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              alignItems: "center",
              gap: "3rem"
            }}
          >
            {/* Left Column */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.85rem",
                  borderRadius: "var(--radius-full)",
                  backgroundColor: "var(--color-light-blue)",
                  color: "var(--color-primary-blue)",
                  fontSize: "0.825rem",
                  fontWeight: 700,
                  marginBottom: "1.25rem",
                  border: "1px solid rgba(37, 99, 235, 0.2)"
                }}
              >
                <Sparkles size={14} /> AcademiaX Learning Platform
              </div>

              <h1
                style={{
                  fontSize: "clamp(2.2rem, 5vw, 3.4rem)",
                  fontWeight: 800,
                  color: "var(--color-primary-navy)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: "1.25rem"
                }}
              >
                Your Future Starts with the <span style={{ color: "var(--color-primary-blue)" }}>Right Course.</span>
              </h1>

              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                  marginBottom: "2rem",
                  maxWidth: "540px"
                }}
              >
                Discover industry-relevant courses, learn from experienced instructors, and build the skills that shape your future. Seamless enrollment and dynamic capacity tracking.
              </p>

              {/* Search Bar */}
              <form
                onSubmit={handleHeroSearch}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "var(--color-card)",
                  border: "2px solid var(--color-primary-blue)",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.4rem",
                  boxShadow: "var(--shadow-lg)",
                  marginBottom: "1.75rem",
                  maxWidth: "500px"
                }}
              >
                <Search size={20} style={{ color: "var(--color-text-muted)", marginLeft: "0.75rem", flexShrink: 0 }} />
                <input
                  type="text"
                  placeholder="Search by course, technology, or instructor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: "none",
                    boxShadow: "none",
                    width: "100%",
                    fontSize: "0.95rem",
                    padding: "0.6rem 0.75rem"
                  }}
                />
                <button type="submit" className="btn btn-primary" style={{ padding: "0.65rem 1.25rem" }}>
                  Search
                </button>
              </form>

              {/* Buttons */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
                <Link to="/courses" className="btn btn-primary" style={{ padding: "0.8rem 1.5rem" }}>
                  Explore All Courses <ArrowRight size={18} />
                </Link>
                <Link to="/register" className="btn btn-outline" style={{ padding: "0.8rem 1.5rem" }}>
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Right Column Illustration */}
            <div style={{ position: "relative" }}>
              <div
                style={{
                  position: "relative",
                  borderRadius: "var(--radius-xl)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-xl)",
                  border: "1px solid var(--color-card-border)"
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                  alt="Higher Education Collaboration"
                  style={{ width: "100%", height: "420px", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(16, 42, 67, 0.85) 100%)"
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: "1.5rem",
                    left: "1.5rem",
                    right: "1.5rem",
                    color: "#FFFFFF"
                  }}
                >
                  <div style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-secondary-blue)", textTransform: "uppercase" }}>
                    Higher Education Excellence
                  </div>
                  <div style={{ fontSize: "1.1rem", fontWeight: 700 }}>
                    Transparent Tuition & Real-time Cohort Capacity
                  </div>
                </div>
              </div>

              {/* Floating Stat Badge */}
              <div
                style={{
                  position: "absolute",
                  top: "1.5rem",
                  left: "-1.5rem",
                  backgroundColor: "var(--color-card)",
                  border: "1px solid var(--color-card-border)",
                  borderRadius: "var(--radius-lg)",
                  padding: "0.85rem 1.25rem",
                  boxShadow: "var(--shadow-xl)",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem"
                }}
              >
                <div
                  style={{
                    width: "36px",
                    height: "36px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-success-bg)",
                    color: "var(--color-success)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <div style={{ fontSize: "0.95rem", fontWeight: 800 }}>Verified Courses</div>
                  <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>Accredited Higher Education</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics */}
      <section style={{ padding: "3rem 0", backgroundColor: "var(--color-card)", borderBottom: "1px solid var(--color-card-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              INSTITUTIONAL METRICS
            </span>
            <h2 style={{ fontSize: "1.5rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Live Platform Statistics (Demo State)
            </h2>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1.5rem"
            }}
          >
            <StatCard
              title="Total Active Courses"
              value={totalCourses}
              subtitle="Industry-vetted programs"
              icon={BookOpen}
              color="blue"
            />
            <StatCard
              title="Academic Disciplines"
              value={categories}
              subtitle="Engineering & Management"
              icon={Layers}
              color="purple"
            />
            <StatCard
              title="Registered Demo Students"
              value={totalStudents}
              subtitle="Active cohort scholars"
              icon={Users}
              color="green"
            />
            <StatCard
              title="Successful Enrollments"
              value={successfulEnrollments}
              subtitle="Course seats reserved"
              icon={Award}
              color="navy"
            />
          </div>
        </div>
      </section>

      {/* Course Categories */}
      <section style={{ padding: "4rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              TOP DISCIPLINES
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Explore Higher Education Categories
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
              Select a specialized domain to filter current course offerings
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1.25rem"
            }}
          >
            {categoryList.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.name}
                  to={`/courses?dept=${encodeURIComponent(cat.name)}`}
                  className="card card-interactive"
                  style={{
                    padding: "1.5rem 1rem",
                    textAlign: "center",
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "0.75rem"
                  }}
                >
                  <div
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "var(--radius-lg)",
                      backgroundColor: `${cat.color}15`,
                      color: cat.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Icon size={26} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--color-text-primary)", marginBottom: "0.25rem" }}>
                      {cat.name}
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>
                      {cat.count} Available Courses
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Courses */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--color-card)", borderTop: "1px solid var(--color-card-border)" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "1rem",
              marginBottom: "2.5rem"
            }}
          >
            <div>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                FEATURED PROGRAMS
              </span>
              <h2 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
                Featured Higher Education Courses
              </h2>
            </div>
            <Link to="/courses" className="btn btn-outline">
              View All Courses ({courses.length}) <ArrowRight size={16} />
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {featuredCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AcademiaX */}
      <section style={{ padding: "5rem 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              ACADEMIC EXCELLENCE
            </span>
            <h2 style={{ fontSize: "2.2rem", fontWeight: 800, marginTop: "0.25rem" }}>
              Why Choose AcademiaX Digital Learning?
            </h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem", maxWidth: "600px", margin: "0.5rem auto 0" }}>
              Engineered with modern architecture principles to deliver transparent tuition, reliable seat allocation, and institutional credibility.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "2rem"
            }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-light-blue)", color: "var(--color-primary-blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <BookOpen size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Flexible Course Discovery</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Explore an extensive curriculum across Computer Science, Artificial Intelligence, Cybersecurity, and Cloud Systems with real-time capacity and deadline tracking.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "rgba(124, 58, 237, 0.12)", color: "var(--color-accent-purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <Users size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Experienced Instructors</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Courses mentored by distinguished professors and industry veterans offering rigorous learning outcomes, capstone guidance, and continuous feedback.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <CreditCard size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Transparent Fee Breakdown</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Inspect itemized fee breakdowns including base tuition, computing lab fees, library resources, and examination services before committing to enrollment.
              </p>
            </div>

            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-warning-bg)", color: "var(--color-warning)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
                <ShieldCheck size={24} />
              </div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "0.5rem" }}>Dynamic Capacity Enforcement</h3>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Real-time seat calculation ensures cohorts never overbook. Cancelled enrollments instantly return capacity to the active pool without race conditions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "4rem 0", backgroundColor: "var(--color-card)", borderTop: "1px solid var(--color-card-border)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-info" style={{ marginBottom: "0.5rem" }}>
              DEMO TESTIMONIALS
            </span>
            <h2 style={{ fontSize: "2rem", fontWeight: 800 }}>Student & Faculty Voices</h2>
            <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
              Simulated feedback from students and professors using the AcademiaX platform
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "2rem"
            }}
          >
            <div className="card" style={{ padding: "1.75rem" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", fontStyle: "italic", marginBottom: "1.25rem" }}>
                "The tuition fee breakdown gave me complete clarity on lab surcharges and exam fees. The enrollment and receipt process took less than two minutes."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                  alt="Aarav Sharma"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Aarav Sharma</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>B.Tech Computer Science, 6th Sem</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.75rem" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", fontStyle: "italic", marginBottom: "1.25rem" }}>
                "Managing course capacity, reviewing enrolled student rosters, and setting cohort deadlines has never been so seamless in our academic department."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
                  alt="Dr. Priya Raman"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Dr. Priya Raman</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Professor & Chair, AI Department</div>
                </div>
              </div>
            </div>

            <div className="card" style={{ padding: "1.75rem" }}>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)", fontStyle: "italic", marginBottom: "1.25rem" }}>
                "The administrative reconciliation reports and CSV export capabilities make institutional tuition auditing clean and verifiable."
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                  alt="Dean Marcus Vance"
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>Dean Marcus Vance</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>Chief Academic Officer & Registrar</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section style={{ padding: "5rem 0", background: "linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-primary-blue) 100%)", color: "#FFFFFF" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <h2 style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 800, color: "#FFFFFF", marginBottom: "1rem" }}>
            Ready to Accelerate Your Academic Journey?
          </h2>
          <p style={{ color: "#BFDBFE", fontSize: "1.1rem", maxWidth: "600px", margin: "0 auto 2rem" }}>
            Join hundreds of scholars exploring cutting-edge curricula with institutional clarity and transparency.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
            <Link to="/courses" className="btn" style={{ backgroundColor: "#FFFFFF", color: "var(--color-primary-navy)", padding: "0.85rem 1.75rem", fontWeight: 700 }}>
              Browse Course Catalog
            </Link>
            <Link to="/register" className="btn btn-secondary" style={{ padding: "0.85rem 1.75rem", fontWeight: 700 }}>
              Register Student Account
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
