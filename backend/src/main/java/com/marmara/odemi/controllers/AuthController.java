package com.marmara.odemi.controllers;

import com.marmara.odemi.auth.JwtUtil;
import com.marmara.odemi.entity.User;
import com.marmara.odemi.repository.UserRepository;
import com.marmara.odemi.service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
    private AuthenticationManager authManager;
    private JwtUtil jwtUtil;
    private CustomUserDetailsService uds;
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(AuthenticationManager theAuthManager,
                          JwtUtil theJwtUtil,
                          CustomUserDetailsService theUds,
                          UserRepository userRepository,
                          PasswordEncoder passwordEncoder) {
        this.authManager = theAuthManager;
        this.jwtUtil = theJwtUtil;
        this.uds = theUds;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
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

    record RegisterRequest(String username, String email, String password) {}

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest req) {

        if (userRepository.existsByUsername(req.username)) {
            ResponseEntity
                    .badRequest()
                    .body(Map.of("error", "Bu kullanıcı adı zaten alınmış"));
        }

        User newUser = new User();
        newUser.setUsername(req.username());
        newUser.setEmail(req.email());
        newUser.setPassword(passwordEncoder.encode(req.password()));
        newUser.setRole("USER");

        userRepository.save(newUser);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(Map.of("message", "Kayıt başarılı. Giriş yapabilirsiniz"));
    }

    public static record ChangePasswordRequest(
            String currentPassword,
            String newPassword
    ) {}

    @PostMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest req, @AuthenticationPrincipal UserDetails userDetails) {
        // 3. Kullanıcıyı veritabanından çek
        String username = userDetails.getUsername();
        System.out.println(username + " hey yo ma nigyer");
        User user = (User) userRepository.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Kullanıcı bulunamadı"));

        String encodedCurrentPassword =passwordEncoder.encode(req.currentPassword);
        // 4. Mevcut şifre kontrolü
        if (passwordEncoder.matches(encodedCurrentPassword, user.getPassword())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Şifre zaten aynı."));
        }

        user.setPassword(passwordEncoder.encode(req.newPassword));
        userRepository.save(user);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("message", "Şifre başarıyla değişti"));
    }


    // Sadece kullanıcı adı isterseniz
    @GetMapping("/me")
    public String whoAmI(Principal principal) {
        return principal.getName();
    }

}
