package com.guessword.guess_the_word.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class TestController {
    @GetMapping("/player/test")
    public String playerTest() {
        return "Player authentication successful";
    }

    @GetMapping("/admin/test")
    public String adminTest() {
        return "Admin authentication successful";
    }
}
