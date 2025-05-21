package com.marmara.odemi.repository;



import com.marmara.odemi.controllers.CourseController;
import com.marmara.odemi.entity.Enrollment;
import com.marmara.odemi.entity.EnrollmentId;
import com.marmara.odemi.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment, EnrollmentId> {
    List<Enrollment> findByUser(User user);

}
