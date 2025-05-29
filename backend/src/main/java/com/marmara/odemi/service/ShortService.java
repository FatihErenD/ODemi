package com.marmara.odemi.service;

import com.marmara.odemi.entity.Short;
import com.marmara.odemi.repository.ShortRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ShortService {

    @Autowired
    private ShortRepository shortRepository;

    public List<Short> getAllShorts() {
        return shortRepository.findAll();
    }

    public Optional<Short> getShortById(Integer id) {
        return shortRepository.findById(id);
    }

    public Short createShort(Short shortVideo) {
        return shortRepository.save(shortVideo);
    }

    public void deleteShort(Integer id) {
        shortRepository.deleteById(id);
    }
}
