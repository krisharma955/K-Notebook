package com.K955.K_Notebook.Controller;

import com.K955.K_Notebook.DTOs.JournalRequest;
import com.K955.K_Notebook.DTOs.JournalResponse;
import com.K955.K_Notebook.DTOs.UpdateJournalRequest;
import com.K955.K_Notebook.Service.JournalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/journals")
public class JournalController {

    private final JournalService journalService;

    @PostMapping("/admin/new")
    public ResponseEntity<JournalResponse> createJournal(@RequestBody JournalRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(journalService.createJournal(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JournalResponse> getJournalById(@PathVariable Long id) {
        return ResponseEntity.ok(journalService.getJournalById(id));
    }

    @GetMapping //journals which are public
    public ResponseEntity<List<JournalResponse>> getAllJournals() {
        return ResponseEntity.ok(journalService.getAllJournals());
    }

    @PatchMapping("/admin/{id}")
    public ResponseEntity<JournalResponse> updateJournal(@PathVariable Long id,
                                                         @RequestBody UpdateJournalRequest request) {
        return ResponseEntity.ok(journalService.updateJournal(id, request));
    }

    @DeleteMapping("/admin/{id}")
    public ResponseEntity<Void> deleteJournal(@PathVariable Long id) {
        journalService.deleteJournal(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<JournalResponse>> getAllAdminJournals() {
        return ResponseEntity.ok(journalService.getAllAdminJournals());
    }
}
