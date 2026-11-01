package com.academiax.payment;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class PaymentDtiApplication {

    public static void main(String[] args) {
        SpringApplication.run(PaymentDtiApplication.class, args);
        System.out.println("AcademiaX Payment & DTI Service running on port 8084 with MySQL persistence.");
    }
}
