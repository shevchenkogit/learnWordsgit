package com.example.apilerningwords.reposetory;

import com.example.apilerningwords.model.DataLogIn;
import com.example.apilerningwords.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Integer> {
    User findUserByEmailAndPassword(String email, String password);
    User getUserById(Integer id);
    User getUserByEmail(String email);
    User findUserByEmail(String email);
}