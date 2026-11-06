package com.example.employee.service.impl;

import com.example.employee.dto.request.EmployeeCreateRequest;
import com.example.employee.dto.request.EmployeeSearchRequest;
import com.example.employee.dto.request.EmployeeUpdateRequest;
import com.example.employee.dto.response.EmployeeListItemResponse;
import com.example.employee.dto.response.EmployeeResponse;
import com.example.employee.dto.response.PageResponse;
import com.example.employee.entity.Employee;
import com.example.employee.entity.EmployeeChangeLog;
import com.example.employee.exception.DuplicateEmailException;
import com.example.employee.exception.EmployeeNotFoundException;
import com.example.employee.exception.EmployeeSystemException;
import com.example.employee.exception.InvalidDepartmentException;
import com.example.employee.mapper.EmployeeChangeLogMapper;
import com.example.employee.mapper.EmployeeMapper;
import com.example.employee.service.EmployeeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

@Service
public class EmployeeServiceImpl implements EmployeeService {
    private static final String ACTION_EMPLOYEE_UPDATED = "EMPLOYEE_UPDATED";
    private static final Logger log = LoggerFactory.getLogger(EmployeeServiceImpl.class);

    private final EmployeeMapper employeeMapper;
    private final EmployeeChangeLogMapper employeeChangeLogMapper;

    public EmployeeServiceImpl(EmployeeMapper employeeMapper,
                               EmployeeChangeLogMapper employeeChangeLogMapper) {
        this.employeeMapper = employeeMapper;
        this.employeeChangeLogMapper = employeeChangeLogMapper;
    }

    @Override
    public EmployeeResponse findById(Long id) {
        return toResponse(findEmployeeOrThrow(id));
    }

    @Override
    public PageResponse<EmployeeListItemResponse> search(EmployeeSearchRequest request) {
        normalizeSearchRequest(request);
        List<Employee> employees = employeeMapper.search(request);
        long total = employeeMapper.count(request);
        List<EmployeeListItemResponse> items = new ArrayList<>();
        for (Employee employee : employees) {
            items.add(toListItemResponse(employee));
        }
        log.debug("employee_search_completed page={} pageSize={} total={}",
                request.getPage(), request.getPageSize(), total);
        return new PageResponse<>(items, request.getPage(), request.getPageSize(), total);
    }

    @Override
    @Transactional
    public EmployeeResponse create(EmployeeCreateRequest request) {
        String department = request.getDepartment().trim();
        validateDepartment(department);
        Employee employee = new Employee();
        employee.setName(request.getName().trim());
        employee.setDepartment(department);
        employee.setEmail(normalizeEmail(request.getEmail()));
        employee.setStatus("ACTIVE");
        try {
            int affectedRows = employeeMapper.insert(employee);
            if (affectedRows != 1 || employee.getId() == null) {
                throw new EmployeeSystemException("新增员工结果异常");
            }
        } catch (DuplicateKeyException exception) {
            throw new DuplicateEmailException(employee.getEmail());
        }
        log.info("employee_created employeeId={} department={}",
                employee.getId(), employee.getDepartment());
        return findById(employee.getId());
    }

    @Override
    @Transactional
    public EmployeeResponse update(Long id, EmployeeUpdateRequest request) {
        String department = request.getDepartment().trim();
        validateDepartment(department);
        Employee beforeUpdate = findEmployeeOrThrow(id);

        Employee employee = new Employee();
        employee.setId(id);
        employee.setName(request.getName().trim());
        employee.setDepartment(department);
        employee.setEmail(normalizeEmail(request.getEmail()));
        try {
            int affectedRows = employeeMapper.update(employee);
            if (affectedRows > 1) {
                throw new EmployeeSystemException("修改员工影响多行");
            }
            if (affectedRows == 0 && employeeMapper.findById(id) == null) {
                throw new EmployeeNotFoundException(id);
            }
        } catch (DuplicateKeyException exception) {
            throw new DuplicateEmailException(employee.getEmail());
        }

        EmployeeChangeLog changeLog = new EmployeeChangeLog(
                id, ACTION_EMPLOYEE_UPDATED,
                "department=" + beforeUpdate.getDepartment() + "->" + employee.getDepartment());
        int logRows = employeeChangeLogMapper.insert(changeLog);
        if (logRows != 1 || changeLog.getId() == null) {
            throw new EmployeeSystemException("员工变更履历写入失败");
        }
        log.info("employee_updated employeeId={} department={}", id, employee.getDepartment());
        return findById(id);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        int affectedRows = employeeMapper.deleteById(id);
        if (affectedRows == 0) {
            throw new EmployeeNotFoundException(id);
        }
        if (affectedRows != 1) {
            throw new EmployeeSystemException("删除员工影响多行");
        }
        log.info("employee_deleted employeeId={}", id);
    }

    private void normalizeSearchRequest(EmployeeSearchRequest request) {
        request.setName(normalizeOptionalText(request.getName()));
        request.setDepartment(normalizeOptionalText(request.getDepartment()));
        request.setStatus(normalizeOptionalText(request.getStatus()));
        if (request.getDepartment() != null) {
            validateDepartment(request.getDepartment());
        }
    }

    private String normalizeOptionalText(String value) {
        return value == null || value.isBlank() ? null : value.trim();
    }

    private Employee findEmployeeOrThrow(Long id) {
        Employee employee = employeeMapper.findById(id);
        if (employee == null) {
            throw new EmployeeNotFoundException(id);
        }
        return employee;
    }

    private EmployeeResponse toResponse(Employee employee) {
        return new EmployeeResponse(employee.getId(), employee.getName(),
                employee.getDepartment(), employee.getEmail());
    }

    private EmployeeListItemResponse toListItemResponse(Employee employee) {
        return new EmployeeListItemResponse(employee.getId(), employee.getName(),
                employee.getDepartment());
    }

    private void validateDepartment(String department) {
        if (!"Sales".equals(department)
                && !"Development".equals(department)
                && !"Support".equals(department)) {
            throw new InvalidDepartmentException(department);
        }
    }

    private String normalizeEmail(String email) {
        return email.trim().toLowerCase(Locale.ROOT);
    }
}
