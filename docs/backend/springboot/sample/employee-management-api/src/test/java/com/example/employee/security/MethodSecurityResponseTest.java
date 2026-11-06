package com.example.employee.security;

import com.example.employee.entity.AppUser;
import com.example.employee.mapper.AppUserMapper;
import com.example.employee.mapper.EmployeeMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static com.example.employee.support.JwtTestSupport.bearer;
import static com.example.employee.support.JwtTestSupport.login;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.never;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

/** Isolates the real Security/MVC pipeline from the unavailable local MySQL account. */
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class MethodSecurityResponseTest {
    @Autowired MockMvc mockMvc;
    @Autowired PasswordEncoder encoder;
    @MockitoBean AppUserMapper appUsers;
    @MockitoBean EmployeeMapper employees;

    @BeforeEach
    void account() {
        AppUser tanaka = new AppUser();
        tanaka.setUsername("tanaka");
        tanaka.setPasswordHash(encoder.encode("TrainingPass123!"));
        tanaka.setRole("USER");
        tanaka.setEmployeeId(1001L);
        tanaka.setEnabled(true);
        when(appUsers.findByUsername("tanaka")).thenReturn(tanaka);
    }

    @Test
    void otherEmployeesDetailIsUniformJson403BeforeBusinessQuery() throws Exception {
        String token = login(mockMvc, "tanaka");
        mockMvc.perform(get("/employees/1002")
                        .header("Authorization", bearer(token)))
                .andExpect(status().isForbidden())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("没有该操作的权限"))
                .andExpect(jsonPath("$.data").isEmpty());
        // Login reads the account once; EmployeeAccess reads its current binding again.
        verify(appUsers, times(2)).findByUsername("tanaka");
        verify(employees, never()).findById(anyLong());
    }

    @Test
    void missingBearerUsesUniformJson401() throws Exception {
        mockMvc.perform(get("/employees/1002"))
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.message").value("请先登录"));
    }
}
