package com.example.apilerningwords.service;

import com.example.apilerningwords.model.*;
import com.example.apilerningwords.reposetory.TokenRepository;
import com.example.apilerningwords.reposetory.UserRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final TokenService tokenService;
    private final ObjectMapper mapper = new ObjectMapper();


    public List<UW> fromStringToObjectArr (String users) {try {
               return this.mapper.readValue(users, new TypeReference<List<UW>>() {});
    } catch (JsonProcessingException e) {
        throw new RuntimeException(e);
    }}
    public UW fromStringToObject (String users) {try {
        return this.mapper.readValue(users, UW.class);
    } catch (JsonProcessingException e) {
        throw new RuntimeException(e);
    }}

    public String fromArrUWToString (List<UW> uw){
        try {
            return this.mapper.writeValueAsString(uw);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    public String fromUWToString (UW uw){
        try {
            return this.mapper.writeValueAsString(uw);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }
    public String hashPassword(String password){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.encode(password);
    }

    public boolean matchPassword(String pasFromClient, String pasFromDb){
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        return bCryptPasswordEncoder.matches(pasFromClient, pasFromDb);
    }

    public User create (User user){
        try{
            User userf = this.userRepository.findUserByEmail(user.getEmail());
            if (userf == null){
                user.setPassword(this.hashPassword(user.getPassword()));
                return this.userRepository.save(user);
            }else {
                return null;
            }
        }
        catch (Exception e){
            System.out.println(e);
            return null;
        }
    }

    public List<User> getUsers () {return  this.userRepository.findAll();}

    public User getUserById(Integer id){
        return this.userRepository.getUserById(id);
    }

    public User getUserByEmail(String email){
        return this.userRepository.getUserByEmail(email);
    }

    public Token getTokensForLogIn(LogIn data)
    {
        User user = this.userRepository.findUserByEmail(data.getEmail());

       if(user != null){

//        Token token = new Token();

           if(Objects.equals(user.getEmail(), data.getEmail()) && this.matchPassword(data.getPassword(), user.getPassword())){

           TokensTable tokensTable = new TokensTable();

           Token token = tokenService.createTokenPair(user.getName(), user.getId().toString());

           tokensTable.setUserId(user.getId());
           tokensTable.setAccess(token.getAccess());
           tokensTable.setRefresh(token.getRefresh());

           this.tokenRepository.save(tokensTable);

           return token;
       }}
       return null;
    }
}
