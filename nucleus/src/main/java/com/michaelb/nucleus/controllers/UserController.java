package com.michaelb.nucleus.controllers;

// imports
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.multipart.MultipartFile;

import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService service;
    private final ConcurrentHashMap<String, Boolean> activeSessions;

    public UserController(UserService service) {
        this.service = service;
        this.activeSessions = new ConcurrentHashMap<>();
    }
}
