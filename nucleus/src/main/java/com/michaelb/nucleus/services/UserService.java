package com.michaelb.nucleus.services;

// imports
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.michaelb.nucleus.repositories.UserRepo;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.util.FileOperations;
import static com.michaelb.nucleus.util.Constants.USER_IMAGE_DIR;

@Service
@Transactional(rollbackOn = Exception.class)
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

        user.setId(java.util.UUID.randomUUID().toString());
        
        String hashed = passwordEncoder.encode(user.getPassword());
        user.setPassword(hashed);
        
        return this.repo.save(user);
    }

    public User getUserById(String id) {
        return this.repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return this.repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Transactional
    public String uploadProfilePicture(String email, MultipartFile profilePicture) {
//        User user = this.getUserByEmail(email);
//        String url = FileOperations.imageSaver.apply(USER_IMAGE_DIR, user.getId(), profilePicture);
//        user.setProfilePicture(url);
//        this.repo.saveAndFlush(user);
//        return url;
        return "";
    }

    public boolean verifyPassword(User user, String raw) {
        return passwordEncoder.matches(raw, user.getPassword());
    }
}
