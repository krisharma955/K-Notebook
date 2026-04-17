package com.K955.K_Notebook.Exception;

import org.springframework.http.HttpStatus;

import java.time.Instant;

public record ExceptionApi(
        HttpStatus status,
        String message,
        Instant timestamp
) {
}
