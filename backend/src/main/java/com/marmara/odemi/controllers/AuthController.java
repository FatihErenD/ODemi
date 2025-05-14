package com.marmara.odemi.controllers;

import com.marmara.odemi.auth.JwtUtil;
import com.marmara.odemi.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private AuthenticationManager authManager;
    private JwtUtil jwtUtil;
    private CustomUserDetailsService uds;

    @Autowired
    public AuthController(AuthenticationManager theAuthManager, JwtUtil theJwtUtil, CustomUserDetailsService theUds) {
        this.authManager = theAuthManager;
        this.jwtUtil = theJwtUtil;
        this.uds = theUds;
    }

    record AuthRequest(String username, String password) {}
    record AuthResponse(String token) {}

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest req) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(req.username(), req.password()));
        UserDetails user = uds.loadUserByUsername(req.username());
        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }
}
