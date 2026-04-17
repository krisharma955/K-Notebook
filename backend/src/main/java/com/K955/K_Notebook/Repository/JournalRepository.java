package com.K955.K_Notebook.Repository;

import com.K955.K_Notebook.Entity.Journal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface JournalRepository extends JpaRepository<Journal, Long> {

    @Query("""
            SELECT j FROM Journal j
            WHERE j.deletedAt IS NULL
            AND j.isPublic = True
            ORDER BY j.updatedAt DESC
            """)
    List<Journal> findAccessibleJournals();

    Optional<Journal> findByIdAndDeletedAtIsNull(Long id);

    List<Journal> findByDeletedAtIsNullOrderByUpdatedAtDesc();
}
