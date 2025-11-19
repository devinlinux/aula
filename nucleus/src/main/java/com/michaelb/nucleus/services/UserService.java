package com.michaelb.nucleus.services;

// imports
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.repositories.UserRepo;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.util.FileOperations;
import static com.michaelb.nucleus.util.Constants.USER_IMAGE_DIR;

@Service
@Transactional(rollbackOn = Exception.class)
public class UserService {
    private final UserRepo repo;

    public UserService(UserRepo repo) {
        this.repo = repo;
    }

    public User createuser(User user) {
        return this.repo.save(user);
    }

    public User getUserById(String id) {
        return this.repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return this.repo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String uploadProfilePicture(String id, MultipartFile profilePicture) {
        User user = this.getUserById(id);
        String url = FileOperations.imageSaver.apply(USER_IMAGE_DIR, id, profilePicture);
        user.profilePicture(url);
        this.repo.save(user);
        return url;
    }
}
