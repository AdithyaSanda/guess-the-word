package com.guessword.guess_the_word.controller;

import com.guessword.guess_the_word.dto.GuessRequest;
import com.guessword.guess_the_word.dto.GuessResponse;
import com.guessword.guess_the_word.dto.StartGameResponse;
import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.repositories.UserRepository;
import com.guessword.guess_the_word.services.GameService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/player")
public class PlayerGameController {

    private final GameService gameService;
    private final UserRepository userRepository;

    public PlayerGameController(GameService gameService, UserRepository userRepository) {
        this.gameService = gameService;
        this.userRepository = userRepository;
    }

    @PostMapping("/game/start")
    public ResponseEntity<StartGameResponse> startGame(Authentication authentication) {
        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow();

        Game game = gameService.startGame(user);

        return ResponseEntity.ok(
                new StartGameResponse(game.getId(), "Game started successfully")
        );
    }

    @PostMapping("/game/{gameId}/guess")
    public ResponseEntity<GuessResponse> submitGuess(@PathVariable Long gameId, @Valid @RequestBody GuessRequest request, Authentication authentication) {
        String username = authentication.getName();

        User user = userRepository.findByUsername(username).orElseThrow();

        GuessResponse response = gameService.submitGuess(gameId, user, request.getGuess());

        return ResponseEntity.ok(response);
    }
}
