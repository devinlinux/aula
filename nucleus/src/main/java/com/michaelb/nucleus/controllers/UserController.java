package com.michaelb.nucleus.controllers;

// imports
import java.util.Map;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;

import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.services.UserService;
import com.michaelb.nucleus.dto.UserDTO;
import com.michaelb.nucleus.dto.RegisterDTO;
import com.michaelb.nucleus.dto.LoginRequestDTO;
import com.michaelb.nucleus.dto.LoginResponseDTO;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterDTO request) {
        if (request.password() == null || request.password().isEmpty())
            throw new RuntimeException("Registration requires password");

        User exists = null;
        try {
            exists = this.service.getUserByEmail(request.email());
        } catch (Exception e) {
            //  do nothing :)
        }
        if (exists != null)
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(Map.of("message", "User already exists"));

        User user = request.intoUser();
        User saved = this.service.registerUser(user);

        String secret = this.service.createSession(user.getEmail());
        return ResponseEntity.ok().body(new LoginResponseDTO(saved.intoDTO(), secret));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> loginUser(@RequestBody LoginRequestDTO request) {
        User user = this.service.getUserByEmail(request.email());
        boolean valid = this.service.verifyPassword(user, request.password());

        if (!valid)
            return ResponseEntity.notFound().build();

        String secret = this.service.createSession(user.getEmail());
        return ResponseEntity.ok().body(new LoginResponseDTO(user.intoDTO(), secret));
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestBody String secret) {
        this.service.logout(secret);
        return ResponseEntity.ok().body("Successfully logged out");
    }

    @GetMapping("/me/{email}")
    public ResponseEntity<UserDTO> getUser(@PathVariable String email) {
        User user = this.service.getUserByEmail(email);
        return ResponseEntity.ok().body(user.intoDTO());
    }

    @PostMapping("/upload-profile-picture")
    public ResponseEntity<String> uploadProfilePicture(@RequestParam("email") String email, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(this.service.uploadProfilePicture(email, file));
    }

    @GetMapping("/profile-picture/{email}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable String email) throws IOException {
        User user = this.service.getUserByEmail(email);
        return ResponseEntity.ok().body(Files.readAllBytes(Path.of(user.getProfilePicture())));
    }

    @GetMapping("/health-check")
    public ResponseEntity<String> healthCheck() {
        return ResponseEntity.ok().body("Hello World");
    }
}
