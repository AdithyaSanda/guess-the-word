package com.guessword.guess_the_word.dto;

import lombok.Getter;

@Getter
public class LoginResponse {

    private String token;
    private String username;
    private String role;

    public LoginResponse(String token, String username, String role) {
        this.token = token;
        this.username = username;
        this.role = role;
    }
}
