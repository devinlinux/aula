package com.michaelb.nucleus.repositories;

// imports
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.michaelb.nucleus.models.User;

@Repository
public interface UserRepo extends JpaRepository<User, String> {
    Optional<User> findById(String id);
    Optional<User> findByEmail(String email);
}
