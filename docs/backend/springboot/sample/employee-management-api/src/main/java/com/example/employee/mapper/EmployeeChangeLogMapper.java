package com.example.employee.mapper;

import com.example.employee.entity.EmployeeChangeLog;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface EmployeeChangeLogMapper {
    int insert(EmployeeChangeLog changeLog);
}
