package com.marmara.odemi;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public class AddCourseRequest {
    private MultipartFile file;
    private String title;
    private String description;
    private List<Long> categories;


    // getter ve setter’lar
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public List<Long> getCategories() { return categories; }
    public void setCategories(List<Long> categories) { this.categories = categories; }

    public MultipartFile getFile() { return file; }
    public void setFile(MultipartFile file) { this.file = file; }
}
