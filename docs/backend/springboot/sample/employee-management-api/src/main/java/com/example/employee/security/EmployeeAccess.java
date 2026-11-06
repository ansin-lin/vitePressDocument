package com.example.employee.security;

import com.example.employee.entity.AppUser;
import com.example.employee.mapper.AppUserMapper;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

@Component("employeeAccess")
public class EmployeeAccess {
    private final AppUserMapper appUserMapper;

    public EmployeeAccess(AppUserMapper appUserMapper) {
        this.appUserMapper = appUserMapper;
    }

    public boolean canRead(Authentication authentication, Long employeeId) {
        if (authentication == null || !authentication.isAuthenticated() || employeeId == null) {
            return false;
        }
        boolean isAdmin = authentication.getAuthorities().stream()
                .anyMatch(authority -> "ROLE_ADMIN".equals(authority.getAuthority()));
        if (isAdmin) {
            return true;
        }
        AppUser currentUser = appUserMapper.findByUsername(authentication.getName());
        return currentUser != null && employeeId.equals(currentUser.getEmployeeId());
    }
}
