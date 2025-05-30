package com.marmara.odemi.repository;

import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LessonRepository extends JpaRepository<Lesson, Long> {

    @Query(
            value = "SELECT * FROM lesson ls WHERE ls.course_id = :courseId ORDER BY ep ASC",
            nativeQuery = true
    )
    List<Lesson> findByCourseId(@Param("courseId") Long courseId);

    @Query(value = "SELECT COUNT(*) FROM lesson WHERE course_id = :courseId", nativeQuery = true)
    int countLessonsByCourseId(@Param("courseId") Long courseId);


    @Query(value = "SELECT * FROM lesson WHERE course_id = :courseId AND ep = :ep", nativeQuery = true)
    Optional<Lesson> findByCourseIdAndEp(@Param("courseId") Long courseId, @Param("ep") Integer ep);


}
