package com.michaelb.nucleus.services;

// imports
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import jakarta.transaction.Transactional;

import com.michaelb.nucleus.models.Group;
import com.michaelb.nucleus.repositories.GroupRepo;
import com.michaelb.nucleus.util.FileOperations;
import static com.michaelb.nucleus.util.Constants.GROUP_IMAGE_DIR;

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
        return repo.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
    }

    public String uploadBannerImage(String id, MultipartFile image) {
        Group group = this.getGroupById(id);
        String url = FileOperations.imageSaver.apply(GROUP_IMAGE_DIR, id, image);
        group.bannerImage(url);
        this.repo.save(group);
        return url;
    }
}
