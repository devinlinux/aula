package com.michaelb.nucleus.services;

// imports
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.function.BiFunction;
import java.util.function.Function;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.repositories.UserRepo;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.util.Constants;

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
        String url = profilePictureFunction.apply(id, profilePicture);
        user.profilePicture(url);
        this.userRepo.save(user);
        return url;
    }

    private final Function<String, String> fileExtension = filename -> Optional.of(filename).filter(name -> name.contains("."))
            .map(name -> "." + name.substring(filename.lastIndexOf(".") + 1)).orElse(".png");

    private final BiFunction<String, MultipartFile, String> profilePictureFunction = (id, image) -> {
        String filename = id + fileExtension.apply(image.getOriginalFilename());

        try {
            Path fileStorageLocation = Paths.get(Constants.RESOURCES_DIR).toAbsolutePath().normalize();
            if (Files.exists(fileStorageLocation))
                Files.createDirectories((fileStorageLocation));
            Files.copy(image.getInputStream(), fileStorageLocation.resolve(id + ".png"), REPLACE_EXISTING);
            return ServletUriComponentsBuilder
                    .fromCurrentContextPath().path(filename).toUriString();
        } catch (IOException e) {
            throw new RuntimeException("Unable to save image");
        }
    };
}
