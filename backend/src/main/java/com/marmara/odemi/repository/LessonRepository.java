package com.marmara.odemi.repository;

import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {
    @Query(
            value = "SELECT * FROM Lesson ls WHERE ls.course_id = :courseId ORDER BY ep ASC",
            nativeQuery = true
    )
    List<Lesson> findByCourseId(@Param("courseId") Long courseId);
}
