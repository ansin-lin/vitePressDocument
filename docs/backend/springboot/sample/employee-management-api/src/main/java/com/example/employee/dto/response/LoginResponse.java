package com.example.employee.dto.response;
public record LoginResponse(String accessToken, String tokenType, long expiresIn) {}
