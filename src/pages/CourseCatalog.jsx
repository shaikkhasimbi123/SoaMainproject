import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  Filter,
  SlidersHorizontal,
  RotateCcw,
  BookOpen,
  ArrowUpDown,
  AlertCircle
} from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useEnrollment } from "../context/EnrollmentContext";
import CourseCard from "../components/CourseCard";
import { formatINR } from "../utils/formatters";

const CourseCatalog = () => {
  const { courses } = useCourses();
  const { getSeatsForCourse } = useEnrollment();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const [selectedDept, setSelectedDept] = useState(searchParams.get("dept") || "All");
  const [selectedInstructor, setSelectedInstructor] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All"); // 'All', 'Active', 'Inactive'
  const [seatFilter, setSeatFilter] = useState("All"); // 'All', 'available', 'full', 'nearlyFull'
  const [maxFee, setMaxFee] = useState(40000);
  const [sortBy, setSortBy] = useState("title_asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sync with searchParams on mount/change
  useEffect(() => {
    const dept = searchParams.get("dept");
    if (dept) setSelectedDept(dept);
    const search = searchParams.get("search");
    if (search) setSearchQuery(search);
  }, [searchParams]);

  // Unique departments & instructors
  const departments = useMemo(() => {
    const set = new Set(courses.map((c) => c.department));
    return ["All", ...Array.from(set)];
  }, [courses]);

  const instructors = useMemo(() => {
    const set = new Set(courses.map((c) => c.instructor));
    return ["All", ...Array.from(set)];
  }, [courses]);

  // Filtered & Sorted Courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((course) => {
        // Search
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          course.title.toLowerCase().includes(query) ||
          course.instructor.toLowerCase().includes(query) ||
          course.description.toLowerCase().includes(query) ||
          course.department.toLowerCase().includes(query) ||
          course.id.toLowerCase().includes(query);

        // Department
        const matchesDept = selectedDept === "All" || course.department === selectedDept;

        // Instructor
        const matchesInstructor =
          selectedInstructor === "All" || course.instructor === selectedInstructor;

        // Status
        const matchesStatus =
          selectedStatus === "All" ||
          (selectedStatus === "Active" && course.status === "Active") ||
          (selectedStatus === "Inactive" && course.status !== "Active");

        // Fee
        const matchesFee = course.tuitionFee <= maxFee;

        // Seat capacity filter
        const seats = getSeatsForCourse(course);
        let matchesSeats = true;
        if (seatFilter === "available") matchesSeats = seats.availableSeats > 0;
        else if (seatFilter === "full") matchesSeats = seats.isFull;
        else if (seatFilter === "nearlyFull") matchesSeats = seats.isNearlyFull;

        return matchesSearch && matchesDept && matchesInstructor && matchesStatus && matchesFee && matchesSeats;
      })
      .sort((a, b) => {
        if (sortBy === "title_asc") return a.title.localeCompare(b.title);
        if (sortBy === "title_desc") return b.title.localeCompare(a.title);
        if (sortBy === "fee_low") return a.tuitionFee - b.tuitionFee;
        if (sortBy === "fee_high") return b.tuitionFee - a.tuitionFee;
        if (sortBy === "seats_high") {
          const seatsA = getSeatsForCourse(a).availableSeats;
          const seatsB = getSeatsForCourse(b).availableSeats;
          return seatsB - seatsA;
        }
        return 0;
      });
  }, [
    courses,
    searchQuery,
    selectedDept,
    selectedInstructor,
    selectedStatus,
    seatFilter,
    maxFee,
    sortBy,
    getSeatsForCourse
  ]);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedDept("All");
    setSelectedInstructor("All");
    setSelectedStatus("All");
    setSeatFilter("All");
    setMaxFee(40000);
    setSortBy("title_asc");
    setCurrentPage(1);
    setSearchParams({});
  };

  // Pagination calculation
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div style={{ padding: "3rem 0 5rem" }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ marginBottom: "2.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "var(--color-primary-blue)", fontSize: "0.85rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            <BookOpen size={16} /> Course Discovery Catalog
          </div>
          <h1 style={{ fontSize: "2.4rem", fontWeight: 800, marginTop: "0.35rem" }}>
            Academic Course Catalog
          </h1>
          <p style={{ color: "var(--color-text-secondary)", fontSize: "1rem" }}>
            Browse accredited courses, check live seat availability, and explore comprehensive course fee schedules.
          </p>
        </div>

        {/* Filter & Search Bar Controls */}
        <div
          className="card"
          style={{
            padding: "1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem"
          }}
        >
          {/* Top Row: Search and Sort */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ position: "relative", flex: "1 1 320px" }}>
              <Search
                size={18}
                style={{
                  position: "absolute",
                  left: "0.875rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "var(--color-text-muted)"
                }}
              />
              <input
                type="text"
                placeholder="Search by title, instructor, department, or ID..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ paddingLeft: "2.5rem", width: "100%" }}
              />
            </div>

            {/* Sort Dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
              <ArrowUpDown size={16} style={{ color: "var(--color-text-secondary)" }} />
              <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--color-text-secondary)" }}>
                Sort By:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ padding: "0.5rem 0.85rem" }}
              >
                <option value="title_asc">Title (A - Z)</option>
                <option value="title_desc">Title (Z - A)</option>
                <option value="fee_low">Tuition: Lowest First</option>
                <option value="fee_high">Tuition: Highest First</option>
                <option value="seats_high">Most Available Seats</option>
              </select>
            </div>
          </div>

          {/* Bottom Filter Controls */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--color-card-border)"
            }}
          >
            {/* Department */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                DEPARTMENT
              </label>
              <select
                value={selectedDept}
                onChange={(e) => {
                  setSelectedDept(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: "100%" }}
              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Seat Availability */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                SEAT CAPACITY
              </label>
              <select
                value={seatFilter}
                onChange={(e) => {
                  setSeatFilter(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: "100%" }}
              >
                <option value="All">All Capacities</option>
                <option value="available">Seats Available</option>
                <option value="nearlyFull">Nearly Full (≤ 10% left)</option>
                <option value="full">Fully Booked (0 Seats)</option>
              </select>
            </div>

            {/* Course Status */}
            <div>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-secondary)", marginBottom: "0.35rem" }}>
                STATUS
              </label>
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value);
                  setCurrentPage(1);
                }}
                style={{ width: "100%" }}
              >
                <option value="All">All Statuses</option>
                <option value="Active">Active Courses Only</option>
                <option value="Inactive">Inactive Courses</option>
              </select>
            </div>

            {/* Max Tuition Fee */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.35rem" }}>
                <label style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-text-secondary)" }}>
                  MAX TUITION
                </label>
                <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "var(--color-primary-blue)" }}>
                  {formatINR(maxFee)}
                </span>
              </div>
              <input
                type="range"
                min="15000"
                max="40000"
                step="1000"
                value={maxFee}
                onChange={(e) => {
                  setMaxFee(Number(e.target.value));
                  setCurrentPage(1);
                }}
                style={{ width: "100%", padding: 0 }}
              />
            </div>

            {/* Reset Filters */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button
                className="btn btn-outline"
                onClick={handleResetFilters}
                style={{ width: "100%", padding: "0.6rem" }}
                title="Reset all search and filter conditions"
              >
                <RotateCcw size={14} /> Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.95rem", color: "var(--color-text-secondary)" }}>
            Showing <strong>{filteredCourses.length}</strong> {filteredCourses.length === 1 ? "course" : "courses"}
            {selectedDept !== "All" && ` in ${selectedDept}`}
          </div>
          {totalPages > 1 && (
            <div style={{ fontSize: "0.85rem", color: "var(--color-text-muted)" }}>
              Page {currentPage} of {totalPages}
            </div>
          )}
        </div>

        {/* Course Cards Grid */}
        {paginatedCourses.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem"
            }}
          >
            {paginatedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div
            className="card"
            style={{
              padding: "4rem 2rem",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1rem"
            }}
          >
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--color-light-blue)",
                color: "var(--color-primary-blue)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}
            >
              <AlertCircle size={32} />
            </div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: 700 }}>No Matching Courses Found</h3>
            <p style={{ color: "var(--color-text-secondary)", maxWidth: "440px", fontSize: "0.925rem" }}>
              We couldn't find any courses matching your specific search and filter criteria. Try resetting filters or searching with different keywords.
            </p>
            <button className="btn btn-primary" onClick={handleResetFilters}>
              <RotateCcw size={16} /> Reset All Filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "3.5rem" }}>
            <button
              className="btn btn-outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`btn ${currentPage === page ? "btn-primary" : "btn-outline"}`}
                style={{ minWidth: "40px" }}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}
            <button
              className="btn btn-outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCatalog;
