package com.academiax.auth.service;

import com.academiax.auth.dto.AuthResponse;
import com.academiax.auth.dto.LoginRequest;
import com.academiax.auth.model.User;
import com.academiax.auth.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public AuthResponse authenticate(LoginRequest request) {
        if (request.getEmail() == null || request.getPassword() == null) {
            return new AuthResponse(false, "Email and password are required.", null, null);
        }

        Optional<User> userOpt = userRepository.findByEmailIgnoreCase(request.getEmail().trim());
        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid credentials. User not found in MySQL registry.", null, null);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid password. Please check demo credentials.", null, null);
        }

        if ("Inactive".equalsIgnoreCase(user.getStatus())) {
            return new AuthResponse(false, "Account is deactivated by administrator.", null, null);
        }

        // Generate simulated JWT bearer token
        String simulatedToken = "Bearer.ey-demo-" + UUID.randomUUID() + "-" + user.getRole();

        // Create safe user copy without password
        User safeUser = new User();
        safeUser.setId(user.getId());
        safeUser.setName(user.getName());
        safeUser.setEmail(user.getEmail());
        safeUser.setRole(user.getRole());
        safeUser.setDepartment(user.getDepartment());
        safeUser.setSemester(user.getSemester());
        safeUser.setDesignation(user.getDesignation());
        safeUser.setPhone(user.getPhone());
        safeUser.setAvatar(user.getAvatar());
        safeUser.setRegisteredAt(user.getRegisteredAt());
        safeUser.setStatus(user.getStatus());

        return new AuthResponse(true, "Authentication successful", simulatedToken, safeUser);
    }

    public AuthResponse register(User newUser) {
        if (userRepository.existsByEmailIgnoreCase(newUser.getEmail())) {
            return new AuthResponse(false, "Email is already registered in MySQL database.", null, null);
        }

        if (newUser.getId() == null || newUser.getId().isBlank()) {
            String prefix = "student".equalsIgnoreCase(newUser.getRole()) ? "STU-2026-" : "INS-2026-";
            newUser.setId(prefix + (1000 + (int)(Math.random() * 9000)));
        }

        if (newUser.getRegisteredAt() == null) {
            newUser.setRegisteredAt(LocalDate.now());
        }

        newUser.setStatus("Active");
        User saved = userRepository.save(newUser);

        String simulatedToken = "Bearer.ey-demo-" + UUID.randomUUID() + "-registered";
        return new AuthResponse(true, "User successfully registered in MySQL", simulatedToken, saved);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    public boolean toggleStatus(String userId) {
        Optional<User> opt = userRepository.findById(userId);
        if (opt.isPresent()) {
            User user = opt.get();
            user.setStatus("Active".equalsIgnoreCase(user.getStatus()) ? "Inactive" : "Active");
            userRepository.save(user);
            return true;
        }
        return false;
    }
}
