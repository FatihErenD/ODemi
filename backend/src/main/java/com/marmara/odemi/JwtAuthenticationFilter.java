package com.marmara.odemi;

import com.marmara.odemi.service.JwtService;
import com.marmara.odemi.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.
        UsernamePasswordAuthenticationFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.
        UsernamePasswordAuthenticationToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtService jwtService;

    private UserService userDetailsService;

    @Autowired
    public JwtAuthenticationFilter(JwtService jwtService, UserService userDetailsService) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        // 2) Token'ı çıkar (“Bearer ” öneki çıkarılır)
        String token = authHeader.substring(7);
        String username = jwtService.extractUsername(token);

        // 3) Henüz doğrulanmamışsa işle
        if (username != null &&
                SecurityContextHolder.getContext().getAuthentication() == null) {

            UserDetails userDetails = userDetailsService
                    .loadUserByUsername(username);

            // 4) Token geçerli mi?
            if (jwtService.isTokenValid(token, userDetails)) {
                // 5) Spring SecurityContext’e kimliği set et
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(
                                userDetails, null, userDetails.getAuthorities()
                        );
                SecurityContextHolder.getContext()
                        .setAuthentication(authToken);
            }
        }

        // 6) Zincirde sıradaki filtre/handler'a devam et
        filterChain.doFilter(request, response);
    }
}
