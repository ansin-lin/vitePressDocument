USE employee_db;

INSERT INTO employees (name, department, email, status)
VALUES
    ('Tanaka', 'Sales', 'tanaka@example.com', 'ACTIVE'),
    ('Sato', 'Development', 'sato@example.com', 'ACTIVE');

-- 下面三个账号仅用于本地教学，密码均为 TrainingPass123!。
INSERT INTO app_users (username, password_hash, employee_id, role, enabled)
VALUES
    ('tanaka',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     (SELECT id FROM employees WHERE email = 'tanaka@example.com'), 'USER', TRUE),
    ('sato',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     (SELECT id FROM employees WHERE email = 'sato@example.com'), 'USER', TRUE),
    ('admin',
     '$2a$10$nljJFXRpHlZ2gPsH7lM12eIan96c0Y03Y/YCucFA/SA6z.1Lv7UTC',
     NULL, 'ADMIN', TRUE);
