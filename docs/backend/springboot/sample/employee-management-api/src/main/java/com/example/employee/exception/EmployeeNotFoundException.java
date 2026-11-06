package com.example.employee.exception;

public class EmployeeNotFoundException extends RuntimeException {
    private final Long employeeId;

    public EmployeeNotFoundException(Long employeeId) {
        super("员工不存在：" + employeeId);
        this.employeeId = employeeId;
    }

    public Long getEmployeeId() { return employeeId; }
}
