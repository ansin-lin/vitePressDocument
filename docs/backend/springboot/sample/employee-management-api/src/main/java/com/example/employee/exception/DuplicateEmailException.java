package com.example.employee.exception;

public class DuplicateEmailException extends RuntimeException {
    public DuplicateEmailException(String email) {
        super("邮箱已被使用：" + email);
    }
}
