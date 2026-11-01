package com.academiax.course.service;

import com.academiax.course.model.Course;
import com.academiax.course.repository.CourseRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }

    public Course saveCourse(Course course) {
        if (course.getId() == null || course.getId().isBlank()) {
            course.setId("CRS-" + (100 + (int)(Math.random() * 900)));
        }

        // Calculate DTI components if not explicit
        if (course.getBaseTuition() == null && course.getTuitionFee() != null) {
            BigDecimal fee = course.getTuitionFee();
            course.setBaseTuition(fee.multiply(new BigDecimal("0.78")).setScale(2, RoundingMode.HALF_UP));
            course.setTechLabSurcharge(fee.multiply(new BigDecimal("0.12")).setScale(2, RoundingMode.HALF_UP));
            course.setDigitalLibraryFee(fee.multiply(new BigDecimal("0.05")).setScale(2, RoundingMode.HALF_UP));
            course.setExamLevy(fee.subtract(course.getBaseTuition().add(course.getTechLabSurcharge()).add(course.getDigitalLibraryFee())));
        }

        return courseRepository.save(course);
    }

    public boolean deleteCourse(String id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean toggleStatus(String id) {
        Optional<Course> opt = courseRepository.findById(id);
        if (opt.isPresent()) {
            Course c = opt.get();
            c.setStatus("Active".equalsIgnoreCase(c.getStatus()) ? "Inactive" : "Active");
            courseRepository.save(c);
            return true;
        }
        return false;
    }
}
