package com.guessword.guess_the_word.repositories;

import com.guessword.guess_the_word.entities.Guess;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GuessRepository extends JpaRepository<Guess, Long> {
}
