package com.marmara.odemi.controllers;

import com.marmara.odemi.entity.Lesson;
import com.marmara.odemi.entity.User;
import com.marmara.odemi.repository.CourseRepository;
import com.marmara.odemi.repository.EnrollmentRepository;
import com.marmara.odemi.repository.LessonRepository;
import com.marmara.odemi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final UserRepository userRepo;
    private final LessonRepository lessonRepo;
    private final EnrollmentRepository enrollRepo;
    private final CourseRepository courseRepo;

    public CourseController(UserRepository userRepo,
                            EnrollmentRepository enrollRepo,
                            LessonRepository lessonRepo,
                            CourseRepository courseRepo) {
        this.userRepo    = userRepo;
        this.enrollRepo  = enrollRepo;
        this.lessonRepo = lessonRepo;
        this.courseRepo = courseRepo;
    }

    public record CourseDto(
            Long id,
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



}
