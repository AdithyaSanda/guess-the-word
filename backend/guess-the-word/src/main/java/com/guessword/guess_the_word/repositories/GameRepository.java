package com.guessword.guess_the_word.repositories;

import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    long countByUserAndDate(User user, LocalDate date);
}
