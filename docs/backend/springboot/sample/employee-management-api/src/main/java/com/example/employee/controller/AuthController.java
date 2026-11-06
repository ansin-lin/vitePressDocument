package com.example.employee.controller;

import com.example.employee.dto.request.LoginRequest;
import com.example.employee.dto.request.RegisterRequest;
import com.example.employee.dto.response.CurrentUserResponse;
import com.example.employee.dto.response.LoginResponse;
import com.example.employee.dto.response.RegisteredUserResponse;
import com.example.employee.common.ApiResponse;
import com.example.employee.security.AccountRegistrationService;
import com.example.employee.security.JwtLoginService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AccountRegistrationService registration;
    private final JwtLoginService login;

    public AuthController(AccountRegistrationService registration,
            JwtLoginService login) {
        this.registration = registration;
        this.login = login;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<RegisteredUserResponse>> register(
            @Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success(registration.register(request)));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<LoginResponse>> login(
            @Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success(login.login(request)));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<CurrentUserResponse>> me(
            Authentication authentication) {
        return ResponseEntity.ok(ApiResponse.success(
                new CurrentUserResponse(authentication.getName())));
    }
}
