package com.example.employee.security;

import com.example.employee.dto.request.LoginRequest;
import com.example.employee.dto.response.LoginResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class JwtLoginService {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenService tokens;

    public JwtLoginService(AuthenticationManager authenticationManager,
            JwtTokenService tokens) {
        this.authenticationManager = authenticationManager;
        this.tokens = tokens;
    }

    public LoginResponse login(LoginRequest request) {
        Authentication input = UsernamePasswordAuthenticationToken.unauthenticated(
                request.getUsername(), request.getPassword());
        Authentication result = authenticationManager.authenticate(input);
        return tokens.issue(result);
    }
}
