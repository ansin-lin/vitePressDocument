package com.example.employee.exception;

import com.example.employee.common.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidation(
            MethodArgumentNotValidException exception, HttpServletRequest request) {
        Map<String, String> fieldErrors = new LinkedHashMap<>();
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            fieldErrors.putIfAbsent(fieldError.getField(), fieldError.getDefaultMessage());
        }
        log.warn("request_rejected reason=validation path={} fields={}",
                request.getRequestURI(), fieldErrors.keySet());
        return ResponseEntity.badRequest()
                .body(ApiResponse.failure("参数校验失败", fieldErrors));
    }

    @ExceptionHandler(HttpMessageNotReadableException.class)
    public ResponseEntity<ApiResponse<Void>> handleUnreadableJson(
            HttpMessageNotReadableException exception, HttpServletRequest request) {
        log.warn("request_rejected reason=unreadable_json path={}", request.getRequestURI());
        return ResponseEntity.badRequest().body(ApiResponse.failure("请求JSON格式错误"));
    }

    @ExceptionHandler(InvalidDepartmentException.class)
    public ResponseEntity<ApiResponse<Void>> handleInvalidDepartment(
            InvalidDepartmentException exception, HttpServletRequest request) {
        log.warn("request_rejected reason=invalid_department path={}", request.getRequestURI());
        return ResponseEntity.badRequest().body(ApiResponse.failure(exception.getMessage()));
    }

    @ExceptionHandler(EmployeeNotFoundException.class)
    public ResponseEntity<ApiResponse<Void>> handleEmployeeNotFound(
            EmployeeNotFoundException exception, HttpServletRequest request) {
        log.warn("employee_not_found path={} employeeId={}",
                request.getRequestURI(), exception.getEmployeeId());
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                .body(ApiResponse.failure(exception.getMessage()));
    }

    @ExceptionHandler(DuplicateEmailException.class)
    public ResponseEntity<ApiResponse<Void>> handleDuplicateEmail(
            DuplicateEmailException exception, HttpServletRequest request) {
        log.warn("employee_conflict reason=duplicate_email path={}", request.getRequestURI());
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(ApiResponse.failure(exception.getMessage()));
    }

    @ExceptionHandler(EmployeeSystemException.class)
    public ResponseEntity<ApiResponse<Void>> handleEmployeeSystem(
            EmployeeSystemException exception, HttpServletRequest request) {
        log.error("employee_system_error path={}", request.getRequestURI(), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.failure("服务器内部错误"));
    }

    @ExceptionHandler(DataAccessException.class)
    public ResponseEntity<ApiResponse<Void>> handleDataAccess(
            DataAccessException exception, HttpServletRequest request) {
        log.error("database_access_error path={}", request.getRequestURI(), exception);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(ApiResponse.failure("服务器内部错误"));
    }
}
