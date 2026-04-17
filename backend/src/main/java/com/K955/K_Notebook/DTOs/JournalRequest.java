package com.K955.K_Notebook.DTOs;

import jakarta.validation.constraints.NotBlank;

public record JournalRequest(

        @NotBlank(message = "Title cannot be empty")
        String title,

        String content,

        String thumbnailUrl,

        Boolean isPublic
) {
}
