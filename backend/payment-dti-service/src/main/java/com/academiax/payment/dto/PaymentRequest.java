package com.academiax.payment.dto;

import java.math.BigDecimal;

public class PaymentRequest {
    private String enrollmentId;
    private String studentId;
    private String studentName;
    private String courseId;
    private String courseTitle;
    private BigDecimal amount;
    private String paymentMethod; // 'UPI Demo', 'Card Demo', 'Net Banking Demo'
    private String forceOutcome = "success"; // 'success' or 'failure'

    public PaymentRequest() {}

    // Getters and Setters
    public String getEnrollmentId() { return enrollmentId; }
    public void setEnrollmentId(String enrollmentId) { this.enrollmentId = enrollmentId; }

    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getStudentName() { return studentName; }
    public void setStudentName(String studentName) { this.studentName = studentName; }

    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }
    public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getForceOutcome() { return forceOutcome; }
    public void setForceOutcome(String forceOutcome) { this.forceOutcome = forceOutcome; }
}
