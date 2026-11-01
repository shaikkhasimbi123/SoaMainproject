/**
 * Payment Simulation and DTI Transaction Utilities
 * Designed strictly for educational frontend simulation.
 */

import { calculateDTI } from "./formatters";

export const PAYMENT_METHODS = [
  {
    id: "upi",
    name: "UPI Demo",
    description: "Google Pay, PhonePe, Paytm, or BHIM Virtual Payment Address",
    icon: "Smartphone"
  },
  {
    id: "card",
    name: "Card Demo",
    description: "Credit or Debit Card simulation (Visa, Mastercard, RuPay)",
    icon: "CreditCard"
  },
  {
    id: "netbanking",
    name: "Net Banking Demo",
    description: "Simulated Indian Commercial Banks (SBI, HDFC, ICICI, Axis)",
    icon: "Building"
  }
];

export const generateTransactionRef = () => {
  const timestamp = Date.now().toString().slice(-6);
  const randomHex = Math.floor(1000 + Math.random() * 9000);
  return `TXN-AX-${timestamp}${randomHex}`;
};

export const simulatePaymentProcessing = ({
  enrollment,
  course,
  student,
  paymentMethod = "UPI Demo",
  forceOutcome = "success" // 'success' or 'failure'
}) => {
  return new Promise((resolve) => {
    // Simulated network processing latency of 1200ms
    setTimeout(() => {
      const isSuccess = forceOutcome === "success";
      const txRef = generateTransactionRef();
      const amount = Number(course?.tuitionFee || enrollment?.amount || 0);
      const dti = calculateDTI(amount, course?.dti);

      const paymentRecord = {
        paymentId: `PAY-${Date.now().toString().slice(-6)}`,
        enrollmentId: enrollment.enrollmentId,
        studentId: student.id,
        studentName: student.name,
        courseId: course.id,
        courseTitle: course.title,
        amount,
        paymentMethod,
        paymentStatus: isSuccess ? "Successful" : "Failed",
        transactionReference: txRef,
        paymentDate: new Date().toISOString(),
        notes: isSuccess
          ? `Simulated tuition settlement complete via ${paymentMethod}.`
          : `Simulated gateway decline or timeout (${paymentMethod}).`,
        dtiBreakdown: dti
      };

      resolve({
        success: isSuccess,
        record: paymentRecord,
        error: isSuccess ? null : "Simulated bank authorization failed or user cancelled."
      });
    }, 1200);
  });
};
