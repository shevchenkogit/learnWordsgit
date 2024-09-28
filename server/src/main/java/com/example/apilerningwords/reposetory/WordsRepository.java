package com.example.apilerningwords.reposetory;

import com.example.apilerningwords.model.Word;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WordsRepository extends JpaRepository<Word, Integer> {
//    List<Word> findByLearnProgram(Integer learnProgram);
    Word findByOriginal(String original);
    List<Word> findByUser(String id);
}
//