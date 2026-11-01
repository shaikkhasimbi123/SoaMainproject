package com.academiax.gateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

/**
 * AcademiaX API Gateway Microservice
 * Port: 8080
 * Provides unified entry point and CORS routing for the Service-Oriented Architecture.
 */
@SpringBootApplication
public class ApiGatewayApplication {

    public static void main(String[] args) {
        SpringApplication.run(ApiGatewayApplication.class, args);
        System.out.println("=========================================================");
        System.out.println("AcademiaX API Gateway running on port 8080");
        System.out.println("Routing to Microservices: Auth (8081), Courses (8082),");
        System.out.println("Enrollments (8083), Payments & DTI (8084)");
        System.out.println("=========================================================");
    }

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }
}
