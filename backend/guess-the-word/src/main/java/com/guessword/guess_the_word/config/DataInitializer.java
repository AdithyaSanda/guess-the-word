package com.guessword.guess_the_word.config;

import com.guessword.guess_the_word.entities.Role;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.entities.Word;
import com.guessword.guess_the_word.repositories.UserRepository;
import com.guessword.guess_the_word.repositories.WordRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initializeWords(WordRepository wordRepository) {
        return args -> {
            if(wordRepository.count() == 0) {
                String[] words = {
                        "APPLE",
                        "HOUSE",
                        "PLANT",
                        "CHAIR",
                        "TABLE",
                        "WATER",
                        "LIGHT",
                        "MOUSE",
                        "PHONE",
                        "WORLD",
                        "MUSIC",
                        "TRAIN",
                        "CLOUD",
                        "RIVER",
                        "EARTH",
                        "SMILE",
                        "BREAD",
                        "GREEN",
                        "TIGER",
                        "STONE"
                };

                for(String wordText: words) {
                    Word word = new Word();
                    word.setWord(wordText);

                    wordRepository.save(word);
                }

                System.out.println("20 words inserted successfully.");
            }
        };
    }

    @Bean
    CommandLineRunner initializeUsers(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            if(!userRepository.existsByUsername("admin")) {
                User admin = new User();

                admin.setUsername("admin");
                admin.setPassword(passwordEncoder.encode("Admin$123"));

                admin.setRole(Role.ADMIN);

                userRepository.save(admin);
            }
        };
    }
}
