package com.marmara.odemi.controllers;

import com.marmara.odemi.CourseResponse;
import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Enrollment;
import com.marmara.odemi.entity.EnrollmentId;
import com.marmara.odemi.entity.User;
import com.marmara.odemi.repository.CourseRepository;
import com.marmara.odemi.repository.EnrollmentRepository;
import com.marmara.odemi.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/enroll")
@CrossOrigin(origins = "http://localhost:3000")
public class EnrollmentController {
    private final UserRepository userRepo;
    private final CourseRepository courseRepo;
    private final EnrollmentRepository enrollRepo;

    @Autowired
    public EnrollmentController(UserRepository userRepo,
                                CourseRepository courseRepo,
                                EnrollmentRepository enrollmentRepo)
    {
        this.userRepo = userRepo;
        this.courseRepo = courseRepo;
        this.enrollRepo = enrollmentRepo;
    }

    @PostMapping("")
    public ResponseEntity<?> enrollUser(@RequestParam("username") String username,
                                        @RequestParam("course_id") Long courseId
                                        )
    {

        User user = (User) userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Course course = courseRepo.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Kurs bulunamadı"));

        EnrollmentId compositeId = new EnrollmentId(user.getId(), courseId);
        boolean alreadyEnrolled = enrollRepo.existsById(compositeId);

        if (alreadyEnrolled) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Kullanıcı bu kursa zaten kayıtlı.");
        }

        // Yeni kayıt oluştur
        Enrollment enrollment = new Enrollment(user, course);
        enrollRepo.save(enrollment);

        return ResponseEntity.ok("Kayıt başarılı.");

    }
}
