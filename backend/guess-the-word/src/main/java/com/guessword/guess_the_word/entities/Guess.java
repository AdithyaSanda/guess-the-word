package com.guessword.guess_the_word.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "guesses")
@Getter
@Setter
@NoArgsConstructor
public class Guess {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(nullable = false, length = 5)
    private String guessedWord;

    @Column(nullable = false)
    private int guessNumber;

    @Column(nullable = false, length = 5)
    private String result;
}
