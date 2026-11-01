import React, { useState } from "react";
import { Plus, Edit, Trash2, Power, BookOpen, Search, Filter, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import StatusBadge from "../components/StatusBadge";
import { formatINR, formatDate } from "../utils/formatters";
import { exportToCSV } from "../utils/csvExport";

const ManageCourses = () => {
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourseStatus } = useCourses();
  const { getSeatsForCourse } = useEnrollment();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const departments = ["All", ...Array.from(new Set(courses.map((c) => c.department)))];

  const filtered = courses.filter((c) => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch = !q || c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q);
    const matchDept = selectedDept === "All" || c.department === selectedDept;
    return matchSearch && matchDept;
  });

  const initialForm = {
    title: "",
    description: "",
    instructor: "Prof. Vikram Deshmukh",
    department: "Computer Science",
    tuitionFee: 25000,
    duration: "12 Weeks",
    capacity: 50,
    enrollmentDeadline: "2026-12-31",
    prerequisites: "Prerequisites standard",
    status: "Active",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  };

  const [formData, setFormData] = useState(initialForm);

  const openAdd = () => {
    setEditingCourse(null);
    setFormData(initialForm);
    setErrors({});
    setModalOpen(true);
  };

  const openEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      instructor: course.instructor,
      department: course.department,
      tuitionFee: course.tuitionFee,
      duration: course.duration,
      capacity: course.capacity,
      enrollmentDeadline: course.enrollmentDeadline,
      prerequisites: course.prerequisites || "",
      status: course.status,
      image: course.image || ""
    });
    setErrors({});
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (editingCourse) {
      const seats = getSeatsForCourse(editingCourse);
      const res = updateCourse(editingCourse.id, formData, seats.enrolledSeats);
      if (res.success) {
        setSuccessMsg(`Course ${editingCourse.id} updated.`);
        setModalOpen(false);
        setTimeout(() => setSuccessMsg(""), 3500);
      } else if (res.errors) {
        setErrors(res.errors);
      } else if (res.message) {
        setErrors({ general: res.message });
      }
    } else {
      const res = addCourse(formData);
      if (res.success) {
        setSuccessMsg(`Course ${res.course.id} published.`);
        setModalOpen(false);
        setTimeout(() => setSuccessMsg(""), 3500);
      } else if (res.errors) {
        setErrors(res.errors);
      }
    }
  };

  const handleDelete = () => {
    if (!deleteTarget) return;
    const seats = getSeatsForCourse(deleteTarget);
    const res = deleteCourse(deleteTarget.id, seats.enrolledSeats);
    setDeleteTarget(null);

    if (res.success) {
      setSuccessMsg(`Course ${deleteTarget.id} deleted.`);
      setTimeout(() => setSuccessMsg(""), 3500);
    } else {
      alert(res.message);
    }
  };

  const handleExportCSV = () => {
    const headers = [
      { key: "id", label: "Course ID" },
      { key: "title", label: "Course Title" },
      { key: "department", label: "Department" },
      { key: "instructor", label: "Instructor" },
      { key: "tuitionFee", label: "Tuition Fee" },
      { key: "capacity", label: "Capacity" },
      { key: "enrollmentDeadline", label: "Deadline" },
      { key: "status", label: "Status" }
    ];
    exportToCSV("academiax_all_courses_report", courses, headers);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <BookOpen size={16} /> Course Administration
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
            Academic Course Registry
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Create, update, activate/deactivate, or audit all institutional course programs.
          </p>
        </div>

        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="btn btn-outline" onClick={handleExportCSV}>
            <FileSpreadsheet size={16} /> Export Catalog CSV
          </button>
          <button className="btn btn-primary" onClick={openAdd}>
            <Plus size={16} /> Create Course
          </button>
        </div>
      </div>

      {successMsg && (
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginBottom: "1.5rem" }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search by ID, title, or instructor..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Filter size={16} style={{ color: "var(--color-text-secondary)" }} />
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              style={{ padding: "0.5rem 0.85rem" }}
            >
              {departments.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Title</th>
                <th>Instructor</th>
                <th>Department</th>
                <th>Tuition Fee</th>
                <th>Capacity</th>
                <th>Enrolled</th>
                <th>Available</th>
                <th>Deadline</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((course) => {
                const seats = getSeatsForCourse(course);
                return (
                  <tr key={course.id}>
                    <td style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{course.id}</td>
                    <td>
                      <div style={{ fontWeight: 700 }}>{course.title}</div>
                      <div style={{ fontSize: "0.72rem", color: "var(--color-text-muted)" }}>{course.duration}</div>
                    </td>
                    <td>{course.instructor}</td>
                    <td>{course.department}</td>
                    <td style={{ fontWeight: 700 }}>{formatINR(course.tuitionFee)}</td>
                    <td>{seats.capacity}</td>
                    <td><span className="badge badge-info">{seats.enrolledSeats}</span></td>
                    <td>
                      <span className={`badge ${seats.isFull ? "badge-error" : seats.isNearlyFull ? "badge-warning" : "badge-success"}`}>
                        {seats.availableSeats}
                      </span>
                    </td>
                    <td>{formatDate(course.enrollmentDeadline)}</td>
                    <td><StatusBadge status={course.status} /></td>
                    <td>
                      <div style={{ display: "flex", gap: "0.35rem" }}>
                        <button
                          onClick={() => openEdit(course)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.55rem" }}
                          title="Edit course"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => toggleCourseStatus(course.id)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.55rem" }}
                          title="Activate / Deactivate course"
                        >
                          <Power size={13} style={{ color: course.status === "Active" ? "var(--color-success)" : "var(--color-text-muted)" }} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(course)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.55rem", color: "var(--color-error)" }}
                          title="Delete course"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCourse ? `Edit Course: ${editingCourse.id}` : "Create Academic Course"}
        subtitle="Manage parameters, seat quotas, and tuition pricing"
        maxWidth="640px"
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {errors.general && (
            <div style={{ padding: "0.65rem 0.85rem", backgroundColor: "var(--color-error-bg)", color: "var(--color-error)", borderRadius: "var(--radius-sm)", fontSize: "0.85rem" }}>
              {errors.general}
            </div>
          )}

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Course Title *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: "100%" }}
              required
            />
            {errors.title && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.title}</span>}
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Short Description *</label>
            <textarea
              rows={2}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              style={{ width: "100%" }}
              required
            />
            {errors.description && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.description}</span>}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Department</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                style={{ width: "100%" }}
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Artificial Intelligence">Artificial Intelligence</option>
                <option value="Data Science">Data Science</option>
                <option value="Cloud Computing">Cloud Computing</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Business and Management">Business and Management</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Instructor Name *</label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Tuition Fee (INR) *</label>
              <input
                type="number"
                min="0"
                value={formData.tuitionFee}
                onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                style={{ width: "100%" }}
                required
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Capacity (Seats) *</label>
              <input
                type="number"
                min="1"
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                style={{ width: "100%" }}
                required
              />
              {errors.capacity && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.capacity}</span>}
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Deadline *</label>
              <input
                type="date"
                value={formData.enrollmentDeadline}
                onChange={(e) => setFormData({ ...formData, enrollmentDeadline: e.target.value })}
                style={{ width: "100%" }}
                required
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCourse ? "Update Course" : "Save Course"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Course Record"
        message={`Are you sure you want to delete ${deleteTarget?.title}? Active enrollments will prevent deletion.`}
        confirmText="Delete Course"
        type="danger"
      />
    </div>
  );
};

export default ManageCourses;
