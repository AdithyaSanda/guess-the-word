package com.guessword.guess_the_word.dto;

import lombok.Getter;

@Getter
public class StartGameResponse {

    private Long gameId;
    private String message;

    public StartGameResponse(Long gameId, String message) {
        this.gameId = gameId;
        this.message = message;
    }
}
