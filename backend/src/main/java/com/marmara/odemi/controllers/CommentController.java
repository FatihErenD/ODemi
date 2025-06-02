package com.marmara.odemi.controllers;


import com.marmara.odemi.entity.Comment;
import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Lesson;
import com.marmara.odemi.entity.User;
import com.marmara.odemi.repository.CommentsRepository;
import com.marmara.odemi.repository.CourseRepository;
import com.marmara.odemi.repository.LessonRepository;
import com.marmara.odemi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comment")
@CrossOrigin(origins = "http://localhost:3000")
public class CommentController {

    private final CommentsRepository commentsRepo;
    private final CourseRepository courseRepo;
    private final LessonRepository lessonRepo;
    private final UserRepository userRepo;

    public CommentController(CommentsRepository commentsRepo, CourseRepository courseRepo, LessonRepository lessonRepository, UserRepository userRepo) {
        this.commentsRepo = commentsRepo;
        this.courseRepo = courseRepo;
        this.lessonRepo = lessonRepository;
        this.userRepo = userRepo;
    }


    public record CommentDto(
            String username,
            String content,
            String createdAt
    ) {}

    @GetMapping("/comments")
    public ResponseEntity<List<CommentController.CommentDto>> getComments(
            @RequestParam("course_id") Long courseId,
            @RequestParam(value = "lesson_id", required = false) Long lessonId) {
        List<Comment> comments;

        if (lessonId == null || lessonId < 1)
            comments = commentsRepo.findByCourseIdAndLessonIsNull(courseId);
        else
            comments = commentsRepo.findByCourseIdAndLessonId(courseId, lessonId);

        List<CommentDto> dtos = comments.stream()
                .map(c -> new CommentDto(
                        c.getUser().getUsername(),
                        c.getContent(),
                        c.getCreatedAt().toString()
                ))
                .toList();

        return ResponseEntity.ok(dtos);
    }

    @PostMapping("/add")
    public ResponseEntity<?> addComment(@RequestBody CommentRequest request,
                                        @AuthenticationPrincipal UserDetails userDetails) {
        String username = userDetails.getUsername();
        User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Kullanıcı bulunamadı"));

        Course course = courseRepo.findById(request.courseId())
                .orElseThrow(() -> new RuntimeException("Kurs bulunamadı"));

        Lesson lesson = null;
        if (request.lessonId() != null) {
            lesson = lessonRepo.findById(request.lessonId())
                    .orElseThrow(() -> new RuntimeException("Ders bulunamadı"));
        }

        Comment comment = new Comment(user, request.content(), course, lesson);
        commentsRepo.save(comment);

        return ResponseEntity.ok("Yorum başarıyla eklendi.");
    }


    public record CommentRequest(
            String content,
            Long courseId,
            Long lessonId
    ) {}
}
