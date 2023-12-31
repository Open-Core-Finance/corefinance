package tech.corefinance.common.services;

import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.ActiveProfiles;
import tech.corefinance.common.model.InternalServiceConfig;
import tech.corefinance.common.model.Permission;
import tech.corefinance.common.service.PermissionService;
import tech.corefinance.common.test.support.app.TestCommonApplication;
import tech.corefinance.common.test.support.service.InternalServiceConfigTestService;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest(classes = TestCommonApplication.class)
@AutoConfigureMockMvc
@ActiveProfiles({"common", "default", "unittest"})
@ComponentScan(basePackages = {"tech.corefinance"})
@Slf4j
public class CommonServiceTest {

    @Autowired
    private PermissionService permissionService;
    @Autowired
    private InternalServiceConfigTestService internalServiceConfigTestService;

    @Test
    public void test_findEntityClass_multiple_extend_level() {
        var entityClass = permissionService.findEntityClass();
        assertEquals(Permission.class, entityClass);
    }

    @Test
    public void test_findEntityClass() {
        var entityClass = internalServiceConfigTestService.findEntityClass();
        assertEquals(InternalServiceConfig.class, entityClass);
    }
}
