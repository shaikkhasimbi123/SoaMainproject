package com.academiax.auth.model;

import jakarta.persistence.*;
import java.time.LocalDate;

/**
 * User Entity mapped to MySQL 'users' table
 */
@Entity
@Table(name = "users")
public class User {

    @Id
    @Column(length = 32)
    private String id;

    @Column(nullable = false, length = 120)
    private String name;

    @Column(nullable = false, unique = true, length = 150)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false, length = 30)
    private String role; // 'student', 'instructor', 'admin'

    @Column(nullable = false, length = 100)
    private String department;

    private String semester;
    private String designation;
    private String phone;
    private String avatar;

    @Column(name = "registered_at", nullable = false)
    private LocalDate registeredAt;

    @Column(length = 20)
    private String status = "Active";

    public User() {}

    public User(String id, String name, String email, String password, String role, String department, LocalDate registeredAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
        this.department = department;
        this.registeredAt = registeredAt;
        this.status = "Active";
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }

    public String getSemester() { return semester; }
    public void setSemester(String semester) { this.semester = semester; }

    public String getDesignation() { return designation; }
    public void setDesignation(String designation) { this.designation = designation; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getAvatar() { return avatar; }
    public void setAvatar(String avatar) { this.avatar = avatar; }

    public LocalDate getRegisteredAt() { return registeredAt; }
    public void setRegisteredAt(LocalDate registeredAt) { this.registeredAt = registeredAt; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
}
