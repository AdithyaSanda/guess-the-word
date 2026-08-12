package com.guessword.guess_the_word.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DailyReportResponse {
    private long numberOfUsers;

    private long correctGuesses;
}
