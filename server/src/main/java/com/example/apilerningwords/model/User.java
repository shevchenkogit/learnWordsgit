package com.example.apilerningwords.model;


import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.Data;

@Data
@Entity
@Table(name="user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;

    private String name;

    @Column(unique = true)
    private String email;
    private String password;

}
