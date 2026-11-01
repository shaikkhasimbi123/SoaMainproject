package com.academiax.enrollment.controller;

import com.academiax.enrollment.model.Enrollment;
import com.academiax.enrollment.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService enrollmentService;

    public EnrollmentController(EnrollmentService enrollmentService) {
        this.enrollmentService = enrollmentService;
    }

    @GetMapping
    public ResponseEntity<List<Enrollment>> getAllEnrollments() {
        return ResponseEntity.ok(enrollmentService.getAllEnrollments());
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable String studentId) {
        return ResponseEntity.ok(enrollmentService.getStudentEnrollments(studentId));
    }

    @GetMapping("/course/{courseId}/count")
    public ResponseEntity<Map<String, Object>> getActiveCount(@PathVariable String courseId) {
        long count = enrollmentService.getActiveEnrollmentsCount(courseId);
        return ResponseEntity.ok(Map.of("courseId", courseId, "activeEnrollments", count));
    }

    @PostMapping
    public ResponseEntity<?> createEnrollment(@RequestBody Enrollment enrollment) {
        try {
            Enrollment saved = enrollmentService.createEnrollment(enrollment);
            return ResponseEntity.ok(saved);
        } catch (IllegalStateException ex) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "message", ex.getMessage()));
        }
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<?> cancelEnrollment(
            @PathVariable String id,
            @RequestBody(required = false) Map<String, String> payload) {
        String reason = payload != null ? payload.get("reason") : "Voluntary cancellation";
        return enrollmentService.cancelEnrollment(id, reason)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
