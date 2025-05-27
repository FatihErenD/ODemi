package com.marmara.odemi.controllers;

import com.marmara.odemi.entity.*;
import com.marmara.odemi.repository.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {
    private static final String THUMB_UPLOAD_DIR = "../frontend/public/thumbs";
    private final UserRepository userRepo;
    private final LessonRepository lessonRepo;
    private final EnrollmentRepository enrollRepo;
    private final CourseRepository courseRepo;
    private final CategoryRepository categoryRepo;
    private final CourseCategoryRepository courseCategoryRepo;

    public CourseController(UserRepository userRepo,
                            EnrollmentRepository enrollRepo,
                            LessonRepository lessonRepo,
                            CourseRepository courseRepo,
                            CategoryRepository categoryRepo,
                            CourseCategoryRepository courseCategoryRepo) {
        this.userRepo    = userRepo;
        this.enrollRepo  = enrollRepo;
        this.lessonRepo = lessonRepo;
        this.courseRepo = courseRepo;
        this.categoryRepo = categoryRepo;
        this.courseCategoryRepo = courseCategoryRepo;
    }

    public record CourseDto(
            Long course_id,
            String title,
            String thumbnail
    ) {}

    @GetMapping("/all-courses")
    public ResponseEntity<List<CourseDto>> getAllCourses() {

        List<CourseDto> dtos = courseRepo.findAll().stream()
                .map(c -> new CourseDto(
                        c.getId(),
                        c.getTitle(),
                        c.getThumbnail()
                ))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/my-courses")
    public ResponseEntity<List<CourseDto>> getMyCourses(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
         User user = (User) userRepo.findByUsername(username)
                 .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

         List<CourseDto> courses = enrollRepo.findByUser(user)
                 .stream()
                 .map(e-> e.getCourse())
                 .map(c -> new CourseDto(c.getId(), c.getTitle(), c.getThumbnail()))
                 .toList();
         return ResponseEntity.ok(courses);
    }

    public record CategoryDto(
            Long category_id,
            String name
    ) {};

    @GetMapping("/all-categories")
    public ResponseEntity<List<CategoryDto>> getAllCategories() {
        List<CategoryDto> categories = categoryRepo.findAll()
                .stream()
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .toList();
        return ResponseEntity.ok(categories);
    }


    public record LessonDto(
            String title,
            String content,
            String url,
            Integer ep
    ) {};

    @GetMapping("/{courseId}/lessons")
    public ResponseEntity<List<LessonDto>> getLessons(@PathVariable Long courseId) {
        List<LessonDto> dtos = lessonRepo.findByCourseIdOrderByEpAsc(courseId)
                .stream()
                .map(l -> new LessonDto(
                        l.getTitle(),
                        l.getContent(),
                         courseId+ "/" +  l.getEp(),
                        l.getEp()
                ))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    record AddCourseRequest(String title, String description, List<Long> categories) {}

    @PostMapping("/add-course")
    public ResponseEntity<?> addCourse(@RequestBody AddCourseRequest req,  @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        User user = (User) userRepo.findByUsername(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("Kullanıcı bulunamadı"));

        Course course = new Course();

        course.setTitle(req.title());
        course.setDescription(req.description());
        course.setUser(user);

        courseRepo.save(course);

        for (Long catId : req.categories()) {
            System.out.println();
            Category category = categoryRepo.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + catId));

            CourseCategory cc = new CourseCategory();
            cc.setCourse(course);
            cc.setCategory(category);
            courseCategoryRepo.save(cc);
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(Map.of("message", "KURS EKLENDİ"));
    }





    @PostMapping("/thumbs")
    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body(Map.of("error", "Dosya boş."));
        }

        try {
            // Kayıt klasörünü oluştur
            File uploadDir = new File(THUMB_UPLOAD_DIR);
            if (!uploadDir.exists()) uploadDir.mkdirs();

            // Dosyayı kaydet
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            Path filePath = Paths.get(THUMB_UPLOAD_DIR, fileName);
            Files.write(filePath, file.getBytes());

            String fileUrl = "/thumbs/" + fileName; // Örn: frontend erişimi için

            return ResponseEntity.ok(Map.of("fileUrl", fileUrl));
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("error", "Yükleme başarısız."));
        }
    }

}
