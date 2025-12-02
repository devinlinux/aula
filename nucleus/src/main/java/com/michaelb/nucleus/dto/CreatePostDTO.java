package com.michaelb.nucleus.dto;

//  imports
import java.util.ArrayList;
import com.michaelb.nucleus.models.ForumPost;

public record CreatePostDTO(Long creationTime, String title, String associatedClass, String contents, String email) {
    public ForumPost intoPost() {
        return new ForumPost(
                creationTime,
                title,
                associatedClass,
                contents,
                email,
                new ArrayList<>()
        );
    }
}