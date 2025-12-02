package com.michaelb.nucleus.controllers;

//  imports
import java.util.Map;

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
import org.springframework.data.domain.Page;

import com.michaelb.nucleus.models.ForumPost;
import com.michaelb.nucleus.models.ForumResponse;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.services.ForumService;
import com.michaelb.nucleus.services.UserService;
import com.michaelb.nucleus.dto.CreatePostDTO;

@RestController
@RequestMapping("/api/forum")
public class ForumController {

    private final ForumService forumService;
    private final UserService userService;

    public ForumController(ForumService forumService, UserService userService) {
        this.forumService = forumService;
        this.userService = userService;
    }

    @PostMapping("/create-post")
    public ResponseEntity<ForumPost> createPost(@RequestBody CreatePostDTO request) {
        return ResponseEntity.ok().body(this.forumService.createPost(request.intoPost()));
    }

    @GetMapping("/forum/{id}")
    public ResponseEntity<ForumPost> getPost(@PathVariable String id) {
        return ResponseEntity.ok().body(this.forumService.getPostById(id));
    }

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Hello, World";
    }
}