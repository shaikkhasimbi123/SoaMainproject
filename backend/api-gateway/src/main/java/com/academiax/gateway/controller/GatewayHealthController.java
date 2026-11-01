package com.academiax.gateway.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

/**
 * API Gateway Gateway & Proxy Routing Controller
 */
@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class GatewayHealthController {

    private final RestTemplate restTemplate;

    @Value("${services.auth.url:http://localhost:8081}")
    private String authServiceUrl;

    @Value("${services.course.url:http://localhost:8082}")
    private String courseServiceUrl;

    @Value("${services.enrollment.url:http://localhost:8083}")
    private String enrollmentServiceUrl;

    @Value("${services.payment.url:http://localhost:8084}")
    private String paymentServiceUrl;

    public GatewayHealthController(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, Object>> getHealth() {
        Map<String, Object> health = new HashMap<>();
        health.put("status", "UP");
        health.put("service", "AcademiaX API Gateway");
        health.put("architecture", "Service-Oriented Architecture (SOA)");
        health.put("timestamp", Instant.now().toString());

        Map<String, String> downstream = new HashMap<>();
        downstream.put("auth-service", authServiceUrl);
        downstream.put("course-service", courseServiceUrl);
        downstream.put("enrollment-service", enrollmentServiceUrl);
        downstream.put("payment-dti-service", paymentServiceUrl);
        health.put("downstreamServices", downstream);

        return ResponseEntity.ok(health);
    }
}
