package com.marmara.odemi.entity;

import jakarta.persistence.*;

@Entity
@IdClass(CourseCategoryId.class)
@Table(name = "course_category")
public class CourseCategory {

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Id
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    public CourseCategory() {
    }

    public CourseCategory(Course course, Category category) {
        this.course = course;
        this.category = category;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }
}
