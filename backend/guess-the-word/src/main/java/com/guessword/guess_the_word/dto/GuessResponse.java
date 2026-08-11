package com.guessword.guess_the_word.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class GuessResponse {
    private String guess;
    private String result;
    private String status;
    private String message;
    private int guessesUsed;

    public GuessResponse(String guess, String result, String status, String message, int guessesUsed) {
        this.guess = guess;
        this.result = result;
        this.status = status;
        this.message = message;
        this.guessesUsed = guessesUsed;
    }
}
