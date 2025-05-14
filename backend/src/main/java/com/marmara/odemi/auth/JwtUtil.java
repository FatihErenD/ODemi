package com.marmara.odemi.auth;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtUtil {

    private final SecretKey key;
    private final long expirationMs;

    public JwtUtil(
            @Value("${app.jwt.secret}") String secretBase64,
            @Value("${app.jwt.expiration}") long expirationMs
    ) {
        // Eğer secret Base64 ile kodlanmışsa:
        // byte[] keyBytes = Decoders.BASE64.decode(secret);
        // this.key = Keys.hmacShaKeyFor(keyBytes);
        // Değilse basitçe:
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretBase64));
        this.expirationMs = expirationMs;
    }

    public String generateToken(UserDetails user) {
        Date now = new Date();
        Date expiry = new Date(now.getTime() + expirationMs);

        return Jwts.builder()
                .subject(user.getUsername())                                    // eski setSubject → subject :contentReference[oaicite:0]{index=0}
                .claim("roles", user.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).toList())
                .issuedAt(now)                                                   // eski setIssuedAt → issuedAt :contentReference[oaicite:1]{index=1}
                .expiration(expiry)                                              // eski setExpiration → expiration :contentReference[oaicite:2]{index=2}
                .signWith(key)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()                                                // parserBuilder yerine parser() :contentReference[oaicite:3]{index=3}
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public String extractUsername(String token) {
        return extractAllClaims(token).getSubject();
    }

    public boolean validateToken(String token, UserDetails user) {
        Claims claims = extractAllClaims(token);
        return claims.getSubject().equals(user.getUsername()) &&
                claims.getExpiration().after(new Date());
    }
}