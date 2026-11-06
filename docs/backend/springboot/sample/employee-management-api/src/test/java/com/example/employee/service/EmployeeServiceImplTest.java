package com.example.employee.service;

import com.example.employee.dto.request.EmployeeCreateRequest;
import com.example.employee.entity.Employee;
import com.example.employee.exception.DuplicateEmailException;
import com.example.employee.exception.EmployeeNotFoundException;
import com.example.employee.exception.InvalidDepartmentException;
import com.example.employee.mapper.EmployeeChangeLogMapper;
import com.example.employee.mapper.EmployeeMapper;
import com.example.employee.service.impl.EmployeeServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.dao.DuplicateKeyException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;

class EmployeeServiceImplTest {
    private EmployeeMapper employeeMapper;
    private EmployeeChangeLogMapper changeLogMapper;
    private EmployeeServiceImpl service;

    @BeforeEach
    void setUp() {
        employeeMapper = mock(EmployeeMapper.class);
        changeLogMapper = mock(EmployeeChangeLogMapper.class);
        service = new EmployeeServiceImpl(employeeMapper, changeLogMapper);
    }

    @Test
    void findByIdMapsEntityAndMissingEmployeeThrows() {
        Employee employee = new Employee();
        employee.setId(1001L);
        employee.setName("Tanaka");
        employee.setDepartment("Sales");
        employee.setEmail("tanaka@example.com");
        when(employeeMapper.findById(1001L)).thenReturn(employee);

        assertThat(service.findById(1001L).getName()).isEqualTo("Tanaka");
        when(employeeMapper.findById(9999L)).thenReturn(null);
        assertThatThrownBy(() -> service.findById(9999L))
                .isInstanceOf(EmployeeNotFoundException.class)
                .hasMessage("员工不存在：9999");
    }

    @Test
    void createRejectsInvalidDepartmentBeforeDatabaseCall() {
        EmployeeCreateRequest request = request("Unknown", "new@example.com");
        assertThatThrownBy(() -> service.create(request))
                .isInstanceOf(InvalidDepartmentException.class);
        verifyNoInteractions(employeeMapper, changeLogMapper);
    }

    @Test
    void createConvertsUniqueConstraintFailureToBusinessConflict() {
        EmployeeCreateRequest request = request("Sales", "tanaka@example.com");
        when(employeeMapper.insert(any(Employee.class)))
                .thenThrow(new DuplicateKeyException("duplicate"));
        assertThatThrownBy(() -> service.create(request))
                .isInstanceOf(DuplicateEmailException.class)
                .hasMessage("邮箱已被使用：tanaka@example.com");
        verify(employeeMapper).insert(any(Employee.class));
    }

    private EmployeeCreateRequest request(String department, String email) {
        EmployeeCreateRequest request = new EmployeeCreateRequest();
        request.setName("New Employee");
        request.setDepartment(department);
        request.setEmail(email);
        return request;
    }
}
