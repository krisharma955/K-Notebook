package com.K955.K_Notebook.DTOs;

public record UpdateJournalRequest(
        String title,
        String content,
        String thumbnailUrl,
        Boolean isPublic
) {
}
