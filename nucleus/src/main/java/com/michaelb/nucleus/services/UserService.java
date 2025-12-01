package com.michaelb.nucleus.services;

// imports
import java.util.UUID;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Scope;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.repositories.UserRepo;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.util.FileOperations;
import static com.michaelb.nucleus.util.Constants.USER_IMAGE_DIR;

@Service
@Transactional(rollbackOn = Exception.class)
@Scope("singleton")
public class UserService {
    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final ConcurrentMap<String, String> activeSessions;

    public UserService(UserRepo repo, PasswordEncoder passwordEncoder) {
        this.repo = repo;
        this.passwordEncoder = passwordEncoder;
        this.activeSessions = new ConcurrentHashMap<>();
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

    public String uploadProfilePicture(String email, MultipartFile profilePicture) {
        User user = this.getUserByEmail(email);
        String url = FileOperations.imageSaver(USER_IMAGE_DIR, user.getEmail(), profilePicture);
        user.setProfilePicture(url);
        this.repo.save(user);
        return url;
    }

    public void addToGroup(User user, String id) {
        user.addToGroup(id);
        this.repo.save(user);
    }

    public String createSession(String email) {
        String secret = UUID.randomUUID().toString();
        this.activeSessions.put(secret, email);
        return secret;
    }

    public boolean isLoggedIn(String secret) {
        return this.activeSessions.containsKey(secret);
    }

    public void logout(String secret) {
        this.activeSessions.remove(secret);
    }

    public String emailFromSecret(String secret) {
        return this.activeSessions.get(secret);
    }
}
