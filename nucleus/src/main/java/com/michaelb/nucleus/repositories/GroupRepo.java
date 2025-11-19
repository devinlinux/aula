package com.michaelb.nucleus.repositories;

// imports
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.michaelb.nucleus.models.Group;

@Repository
public interface GroupRepo extends JpaRepository<Group, String> {
    Optional<Group> findById(String id);
    Optional<Group> findByName(String name);
}
