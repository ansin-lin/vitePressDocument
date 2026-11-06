package com.example.employee.dto.response;

public class EmployeeResponse {
    private final Long id;
    private final String name;
    private final String department;
    private final String email;

    public EmployeeResponse(Long id, String name, String department, String email) {
        this.id = id;
        this.name = name;
        this.department = department;
        this.email = email;
    }

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDepartment() { return department; }
    public String getEmail() { return email; }
}
