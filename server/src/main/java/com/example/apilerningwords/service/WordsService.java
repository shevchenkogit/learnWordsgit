package com.example.apilerningwords.service;

import com.example.apilerningwords.model.DataP;
import com.example.apilerningwords.model.UW;
import com.example.apilerningwords.model.User;
import com.example.apilerningwords.model.Word;
import com.example.apilerningwords.reposetory.WordsRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.security.oauth2.resource.OAuth2ResourceServerProperties;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class WordsService {
    private final WordsRepository wordsRepository;
    private final UserService userService;

    private final ObjectMapper mapper = new ObjectMapper();

    public List<Word> getAll(){
        return this.wordsRepository.findAll();
    }

    public Word create(Word word){
        Word w = this.wordsRepository.findByOriginal(word.getOriginal());
        if(w != null){
            if(word.getOriginal().equals(w.getOriginal())){
                this.wordsRepository.findById(w.getId()).map((Word value) -> {
                   List<UW> map = this.userService.fromStringToObjectArr(value.getUser());
                    UW map2 = this.userService.fromStringToObject(word.getUser());
                    map.add(map2);
                    value.setUser(this.userService.fromArrUWToString(map));
                    return this.wordsRepository.save(value);
                });
            }
        }else {
            word.setUser("[" + word.getUser() + "]");
            return this.wordsRepository.save(word);
        }
        return null;
    }

    public Optional<Word> getById(int id){
        return this.wordsRepository.findById(id);
    }

    public void deleteById(Integer id, String uId){

//        Optional<Word> words = this.wordsRepository.findById(id);
//        words.map()
        try{
           this.wordsRepository.findById(id).map(
                    (Word word)->{
                        List<UW> uw = this.userService.fromStringToObjectArr(word.getUser());
                        if(uw.get(0).getId().equals(uId)){
                             this.wordsRepository.deleteById(id);
                             return null;
                        }else{
                           List<UW> newUw = uw.stream().map(
                                   (UW u)->{
                                       if(u.getId().equals(uId)){
                                           return null;
                                       }else {
                                           return u;
                                       }
                                   }
                                   ).filter(Objects::nonNull).toList();
//                                   .filter(uw1 -> uw.removeIf(uw2 -> uw2.getId().equals(uId)))
                            System.out.println(newUw);
                           String newUsers = this.userService.fromArrUWToString(newUw);
                            word.setUser(newUsers);
                            this.wordsRepository.save(word);
                            return null;
                        }
                    });
        }catch (Exception x){
            System.out.println(x);
        }
    }

    public List<Word> getOnlyNew(String q, String id) {

        return this.wordsRepository.findAll()
                .stream()
                .map((word)->{
                    List<UW> uw = this.userService.fromStringToObjectArr(word.getUser());
                    if(!uw.stream().filter(a-> a.getId().equals(id)).filter(a-> !a.getPd().contains(q)).toList().isEmpty()){

                        return word;
                    }
                    else {
                        return null;
                    }
                }).filter(Objects::nonNull)
                .toList();
    }

    public void changeOrGet(Word word, String str, Integer num, String id){
        this.wordsRepository.findById(word.getId()).map((Word s)->{

            List<UW> uw = this.userService.fromStringToObjectArr(word.getUser());

            if(!uw.stream().filter(a-> a.getId().equals(id)).filter(a-> !a.getPd().contains(str)).toList().isEmpty()){
                uw.stream().filter(a -> a.getId().equals(id)).map((UW u)->{
                    u.setPd(u.getPd() + str);
                    u.setLp(u.getLp() + num);
                    return u;
                }).toList();

                s.setUser(this.userService.fromArrUWToString(uw));
                return wordsRepository.save(s);
            }
            else {
                s.setUser(this.userService.fromArrUWToString(uw));
                return wordsRepository.save(s);
            }
        });
    }

    public void changeLearnLevel(DataP data){
        this.wordsRepository.findById(data.getIdW()).map((Word value)->{

            switch (data.getW()) {
                case "w": this.changeOrGet(value, "w", 30, data.getIdU()); break;
                case "o": this.changeOrGet(value, "o", 13, data.getIdU()); break;
                case "t": this.changeOrGet(value, "t", 13, data.getIdU()); break;
                case "p": this.changeOrGet(value, "p", 20, data.getIdU()); break;
                case "g": this.changeOrGet(value, "g", 13, data.getIdU()); break;
                case "h": this.changeOrGet(value, "h", 13, data.getIdU()); break;
                default:
            }
            return this.wordsRepository.save(value);
        });
    }

    public Word changeWord(Word word){
        this.wordsRepository.findById(word.getId()).map((Word value) -> {
            value.setOriginal(word.getOriginal());
            value.setTranslate(word.getTranslate());
                 return this.wordsRepository.save(value);
                }
        );
        return null;
    }
    public List<Word> getWordsByUseId(String userId){
        return this.wordsRepository.findAll()
                .stream()
                .map((word)->{
                    List<UW> uw = this.userService.fromStringToObjectArr(word.getUser());
                    if(!uw.stream().filter(a-> a.getId().equals(userId)).toList().isEmpty()){

                        return word;
                    }
                    else {
                        return null;
                    }
                }).filter(Objects::nonNull)
                .toList();
    }

    public Word changeWordForMyLib(Integer wordId, String uId){

        this.wordsRepository.findById(wordId).map((Word value) -> {
            List<UW> map = this.userService.fromStringToObjectArr(value.getUser());
            UW uw = new UW();

            uw.setPd("q");
            uw.setId(uId);
            uw.setLp(1);
            map.add(uw);
            value.setUser(this.userService.fromArrUWToString(map));
            return this.wordsRepository.save(value);
        });
        return null;
    }
}
