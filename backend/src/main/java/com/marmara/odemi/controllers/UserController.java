package com.marmara.odemi.controllers;

import com.marmara.odemi.UpdateUserNameRequest;
import com.marmara.odemi.entity.User;
import com.marmara.odemi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users") // <-- DÜZENLENDİ (frontend ile eşleşsin)
public class UserController {


    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PutMapping("/update-username")
    public ResponseEntity<String> updateUsername(@RequestBody UpdateUserNameRequest request) {
        userService.updateUsername(request.getOldUsername(), request.getNewUsername());
        return ResponseEntity.ok("Username updated successfully");
    }

    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestParam String username) {
        return userService.getUserProfile(username)
                .<ResponseEntity<?>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(404).body("Kullanıcı bulunamadı"));
    }
}
