package com.example.employee.exception;

public class DuplicateUsernameException extends RuntimeException {
    public DuplicateUsernameException() {
        super("用户名已存在");
    }
}
