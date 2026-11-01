package com.academiax.payment.dto;

import com.academiax.payment.model.PaymentRecord;

public class PaymentResponse {
    private boolean success;
    private String message;
    private String transactionReference;
    private PaymentRecord record;

    public PaymentResponse() {}

    public PaymentResponse(boolean success, String message, String transactionReference, PaymentRecord record) {
        this.success = success;
        this.message = message;
        this.transactionReference = transactionReference;
        this.record = record;
    }

    public boolean isSuccess() { return success; }
    public void setSuccess(boolean success) { this.success = success; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getTransactionReference() { return transactionReference; }
    public void setTransactionReference(String transactionReference) { this.transactionReference = transactionReference; }

    public PaymentRecord getRecord() { return record; }
    public void setRecord(PaymentRecord record) { this.record = record; }
}
