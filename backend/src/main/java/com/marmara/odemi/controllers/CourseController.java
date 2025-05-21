package com.marmara.odemi.controllers;

import com.marmara.odemi.entity.User;
import com.marmara.odemi.repository.EnrollmentRepository;
import com.marmara.odemi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/course")
@CrossOrigin(origins = "http://localhost:3000")
public class CourseController {

    private final UserRepository userRepo;
    private final EnrollmentRepository enrollRepo;

    public CourseController(UserRepository userRepo,
                            EnrollmentRepository enrollRepo) {
        this.userRepo    = userRepo;
        this.enrollRepo  = enrollRepo;
    }

    public record CourseDto(
            Long id,
            String title,
            String thumbnail
    ) {}

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
}
