package com.academiax.payment.repository;

import com.academiax.payment.model.PaymentRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentRecord, String> {

    List<PaymentRecord> findByStudentId(String studentId);

    List<PaymentRecord> findByEnrollmentId(String enrollmentId);

    Optional<PaymentRecord> findByTransactionReference(String transactionReference);

    boolean existsByEnrollmentIdAndPaymentStatus(String enrollmentId, String paymentStatus);
}
