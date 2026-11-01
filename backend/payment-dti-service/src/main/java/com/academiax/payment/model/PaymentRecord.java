package com.academiax.payment.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Payment Entity mapped to MySQL 'payments' table
 */
@Entity
@Table(name = "payments")
public class PaymentRecord {

    @Id
    @Column(name = "payment_id", length = 40)
    private String paymentId;

    @Column(name = "enrollment_id", nullable = false, length = 40)
    private String enrollmentId;

    @Column(name = "student_id", nullable = false, length = 32)
    private String studentId;

    @Column(name = "student_name", nullable = false, length = 120)
    private String studentName;

    @Column(name = "course_id", nullable = false, length = 32)
    private String courseId;

    @Column(name = "course_title", nullable = false, length = 200)
    private String courseTitle;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "payment_method", nullable = false, length = 50)
    private String paymentMethod; // 'UPI Demo', 'Card Demo', 'Net Banking Demo'

    @Column(name = "payment_status", nullable = false, length = 30)
    private String paymentStatus; // 'Successful', 'Failed', 'Pending'

    @Column(name = "transaction_reference", nullable = false, unique = true, length = 60)
    private String transactionReference;

    @Column(name = "payment_date", nullable = false)
    private LocalDateTime paymentDate;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Embedded
    @AttributeOverrides({
        @AttributeOverride(name = "baseTuition", column = @Column(name = "dti_base_tuition")),
        @AttributeOverride(name = "techLabSurcharge", column = @Column(name = "dti_tech_lab_surcharge")),
        @AttributeOverride(name = "digitalLibraryFee", column = @Column(name = "dti_digital_library_fee")),
        @AttributeOverride(name = "examLevy", column = @Column(name = "dti_exam_levy")),
        @AttributeOverride(name = "taxGST", column = @Column(name = "dti_tax_gst")),
        @AttributeOverride(name = "total", column = @Column(name = "dti_total"))
    })
    private DTIBreakdown dtiBreakdown;

    public PaymentRecord() {
        this.paymentDate = LocalDateTime.now();
    }

    // Getters and Setters
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }

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

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public DTIBreakdown getDtiBreakdown() { return dtiBreakdown; }
    public void setDtiBreakdown(DTIBreakdown dtiBreakdown) { this.dtiBreakdown = dtiBreakdown; }
}
