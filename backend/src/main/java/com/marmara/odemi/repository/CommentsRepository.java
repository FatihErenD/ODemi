package com.marmara.odemi.repository;

import com.marmara.odemi.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentsRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCourseIdAndLessonIsNull(Long courseId);
    List<Comment> findByCourseIdAndLessonId(Long courseId, Long lessonId);
}
