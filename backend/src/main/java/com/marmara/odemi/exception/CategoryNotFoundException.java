package com.marmara.odemi.exception;

public class CategoryNotFoundException extends RuntimeException {
    public CategoryNotFoundException(Long id) {
        super("Kategori bulunamadı: " + id);
    }
}
