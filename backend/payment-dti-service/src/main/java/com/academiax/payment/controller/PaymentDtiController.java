package com.academiax.payment.controller;

import com.academiax.payment.dto.PaymentRequest;
import com.academiax.payment.dto.PaymentResponse;
import com.academiax.payment.model.DTIBreakdown;
import com.academiax.payment.model.PaymentRecord;
import com.academiax.payment.service.PaymentDtiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "*")
public class PaymentDtiController {

    private final PaymentDtiService paymentDtiService;

    public PaymentDtiController(PaymentDtiService paymentDtiService) {
        this.paymentDtiService = paymentDtiService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentRecord>> getAllPayments() {
        return ResponseEntity.ok(paymentDtiService.getAllPayments());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<PaymentRecord>> getStudentPayments(@PathVariable String studentId) {
        return ResponseEntity.ok(paymentDtiService.getPaymentsByStudent(studentId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentRecord> getPaymentById(@PathVariable String id) {
        return paymentDtiService.getPaymentById(id)
                .or(() -> paymentDtiService.getPaymentByTransactionRef(id))
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/dti")
    public ResponseEntity<DTIBreakdown> getDtiBreakdown(@RequestParam(defaultValue = "25000") BigDecimal amount) {
        return ResponseEntity.ok(paymentDtiService.calculateDtiSpecification(amount));
    }

    @PostMapping("/process")
    public ResponseEntity<PaymentResponse> processPayment(@RequestBody PaymentRequest request) {
        PaymentResponse response = paymentDtiService.processTuitionPayment(request);
        if (response.isSuccess()) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }
    }
}
