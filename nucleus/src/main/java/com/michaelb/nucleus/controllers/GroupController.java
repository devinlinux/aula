package com.michaelb.nucleus.controllers;

// imports
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Objects;
import java.util.Map;

import com.michaelb.nucleus.services.UserService;
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

import com.michaelb.nucleus.models.Group;
import com.michaelb.nucleus.models.User;
import com.michaelb.nucleus.services.GroupService;
import com.michaelb.nucleus.dto.CreateGroupDTO;
import com.michaelb.nucleus.dto.EditGroupDTO;
import com.michaelb.nucleus.dto.JoinGroupDTO;

@RestController
@RequestMapping("/api/groups")
public class GroupController {

    private final GroupService groupService;
    private final UserService userService;

    public GroupController(GroupService groupService, UserService userService) {
        this.groupService = groupService;
        this.userService = userService;
    }

    @PostMapping("/create-group")
    public ResponseEntity<Group> createGroup(@RequestBody CreateGroupDTO request) {
        Group group = this.groupService.createGroup(request.intoGroup());
        User creator = this.userService.getUserByEmail(request.creator());

        this.userService.addToGroup(creator, group.getId());
        group.addMember(creator.getFirstName() + " " + creator.getLastName());

        return ResponseEntity.ok().body(group);
    }

    @GetMapping("/get-all-groups")
    public ResponseEntity<Page<Group>> getAllGroups(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value="size", defaultValue="10") int size)
    {
        return ResponseEntity.ok().body(this.groupService.getAllGroups(page, size));
    }

    @GetMapping("group/{id}")
    public ResponseEntity<Group> getGroup(@PathVariable String id) {
        return ResponseEntity.ok().body(this.groupService.getGroupById(id));
    }

    @PostMapping("/add-member")
    public ResponseEntity<Map<String, String>> addMemberToGroup(@RequestBody JoinGroupDTO request) {
        Group group = this.groupService.getGroupById(request.id());
        User user = this.userService.getUserByEmail(request.email());

        if (user.isInGroup(group.getId()))
            return ResponseEntity.ok().body(Map.of("message", "Already in group"));

        this.userService.addToGroup(user, group.getId());

        group.addMember(user.getFirstName() + " " + user.getLastName());
        this.groupService.createGroup(group);  //  essentially just saving
        return ResponseEntity.ok().body(Map.of("message", "Successfully added to group"));
    }

    @PostMapping("/edit-group")
    public ResponseEntity<?> editGroup(@RequestBody EditGroupDTO group) {
        String email = this.userService.emailFromSecret(group.secret());
        if (!Objects.equals(email, group.creator()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect user"));

        Group existing = this.groupService.getGroupById(group.id());
        existing.setName(group.name());
        existing.setAssociatedClass(group.associatedClass());
        existing.setTimes(group.times());

        return ResponseEntity.ok().body(this.groupService.createGroup(existing));
    }

    @PostMapping("/upload-banner-image")
    public ResponseEntity<String> uploadBannerImage(@RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        return ResponseEntity.ok().body(this.groupService.uploadBannerImage(id, file));
    }

    @PostMapping("/edit-banner-image")
    public ResponseEntity<?> editBannerImage(@RequestParam("secret") String secret, @RequestParam("id") String id, @RequestParam("file") MultipartFile file) {
        Group group = this.groupService.getGroupById(id);
        String email = this.userService.emailFromSecret(secret);
        if (!Objects.equals(email, group.getCreator()))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Incorrect user"));

        return ResponseEntity.ok().body(this.groupService.uploadBannerImage(id, file));
    }

    @GetMapping("/banner-image/{id}")
    public ResponseEntity<byte[]> getBannerImage(@PathVariable String id) throws IOException {
        Group group = this.groupService.getGroupById(id);
        return ResponseEntity.ok().body(Files.readAllBytes(Path.of(group.getBannerImage())));
    }

    @GetMapping("/health-check")
    public String healthCheck() {
        return "Helo World";
    }
}
