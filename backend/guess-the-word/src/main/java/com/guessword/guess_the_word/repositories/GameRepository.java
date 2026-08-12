package com.guessword.guess_the_word.repositories;

import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    long countByUserAndDate(User user, LocalDate date);

    @Query("""
        SELECT COUNT(DISTINCT g.user)
        FROM Game g
        WHERE g.date = :date
    """)
    long countDistinctUserByDate(@Param("date") LocalDate date);

    @Query("""
        SELECT COUNT(DISTINCT g)
        FROM Game g
        WHERE g.date = :date
        AND g.won = true
    """)
    long countCorrectGamesByDate(@Param("date") LocalDate date);
}
