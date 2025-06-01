package com.marmara.odemi.controllers;

import com.marmara.odemi.AddCourseRequest;
import com.marmara.odemi.CourseResponse;
import com.marmara.odemi.entity.*;
import com.marmara.odemi.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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

    @Autowired
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

    @GetMapping("/{id}")
    public ResponseEntity<CourseResponse> getCourse(@PathVariable Long id) {
        Course course = courseRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Kurs bulunamadı"));

        CourseResponse response = new CourseResponse(
                course.getId(),
                course.getTitle(),
                course.getDescription(),
                course.getUser().getUsername(),
                null,
                course.getThumbnail(),
                null
//                course.getLessons().stream()
//                        .map(lesson -> lesson.getTitle())
//                        .collect(Collectors.toList())

        );

        return ResponseEntity.ok(response);
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

    @GetMapping("/search")
    public ResponseEntity<List<CourseDto>> getSearchedCourses(@RequestParam("search") String search) {
        List<CourseDto> dtos = courseRepo
                .findByTitleContainingIgnoreCase(search)
                .stream()
                .map(c -> new CourseDto(
                        c.getId(),
                        c.getTitle(),
                        c.getThumbnail()
                ))
                .toList();
        return ResponseEntity.ok(dtos);
    }

    @GetMapping("/courses")
    public ResponseEntity<List<CourseDto>> getCoursesByUsername(@RequestParam("username") String username) {
        User selectedUser = userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı"));

        List<CourseDto> courses = courseRepo.findByUser(selectedUser).stream()
                .map(c -> new CourseDto(c.getId(), c.getTitle(), c.getThumbnail()))
                .toList();
        return ResponseEntity.ok(courses);
    }

    // SADECE KAYITLI OLDUGU KURSLARI GOSTERECEK ŞEKİLDE DÜZENLE
    @GetMapping("/my-courses")
    public ResponseEntity<List<CourseDto>> getMyCourses(@AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
         User user = (User) userRepo.findByUsername(username)
                 .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

         List<CourseDto> courses = enrollRepo.findByUserOrderByEnrolledAtDesc(user)
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

    @GetMapping("/categories")
    public ResponseEntity<List<CategoryDto>> getCategories(@RequestParam("course_id") Long courseId) {
        List<CategoryDto> list = courseCategoryRepo.findCategoryIdsByCourseId(courseId)
                .stream().
                map(id -> categoryRepo.findById(id)
                        .orElseThrow(() -> new RuntimeException("sa")))
                .map(c -> new CategoryDto(c.getId(), c.getName()))
                .toList();
        return ResponseEntity.ok(list);
    }

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
            Integer ep,
            String video
    ) {};




    @PostMapping(value = "/add-course", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addCourse(
            @ModelAttribute AddCourseRequest req,
            @AuthenticationPrincipal UserDetails userDetails
    ) {
        String username = userDetails.getUsername();
        User user = (User) userRepo.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Kullanıcı bulunamadı"));

        // Dosya yükle
        String fileUrl = null;
        MultipartFile file = req.getFile();
        if (file != null && !file.isEmpty()) {
            try {
                File uploadDir = new File(THUMB_UPLOAD_DIR);
                if (!uploadDir.exists()) uploadDir.mkdirs();

                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                Path filePath = Paths.get(THUMB_UPLOAD_DIR, fileName);
                Files.write(filePath, file.getBytes());
                fileUrl = "/thumbs/" + fileName;
            } catch (IOException e) {
                return ResponseEntity.status(500).body(Map.of("error", "Yükleme başarısız."));
            }
        }

        Course course = new Course();
        course.setTitle(req.getTitle());
        course.setDescription(req.getDescription());
        course.setUser(user);
        course.setThumbnail(fileUrl);
        courseRepo.save(course);

        for (Long catId : req.getCategories()) {
            Category category = categoryRepo.findById(catId)
                    .orElseThrow(() -> new RuntimeException("Kategori bulunamadı: " + catId));

            CourseCategory cc = new CourseCategory();
            cc.setCourse(course);
            cc.setCategory(category);
            courseCategoryRepo.save(cc);
        }

        return ResponseEntity.ok(Map.of("message", "Kurs başarıyla eklendi",
                "course_id", course.getId()));
    }
//    @PostMapping("/add-course")
//    public ResponseEntity<?> addCourse(@RequestBody AddCourseRequest req,  @AuthenticationPrincipal UserDetails userDetails) {
//        String username = userDetails.getUsername();
//        User user = userRepo.findByUsername(username)
//                  .orElseThrow(() -> new UserNotFoundException(username));
//
//        Course course = new Course();
//
//        course.setTitle(req.title());
//        course.setDescription(req.description());
//        course.setUser(user);
//
//        courseRepo.save(course);
//
//        for (Long catId : req.categories()) {
//            System.out.println();
//            Category category = categoryRepo.findById(catId)
//                       .orElseThrow(() -> new CategoryNotFoundException(catId));
//
//            CourseCategory cc = new CourseCategory();
//            cc.setCourse(course);
//            cc.setCategory(category);
//            courseCategoryRepo.save(cc);
//        }
//
//        return ResponseEntity
//                .status(HttpStatus.OK)
//                .body(Map.of("message", "KURS EKLENDİ"));
//    }





//    @PostMapping("/thumbs")
//    public ResponseEntity<Map<String, String>> uploadFile(@RequestParam("file") MultipartFile file) {
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body(Map.of("error", "Dosya boş."));
//        }
//
//        try {
//            // Kayıt klasörünü oluştur
//            File uploadDir = new File(THUMB_UPLOAD_DIR);
//            if (!uploadDir.exists()) uploadDir.mkdirs();
//
//            // Dosyayı kaydet
//            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
//            Path filePath = Paths.get(THUMB_UPLOAD_DIR, fileName);
//            Files.write(filePath, file.getBytes());
//
//            String fileUrl = "/thumbs/" + fileName; // Örn: frontend erişimi için
//
//            return ResponseEntity.ok(Map.of("fileUrl", fileUrl));
//        } catch (IOException e) {
//            e.printStackTrace();
//            return ResponseEntity.status(500).body(Map.of("error", "Yükleme başarısız."));
//        }
//    }

}
