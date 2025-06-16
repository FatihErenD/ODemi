package com.marmara.odemi.repository;

import com.marmara.odemi.entity.Course;
import com.marmara.odemi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByTitleContainingIgnoreCase(String search);
    List<Course> findByUser(User user);
    List<Course> findByUserIn(List<User> user);
}
