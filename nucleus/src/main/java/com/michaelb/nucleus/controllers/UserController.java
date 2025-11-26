package com.michaelb.nucleus.controllers;

// imports
import java.util.concurrent.ConcurrentHashMap;
import java.util.UUID;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

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
    private final ConcurrentHashMap<String, Boolean> activeSessions;

    public UserController(UserService service) {
        this.service = service;
        this.activeSessions = new ConcurrentHashMap<>();
    }

    @PostMapping("/register")
    public LoginResponseDTO registerUser(@RequestBody RegisterDTO request) {
        if (request.password() == null || request.password().isEmpty())
            throw new RuntimeException("Password is required");
        User user = request.intoUser();
        User saved = this.service.registerUser(user);

        this.activeSessions.put(saved.getId(), true);
        return new LoginResponseDTO(saved.intoDTO(), UUID.randomUUID().toString());
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginRequestDTO request) {
        User user = this.service.getUserByEmail(request.email());
        boolean valid = this.service.verifyPassword(user, request.password());

        //  TODO: add success code?
        if (!valid)
            return new LoginResponseDTO(null, null);
        else {
            this.activeSessions.put(user.getId(), true);
            return new LoginResponseDTO(user.intoDTO(), UUID.randomUUID().toString());
        }
    }

    @PostMapping("/logout/{email}")
    public String logout(@PathVariable String email) {
        User user = this.service.getUserByEmail(email);
        this.activeSessions.remove(user.getId());
        return "Successfully logged out";
    }

    @GetMapping("/{email}")
    public UserDTO getUser(@PathVariable String email) {
        User user = this.service.getUserByEmail(email);
        return user.intoDTO();
    }

    @PostMapping("/{email}/profile-picture")
    public String uploadProfilePicture(
            @PathVariable String email,
            @RequestParam("file") MultipartFile profilePicture)
    {
        return this.service.uploadProfilePicture(email, profilePicture);
    }

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Hello World";
    }
}
