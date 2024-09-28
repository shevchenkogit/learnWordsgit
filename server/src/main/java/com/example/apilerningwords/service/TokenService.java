package com.example.apilerningwords.service;

import com.example.apilerningwords.model.TokensTable;
import com.example.apilerningwords.reposetory.TokenRepository;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;

import com.example.apilerningwords.model.Token;

import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.annotation.Resource;
import jdk.internal.org.objectweb.asm.tree.analysis.Value;
import lombok.RequiredArgsConstructor;
import lombok.Value;

import org.springframework.stereotype.Service;



import java.security.Key;
import java.time.*;
import java.util.Base64;
import java.util.Calendar;
import java.util.Date;
import java.util.*;

import javax.crypto.SecretKey;


@Service
@RequiredArgsConstructor
public class TokenService {

    private final TokenRepository tokenRepository;

    @Value("classpath:application.properties")
    public Resource resource;

    public static Jws<Claims> parseJwt(String jwtString) {

        String secret = resource;
        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret),
                SignatureAlgorithm.HS256.getJcaName());

        Jws<Claims> jwt = Jwts.parserBuilder()
                .setSigningKey(hmacKey)
                .build()
                .parseClaimsJws(jwtString);

        return jwt;
    }

    public Boolean tokenChecker(String token){

        try{if(parseJwt(token).getBody().getExpiration().getTime() > System.currentTimeMillis()){

            if(this.tokenRepository.findByAccess(token).getAccess().equals(token)){
                return true;
            }
        }}catch (Exception e){
            return false;
        }
        return false;
    }


    public Token createTokenPair(String name ,String id){

        Token token = new Token();

        long millis = System.currentTimeMillis();
        Calendar f = Calendar.getInstance();
        f.setTime(new Date(millis));
        f.add(Calendar.DATE, 1);

        Date after = f.getTime();
        Date now = new Date(millis);

        String secret = "jolasdkjflaskdjflkjdllkjkjkjkjdfdfdfdfiiiiidfdfkdjfkjdkfjkdjfkfdkfj";

        Key hmacKey = new SecretKeySpec(Base64.getDecoder().decode(secret),
                SignatureAlgorithm.HS256.getJcaName());


        String jwtAT = Jwts.builder().claim("name", name).
                setId(id).setIssuedAt(now).setExpiration(after).signWith(hmacKey).compact();

        String jwtRT = Jwts.builder().claim("name", name).setId(id).
                setIssuedAt(now).setExpiration(after).signWith(hmacKey).compact();

        token.setAccess(jwtAT);
        token.setRefresh(jwtRT);

        return token;
    }
    public void rmOldToken(){
        List<TokensTable> tokensForRm = this.tokenRepository.findAll().stream()
                .map((TokensTable tokens)->{
                    if(!this.tokenChecker(tokens.getAccess())){
                        return tokens;
                    }
                    return null;
                }).filter(Objects::nonNull).toList();
        this.tokenRepository.deleteAll(tokensForRm);
    }
}
