package com.marmara.odemi.controllers;

import com.marmara.odemi.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/lesson")
@CrossOrigin(origins = "http://localhost:3000")
public class LessonController {

    private LessonRepository lessonRepo;

    @Autowired
    public LessonController(LessonRepository lessonRepo) {
        this.lessonRepo = lessonRepo;
    }

    public record LessonDto(
            String title,
            String content,
            Integer ep,
            String video
    ) {};

    @GetMapping("")
    public ResponseEntity<List<LessonDto>> getLessons(@RequestParam("course_id") Long courseId) {
        List<LessonDto> lessonList = lessonRepo.findByCourseId(courseId)
                .stream()
                .map(lesson -> new LessonDto(
                        lesson.getTitle(),
                        lesson.getContent(),
                        lesson.getEp(),
                        lesson.getVideo()
                ))
                .toList();

        return ResponseEntity.ok(lessonList);
    }
}
