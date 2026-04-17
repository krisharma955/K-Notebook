package com.K955.K_Notebook.Service;

import com.K955.K_Notebook.DTOs.JournalRequest;
import com.K955.K_Notebook.DTOs.JournalResponse;
import com.K955.K_Notebook.DTOs.UpdateJournalRequest;
import com.K955.K_Notebook.Entity.Journal;
import com.K955.K_Notebook.Exception.ResourceNotFoundException;
import com.K955.K_Notebook.Mapper.JournalMapper;
import com.K955.K_Notebook.Repository.JournalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class JournalServiceImpL implements JournalService{

    private final JournalRepository journalRepository;
    private final JournalMapper journalMapper;

    @Override
    public JournalResponse createJournal(JournalRequest request) {
        Journal journal = Journal.builder()
                .title(request.title())
                .content(request.content())
                .isPublic(request.isPublic())
                .thumbnailUrl(request.thumbnailUrl())
                .build();
        journalRepository.save(journal);
        return journalMapper.toJournalResponse(journal);
    }

    @Override
    public JournalResponse getJournalById(Long id) {
        Journal journal = journalRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException(id.toString(), "Journal"));
        return journalMapper.toJournalResponse(journal);
    }

    @Override
    public List<JournalResponse> getAllJournals() {
        List<Journal> journals = journalRepository.findAccessibleJournals();
        return journalMapper.toListOfJournalResponse(journals);
    }

    @Override
    public void deleteJournal(Long id) {
        Journal journal = journalRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException(id.toString(), "Journal"));
        journal.setDeletedAt(Instant.now());
        journalRepository.save(journal);
    }

    @Override
    public JournalResponse updateJournal(Long id, UpdateJournalRequest request) {
        Journal journal = journalRepository.findByIdAndDeletedAtIsNull(id)
                .orElseThrow(() -> new ResourceNotFoundException(id.toString(), "Journal"));

        if(request.title() != null) journal.setTitle(request.title());
        if(request.content() != null) journal.setContent(request.content());
        if(request.thumbnailUrl() != null) journal.setThumbnailUrl(request.thumbnailUrl());
        if(request.isPublic() != null) journal.setIsPublic(request.isPublic());

        Journal saved = journalRepository.save(journal);

        return journalMapper.toJournalResponse(saved);
    }

    @Override
    public List<JournalResponse> getAllAdminJournals() {
        List<Journal> journals = journalRepository.findByDeletedAtIsNullOrderByUpdatedAtDesc();
        return journalMapper.toListOfJournalResponse(journals);
    }
}
