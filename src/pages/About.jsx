import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, ShieldCheck, Terminal, Layers, BookOpen, CreditCard, Award, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto 3.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <GraduationCap size={16} /> Institutional Overview
          </div>
          <h1 style={{ fontSize: "2.6rem", fontWeight: 800, marginTop: "0.5rem", lineHeight: 1.2 }}>
            Empowering Higher Education Through Modern Digital Platforms
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1.1rem", marginTop: "1rem", lineHeight: 1.6 }}>
            AcademiaX Digital Learning is an enterprise course enrollment, dynamic cohort capacity management, and fee processing platform built to demonstrate state-of-the-art software engineering.
          </p>
        </div>

        {/* Pillars Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "2rem",
            marginBottom: "4rem"
          }}
        >
          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-light-blue)", color: "var(--color-primary-blue)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <Terminal size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Enterprise Modular Architecture
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Built according to university curriculum standards with loosely coupled services communicating over standard REST contracts and high-performance databases.
            </p>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <CreditCard size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Transparent Tuition Accounting
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Pioneering transparency in academic fee accounting. Students inspect itemized base fees, advanced computing laboratory levies, digital library reserves, and proctored examination charges before committing to cohort registration.
            </p>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "var(--radius-md)", backgroundColor: "var(--color-accent-purple-bg)", color: "var(--color-accent-purple)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.25rem" }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.5rem" }}>
              Dynamic Capacity & Quota Integrity
            </h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
              Seats are dynamically derived from course quota minus eligible active registrations. Cancelled enrollments instantaneously restore cohort availability without artificial double-counting.
            </p>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="card" style={{ padding: "3rem 2rem", marginBottom: "4rem" }}>
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-primary-blue)", textTransform: "uppercase" }}>
              LIFECYCLE OVERVIEW
            </span>
            <h2 style={{ fontSize: "1.8rem", fontWeight: 800, marginTop: "0.25rem" }}>
              The AcademiaX Enrollment & Registration Workflow
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.5rem" }}>
            <div style={{ padding: "1.25rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-blue)", marginBottom: "0.35rem" }}>01</div>
              <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Course Discovery</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
                Filter programs by department, inspect syllabus, and review faculty qualifications.
              </p>
            </div>

            <div style={{ padding: "1.25rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-blue)", marginBottom: "0.35rem" }}>02</div>
              <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Fee Inspection</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
                Inspect the itemized tuition schedule breaking down institutional surcharges.
              </p>
            </div>

            <div style={{ padding: "1.25rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-blue)", marginBottom: "0.35rem" }}>03</div>
              <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Seat Reservation</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
                Verify eligibility, confirm enrollment deadline, and deduct seat quota immediately.
              </p>
            </div>

            <div style={{ padding: "1.25rem", backgroundColor: "var(--color-bg)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--color-primary-blue)", marginBottom: "0.35rem" }}>04</div>
              <h4 style={{ fontWeight: 700, marginBottom: "0.25rem" }}>Tuition Settlement</h4>
              <p style={{ fontSize: "0.825rem", color: "var(--color-text-secondary)" }}>
                Settle tuition via simulated gateway, generate verifiable TXN ID, and print receipt.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <Link to="/courses" className="btn btn-primary" style={{ padding: "0.85rem 1.75rem", fontSize: "1rem" }}>
            Explore Verified Courses Now <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
