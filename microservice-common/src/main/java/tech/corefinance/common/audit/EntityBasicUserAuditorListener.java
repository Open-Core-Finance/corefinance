package tech.corefinance.common.audit;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import tech.corefinance.common.context.ApplicationContextHolder;

@Configurable
@Slf4j
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.basic-user", havingValue = "true", matchIfMissing = true)
public class EntityBasicUserAuditorListener {

    @PrePersist
    private void beforeInsert(Object obj) {
        log.debug("Before inserting {}", obj);
        var context = ApplicationContextHolder.getInstance().getApplicationContext();
        BasicUserAuditorAware userAuditorAware = context.getBean(BasicUserAuditorAware.class);
        if (obj instanceof AuditableEntity en) {
            var auditor = userAuditorAware.getCurrentAuditor();
            if (en.getCreatedBy() == null) {
                log.debug("Setting {} to createdBy attribute.", auditor);
                auditor.ifPresent(en::setCreatedBy);
            } else {
                log.debug("createdBy attribute already set manually!");
            }
            log.debug("Setting {} to lastModifiedBy attribute.", auditor);
            auditor.ifPresent(en::setLastModifiedBy);
        } else {
            log.debug("{} is not auditable.", obj);
        }
    }

    @PreUpdate
    private void beforeUpdate(Object obj) {
        log.debug("Before updating {}", obj);
        var context = ApplicationContextHolder.getInstance().getApplicationContext();
        BasicUserAuditorAware userAuditorAware = context.getBean(BasicUserAuditorAware.class);
        if (obj instanceof AuditableEntity en) {
            var auditor = userAuditorAware.getCurrentAuditor();
            log.debug("Setting {} to lastModifiedBy attribute.", auditor);
            auditor.ifPresent(en::setLastModifiedBy);
        } else {
            log.debug("{} is not auditable.", obj);
        }
    }
}
