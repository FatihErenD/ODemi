package com.marmara.odemi;

import com.marmara.odemi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.
        AuthenticationManager;
import org.springframework.security.config.annotation.authentication.
        configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.
        HttpSecurity;
import org.springframework.security.config.http.
        SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.
        BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.
        UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtAuthenticationFilter jwtFilter;

    @Autowired
    private UserService userService;

    /** AuthenticationManager bean’i: kullanıcı adı/şifre doğrulaması için */
    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration config
    ) throws Exception {
        return config.getAuthenticationManager();
    }

    /** Parola encoder: veritabanında hash’li şifre saklamak için */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /** Güvenlik kural zinciri */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())                   // CSRF (stateless API için kapalı)
                .authorizeHttpRequests(auth ->
                        auth
                                .requestMatchers("/api/auth/login")
                                .permitAll()                            // Giriş endpoint’i açık
                                .anyRequest()
                                .authenticated()                       // Diğerleri korumalı
                )
                .sessionManagement(sess ->
                        sess.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS)       // Oturum yok, her istek stateless
                )
                .addFilterBefore(
                        jwtFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }
}
