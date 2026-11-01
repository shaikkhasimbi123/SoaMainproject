import React, { createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../utils/storage";
import { generateBaseEnrollments } from "../data/initialData";
import { calculateCourseSeats, checkEnrollmentEligibility } from "../utils/enrollmentUtils";
import { useNotifications } from "./NotificationContext";
import { apiService } from "../services/api";

const EnrollmentContext = createContext();

export const EnrollmentProvider = ({ children }) => {
  const [enrollments, setEnrollments] = useState(() => {
    return getStorageItem(STORAGE_KEYS.ENROLLMENTS, generateBaseEnrollments());
  });

  const { addNotification } = useNotifications();

  // Sync enrollments with MySQL on mount
  useEffect(() => {
    apiService.enrollments.getAll().then((remoteEnrs) => {
      if (Array.isArray(remoteEnrs) && remoteEnrs.length > 0) {
        setEnrollments(remoteEnrs);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.ENROLLMENTS, enrollments);
  }, [enrollments]);

  // Derives current available and enrolled seats for any course object
  const getSeatsForCourse = (course) => {
    return calculateCourseSeats(course, enrollments);
  };

  // Checks if a student can enroll in a course
  const checkEligibility = (course, user) => {
    return checkEnrollmentEligibility(course, user, enrollments);
  };

  // Enrolls a student in a course
  const enrollStudent = ({ course, student }) => {
    const check = checkEnrollmentEligibility(course, student, enrollments);
    if (!check.eligible) {
      return { success: false, message: check.reason };
    }

    const enrollmentId = `ENR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newEnrollment = {
      enrollmentId,
      studentId: student.id,
      studentName: student.name,
      courseId: course.id,
      courseTitle: course.title,
      enrollmentDate: new Date().toISOString().slice(0, 10),
      status: "Pending Payment",
      paymentStatus: "Pending",
      amount: Number(course.tuitionFee) || 0,
      lastUpdated: new Date().toISOString()
    };

    setEnrollments((prev) => [newEnrollment, ...prev]);

    // Save directly into MySQL database
    apiService.enrollments.create(newEnrollment).catch(() => {});

    // Send in-app notification
    addNotification({
      title: "Enrollment Reserved (Pending Payment)",
      message: `Seat reserved for ${course.title} (${course.id}). Complete tuition payment to confirm registration.`,
      type: "enrollment",
      userId: student.id,
      link: `/student/payments`
    });

    return { success: true, enrollment: newEnrollment };
  };

  // Cancels an active enrollment and frees up the seat
  const cancelEnrollment = (enrollmentId, reason = "Student initiated cancellation") => {
    const existing = enrollments.find((e) => e.enrollmentId === enrollmentId);
    if (!existing) {
      return { success: false, message: "Enrollment record not found." };
    }

    if (existing.status === "Cancelled") {
      return { success: false, message: "Enrollment is already cancelled." };
    }

    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.enrollmentId === enrollmentId) {
          return {
            ...e,
            status: "Cancelled",
            cancellationReason: reason,
            lastUpdated: new Date().toISOString()
          };
        }
        return e;
      })
    );

    // Cancel in MySQL database
    apiService.enrollments.cancel(enrollmentId, reason).catch(() => {});

    addNotification({
      message: `Your enrollment in ${existing.courseTitle} (${existing.courseId}) has been cancelled. Seat returned to cohort capacity.`,
      type: "warning",
      userId: existing.studentId,
      link: "/student/enrollments"
    });

    return { success: true, message: "Enrollment successfully cancelled and seat freed." };
  };

  // Updates status after payment simulation
  const markEnrollmentPaid = (enrollmentId, transactionRef) => {
    setEnrollments((prev) =>
      prev.map((e) => {
        if (e.enrollmentId === enrollmentId) {
          return {
            ...e,
            status: "Confirmed",
            paymentStatus: "Successful",
            transactionReference: transactionRef,
            lastUpdated: new Date().toISOString()
          };
        }
        return e;
      })
    );

    // Payment update automatically syncs status in MySQL via Payment Microservice
  };

  // Filters enrollments for a specific student
  const getStudentEnrollments = (studentId) => {
    if (!studentId) return [];
    return enrollments.filter((e) => e.studentId === studentId);
  };

  // Filters enrollments for courses taught by an instructor
  const getInstructorEnrollments = (instructorCourseIds = []) => {
    const idSet = new Set(instructorCourseIds);
    return enrollments.filter((e) => idSet.has(e.courseId));
  };

  return (
    <EnrollmentContext.Provider
      value={{
        enrollments,
        getSeatsForCourse,
        checkEligibility,
        enrollStudent,
        cancelEnrollment,
        markEnrollmentPaid,
        getStudentEnrollments,
        getInstructorEnrollments
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};

export const useEnrollment = () => useContext(EnrollmentContext);
