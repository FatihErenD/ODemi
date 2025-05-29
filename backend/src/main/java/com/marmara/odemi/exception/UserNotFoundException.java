package com.marmara.odemi.exception;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String username) {
        super("Kullanıcı bulunamadı: " + username);
    }
}