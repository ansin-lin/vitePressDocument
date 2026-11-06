package com.example.employee.exception;

public class EmployeeSystemException extends RuntimeException {
    public EmployeeSystemException(String message) { super(message); }
    public EmployeeSystemException(String message, Throwable cause) { super(message, cause); }
}
