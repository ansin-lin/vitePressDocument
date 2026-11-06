package com.example.employee.support;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.SQLException;

import static org.assertj.core.api.Assertions.assertThat;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public abstract class MySqlTestGuard {
    @Autowired
    private DataSource dataSource;

    @BeforeAll
    void requireDedicatedMySqlTestDatabase() throws SQLException {
        try (Connection connection = dataSource.getConnection()) {
            String databaseProduct = connection.getMetaData().getDatabaseProductName();
            String catalog = connection.getCatalog();
            assertThat(databaseProduct)
                    .as("测试必须直接连接MySQL")
                    .isEqualToIgnoringCase("MySQL");
            assertThat(catalog)
                    .as("测试只允许在名称以_test或_test_db结尾的专用数据库执行")
                    .matches("(?i).*(?:_test|_test_db)$");
        }
    }
}
