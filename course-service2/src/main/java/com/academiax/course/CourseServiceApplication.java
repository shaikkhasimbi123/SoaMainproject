package com.academiax.course;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CourseServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(CourseServiceApplication.class, args);
        System.out.println("AcademiaX Course Catalog Service running on port 8086 with MySQL persistence.");
    }
}
