package com.guessword.guess_the_word.services;

import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.entities.Word;
import com.guessword.guess_the_word.repositories.GameRepository;
import com.guessword.guess_the_word.repositories.UserRepository;
import com.guessword.guess_the_word.repositories.WordRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.concurrent.ThreadLocalRandom;

@Service
public class GameService {

    private final GameRepository gameRepository;
    private final WordRepository wordRepository;
    private final UserRepository userRepository;

    public GameService(GameRepository gameRepository, WordRepository wordRepository, UserRepository userRepository) {
        this.gameRepository = gameRepository;
        this.wordRepository = wordRepository;
        this.userRepository = userRepository;
    }

    public Word getRandomWord() {
        List<Word> words = wordRepository.findAll();

        if(words.isEmpty()) {
            throw new RuntimeException("No words available in database");
        }

        int randomIndex = ThreadLocalRandom.current().nextInt(words.size());

        return words.get(randomIndex);
    }

    public Game startGame(User user) {
        LocalDate today = LocalDate.now();

        long gamesToday = gameRepository.countByUserAndDate(user, today);

        if(gamesToday >= 3) {
            throw new RuntimeException("You have reached today's limit of 3 games.");
        }

        Word selectedWord = getRandomWord();

        Game game = new Game();

        game.setUser(user);
        game.setWord(selectedWord);
        game.setDate(today);
        game.setWon(false);
        game.setGuessesUsed(0);

        return gameRepository.save(game);
    }
}
