package com.marmara.odemi.controllers;

import com.marmara.odemi.JwtResponse;
import com.marmara.odemi.LoginRequest;
import com.marmara.odemi.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private AuthenticationManager authManager;
    private JwtService jwtService;

    @Autowired
    public LoginController(AuthenticationManager theAuthManager,
                           JwtService theJwtService) {
        this.authManager = theAuthManager;
        this.jwtService = theJwtService;
    }

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody LoginRequest loginRequest) {
        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        UserDetails user = (UserDetails) auth.getPrincipal();

        String token = jwtService.generateToken(user);

        return ResponseEntity.ok(new JwtResponse(token));
    }

}
