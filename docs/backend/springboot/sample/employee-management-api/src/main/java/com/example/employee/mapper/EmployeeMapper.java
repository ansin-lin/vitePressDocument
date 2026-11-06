package com.example.employee.mapper;

import com.example.employee.dto.request.EmployeeSearchRequest;
import com.example.employee.entity.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface EmployeeMapper {
    Employee findById(@Param("id") Long id);
    List<Employee> search(EmployeeSearchRequest request);
    long count(EmployeeSearchRequest request);
    int insert(Employee employee);
    int update(Employee employee);
    int deleteById(@Param("id") Long id);
}
