package com.example.employee.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public class EmployeeSearchRequest {
    @Size(max = 50, message = "姓名关键字不能超过50个字符")
    private String name;

    @Size(max = 50, message = "部门不能超过50个字符")
    private String department;

    @Pattern(regexp = "^(|ACTIVE|INACTIVE)$", message = "状态必须是ACTIVE或INACTIVE")
    private String status;

    @NotNull(message = "页码不能为空")
    @Min(value = 1, message = "页码必须从1开始")
    private Integer page = 1;

    @NotNull(message = "每页件数不能为空")
    @Min(value = 1, message = "每页件数至少为1")
    @Max(value = 100, message = "每页件数不能超过100")
    private Integer pageSize = 20;

    @NotBlank(message = "排序字段不能为空")
    @Pattern(regexp = "^(id|createdAt)$", message = "排序字段必须是id或createdAt")
    private String sortBy = "id";

    @NotBlank(message = "排序方向不能为空")
    @Pattern(regexp = "^(asc|desc)$", message = "排序方向必须是asc或desc")
    private String sortDirection = "asc";

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Integer getPage() { return page; }
    public void setPage(Integer page) { this.page = page; }
    public Integer getPageSize() { return pageSize; }
    public void setPageSize(Integer pageSize) { this.pageSize = pageSize; }
    public String getSortBy() { return sortBy; }
    public void setSortBy(String sortBy) { this.sortBy = sortBy; }
    public String getSortDirection() { return sortDirection; }
    public void setSortDirection(String sortDirection) { this.sortDirection = sortDirection; }
    public long getOffset() { return (long) (page - 1) * pageSize; }
}
