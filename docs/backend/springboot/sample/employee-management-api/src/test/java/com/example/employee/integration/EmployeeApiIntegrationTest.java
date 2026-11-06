package com.example.employee.integration;

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

import static org.assertj.core.api.Assertions.assertThat;
import static com.example.employee.support.JwtTestSupport.bearer;
import static com.example.employee.support.JwtTestSupport.login;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.header;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class EmployeeApiIntegrationTest extends MySqlTestGuard {
    @Autowired MockMvc mockMvc;
    @Autowired JdbcTemplate jdbcTemplate;

    @Test
    void completeCrudPersistsAndReturnsExpectedContract() throws Exception {
        String admin = login(mockMvc, "admin");
        String createBody = """
                {"name":" Suzuki ","department":"Support",
                 "email":"SUZUKI@example.com"}
                """;
        String location = mockMvc.perform(post("/employees")
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(createBody))
                .andExpect(status().isCreated())
                .andExpect(header().exists("X-Request-Id"))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.email").value("suzuki@example.com"))
                .andReturn().getResponse().getHeader("Location");
        assertThat(location).isNotNull();
        long id = Long.parseLong(location.substring(location.lastIndexOf('/') + 1));

        mockMvc.perform(get("/employees/{id}", id)
                        .header("Authorization", bearer(admin)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.name").value("Suzuki"));

        mockMvc.perform(put("/employees/{id}", id)
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Suzuki Ichiro","department":"Development",
                                 "email":"suzuki@example.com"}
                                """))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.department").value("Development"));
        assertThat(count("employee_change_logs", "employee_id", id)).isEqualTo(1);

        mockMvc.perform(delete("/employees/{id}", id)
                        .header("Authorization", bearer(admin)))
                .andExpect(status().isNoContent());
        assertThat(count("employees", "id", id)).isZero();
    }

    @Test
    void validationDuplicateEmailAndMissingEmployeeHaveDistinctResponses() throws Exception {
        String admin = login(mockMvc, "admin");
        mockMvc.perform(post("/employees")
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"\",\"department\":\"Sales\",\"email\":\"bad\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.name").exists())
                .andExpect(jsonPath("$.data.email").exists());

        mockMvc.perform(post("/employees")
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\":\"Other\",\"department\":\"Sales\","
                                + "\"email\":\"tanaka@example.com\"}"))
                .andExpect(status().isConflict());

        mockMvc.perform(get("/employees/9999")
                        .header("Authorization", bearer(admin)))
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("$.message").value("员工不存在：9999"));
    }

    @Test
    void searchFiltersSortsAndPaginatesWithMatchingTotal() throws Exception {
        String admin = login(mockMvc, "admin");
        mockMvc.perform(get("/employees")
                        .header("Authorization", bearer(admin))
                        .param("name", "Tanaka")
                        .param("department", "Sales")
                        .param("status", "ACTIVE")
                        .param("page", "1")
                        .param("pageSize", "2")
                        .param("sortBy", "createdAt")
                        .param("sortDirection", "desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.items.length()").value(2))
                .andExpect(jsonPath("$.data.items[0].id").value(1003))
                .andExpect(jsonPath("$.data.items[1].id").value(1004))
                .andExpect(jsonPath("$.data.total").value(3))
                .andExpect(jsonPath("$.data.totalPages").value(2));
    }

    @Test
    void invalidPaginationIsRejectedBeforeDatabaseQuery() throws Exception {
        String admin = login(mockMvc, "admin");
        mockMvc.perform(get("/employees")
                        .header("Authorization", bearer(admin))
                        .param("pageSize", "101"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.data.pageSize").exists());
    }

    private int count(String table, String column, long value) {
        Integer result = jdbcTemplate.queryForObject(
                "SELECT COUNT(*) FROM " + table + " WHERE " + column + " = ?",
                Integer.class, value);
        return result == null ? 0 : result;
    }
}
