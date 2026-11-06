package com.example.employee.entity;

public class EmployeeChangeLog {
    private Long id;
    private final Long employeeId;
    private final String action;
    private final String detail;

    public EmployeeChangeLog(Long employeeId, String action, String detail) {
        this.employeeId = employeeId;
        this.action = action;
        this.detail = detail;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getEmployeeId() { return employeeId; }
    public String getAction() { return action; }
    public String getDetail() { return detail; }
}
