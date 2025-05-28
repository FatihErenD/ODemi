package com.marmara.odemi.controllers;

import com.marmara.odemi.UpdateUserNameRequest;
import com.marmara.odemi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PutMapping("/update-username")
    public ResponseEntity<String> updateUsername(@RequestBody UpdateUserNameRequest request) {
        userService.updateUsername(request.getOldUsername(), request.getNewUsername());
        return ResponseEntity.ok("Username updated successfully");
    }
}