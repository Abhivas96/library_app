package com.Abhishek.library_backend.requestModels;

import lombok.Data;

@Data
public class AddBookRequest {

    private String title;
    private String author;
    private String description;
    private String category;
    private int copies;
    private String img;
}
