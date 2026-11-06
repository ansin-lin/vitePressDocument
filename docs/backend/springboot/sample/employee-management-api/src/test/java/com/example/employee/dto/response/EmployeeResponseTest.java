package com.example.employee.dto.response;

import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class EmployeeResponseTest {
    @Test
    void keepsConstructorValues() {
        EmployeeResponse response = new EmployeeResponse(
                1001L, "Tanaka", "Sales", "tanaka@example.com");
        assertThat(response.getId()).isEqualTo(1001L);
        assertThat(response.getName()).isEqualTo("Tanaka");
        assertThat(response.getDepartment()).isEqualTo("Sales");
        assertThat(response.getEmail()).isEqualTo("tanaka@example.com");
    }
}
