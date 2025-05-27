package com.marmara.odemi.entity;

import java.io.Serializable;
import java.util.Objects;

/**
 * Composite key for CourseCategory join table using IdClass
 */
public class CourseCategoryId implements Serializable {

    private Long course;
    private Long category;

    public CourseCategoryId() {}

    public CourseCategoryId(Long course, Long category) {
        this.course = course;
        this.category = category;
    }

    public Long getCourse() {
        return course;
    }

    public void setCourse(Long course) {
        this.course = course;
    }

    public Long getCategory() {
        return category;
    }

    public void setCategory(Long category) {
        this.category = category;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof CourseCategoryId)) return false;
        CourseCategoryId that = (CourseCategoryId) o;
        return Objects.equals(course, that.course) && Objects.equals(category, that.category);
    }

    @Override
    public int hashCode() {
        return Objects.hash(course, category);
    }
}