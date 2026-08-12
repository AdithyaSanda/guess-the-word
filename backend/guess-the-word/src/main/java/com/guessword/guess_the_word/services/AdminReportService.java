package com.guessword.guess_the_word.services;

import com.guessword.guess_the_word.dto.DailyReportResponse;
import com.guessword.guess_the_word.dto.UserReportResponse;
import com.guessword.guess_the_word.repositories.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminReportService {

    private final GameRepository gameRepository;

    public DailyReportResponse getDailyReport(LocalDate date) {
        long numberOfUsers = gameRepository.countDistinctUserByDate(date);

        long correctGuesses = gameRepository.countCorrectGamesByDate(date);

        return new DailyReportResponse(numberOfUsers, correctGuesses);
    }

    public List<UserReportResponse> getUserReport(Long userId) {
        return gameRepository.getUserReport(userId);
    }
}
