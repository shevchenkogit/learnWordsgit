package com.example.apilerningwords.configs;

import com.example.apilerningwords.service.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class scheduleconf {

    private final TokenService tokenService;

    @Scheduled(cron = "0 0 0 * * * ")
            public void show(){
        this.tokenService.rmOldToken();
    }
}
