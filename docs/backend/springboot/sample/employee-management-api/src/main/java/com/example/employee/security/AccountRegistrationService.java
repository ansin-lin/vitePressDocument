package com.example.employee.security;

import com.example.employee.dto.request.RegisterRequest;
import com.example.employee.dto.response.RegisteredUserResponse;
import com.example.employee.entity.AppUser;
import com.example.employee.exception.DuplicateUsernameException;
import com.example.employee.mapper.AppUserMapper;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AccountRegistrationService {
    private final AppUserMapper mapper;
    private final PasswordEncoder encoder;

    public AccountRegistrationService(AppUserMapper mapper, PasswordEncoder encoder) {
        this.mapper = mapper;
        this.encoder = encoder;
    }

    public RegisteredUserResponse register(RegisterRequest request) {
        AppUser account = new AppUser();
        account.setUsername(request.getUsername());
        account.setPasswordHash(encoder.encode(request.getPassword()));
        account.setRole("USER");
        account.setEmployeeId(null);
        account.setEnabled(true);
        try {
            if (mapper.insert(account) != 1) {
                throw new IllegalStateException("account insert affected no row");
            }
        } catch (DuplicateKeyException exception) {
            throw new DuplicateUsernameException();
        }
        return new RegisteredUserResponse(account.getId(), account.getUsername());
    }
}
