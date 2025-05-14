package com.marmara.odemi.repository;

import com.marmara.odemi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public class UserRepository extends JpaRepository<User, Long> {
    public Optional<Object> findByUsername(String username) {
        return null;
    }
}
