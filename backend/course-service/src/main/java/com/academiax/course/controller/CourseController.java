package com.academiax.course.controller;

import com.academiax.course.model.Course;
import com.academiax.course.service.CourseService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable String id) {
        return courseService.getCourseById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@RequestBody Course course) {
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Course> updateCourse(@PathVariable String id, @RequestBody Course course) {
        course.setId(id);
        return ResponseEntity.ok(courseService.saveCourse(course));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteCourse(@PathVariable String id) {
        boolean deleted = courseService.deleteCourse(id);
        return ResponseEntity.ok(Map.of("success", deleted, "id", id));
    }

    @PutMapping("/{id}/toggle")
    public ResponseEntity<Map<String, Object>> toggleStatus(@PathVariable String id) {
        boolean toggled = courseService.toggleStatus(id);
        return ResponseEntity.ok(Map.of("success", toggled, "id", id));
    }
}
