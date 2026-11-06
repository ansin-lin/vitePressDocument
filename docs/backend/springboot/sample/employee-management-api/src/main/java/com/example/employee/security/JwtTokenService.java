package com.example.employee.security;

import com.example.employee.dto.response.LoginResponse;
import java.time.Instant;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

@Service
public class JwtTokenService {
    private static final long LIFETIME_SECONDS = 900;
    private final JwtEncoder encoder;
    private final String issuer;
    private final String audience;

    public JwtTokenService(JwtEncoder encoder,
            @Value("${app.security.jwt.issuer}") String issuer,
            @Value("${app.security.jwt.audience}") String audience) {
        this.encoder = encoder;
        this.issuer = issuer;
        this.audience = audience;
    }

    public LoginResponse issue(Authentication authenticated) {
        Instant now = Instant.now();
        List<String> roles = authenticated.getAuthorities().stream()
                .map(a -> a.getAuthority())
                .filter(a -> a.startsWith("ROLE_"))
                .map(a -> a.substring("ROLE_".length()))
                .toList();
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer(issuer)
                .subject(authenticated.getName())
                .audience(List.of(audience))
                .issuedAt(now)
                .notBefore(now)
                .expiresAt(now.plusSeconds(LIFETIME_SECONDS))
                .claim("roles", roles)
                .build();
        String token = encoder.encode(JwtEncoderParameters.from(claims))
                .getTokenValue();
        return new LoginResponse(token, "Bearer", LIFETIME_SECONDS);
    }
}
