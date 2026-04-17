package com.K955.K_Notebook.DTOs;

import java.time.Instant;

public record JournalResponse(
        Long id,
        String title,
        String content,
        String thumbnailUrl,
        Boolean isPublic,
        Instant createdAt,
        Instant updatedAt
) {
}
