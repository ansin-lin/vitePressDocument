package com.example.employee.logging;

import com.example.employee.support.MySqlTestGuard;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.system.CapturedOutput;
import org.springframework.boot.test.system.OutputCaptureExtension;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
@ExtendWith(OutputCaptureExtension.class)
class RequestLoggingIntegrationTest extends MySqlTestGuard {
    @Autowired MockMvc mockMvc;

    @Test
    void responseAndCompletionLogShareRequestId(CapturedOutput output) throws Exception {
        MvcResult result = mockMvc.perform(get("/health?token=must-not-be-logged"))
                .andExpect(status().isOk())
                .andReturn();
        String requestId = result.getResponse().getHeader("X-Request-Id");

        assertThat(requestId).isNotBlank();
        assertThat(UUID.fromString(requestId)).isNotNull();
        assertThat(output.getOut())
                .contains("[" + requestId + "]")
                .contains("request_complete method=GET path=/health status=200")
                .doesNotContain("must-not-be-logged");
    }

    @Test
    void everyRequestGetsADifferentRequestId() throws Exception {
        String first = mockMvc.perform(get("/health"))
                .andReturn().getResponse().getHeader("X-Request-Id");
        String second = mockMvc.perform(get("/health"))
                .andReturn().getResponse().getHeader("X-Request-Id");
        assertThat(first).isNotEqualTo(second);
    }
}
