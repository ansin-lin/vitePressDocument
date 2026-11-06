package com.example.employee.dto.response;

public class EmployeeListItemResponse {
    private final Long id;
    private final String name;
    private final String department;

    public EmployeeListItemResponse(Long id, String name, String department) {
        this.id = id;
        this.name = name;
        this.department = department;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
}
