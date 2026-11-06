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
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class TransactionRollbackIntegrationTest extends MySqlTestGuard {
    @Autowired MockMvc mockMvc;
    @Autowired JdbcTemplate jdbcTemplate;

    @Test
    void secondWriteFailureRollsBackEmployeeUpdate() throws Exception {
        String admin = login(mockMvc, "admin");
        jdbcTemplate.execute("DROP TABLE employee_change_logs");

        mockMvc.perform(put("/employees/1001")
                        .header("Authorization", bearer(admin))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"name":"Changed","department":"Development",
                                 "email":"tanaka@example.com"}
                                """))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.message").value("服务器内部错误"));

        assertThat(jdbcTemplate.queryForObject(
                "SELECT name FROM employees WHERE id = 1001", String.class))
                .isEqualTo("Tanaka");
        // 本实验故意删除了履历表，不能再向该表执行COUNT。
        // AFTER_TEST_METHOD的专用测试库脚本会重建表。
    }
}
