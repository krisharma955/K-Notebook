package com.K955.K_Notebook.Service;

import com.K955.K_Notebook.DTOs.JournalRequest;
import com.K955.K_Notebook.DTOs.JournalResponse;
import com.K955.K_Notebook.DTOs.UpdateJournalRequest;
import org.jspecify.annotations.Nullable;

import java.util.List;

public interface JournalService {
    JournalResponse createJournal(JournalRequest request);

    JournalResponse getJournalById(Long id);

    List<JournalResponse> getAllJournals();

    void deleteJournal(Long id);

    JournalResponse updateJournal(Long id, UpdateJournalRequest request);

    List<JournalResponse> getAllAdminJournals();
}
