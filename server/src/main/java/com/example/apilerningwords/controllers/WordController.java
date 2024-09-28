package com.example.apilerningwords.controllers;

import com.example.apilerningwords.model.DataP;
import com.example.apilerningwords.model.Token;
import com.example.apilerningwords.model.Word;
import com.example.apilerningwords.service.TokenService;
import com.example.apilerningwords.service.UserService;
import com.example.apilerningwords.service.WordsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequiredArgsConstructor
@RequestMapping (value = "word")
public class WordController {
    private final WordsService wordsService;
    private final TokenService tokenService;


    @GetMapping("/{token}")
    public ResponseEntity<List<Word>> getAll(@PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.ok(this.wordsService.getAll());
        }
        return null;
    }

    @PostMapping("/{token}")
    public ResponseEntity<Word> create(@RequestBody Word word, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.ok(this.wordsService.create(word));
        }
        return null;

    }
    @GetMapping("/{id}/{token}")
    public ResponseEntity<Word> getById(@PathVariable int id, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.of(this.wordsService.getById(id));
        }
        return null;

    }
    @DeleteMapping("/{id}/{token}")
    public void deleteById(@PathVariable int id, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            this.wordsService.getById(id);
        }
    }

    @GetMapping("/learnWords/{t}/{id}/{token}")
    public ResponseEntity<List<Word>> getLearningWords(@PathVariable String t, @PathVariable String id, @PathVariable String token) {
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.ok(this.wordsService.getOnlyNew(t, id));
        }
        return null;
        }

    @PutMapping("/learnWords/{token}")
    public void changeLearnLevel(@RequestBody DataP data, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            this.wordsService.changeLearnLevel(data);
        }
    }

    @PostMapping("/change/{token}")
    public ResponseEntity<Word> changeWord(@RequestBody Word word, @PathVariable String token){
        System.out.println(word);
        if(this.tokenService.tokenChecker(token)){
           return ResponseEntity.ok(this.wordsService.changeWord(word));
        }else{
        return null;}
    }

    @DeleteMapping("/delete/{id}/{uId}/{token}")
    public void delete(@PathVariable Integer id,@PathVariable String uId, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            this.wordsService.deleteById(id, uId);
        }
    }

    @GetMapping("/users/{id}/{token}")
    public ResponseEntity<List<Word>> getByUserId(@PathVariable String id, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.ok(this.wordsService.getWordsByUseId(id));
        }
        return null;

    }

    @GetMapping("/users/get/{id}/{userId}/{token}")
    public ResponseEntity<Word> getToMyLib(@PathVariable Integer id, @PathVariable String userId, @PathVariable String token){
        if(this.tokenService.tokenChecker(token)){
            return ResponseEntity.ok(this.wordsService.changeWordForMyLib(id, userId));
        }
        return null;
    }

}
