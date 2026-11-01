package com.academiax.enrollment.repository;

import com.academiax.enrollment.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, String> {

    List<Enrollment> findByStudentId(String studentId);

    List<Enrollment> findByCourseId(String courseId);

    long countByCourseIdAndStatusNot(String courseId, String status);

    boolean existsByStudentIdAndCourseIdAndStatusNot(String studentId, String courseId, String status);
}
