package com.example.employee.security;

import com.example.employee.support.MySqlTestGuard;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;

import static com.example.employee.support.JwtTestSupport.bearer;
import static com.example.employee.support.JwtTestSupport.login;
import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class AuthorizationIntegrationTest extends MySqlTestGuard {
    @Autowired MockMvc mockMvc;
    @Autowired JdbcTemplate jdbc;

    @Test
    void bearerRolesAndEmployeeBindingControlReads() throws Exception {
        String tanaka = login(mockMvc, "tanaka");
        String sato = login(mockMvc, "sato");
        String admin = login(mockMvc, "admin");
        mockMvc.perform(get("/employees/1001")).andExpect(status().isUnauthorized());
        mockMvc.perform(get("/employees/1001").header("Authorization", bearer(tanaka)))
                .andExpect(status().isOk()).andExpect(jsonPath("$.data.id").value(1001));
        mockMvc.perform(get("/employees/1002").header("Authorization", bearer(tanaka)))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/employees/1002").header("Authorization", bearer(sato)))
                .andExpect(status().isOk());
        mockMvc.perform(get("/employees").header("Authorization", bearer(tanaka)))
                .andExpect(status().isForbidden());
        mockMvc.perform(get("/employees").header("Authorization", bearer(admin)))
                .andExpect(status().isOk());
        mockMvc.perform(get("/employees/999999").header("Authorization", bearer(admin)))
                .andExpect(status().isNotFound());
    }

    @Test
    void unboundUserCannotReadEmployee() throws Exception {
        mockMvc.perform(post("/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"unbound\",\"password\":\"TrainingPass123!\"}"))
                .andExpect(status().isCreated());
        String token = login(mockMvc, "unbound");
        mockMvc.perform(get("/employees/1001").header("Authorization", bearer(token)))
                .andExpect(status().isForbidden());
    }

    @Test
    void unauthorizedWritesLeaveDatabaseUnchangedAndAdminCanWrite() throws Exception {
        String user = login(mockMvc, "tanaka");
        String admin = login(mockMvc, "admin");
        mockMvc.perform(post("/employees")
                        .header("Authorization", bearer(user))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Blocked\",\"department\":\"Sales\","
                                + "\"email\":\"blocked@example.com\"}"))
                .andExpect(status().isForbidden());
        assertThat(countByEmail("blocked@example.com")).isZero();
        mockMvc.perform(put("/employees/1002")
                        .header("Authorization", bearer(user))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Blocked\",\"department\":\"Sales\","
                                + "\"email\":\"sato@example.com\"}"))
                .andExpect(status().isForbidden());
        assertThat(name(1002)).isEqualTo("Sato");
        mockMvc.perform(delete("/employees/1002").header("Authorization", bearer(user)))
                .andExpect(status().isForbidden());
        assertThat(name(1002)).isEqualTo("Sato");
        mockMvc.perform(post("/employees")
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Allowed\",\"department\":\"Sales\","
                                + "\"email\":\"allowed@example.com\"}"))
                .andExpect(status().isCreated());
        assertThat(countByEmail("allowed@example.com")).isEqualTo(1);
        mockMvc.perform(delete("/employees/1002").header("Authorization", bearer(admin)))
                .andExpect(status().isNoContent());
        assertThat(countById(1002)).isZero();
    }

    private String name(long id) {
        return jdbc.queryForObject("SELECT name FROM employees WHERE id = ?",
                String.class, id);
    }

    private int countById(long id) {
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM employees WHERE id = ?", Integer.class, id);
        return count == null ? 0 : count;
    }

    private int countByEmail(String email) {
        Integer count = jdbc.queryForObject(
                "SELECT COUNT(*) FROM employees WHERE email = ?", Integer.class, email);
        return count == null ? 0 : count;
    }
}
