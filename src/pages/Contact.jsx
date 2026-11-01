import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import { isValidEmail } from "../utils/validation";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Course Enrollment & Tuition Inquiry",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError("Please complete all required fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      setError("Please provide a valid email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container" style={{ maxWidth: "1000px" }}>
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <Mail size={16} /> Campus Support
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "0.35rem" }}>
            Contact & Academic Support
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>
            Reach out to the AcademiaX Registrar, Faculty Mentors, or Technical Administration team.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "2.5rem"
          }}
        >
          {/* Contact Info Card */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div className="card" style={{ padding: "2rem" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "1.25rem" }}>
                Campus Registrar & Bursar
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", fontSize: "0.9rem" }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
                  <MapPin size={20} style={{ color: "var(--color-primary-blue)", flexShrink: 0, marginTop: "2px" }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Academic Senate & Admissions Center</div>
                    <div style={{ color: "var(--color-text-secondary)" }}>
                      AcademiaX Digital Learning Campus, Knowledge Corridor, Bengaluru, KA 560001
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Mail size={20} style={{ color: "var(--color-primary-blue)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Email Inquiries</div>
                    <div style={{ color: "var(--color-text-secondary)" }}>support@academiax.demo</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Phone size={20} style={{ color: "var(--color-primary-blue)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Institutional Helpline</div>
                    <div style={{ color: "var(--color-text-secondary)" }}>+91 (080) 2841-9900</div>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <Clock size={20} style={{ color: "var(--color-primary-blue)", flexShrink: 0 }} />
                  <div>
                    <div style={{ fontWeight: 700 }}>Office Hours</div>
                    <div style={{ color: "var(--color-text-secondary)" }}>Monday – Friday: 9:00 AM – 5:30 PM IST</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: "rgba(37, 99, 235, 0.05)", border: "1px dashed var(--color-primary-blue)", borderRadius: "var(--radius-md)", padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 700, color: "var(--color-primary-navy)", marginBottom: "0.35rem", fontSize: "0.85rem" }}>
                <ShieldCheck size={16} style={{ color: "var(--color-primary-blue)" }} /> Simulated Inquiry Dispatch
              </div>
              <p style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
                Submissions via this contact form trigger an interactive simulated delivery confirmation. No actual external emails are transmitted.
              </p>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="card" style={{ padding: "2rem" }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "2rem 0" }}>
                <div style={{ width: "56px", height: "56px", borderRadius: "50%", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
                  <CheckCircle2 size={32} />
                </div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: 800, marginBottom: "0.5rem" }}>Inquiry Recorded (Demo)</h3>
                <p style={{ fontSize: "0.9rem", color: "var(--color-text-secondary)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
                  Thank you, <strong>{formData.name}</strong>. Your message regarding <em>"{formData.subject}"</em> has been logged in the demonstration portal.
                </p>
                <button
                  className="btn btn-outline"
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ name: "", email: "", subject: "Course Enrollment & Tuition Inquiry", message: "" });
                  }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.25rem" }}>Send a Direct Message</h3>

                {error && (
                  <div style={{ padding: "0.75rem", backgroundColor: "var(--color-error-bg)", color: "var(--color-error)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
                    {error}
                  </div>
                )}

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Your Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Aarav Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    style={{ width: "100%" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Email Address *</label>
                  <input
                    type="email"
                    placeholder="student@example.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: "100%" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Inquiry Subject</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    style={{ width: "100%" }}
                  >
                    <option value="Course Enrollment & Tuition Inquiry">Course Enrollment & Tuition Breakdown</option>
                    <option value="Course Capacity & Quotas">Course Capacity & Seat Quota</option>
                    <option value="Payment Simulation & Receipts">Payment Simulation & Receipts</option>
                    <option value="Faculty Course Addition">Faculty Course Proposal</option>
                    <option value="General Academic Question">General Academic Question</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Message Content *</label>
                  <textarea
                    rows={4}
                    placeholder="Please write your questions or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    style={{ width: "100%" }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: "100%", padding: "0.85rem" }}>
                  <Send size={16} /> Submit Message (Demo)
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
