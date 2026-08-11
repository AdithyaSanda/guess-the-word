package com.guessword.guess_the_word.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class GuessRequest {

    @NotBlank(message = "Guess is required")
    @Pattern(
            regexp = "^[A-Z]{5}$",
            message = "Guess must be exactly 5 uppercase letters"
    )
    private String guess;
}
