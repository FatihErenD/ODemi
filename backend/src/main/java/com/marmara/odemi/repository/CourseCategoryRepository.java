package com.marmara.odemi.repository;

import com.marmara.odemi.entity.CourseCategory;
import com.marmara.odemi.entity.CourseCategoryId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseCategoryRepository extends JpaRepository<CourseCategory, CourseCategoryId> {
}
