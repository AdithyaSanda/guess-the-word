package com.guessword.guess_the_word.repositories;

import com.guessword.guess_the_word.dto.UserReportResponse;
import com.guessword.guess_the_word.entities.Game;
import com.guessword.guess_the_word.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

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

    @Query("""
        SELECT new com.guessword.guess_the_word.dto.UserReportResponse(
            g.date,
            COUNT(g),
            SUM(CASE WHEN g.won = true THEN 1 ELSE 0 END)
        )
        FROM Game g
        WHERE g.user.id = :userId
        GROUP BY g.date
        ORDER BY g.date DESC
    """)
    List<UserReportResponse> getUserReport(@Param("userId") Long userId);
}
