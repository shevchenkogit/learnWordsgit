package com.example.apilerningwords.reposetory;

import com.example.apilerningwords.model.TokensTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TokenRepository extends JpaRepository<TokensTable, Integer> {
    TokensTable findByUserId(Integer userId);
    TokensTable findByAccess(String access);
}
