package com.michaelb.nucleus.services;

// imports
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.michaelb.nucleus.repositories.UserRepo;
import com.michaelb.nucleus.models.User;

@Service
public class UserService {
    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(User user) {
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            throw new RuntimeException("Password is required");
        }

        String hashed = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashed);
        
        return this.repo.save(user);
    }

    public User getUserByEmail(String email) {
        return this.repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public boolean verifyPassword(User user, String raw) {
        return passwordEncoder.matches(raw, user.getPassword());
    }
}
