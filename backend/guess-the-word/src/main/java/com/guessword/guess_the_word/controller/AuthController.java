package com.guessword.guess_the_word.controller;

import com.guessword.guess_the_word.dto.*;
import com.guessword.guess_the_word.repositories.UserRepository;
import com.guessword.guess_the_word.security.JWTService;
import com.guessword.guess_the_word.services.AuthService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;
import com.guessword.guess_the_word.entities.User;

import java.time.Duration;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JWTService jwtService;
    private final UserRepository userRepository;
    private final UserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
        authService.register(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new RegisterResponse("User registered successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        LoginResult result = authService.login(request);

        ResponseCookie cookie =
                ResponseCookie.from("refreshToken", result.getRefreshToken())
                        .httpOnly(true)
                        .secure(false) // true in production with HTTPS
                        .path("/api/auth")
                        .maxAge(Duration.ofDays(7))
                        .sameSite("Lax")
                        .build();

        LoginResponse response = new LoginResponse(result.getAccessToken(), result.getUsername(), result.getRole());

        return ResponseEntity.ok()
                .header(
                        HttpHeaders.SET_COOKIE,
                        cookie.toString()
                )
                .body(response);
    }

    @PostMapping("/refresh")
    public ResponseEntity<LoginResponse> refresh(
            @CookieValue(
                    name = "refreshToken",
                    required = false
            )
            String refreshToken
    ) {

        if (refreshToken == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }

        try {

            String username =
                    jwtService.extractUsername(refreshToken);

            User user =
                    userRepository.findByUsername(username)
                            .orElseThrow();

            if (!refreshToken.equals(user.getRefreshToken())) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .build();
            }

            UserDetails userDetails =
                    userDetailsService.loadUserByUsername(username);

            if (!jwtService.isTokenValid(
                    refreshToken,
                    userDetails
            )) {
                return ResponseEntity
                        .status(HttpStatus.UNAUTHORIZED)
                        .build();
            }

            String newAccessToken =
                    jwtService.generateAccessToken(userDetails);

            return ResponseEntity.ok(
                    new LoginResponse(
                            newAccessToken,
                            user.getUsername(),
                            user.getRole().name()
                    )
            );

        } catch (Exception e) {

            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(
            @CookieValue(
                    name = "refreshToken",
                    required = false
            )
            String refreshToken
    ) {

        if (refreshToken != null) {

            String username =
                    jwtService.extractUsername(refreshToken);

            userRepository
                    .findByUsername(username)
                    .ifPresent(user -> {
                        user.setRefreshToken(null);
                        userRepository.save(user);
                    });
        }

        ResponseCookie cookie =
                ResponseCookie.from("refreshToken", "")
                        .httpOnly(true)
                        .secure(false)
                        .path("/api/auth")
                        .maxAge(0)
                        .sameSite("Lax")
                        .build();

        return ResponseEntity
                .noContent()
                .header(
                        HttpHeaders.SET_COOKIE,
                        cookie.toString()
                )
                .build();
    }
}
