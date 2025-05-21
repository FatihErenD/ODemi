package com.marmara.odemi.entity;

import java.io.Serializable;
import java.util.Objects;

public class EnrollmentId implements Serializable {

    private Long user;
    private Long course;

    public EnrollmentId() {}
    public EnrollmentId(Long user, Long course) {
        this.user = user;
        this.course = course;
    }

    public Long getUser() { return user; }
    public void setUser(Long user) { this.user = user; }
    public Long getCourse() { return course; }
    public void setCourse(Long course) { this.course = course; }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof EnrollmentId)) return false;
        EnrollmentId that = (EnrollmentId) o;
        return Objects.equals(user, that.user) && Objects.equals(course, that.course);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user, course);
    }
}
