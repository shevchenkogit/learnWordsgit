package com.example.apilerningwords.model;


import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Token {
    private String access;
    private String refresh;
}
