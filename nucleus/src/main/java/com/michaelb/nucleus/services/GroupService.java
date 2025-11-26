package com.michaelb.nucleus.services;

// imports
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.models.Group;
import com.michaelb.nucleus.repositories.GroupRepo;

@Service
@Transactional(rollbackOn = Exception.class)
public class GroupService {
    private final GroupRepo repo;

    public GroupService(GroupRepo repo) {
        this.repo = repo;
    }

    public Group createGroup(Group group) {
        return this.repo.save(group);
    }

    public Group getGroupById(String id) {
        return this.repo.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public Page<Group> getAllGroups(int page, int size) {
        return this.repo.findAll(PageRequest.of(page, size, Sort.by("name")));
    }
}
