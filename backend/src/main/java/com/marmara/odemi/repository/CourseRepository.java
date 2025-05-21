package com.marmara.odemi.repository;

import com.marmara.odemi.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
