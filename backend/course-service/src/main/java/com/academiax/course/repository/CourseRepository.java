package com.academiax.course.repository;

import com.academiax.course.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, String> {

    List<Course> findByDepartment(String department);

    List<Course> findByInstructorId(String instructorId);

    List<Course> findByStatus(String status);
}
