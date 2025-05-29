package com.marmara.odemi.service;


import com.marmara.odemi.entity.User;
import com.marmara.odemi.exception.UserNotFoundException;
import com.marmara.odemi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.marmara.odemi.entity.User;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public void updateUsername(String oldUsername, String newUsername) {
        User user = (User) userRepository.findByUsername(oldUsername)
                .orElseThrow(() -> new UserNotFoundException(oldUsername));

        if (oldUsername.equals(newUsername)) {
            throw new IllegalArgumentException("Yeni kullanıcı adı eskisiyle aynı olamaz.");
        }

        user.setUsername(newUsername);
        userRepository.save(user);
    }

    public Optional<User> getUserProfile(String username) {
        return userRepository.findByUsername(username).map(user -> {
            if (user.getAvatarUrl() == null || user.getAvatarUrl().isBlank()) {
                user.setAvatarUrl("/profilepics/default.png");
            }
            return user;
        });
    }



}
