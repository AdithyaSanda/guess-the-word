package com.guessword.guess_the_word.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "Username is required")
    @Pattern(
            regexp = "^[a-zA-Z0-9]{5,}$",
            message = "Username must contain at least 5 letters"
    )
    private String username;

    @NotBlank(message = "Password is required")
    @Pattern(
            regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$%*&]).{5,}$",
            message = "Password must contain at least 5 characters, including a letter, number, and special character ($, %, *, &)"
    )
    private String password;


}
