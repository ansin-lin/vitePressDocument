package com.example.employee.config;

import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

class JwtConfigTest {
    private static final String TEST_KEY =
            "MDEyMzQ1Njc4OWFiY2RlZjAxMjM0NTY3ODlhYmNkZWY=";

    @Test
    void signedTokenIsAcceptedAndTamperingIsRejected() {
        JwtConfig config = new JwtConfig();
        var key = config.jwtSecretKey(TEST_KEY);
        JwtEncoder encoder = config.jwtEncoder(key);
        JwtDecoder decoder = config.jwtDecoder(key,
                "employee-management", "employee-api");
        Instant now = Instant.now();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("employee-management")
                .subject("tanaka")
                .audience(List.of("employee-api"))
                .issuedAt(now).notBefore(now).expiresAt(now.plusSeconds(900))
                .claim("roles", List.of("USER"))
                .build();
        String token = encoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
        assertThat(decoder.decode(token).getSubject()).isEqualTo("tanaka");
        String[] parts = token.split("\\.");
        parts[2] = (parts[2].startsWith("A") ? "B" : "A")
                + parts[2].substring(1);
        assertThatThrownBy(() -> decoder.decode(String.join(".", parts)))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void wrongAudienceAndExpiredTokenAreRejected() {
        JwtConfig config = new JwtConfig();
        var key = config.jwtSecretKey(TEST_KEY);
        JwtEncoder encoder = config.jwtEncoder(key);
        JwtDecoder decoder = config.jwtDecoder(key,
                "employee-management", "employee-api");
        Instant now = Instant.now();
        JwtClaimsSet wrongAudience = JwtClaimsSet.builder()
                .issuer("employee-management").subject("tanaka")
                .audience(List.of("other-api"))
                .issuedAt(now).expiresAt(now.plusSeconds(900)).build();
        assertThatThrownBy(() -> decoder.decode(encoder.encode(
                JwtEncoderParameters.from(wrongAudience)).getTokenValue()))
                .isInstanceOf(RuntimeException.class);
        JwtClaimsSet expired = JwtClaimsSet.builder()
                .issuer("employee-management").subject("tanaka")
                .audience(List.of("employee-api"))
                .issuedAt(now.minusSeconds(1800))
                .expiresAt(now.minusSeconds(900)).build();
        assertThatThrownBy(() -> decoder.decode(encoder.encode(
                JwtEncoderParameters.from(expired)).getTokenValue()))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void shortKeyIsRejectedAtStartup() {
        JwtConfig config = new JwtConfig();
        assertThatThrownBy(() -> config.jwtSecretKey("c2hvcnQ="))
                .isInstanceOf(IllegalStateException.class);
    }
}
