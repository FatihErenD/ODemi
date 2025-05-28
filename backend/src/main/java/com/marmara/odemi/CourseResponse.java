package com.marmara.odemi;

import java.util.List;

public class CourseResponse {
    private Long id;
    private String title;
    private String description;
    private String instructorName;
    private String instructorPicture;
    private String thumbnail;
    private List<String> lessonTitles;

    public CourseResponse(Long id, String title, String description, String instructorName, String instructorPicture, String thumbnail, List<String> lessonTitles) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.instructorName = instructorName;
        this.instructorPicture = instructorPicture;
        this.thumbnail = thumbnail;
        this.lessonTitles = lessonTitles;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInstructorName() {
        return instructorName;
    }

    public void setInstructorName(String instructorName) {
        this.instructorName = instructorName;
    }

    public String getInstructorPicture() {
        return instructorPicture;
    }

    public void setInstructorPicture(String instructorPicture) {
        this.instructorPicture = instructorPicture;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public List<String> getLessonTitles() {
        return lessonTitles;
    }

    public void setLessonTitles(List<String> lessonTitles) {
        this.lessonTitles = lessonTitles;
    }
}


