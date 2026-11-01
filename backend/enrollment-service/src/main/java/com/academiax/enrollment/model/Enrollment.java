package com.academiax.enrollment.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * Enrollment Entity mapped to MySQL 'enrollments' table
 */
@Entity
@Table(name = "enrollments")
public class Enrollment {

    @Id
    @Column(name = "enrollment_id", length = 40)
    private String enrollmentId;

    @Column(name = "student_id", nullable = false, length = 32)
    private String studentId;

    @Column(name = "student_name", nullable = false, length = 120)
    private String studentName;

    @Column(name = "course_id", nullable = false, length = 32)
    private String courseId;

    @Column(name = "course_title", nullable = false, length = 200)
    private String courseTitle;

    @Column(name = "enrollment_date", nullable = false)
    private LocalDate enrollmentDate;

    @Column(nullable = false, length = 30)
    private String status = "Pending Payment"; // 'Pending Payment', 'Confirmed', 'Cancelled'

    @Column(name = "payment_status", nullable = false, length = 30)
    private String paymentStatus = "Pending"; // 'Pending', 'Successful', 'Failed'

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "transaction_reference", length = 60)
    private String transactionReference;

    @Column(name = "cancellation_reason")
    private String cancellationReason;

    @Column(name = "last_updated")
    private LocalDateTime lastUpdated;

    public Enrollment() {
        this.lastUpdated = LocalDateTime.now();
    }

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

    public LocalDate getEnrollmentDate() { return enrollmentDate; }
    public void setEnrollmentDate(LocalDate enrollmentDate) { this.enrollmentDate = enrollmentDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public String getCancellationReason() { return cancellationReason; }
    public void setCancellationReason(String cancellationReason) { this.cancellationReason = cancellationReason; }

    public LocalDateTime getLastUpdated() { return lastUpdated; }
    public void setLastUpdated(LocalDateTime lastUpdated) { this.lastUpdated = lastUpdated; }
}
