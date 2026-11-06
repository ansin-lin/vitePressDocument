package com.example.employee.security;

import com.example.employee.support.MySqlTestGuard;
import com.example.employee.support.JwtTestSupport;
import java.time.Instant;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import static com.example.employee.support.JwtTestSupport.bearer;
import static com.example.employee.support.JwtTestSupport.login;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class JwtLoginTest extends MySqlTestGuard {
    @Autowired MockMvc mockMvc;
    @Autowired JdbcTemplate jdbc;
    @Autowired PasswordEncoder passwordEncoder;
    @Autowired JwtEncoder jwtEncoder;

    @Test
    void registrationStoresUserAndBcryptHashButDoesNotLogIn() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"learner15\",\"password\":\"TrainingPass123!\"}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.data.username").value("learner15"));
        assertThat(jdbc.queryForObject(
                "SELECT role FROM app_users WHERE username = 'learner15'", String.class))
                .isEqualTo("USER");
        assertThat(jdbc.queryForObject(
                "SELECT employee_id FROM app_users WHERE username = 'learner15'", Long.class))
                .isNull();
        String hash = jdbc.queryForObject(
                "SELECT password_hash FROM app_users WHERE username = 'learner15'", String.class);
        assertThat(hash).isNotEqualTo("TrainingPass123!");
        assertThat(passwordEncoder.matches("TrainingPass123!", hash)).isTrue();
        mockMvc.perform(get("/auth/me")).andExpect(status().isUnauthorized());
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"learner15\",\"password\":\"TrainingPass123!\"}"))
                .andExpect(status().isConflict());
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"\",\"password\":\"short\"}"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void realBearerTokenRestoresIdentityWithoutSession() throws Exception {
        String token = login(mockMvc, "tanaka");
        mockMvc.perform(get("/auth/me").header("Authorization", bearer(token)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.username").value("tanaka"));
        mockMvc.perform(get("/employees/1001").header("Authorization", bearer(token)))
                .andExpect(status().isOk());
        mockMvc.perform(get("/employees/1002").header("Authorization", bearer(token)))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/auth/me")).andExpect(status().isUnauthorized());
    }

    @Test
    void wrongPasswordTamperedAndExpiredTokensAreRejected() throws Exception {
        mockMvc.perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"tanaka\",\"password\":\"wrong\"}"))
                .andExpect(status().isUnauthorized());
        String token = login(mockMvc, "tanaka");
        String[] parts = token.split("\\.");
        parts[2] = (parts[2].startsWith("A") ? "B" : "A")
                + parts[2].substring(1);
        String tampered = String.join(".", parts);
        mockMvc.perform(get("/auth/me").header("Authorization", bearer(tampered)))
                .andExpect(status().isUnauthorized());

        Instant past = Instant.now().minusSeconds(1800);
        JwtClaimsSet expired = JwtClaimsSet.builder()
                .issuer("employee-management").subject("tanaka")
                .audience(List.of("employee-api"))
                .issuedAt(past).notBefore(past)
                .expiresAt(past.plusSeconds(900))
                .claim("roles", List.of("USER")).build();
        String old = jwtEncoder.encode(JwtEncoderParameters.from(expired)).getTokenValue();
        mockMvc.perform(get("/auth/me").header("Authorization", bearer(old)))
                .andExpect(status().isUnauthorized());
    }

    @Test
    void adminTokenCanReadList() throws Exception {
        String token = login(mockMvc, "admin");
        mockMvc.perform(get("/employees").header("Authorization", bearer(token)))
                .andExpect(status().isOk());
    }
}
