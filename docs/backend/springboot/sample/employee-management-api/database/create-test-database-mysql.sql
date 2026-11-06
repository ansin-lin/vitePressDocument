-- 只用MySQL管理账号在本机个人练习环境执行本文件。
-- 本脚本不创建用户、不保存密码，也不修改employee_db开发库。

CREATE DATABASE IF NOT EXISTS employee_test_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_0900_ai_ci;

GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, DROP, ALTER
ON employee_test_db.*
TO 'employee_app'@'localhost';

-- 课程不创建额外测试账号，连接时沿用第9章已有的employee_app。
-- 测试会在employee_test_db中执行DROP TABLE、CREATE TABLE和DML，
-- 所以不能把TEST_DB_URL指向employee_db、共享库或生产库。
