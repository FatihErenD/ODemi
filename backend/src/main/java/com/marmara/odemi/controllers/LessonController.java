package com.marmara.odemi.controllers;

import com.marmara.odemi.AddLessonRequest;
import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Lesson;
import com.marmara.odemi.repository.CourseRepository;
import com.marmara.odemi.repository.LessonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/lesson")
@CrossOrigin(origins = "http://localhost:3000")
public class LessonController {
    private static final String VIDEO_UPLOAD_DIR = "../frontend/public/videos";

    private LessonRepository lessonRepo;
    private CourseRepository courseRepo;

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

    @PostMapping(value = "/addLesson", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addLesson(@ModelAttribute AddLessonRequest request) {
        Course course = courseRepo.findById(request.getCourse_id())
                .orElseThrow(() -> new RuntimeException("Course not found"));

        int currentEp = Math.toIntExact(lessonRepo.countLessonsByCourseId(request.getCourse_id()));

        MultipartFile videoFile = request.getFile();
        String videoUrl = null;

        if (videoFile != null && !videoFile.isEmpty()) {
            try {
                File uploadDir = new File(VIDEO_UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                String videoName = UUID.randomUUID() + "_" + videoFile.getOriginalFilename();
                Path videoPath = Paths.get(VIDEO_UPLOAD_DIR, videoName);
                Files.write(videoPath, videoFile.getBytes());
                videoUrl = "/videos/" + videoName;
            } catch (IOException e) {
                return ResponseEntity.status(500).body(Map.of("error", "Video yükleme başarısız."));
            }
        }

        // ✅ Lesson nesnesi oluşturuluyor
        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setEp(currentEp + 1);
        lesson.setVideo(videoUrl);
        lesson.setCourse(course); // ilişkili kurs

        lessonRepo.save(lesson);

        return ResponseEntity.ok(Map.of(
                "message", "Ders başarıyla eklendi",
                "lessonId", lesson.getId()
        ));
    }

}
