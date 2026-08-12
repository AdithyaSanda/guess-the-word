package com.guessword.guess_the_word.controller;

import com.guessword.guess_the_word.dto.DailyReportResponse;
import com.guessword.guess_the_word.services.AdminReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/admin/reports")
@RequiredArgsConstructor
public class AdminReportController {

    private final AdminReportService adminReportService;

    @GetMapping("/daily")
    public DailyReportResponse getDailyReport(@RequestParam LocalDate date) {
        System.out.println("ADMIN DAILY REPORT CALLED: " + date);
        return adminReportService.getDailyReport(date);
    }
}
