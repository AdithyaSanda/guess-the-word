package com.guessword.guess_the_word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResult {

    private String accessToken;
    private String refreshToken;
    private String username;
    private String role;
}