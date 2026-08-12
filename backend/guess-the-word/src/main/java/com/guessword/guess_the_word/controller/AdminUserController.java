package com.guessword.guess_the_word.controller;

import com.guessword.guess_the_word.dto.UserResponse;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
public class AdminUserController {
    private final UserRepository userRepository;

    @GetMapping
    public List<UserResponse> getUsers() {
        return userRepository.findAll()
                .stream()
                .map(user ->
                        new UserResponse(
                                user.getId(),
                                user.getUsername()
                        )
                )
                .toList();
    }
}
