package com.example.apilerningwords.controllers;

import com.example.apilerningwords.model.DataLogIn;
import com.example.apilerningwords.model.LogIn;
import com.example.apilerningwords.model.Token;
import com.example.apilerningwords.model.User;
import com.example.apilerningwords.service.TokenService;
import com.example.apilerningwords.service.UserService;
import com.fasterxml.jackson.core.*;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.json.JSONParser;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping(value = "users")
public class UserController {

    private final UserService userService;

    private final TokenService tokenService;
//    private final JSONParser jsonParser;

    @PostMapping
    private ResponseEntity<User> create (@RequestBody User user){
        return ResponseEntity.ok(this.userService.create(user));
    }

    @GetMapping
    private ResponseEntity<List<User>> getUsers(){
        return ResponseEntity.ok(this.userService.getUsers());
    }

    @PostMapping(value = "/logIn")
    private ResponseEntity<Token> getUserForLogIn(@RequestBody LogIn data){

        return ResponseEntity.ok(this.userService.getTokensForLogIn(data));
    }

    @GetMapping(value = "/checkT/{token}")
     private ResponseEntity<Boolean> checkToken(@PathVariable String token){
        return ResponseEntity.ok(this.tokenService.tokenChecker(token));
    }

    @GetMapping(value = "/{id}")
    private ResponseEntity<User> getUserById(@PathVariable Integer id){
        return ResponseEntity.ok(this.userService.getUserById(id));
    }

    @GetMapping(value = "/email/{e}")
    private ResponseEntity<User> getUserByEmail(@PathVariable String e){
        return ResponseEntity.ok(this.userService.getUserByEmail(e));
    }
}
