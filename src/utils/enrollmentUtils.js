/**
 * Enrollment and Seat Capacity Utilities
 * Calculates live capacity from course capacity and active enrollments.
 */

export const calculateCourseSeats = (course, enrollments = []) => {
  if (!course) return { enrolledSeats: 0, availableSeats: 0, isFull: true };

  const capacity = Number(course.capacity) || 0;
  // Active enrollments are those not marked as 'Cancelled'
  const activeEnrollments = enrollments.filter(
    (e) => e.courseId === course.id && e.status !== "Cancelled"
  );

  const enrolledSeats = activeEnrollments.length;
  const availableSeats = Math.max(0, capacity - enrolledSeats);
  const isFull = availableSeats <= 0;
  const isNearlyFull = availableSeats > 0 && availableSeats <= Math.max(2, Math.round(capacity * 0.1));

  return {
    capacity,
    enrolledSeats,
    availableSeats,
    isFull,
    isNearlyFull,
    utilizationRate: capacity > 0 ? Math.min(100, Math.round((enrolledSeats / capacity) * 100)) : 0
  };
};

export const isEnrollmentDeadlinePassed = (deadlineString) => {
  if (!deadlineString) return false;
  try {
    const deadline = new Date(deadlineString);
    deadline.setHours(23, 59, 59, 999);
    return new Date() > deadline;
  } catch (err) {
    return false;
  }
};

export const checkEnrollmentEligibility = (course, user, enrollments = []) => {
  if (!user) {
    return {
      eligible: false,
      reason: "Please log in as a student to enroll in this course."
    };
  }

  if (user.role !== "student") {
    return {
      eligible: false,
      reason: `User is logged in as ${user.role}. Enrollment is reserved exclusively for students.`
    };
  }

  if (!course) {
    return { eligible: false, reason: "Course not found." };
  }

  if (course.status !== "Active") {
    return {
      eligible: false,
      reason: "This course is currently inactive and not accepting enrollments."
    };
  }

  if (isEnrollmentDeadlinePassed(course.enrollmentDeadline)) {
    return {
      eligible: false,
      reason: "The enrollment deadline for this course has passed."
    };
  }

  const { isFull, availableSeats } = calculateCourseSeats(course, enrollments);
  if (isFull || availableSeats <= 0) {
    return {
      eligible: false,
      reason: "This course has reached maximum cohort capacity. No seats available."
    };
  }

  // Duplicate enrollment check
  const alreadyEnrolled = enrollments.some(
    (e) => e.courseId === course.id && e.studentId === user.id && e.status !== "Cancelled"
  );

  if (alreadyEnrolled) {
    return {
      eligible: false,
      reason: "You are already actively enrolled in this course."
    };
  }

  return { eligible: true, reason: null };
};
