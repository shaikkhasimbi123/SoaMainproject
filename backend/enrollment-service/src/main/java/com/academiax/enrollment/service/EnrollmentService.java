package com.academiax.enrollment.service;

import com.academiax.enrollment.model.Enrollment;
import com.academiax.enrollment.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class EnrollmentService {

    private final EnrollmentRepository enrollmentRepository;

    public EnrollmentService(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getStudentEnrollments(String studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public List<Enrollment> getCourseEnrollments(String courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public long getActiveEnrollmentsCount(String courseId) {
        return enrollmentRepository.countByCourseIdAndStatusNot(courseId, "Cancelled");
    }

    public Enrollment createEnrollment(Enrollment enrollment) {
        // Enforce duplicate enrollment protection in MySQL
        boolean alreadyEnrolled = enrollmentRepository.existsByStudentIdAndCourseIdAndStatusNot(
                enrollment.getStudentId(), enrollment.getCourseId(), "Cancelled");

        if (alreadyEnrolled) {
            throw new IllegalStateException("Student is already actively registered in course " + enrollment.getCourseId());
        }

        if (enrollment.getEnrollmentId() == null || enrollment.getEnrollmentId().isBlank()) {
            enrollment.setEnrollmentId("ENR-" + LocalDate.now().getYear() + "-" + (1000 + (int)(Math.random() * 9000)));
        }

        if (enrollment.getEnrollmentDate() == null) {
            enrollment.setEnrollmentDate(LocalDate.now());
        }

        enrollment.setStatus("Pending Payment");
        enrollment.setPaymentStatus("Pending");
        enrollment.setLastUpdated(LocalDateTime.now());

        return enrollmentRepository.save(enrollment);
    }

    public Optional<Enrollment> cancelEnrollment(String enrollmentId, String reason) {
        Optional<Enrollment> opt = enrollmentRepository.findById(enrollmentId);
        if (opt.isPresent()) {
            Enrollment e = opt.get();
            e.setStatus("Cancelled");
            e.setCancellationReason(reason != null ? reason : "Student voluntary cancellation");
            e.setLastUpdated(LocalDateTime.now());
            return Optional.of(enrollmentRepository.save(e));
        }
        return Optional.empty();
    }

    public boolean updatePaymentStatus(String enrollmentId, String status, String txnRef) {
        Optional<Enrollment> opt = enrollmentRepository.findById(enrollmentId);
        if (opt.isPresent()) {
            Enrollment e = opt.get();
            e.setPaymentStatus(status);
            if ("Successful".equalsIgnoreCase(status)) {
                e.setStatus("Confirmed");
            }
            e.setTransactionReference(txnRef);
            e.setLastUpdated(LocalDateTime.now());
            enrollmentRepository.save(e);
            return true;
        }
        return false;
    }
}
