import React, { useState } from "react";
import { Plus, Edit, Trash2, Power, AlertCircle, BookOpen, Search, CheckCircle2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import StatusBadge from "../components/StatusBadge";
import { formatINR, formatDate } from "../utils/formatters";

const InstructorCourses = () => {
  const { currentUser } = useAuth();
  const { courses, addCourse, updateCourse, deleteCourse, toggleCourseStatus } = useCourses();
  const { getSeatsForCourse } = useEnrollment();

  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  // Courses assigned to this instructor (or matching department)
  const myCourses = courses.filter(
    (c) =>
      c.instructorId === currentUser?.id ||
      c.instructor.toLowerCase().includes(currentUser?.name?.toLowerCase().split(" ")[0] || "") ||
      currentUser?.role === "admin" // Admins can manage all
  );

  const filtered = myCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Form State
  const initialForm = {
    title: "",
    description: "",
    department: currentUser?.department || "Computer Science",
    tuitionFee: 25000,
    duration: "12 Weeks",
    capacity: 40,
    enrollmentDeadline: "2026-12-31",
    prerequisites: "Basic programming logic",
    status: "Active",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80"
  };

  const [formData, setFormData] = useState(initialForm);

  const openAddModal = () => {
    setEditingCourse(null);
    setFormData({
      ...initialForm,
      instructor: currentUser?.name,
      instructorId: currentUser?.id
    });
    setErrors({});
    setModalOpen(true);
  };

  const openEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    if (editingCourse) {
      const seats = getSeatsForCourse(editingCourse);
      const res = updateCourse(editingCourse.id, formData, seats.enrolledSeats);
      if (res.success) {
        setSuccessMsg(`Course ${editingCourse.id} updated successfully.`);
        setModalOpen(false);
        setTimeout(() => setSuccessMsg(""), 4000);
      } else if (res.errors) {
        setErrors(res.errors);
      } else if (res.message) {
        setErrors({ general: res.message });
      }
    } else {
      const res = addCourse({
        ...formData,
        instructor: currentUser?.name,
        instructorId: currentUser?.id
      });
      if (res.success) {
        setSuccessMsg(`New course ${res.course.id} published successfully.`);
        setModalOpen(false);
        setTimeout(() => setSuccessMsg(""), 4000);
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
      setSuccessMsg(`Course ${deleteTarget.id} removed.`);
      setTimeout(() => setSuccessMsg(""), 4000);
    } else {
      alert(res.message);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase" }}>
            <BookOpen size={16} /> Course Management
          </div>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, marginTop: "0.25rem" }}>
            Assigned Academic Courses
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "0.95rem" }}>
            Create new syllabi, update cohort seat limits, set enrollment deadlines, and inspect active capacities.
          </p>
        </div>

        <button className="btn btn-primary" onClick={openAddModal}>
          <Plus size={16} /> Add New Course
        </button>
      </div>

      {successMsg && (
        <div style={{ padding: "1rem 1.25rem", backgroundColor: "var(--color-success-bg)", color: "var(--color-success)", borderRadius: "var(--radius-md)", display: "flex", alignItems: "center", gap: "0.5rem", fontWeight: 600 }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Course List Card */}
      <div className="card" style={{ padding: "1.5rem" }}>
        <div style={{ marginBottom: "1.25rem", maxWidth: "340px" }}>
          <div style={{ position: "relative" }}>
            <Search size={18} style={{ position: "absolute", left: "0.875rem", top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)" }} />
            <input
              type="text"
              placeholder="Search assigned courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: "100%", paddingLeft: "2.5rem" }}
            />
          </div>
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
                      <div style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}>{course.duration}</div>
                    </td>
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
                          onClick={() => openEditModal(course)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
                          title="Edit course details and capacity"
                        >
                          <Edit size={13} />
                        </button>
                        <button
                          onClick={() => toggleCourseStatus(course.id)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem" }}
                          title={course.status === "Active" ? "Deactivate course" : "Activate course"}
                        >
                          <Power size={13} style={{ color: course.status === "Active" ? "var(--color-success)" : "var(--color-text-muted)" }} />
                        </button>
                        <button
                          onClick={() => setDeleteTarget(course)}
                          className="btn btn-outline"
                          style={{ padding: "0.35rem 0.65rem", fontSize: "0.78rem", color: "var(--color-error)" }}
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

      {/* Add / Edit Course Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCourse ? `Edit Course ${editingCourse.id}` : "Publish New Academic Course"}
        subtitle="Configure course capacity, syllabus parameters, and tuition structure"
        maxWidth="640px"
      >
        <form onSubmit={handleFormSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
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
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Tuition Fee (INR) *</label>
              <input
                type="number"
                min="0"
                value={formData.tuitionFee}
                onChange={(e) => setFormData({ ...formData, tuitionFee: e.target.value })}
                style={{ width: "100%" }}
                required
              />
              {errors.tuitionFee && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.tuitionFee}</span>}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
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
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Duration</label>
              <input
                type="text"
                placeholder="e.g. 12 Weeks"
                value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                style={{ width: "100%" }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Enrollment Deadline *</label>
              <input
                type="date"
                value={formData.enrollmentDeadline}
                onChange={(e) => setFormData({ ...formData, enrollmentDeadline: e.target.value })}
                style={{ width: "100%" }}
                required
              />
              {errors.enrollmentDeadline && <span style={{ color: "var(--color-error)", fontSize: "0.75rem" }}>{errors.enrollmentDeadline}</span>}
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Prerequisites</label>
            <input
              type="text"
              placeholder="e.g. Data Structures, Python Basics"
              value={formData.prerequisites}
              onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.25rem" }}>Course Thumbnail URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem", marginTop: "1rem" }}>
            <button type="button" className="btn btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              {editingCourse ? "Save Course Changes" : "Publish Course"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Delete Academic Course"
        message={`Are you sure you want to permanently delete course "${deleteTarget?.title}" (${deleteTarget?.id})? If there are active student enrollments, deletion will be rejected.`}
        confirmText="Confirm Delete"
        type="danger"
      />
    </div>
  );
};

export default InstructorCourses;
