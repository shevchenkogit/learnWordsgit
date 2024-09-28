package com.example.apilerningwords.model;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.context.annotation.Bean;

@Data
@Entity
@Table(name="words")
public class Word {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
     private String original;
     private String translate;
     private String user;
//     private Integer learnProgram;
//     private String pDone;

}
