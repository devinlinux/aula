package com.michaelb.nucleus.controllers;

// imports
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
import org.springframework.data.domain.Page;

import com.michaelb.nucleus.models.Group;
import com.michaelb.nucleus.services.GroupService;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService service;

    public GroupController(GroupService service) {
        this.service = service;
    }

    @PostMapping("/create-group")
    public ResponseEntity<Group> createGroup(@RequestBody Group request) {
        return ResponseEntity.ok().body(this.service.createGroup(request));
    }

    @GetMapping("/get-all-groups")
    public ResponseEntity<Page<Group>> getAllGroups(@RequestParam(value = "page", defaultValue = "0") int page, @RequestParam(value="size", defaultValue="10") int size) {
        return ResponseEntity.ok().body(this.service.getAllGroups(page, size));
    }

    @GetMapping("group/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable String id) {
        return ResponseEntity.ok().body(this.service.getGroupById(id));
    }

    @PostMapping("/upload-banner-image")
    public ResponseEntity<String> uploadBannerImage(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        Group group = this.service.getGroupById(id);
        return ResponseEntity.ok().body(this.service.uploadBannerImage(id, file));
    }

    @GetMapping("/banner-image/{id}")
    public ResponseEntity<byte[]> getBannerImage(@PathVariable String id) throws IOException {
        Group group = this.service.getGroupById(id);
        return ResponseEntity.ok().body(Files.readAllBytes(Path.of(group.getBannerImage())));
    }

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Helo World";
    }
}
