package com.marmara.odemi.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.util.Date;

@Service
public class JwtService {

    // HMAC-SHA256 imzası için kullandığımız gizli anahtar
    private final String SECRET_KEY = "gizli_jwt_key_12345";

    // 24 saatlik token ömrü (ms)
    private final long EXPIRATION_MS = 24 * 60 * 60 * 1000;

    /**
     * 0.9.x’de de 0.11.x’de de çalışan parser() API’si
     * -> parserBuilder() yoksa parser() kullanıyoruz.
     */
    private JwtParser getParser() {
        return (JwtParser) Jwts
                .parser()                                               // tek adımlı parser
                .setSigningKey(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }

    /** Kullanıcı adını çıkarmak için */
    public String extractUsername(String token) {
        Claims body = getParser()
                .parseClaimsJws(token)  // İmzayı da doğrular
                .getBody();
        return body.getSubject();
    }

    /** Token’ın süresi dolmuş mu? */
    private boolean isTokenExpired(String token) {
        Date exp = getParser()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return exp.before(new Date());
    }

    /** Token hâlâ geçerli mi? */
    public boolean isTokenValid(String token, UserDetails userDetails) {
        String username = extractUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    /** JWT üretmek için */
    public String generateToken(UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())                       // “sub” claim
                .setIssuedAt(new Date())                                     // “iat” claim
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_MS))
                .signWith(SignatureAlgorithm.HS256,
                        SECRET_KEY.getBytes(StandardCharsets.UTF_8))       // HMAC-SHA256 imza
                .compact();
    }
}
