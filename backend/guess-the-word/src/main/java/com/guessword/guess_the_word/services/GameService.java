package com.guessword.guess_the_word.services;

import com.guessword.guess_the_word.dto.GuessResponse;
import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.Guess;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.entities.Word;
import com.guessword.guess_the_word.repositories.GameRepository;
import com.guessword.guess_the_word.repositories.GuessRepository;
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
    private final GuessRepository guessRepository;

    public GameService(GameRepository gameRepository, WordRepository wordRepository, UserRepository userRepository, GuessRepository guessRepository) {
        this.gameRepository = gameRepository;
        this.wordRepository = wordRepository;
        this.userRepository = userRepository;
        this.guessRepository = guessRepository;
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

    private String evaluateGuess(String answer, String guess) {
        char[] result = {'X', 'X', 'X', 'X', 'X'};

        boolean[] used = new boolean[5];

        for(int i = 0; i < 5; i++) {
            if(guess.charAt(i) == answer.charAt(i)) {
                result[i] = 'G';
                used[i] = true;
            }
        }

        for(int i = 0; i < 5; i++) {
            if(result[i] == 'G') {
                continue;
            }

            for(int j = 0; j < 5; j++) {
                if(!used[j] && guess.charAt(i) == answer.charAt(j)) {
                    result[i] = 'O';
                    used[j] = true;
                    break;
                }
            }
        }

        return new String(result);
    }

    public GuessResponse submitGuess(Long gameId, User user, String guess) {
        Game game = gameRepository.findById(gameId).orElseThrow(() -> new RuntimeException("Game not found"));

        if(!game.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("You are not allowed to access this game");
        }

        if(game.isWon()) {
            throw new RuntimeException("This game has already been completed");
        }

        if(game.getGuessesUsed() >= 5) {
            throw new RuntimeException("You have used all 5 guesses");
        }

        String answer = game.getWord().getWord();

        String result = evaluateGuess(answer, guess);

        game.setGuessesUsed(game.getGuessesUsed() + 1);

        Guess savedGuess = new Guess();

        savedGuess.setGame(game);
        savedGuess.setGuessedWord(guess);
        savedGuess.setGuessNumber(game.getGuessesUsed());
        savedGuess.setResult(result);

        guessRepository.save(savedGuess);

        if(guess.equals(answer)) {
            game.setWon(true);

            gameRepository.save(game);

            return new GuessResponse(guess, result, "WIN", "You guessed the word in " +  game.getGuessesUsed()  + " attempts.", game.getGuessesUsed());
        }

        if(game.getGuessesUsed() >= 5) {
            gameRepository.save(game);

            return new GuessResponse(guess, result, "LOSE", "The word was " + game.getWord().getWord()   + "!", game.getGuessesUsed());
        }

        gameRepository.save(game);

        return new GuessResponse(guess, result, "CONTINUE", "Try again", game.getGuessesUsed());
    }
}
