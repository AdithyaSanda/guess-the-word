package com.guessword.guess_the_word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor
public class UserReportResponse {

    private LocalDate date;

    private long wordsTried;

    private long correctGuesses;
}
