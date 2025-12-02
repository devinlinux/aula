package com.michaelb.nucleus.services;

//  imports
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.models.ForumPost;
import com.michaelb.nucleus.repositories.ForumRepo;

@Service
@Transactional(rollbackOn = Exception.class)
public class ForumService {
    private final ForumRepo repo;

    public ForumService(ForumRepo repo) {
        this.repo = repo;
    }

    public ForumPost createPost(ForumPost post) {
        return this.repo.save(post);
    }

    public ForumPost getPostById(String id) {
        return this.repo.findById(id).orElseThrow(() -> new RuntimeException("Forum Post not found"));
    }

    public Page<ForumPost> getAllPosts(int page, int size) {
        return this.repo.findAll(PageRequest.of(page, size, Sort.by("creationTime")));
    }
}
