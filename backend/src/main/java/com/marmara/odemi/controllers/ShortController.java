package com.marmara.odemi.controllers;

import com.marmara.odemi.entity.Short;
import com.marmara.odemi.service.ShortService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/shorts")
public class ShortController {


    private ShortService shortService;

    @Autowired
    public ShortController(ShortService shortService) {
        this.shortService = shortService;
    }

    @GetMapping
    public List<Short> getAllShorts() {
        return shortService.getAllShorts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Short> getShortById(@PathVariable Integer id) {
        return shortService.getShortById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Short createShort(@RequestBody Short shortVideo) {
        return shortService.createShort(shortVideo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteShort(@PathVariable Integer id) {
        shortService.deleteShort(id);
        return ResponseEntity.ok().build();
    }
}
