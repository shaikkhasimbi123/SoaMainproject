import React, { createContext, useContext, useState, useEffect } from "react";
import { getStorageItem, setStorageItem, STORAGE_KEYS } from "../utils/storage";
import { INITIAL_PAYMENTS } from "../data/initialData";
import { simulatePaymentProcessing } from "../utils/paymentUtils";
import { useEnrollment } from "./EnrollmentContext";
import { useNotifications } from "./NotificationContext";
import { apiService } from "../services/api";

const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [payments, setPayments] = useState(() => {
    return getStorageItem(STORAGE_KEYS.PAYMENTS, INITIAL_PAYMENTS);
  });

  const { markEnrollmentPaid } = useEnrollment();
  const { addNotification } = useNotifications();

  // Sync payments from MySQL on mount
  useEffect(() => {
    apiService.payments.getAll().then((remotePayments) => {
      if (Array.isArray(remotePayments) && remotePayments.length > 0) {
        setPayments(remotePayments);
      }
    }).catch(() => {});
  }, []);

  useEffect(() => {
    setStorageItem(STORAGE_KEYS.PAYMENTS, payments);
  }, [payments]);

  const getPaymentById = (paymentId) => {
    if (!paymentId) return null;
    return payments.find((p) => p.paymentId === paymentId || p.transactionReference === paymentId) || null;
  };

  const getPaymentsForStudent = (studentId) => {
    if (!studentId) return [];
    return payments.filter((p) => p.studentId === studentId);
  };

  const getPaymentForEnrollment = (enrollmentId) => {
    if (!enrollmentId) return null;
    return payments.find((p) => p.enrollmentId === enrollmentId && p.paymentStatus === "Successful") || null;
  };

  const processPayment = async ({
    enrollment,
    course,
    student,
    paymentMethod = "UPI Demo",
    forceOutcome = "success"
  }) => {
    if (!enrollment || !student || !course) {
      return { success: false, message: "Missing enrollment, student, or course information." };
    }

    if (enrollment.studentId !== student.id) {
      return { success: false, message: "Authorization mismatch: Enrollment does not belong to this student." };
    }

    // Safety rule: Prevent duplicate successful payments for the same enrollment
    const alreadyPaid = payments.some(
      (p) => p.enrollmentId === enrollment.enrollmentId && p.paymentStatus === "Successful"
    );
    if (alreadyPaid) {
      return {
        success: false,
        message: "Tuition fee for this enrollment has already been settled successfully."
      };
    }

    // Run simulated payment processing with artificial latency
    const result = await simulatePaymentProcessing({
      enrollment,
      course,
      student,
      paymentMethod,
      forceOutcome
    });

    // Save payment record
    setPayments((prev) => [result.record, ...prev]);

    if (result.success) {
      // Synchronize enrollment status to Confirmed & Paid
      markEnrollmentPaid(enrollment.enrollmentId, result.record.transactionReference);

      // Record in MySQL database
      apiService.payments.process({
        enrollmentId: enrollment.enrollmentId,
        studentId: student.id,
        studentName: student.name,
        courseId: course.id,
        courseTitle: course.title,
        amount: result.record.amount,
        paymentMethod
      }).catch(() => {});

      addNotification({
        title: "Tuition Settlement Successful",
        message: `Payment of ₹${result.record.amount.toLocaleString()} for ${course.title} confirmed. Transaction ID: ${result.record.transactionReference}.`,
        type: "payment",
        userId: student.id,
        link: `/student/receipt/${result.record.paymentId}`
      });
    } else {
      addNotification({
        title: "Tuition Settlement Failed (Demo)",
        message: `Simulated transaction failed for ${course.title}. Reason: ${result.error}`,
        type: "warning",
        userId: student.id,
        link: `/student/payments`
      });
    }

    return result;
  };

  return (
    <PaymentContext.Provider
      value={{
        payments,
        getPaymentById,
        getPaymentsForStudent,
        getPaymentForEnrollment,
        processPayment
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
