package com.guessword.guess_the_word.services;

import com.guessword.guess_the_word.dto.LoginRequest;
import com.guessword.guess_the_word.dto.LoginResponse;
import com.guessword.guess_the_word.dto.LoginResult;
import com.guessword.guess_the_word.dto.RegisterRequest;
import com.guessword.guess_the_word.entities.Role;
import com.guessword.guess_the_word.entities.User;
import com.guessword.guess_the_word.repositories.UserRepository;
import com.guessword.guess_the_word.security.JWTService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JWTService jwtService;

    public AuthService(UserRepository userRepository, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager, JWTService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public void register(RegisterRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            throw new RuntimeException("Username already exists");
        }

        User user = new User();
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(Role.PLAYER);

        userRepository.save(user);
    }

    public LoginResult login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String token = jwtService.generateAccessToken(userDetails);
        String refreshToken = jwtService.generateRefreshToken(userDetails);

        User user = userRepository.findByUsername(request.getUsername()).orElseThrow();

        user.setRefreshToken(refreshToken);
        userRepository.save(user);
        return new LoginResult(token, refreshToken, user.getUsername(), user.getRole().name());
    }
}
