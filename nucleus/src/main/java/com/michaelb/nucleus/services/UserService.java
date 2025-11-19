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
    private final UserRepo userRepo;

    public UserService(UserRepo userRepo) {
        this.userRepo = userRepo;
    }

    public User createuser(User user) {
        return this.userRepo.save(user);
    }

    public User getUserById(String id) {
        return userRepo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public String uploadProfilePicture(String id, MultipartFile profilePicture) {
        User user = this.getUserById(id);
        String url = FileOperations.imageSaver.apply(USER_IMAGE_DIR, id, profilePicture);
        user.profilePicture(url);
        this.userRepo.save(user);
        return url;
    }
}
