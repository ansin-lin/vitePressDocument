package com.example.employee.exception;

public class InvalidDepartmentException extends RuntimeException {
    public InvalidDepartmentException(String department) {
        super("不允许的部门：" + department);
    }
}
