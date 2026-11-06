DROP TABLE IF EXISTS employee_change_logs;
DROP TABLE IF EXISTS app_users;
DROP TABLE IF EXISTS employees;

CREATE TABLE employees (
    id BIGINT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    department VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'ACTIVE',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT pk_employees PRIMARY KEY (id),
    CONSTRAINT uk_employees_email UNIQUE (email),
    CONSTRAINT ck_employees_status CHECK (status IN ('ACTIVE', 'INACTIVE'))
) AUTO_INCREMENT = 1001;

CREATE TABLE employee_change_logs (
    id BIGINT NOT NULL AUTO_INCREMENT,
    employee_id BIGINT NOT NULL,
    action VARCHAR(30) NOT NULL,
    detail VARCHAR(200) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT pk_employee_change_logs PRIMARY KEY (id),
    INDEX idx_employee_change_logs_employee_id (employee_id)
);

CREATE TABLE app_users (
    id BIGINT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    employee_id BIGINT NULL,
    role VARCHAR(30) NOT NULL,
    enabled BOOLEAN NOT NULL DEFAULT TRUE,
    CONSTRAINT pk_app_users PRIMARY KEY (id),
    CONSTRAINT uk_app_users_username UNIQUE (username),
    CONSTRAINT uk_app_users_employee_id UNIQUE (employee_id)
);

INSERT INTO employees (id, name, department, email, status, created_at, updated_at)
VALUES
    (1001, 'Tanaka', 'Sales', 'tanaka@example.com', 'ACTIVE',
     '2026-01-01 09:00:00', '2026-01-01 09:00:00'),
    (1002, 'Sato', 'Development', 'sato@example.com', 'ACTIVE',
     '2026-01-01 09:00:00', '2026-01-01 09:00:00'),
    (1003, 'Tanaka Taro', 'Sales', 'taro@example.com', 'ACTIVE',
     '2026-01-02 09:00:00', '2026-01-02 09:00:00'),
    (1004, 'Tanaka Aiko', 'Sales', 'aiko@example.com', 'ACTIVE',
     '2026-01-02 09:00:00', '2026-01-02 09:00:00'),
    (1005, 'Yamada', 'Support', 'yamada@example.com', 'INACTIVE',
     '2026-01-03 09:00:00', '2026-01-03 09:00:00'),
    (1006, 'Ito', 'Development', 'ito@example.com', 'ACTIVE',
     '2026-01-04 09:00:00', '2026-01-04 09:00:00');

INSERT INTO app_users (id, username, password_hash, employee_id, role, enabled)
VALUES
    (1, 'tanaka',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     1001, 'USER', TRUE),
    (2, 'sato',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     1002, 'USER', TRUE),
    (3, 'admin',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     NULL, 'ADMIN', TRUE);
