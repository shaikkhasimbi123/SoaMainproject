package com.academiax.course.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * Course Entity mapped to MySQL 'courses' table
 */
@Entity
@Table(name = "courses")
public class Course {

    @Id
    @Column(length = 32)
    private String id;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "full_description", columnDefinition = "TEXT")
    private String fullDescription;

    @Column(nullable = false, length = 120)
    private String instructor;

    @Column(name = "instructor_id", length = 32)
    private String instructorId;

    @Column(nullable = false, length = 100)
    private String department;

    @Column(name = "tuition_fee", nullable = false, precision = 10, scale = 2)
    private BigDecimal tuitionFee;

    @Column(nullable = false, length = 50)
    private String duration;

    @Column(nullable = false)
    private Integer capacity;

    @Column(name = "enrollment_deadline", nullable = false)
    private LocalDate enrollmentDeadline;

    private String prerequisites;
    private String level = "Intermediate";
    private Integer credits = 3;
    private String image;

    @Column(length = 20)
    private String status = "Active";

    // Itemized DTI Components
    @Column(name = "base_tuition", precision = 10, scale = 2)
    private BigDecimal baseTuition;

    @Column(name = "tech_lab_surcharge", precision = 10, scale = 2)
    private BigDecimal techLabSurcharge;

    @Column(name = "digital_library_fee", precision = 10, scale = 2)
    private BigDecimal digitalLibraryFee;

    @Column(name = "exam_levy", precision = 10, scale = 2)
    private BigDecimal examLevy;

    public Course() {}

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }

    public String getInstructor() { return instructor; }
    public void setInstructor(String instructor) { this.instructor = instructor; }

    public String getInstructorId() { return instructorId; }
    public void setInstructorId(String instructorId) { this.instructorId = instructorId; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public BigDecimal getTuitionFee() { return tuitionFee; }
    public void setTuitionFee(BigDecimal tuitionFee) { this.tuitionFee = tuitionFee; }

    public String getDuration() { return duration; }
    public void setDuration(String duration) { this.duration = duration; }

    public Integer getCapacity() { return capacity; }
    public void setCapacity(Integer capacity) { this.capacity = capacity; }

    public LocalDate getEnrollmentDeadline() { return enrollmentDeadline; }
    public void setEnrollmentDeadline(LocalDate enrollmentDeadline) { this.enrollmentDeadline = enrollmentDeadline; }

    public String getPrerequisites() { return prerequisites; }
    public void setPrerequisites(String prerequisites) { this.prerequisites = prerequisites; }

    public String getLevel() { return level; }
    public void setLevel(String level) { this.level = level; }

    public Integer getCredits() { return credits; }
    public void setCredits(Integer credits) { this.credits = credits; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public BigDecimal getBaseTuition() { return baseTuition; }
    public void setBaseTuition(BigDecimal baseTuition) { this.baseTuition = baseTuition; }

    public BigDecimal getTechLabSurcharge() { return techLabSurcharge; }
    public void setTechLabSurcharge(BigDecimal techLabSurcharge) { this.techLabSurcharge = techLabSurcharge; }

    public BigDecimal getDigitalLibraryFee() { return digitalLibraryFee; }
    public void setDigitalLibraryFee(BigDecimal digitalLibraryFee) { this.digitalLibraryFee = digitalLibraryFee; }

    public BigDecimal getExamLevy() { return examLevy; }
    public void setExamLevy(BigDecimal examLevy) { this.examLevy = examLevy; }
}
