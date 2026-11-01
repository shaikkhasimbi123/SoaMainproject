package com.academiax.eureka;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.server.EnableEurekaServer;

/**
 * AcademiaX Netflix Eureka Discovery Server
 * Port: 8761
 * Serves as the central Service Registry for all SOA Microservices:
 * - API Gateway (8080)
 * - Auth Service (8081)
 * - Course Service (8082)
 * - Enrollment Service (8083)
 * - Payment & DTI Service (8084)
 */
@SpringBootApplication
@EnableEurekaServer
public class EurekaServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(EurekaServerApplication.class, args);
        System.out.println("=============================================================");
        System.out.println("AcademiaX Eureka Discovery Server running on http://localhost:8761");
        System.out.println("SOA Service Registry active for dynamic microservice lookup.");
        System.out.println("=============================================================");
    }
}
