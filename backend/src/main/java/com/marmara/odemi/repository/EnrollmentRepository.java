package com.marmara.odemi.repository;



import com.marmara.odemi.controllers.CourseController;
import com.marmara.odemi.entity.Enrollment;
import com.marmara.odemi.entity.EnrollmentId;
import com.marmara.odemi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {
    List<Enrollment> findByUser(User user);

}
