package com.marmara.odemi.repository;

import com.marmara.odemi.controllers.CourseController;
import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.CourseCategory;
import com.marmara.odemi.entity.CourseCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, CourseCategoryId> {
    @Query("SELECT cc.category.id FROM CourseCategory cc WHERE cc.course.id = :courseId")
    List<Long> findCategoryIdsByCourseId(@Param("courseId") Long courseId);


}
