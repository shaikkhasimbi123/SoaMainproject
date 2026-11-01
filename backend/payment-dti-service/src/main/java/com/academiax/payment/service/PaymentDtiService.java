package com.academiax.payment.service;

import com.academiax.payment.dto.PaymentRequest;
import com.academiax.payment.dto.PaymentResponse;
import com.academiax.payment.model.DTIBreakdown;
import com.academiax.payment.model.PaymentRecord;
import com.academiax.payment.repository.PaymentRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PaymentDtiService {

    private final PaymentRepository paymentRepository;

    public PaymentDtiService(PaymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    public List<PaymentRecord> getAllPayments() {
        return paymentRepository.findAll();
    }

    public List<PaymentRecord> getPaymentsByStudent(String studentId) {
        return paymentRepository.findByStudentId(studentId);
    }

    public Optional<PaymentRecord> getPaymentById(String paymentId) {
        return paymentRepository.findById(paymentId);
    }

    public Optional<PaymentRecord> getPaymentByTransactionRef(String txnRef) {
        return paymentRepository.findByTransactionReference(txnRef);
    }

    public DTIBreakdown calculateDtiSpecification(BigDecimal amount) {
        return DTIBreakdown.compute(amount);
    }

    public PaymentResponse processTuitionPayment(PaymentRequest request) {
        // Prevent duplicate successful payments in MySQL
        boolean alreadyPaid = paymentRepository.existsByEnrollmentIdAndPaymentStatus(
                request.getEnrollmentId(), "Successful");

        if (alreadyPaid) {
            return new PaymentResponse(false, "Tuition fee for this enrollment is already settled successfully in MySQL.", null, null);
        }

        boolean isSuccess = !"failure".equalsIgnoreCase(request.getForceOutcome());
        String txnRef = "TXN-AX-" + System.currentTimeMillis() % 1000000 + (1000 + (int)(Math.random() * 9000));
        String paymentId = "PAY-" + (100000 + (int)(Math.random() * 900000));

        DTIBreakdown dti = DTIBreakdown.compute(request.getAmount());

        PaymentRecord record = new PaymentRecord();
        record.setPaymentId(paymentId);
        record.setEnrollmentId(request.getEnrollmentId());
        record.setStudentId(request.getStudentId());
        record.setStudentName(request.getStudentName());
        record.setCourseId(request.getCourseId());
        record.setCourseTitle(request.getCourseTitle());
        record.setAmount(request.getAmount());
        record.setPaymentMethod(request.getPaymentMethod() != null ? request.getPaymentMethod() : "UPI Demo");
        record.setPaymentStatus(isSuccess ? "Successful" : "Failed");
        record.setTransactionReference(txnRef);
        record.setPaymentDate(LocalDateTime.now());
        record.setNotes(isSuccess ? "Institutional tuition settled via " + record.getPaymentMethod() : "Simulated bank gateway decline");
        record.setDtiBreakdown(dti);

        PaymentRecord saved = paymentRepository.save(record);

        if (isSuccess) {
            return new PaymentResponse(true, "Tuition settlement confirmed in MySQL ledger.", txnRef, saved);
        } else {
            return new PaymentResponse(false, "Simulated payment authorization declined by issuer.", txnRef, saved);
        }
    }
}
