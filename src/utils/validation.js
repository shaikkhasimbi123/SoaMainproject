/**
 * Form and Business Rule Validation Utilities
 */

export const isValidEmail = (email) => {
  if (!email || typeof email !== "string") return false;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email.trim());
};

export const isValidPassword = (password) => {
  if (!password || typeof password !== "string") return false;
  return password.length >= 6;
};

export const validateCourseData = (courseData, existingEnrollmentsCount = 0) => {
  const errors = {};

  if (!courseData.title || courseData.title.trim().length < 3) {
    errors.title = "Course title is required and must be at least 3 characters.";
  }

  if (!courseData.description || courseData.description.trim().length < 10) {
    errors.description = "Short description is required (at least 10 characters).";
  }

  const fee = Number(courseData.tuitionFee);
  if (isNaN(fee) || fee < 0) {
    errors.tuitionFee = "Tuition fee cannot be negative and must be a valid number.";
  }

  const capacity = Number(courseData.capacity);
  if (isNaN(capacity) || !Number.isInteger(capacity) || capacity <= 0) {
    errors.capacity = "Capacity must be a positive integer greater than zero.";
  } else if (existingEnrollmentsCount > 0 && capacity < existingEnrollmentsCount) {
    errors.capacity = `Capacity cannot be reduced below the ${existingEnrollmentsCount} current active enrollments.`;
  }

  if (!courseData.enrollmentDeadline) {
    errors.enrollmentDeadline = "Enrollment deadline is required.";
  }

  if (!courseData.department || courseData.department.trim().length === 0) {
    errors.department = "Department / Category is required.";
  }

  if (!courseData.instructor || courseData.instructor.trim().length === 0) {
    errors.instructor = "Assigned instructor name is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateRegistration = (formData, existingUsers = []) => {
  const errors = {};

  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = "Full name is required (minimum 2 characters).";
  }

  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = "A valid email address is required.";
  } else {
    const isDuplicateEmail = existingUsers.some(
      (u) => u.email.toLowerCase() === formData.email.trim().toLowerCase()
    );
    if (isDuplicateEmail) {
      errors.email = "This email address is already registered in the demo system.";
    }
  }

  if (!formData.password || !isValidPassword(formData.password)) {
    errors.password = "Password must be at least 6 characters.";
  }

  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (formData.role === "student" && formData.studentId) {
    const isDuplicateId = existingUsers.some(
      (u) => u.id && u.id.toLowerCase() === formData.studentId.trim().toLowerCase()
    );
    if (isDuplicateId) {
      errors.studentId = "Student ID already exists in records.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
