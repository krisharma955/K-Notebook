package com.K955.K_Notebook.Mapper;

import com.K955.K_Notebook.DTOs.JournalResponse;
import com.K955.K_Notebook.Entity.Journal;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface JournalMapper {

    JournalResponse toJournalResponse(Journal journal);

    List<JournalResponse> toListOfJournalResponse(List<Journal> journals);

}
