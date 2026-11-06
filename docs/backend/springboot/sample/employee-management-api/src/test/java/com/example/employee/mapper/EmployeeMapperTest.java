package com.example.employee.mapper;

import com.example.employee.dto.request.EmployeeSearchRequest;
import com.example.employee.entity.Employee;
import com.example.employee.support.MySqlTestGuard;
import org.junit.jupiter.api.Test;
import org.mybatis.spring.boot.test.autoconfigure.MybatisTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@MybatisTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.BEFORE_TEST_METHOD)
@Sql(scripts = "/test-data.sql", executionPhase = Sql.ExecutionPhase.AFTER_TEST_METHOD)
class EmployeeMapperTest extends MySqlTestGuard {
    @Autowired EmployeeMapper mapper;

    @Test
    void mapsEmployeeAndSearchesWithBoundConditions() {
        Employee found = mapper.findById(1001L);
        assertThat(found.getName()).isEqualTo("Tanaka");

        EmployeeSearchRequest request = new EmployeeSearchRequest();
        request.setDepartment("Sales");
        request.setPageSize(10);
        assertThat(mapper.search(request)).extracting(Employee::getId)
                .containsExactly(1001L, 1003L, 1004L);
        assertThat(mapper.count(request)).isEqualTo(3);
    }

    @Test
    void insertGeneratesIdAndUniqueEmailIsEnforced() {
        Employee employee = employee("New", "new@example.com");
        assertThat(mapper.insert(employee)).isEqualTo(1);
        assertThat(employee.getId()).isNotNull();

        Employee duplicate = employee("Duplicate", "tanaka@example.com");
        assertThatThrownBy(() -> mapper.insert(duplicate))
                .isInstanceOf(DuplicateKeyException.class);
    }

    private Employee employee(String name, String email) {
        Employee employee = new Employee();
        employee.setName(name);
        employee.setDepartment("Sales");
        employee.setEmail(email);
        employee.setStatus("ACTIVE");
        return employee;
    }
}
