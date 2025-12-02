package com.michaelb.nucleus.repositories;

//  imports
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.michaelb.nucleus.models.ForumPost;

@Repository
public interface ForumRepo extends JpaRepository<ForumPost, String> {
    Optional<ForumPost> findById(String id);
}