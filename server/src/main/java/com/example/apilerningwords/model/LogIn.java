package com.example.apilerningwords.model;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class LogIn {
    private String email;
    private String password;
}
