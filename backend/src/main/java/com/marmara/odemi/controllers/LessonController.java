package com.marmara.odemi.controllers;

import com.marmara.odemi.AddLessonRequest;
import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Lesson;
import com.marmara.odemi.repository.CourseRepository;
import com.marmara.odemi.repository.LessonRepository;
import jakarta.servlet.http.HttpServletRequest;
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
public class LessonController {
    private static final String VIDEO_UPLOAD_DIR = "../frontend/public/videos";

    private LessonRepository lessonRepo;
    private CourseRepository courseRepo;

    @Autowired
    public LessonController(LessonRepository lessonRepo, CourseRepository courseRepo) {
        this.lessonRepo = lessonRepo;
        this.courseRepo = courseRepo;
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

    @PostMapping(value = "/test-lesson", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> testLessonUpload(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("course_id") Long courseId,
            @RequestParam("file") MultipartFile file
    ) {
        System.out.println("✅ Başlık: " + title);
        System.out.println("✅ İçerik: " + content);
        System.out.println("✅ Course ID: " + courseId);
        System.out.println("✅ Dosya: " + file.getOriginalFilename());

        return ResponseEntity.ok(Map.of("message", "Parametreler başarıyla alındı."));
    }


    @PostMapping(value = "/add-lesson", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addLesson(@ModelAttribute AddLessonRequest request) {
        System.out.println(request.getTitle());
        Course course = courseRepo.findById(request.getCourse_id())
                .orElseThrow(() -> new RuntimeException("Course not found"));
        System.out.println("deneme");

        int currentEp = Math.toIntExact(lessonRepo.countLessonsByCourseId(request.getCourse_id()));
        System.out.println(currentEp);
        MultipartFile videoFile = request.getFile();
        if (videoFile == null) {
            System.out.println("sa");
        }
        String videoUrl = null;



        // 📥 Dosya kontrolü
        if (videoFile != null && !videoFile.isEmpty()) {
            try {
                // 🔍 Debug loglar
                System.out.println("📥 Dosya geldi: " + videoFile.getOriginalFilename());
                System.out.println("📏 Dosya boyutu: " + videoFile.getSize() + " bytes");

                String originalFileName = videoFile.getOriginalFilename();
                if (originalFileName == null || originalFileName.trim().isEmpty()) {
                    return ResponseEntity.badRequest().body(Map.of("error", "Dosya adı geçersiz."));
                }

                File uploadDir = new File(VIDEO_UPLOAD_DIR);
                if (!uploadDir.exists()) {
                    boolean dirCreated = uploadDir.mkdirs();
                    System.out.println("📁 Upload klasörü oluşturuldu mu? " + dirCreated);
                }

                String videoName = UUID.randomUUID() + "_" + originalFileName;
                Path videoPath = Paths.get(VIDEO_UPLOAD_DIR, videoName);
                Files.write(videoPath, videoFile.getBytes());

                videoUrl = "/videos/" + videoName;

            } catch (IOException e) {
                e.printStackTrace(); // Stack trace görmek önemli
                return ResponseEntity.status(500).body(Map.of("error", "Video yükleme başarısız."));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("error", "Video dosyası zorunludur."));
        }

        Lesson lesson = new Lesson();
        lesson.setTitle(request.getTitle());
        lesson.setContent(request.getContent());
        lesson.setEp(currentEp + 1);
        lesson.setVideo(videoUrl);
        lesson.setCourse(course);

        lessonRepo.save(lesson);

        return ResponseEntity.ok(Map.of(
                "message", "Ders başarıyla eklendi",
                "lessonId", lesson.getId()
        ));
    }


}
