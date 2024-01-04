package tech.corefinance.common.audit;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;

import java.time.ZonedDateTime;
@Configurable
@Slf4j
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.zoned-date-time", havingValue = "true", matchIfMissing = true)
public class EntityZonedDateTimeAuditListener {

    @PrePersist
    private void beforeInsert(Object obj) {
        log.debug("Before inserting {}", obj);
        if (obj instanceof AuditableEntity en) {
            var now = ZonedDateTime.now();
            if (en.getCreatedDate() == null) {
                log.debug("Setting {} to createdDate attribute.", now);
                en.setCreatedDate(now);
            } else {
                log.debug("createdDate attribute already set manually!");
            }
            log.debug("Setting {} to lastModifiedDate attribute.", now);
            en.setLastModifiedDate(now);
        } else {
            log.debug("{} is not auditable.", obj);
        }
    }

    @PreUpdate
    private void beforeUpdate(Object obj) {
        log.debug("Before updating {}", obj);
        if (obj instanceof AuditableEntity en) {
            var now = ZonedDateTime.now();
            log.debug("Setting {} to lastModifiedDate attribute.", now);
            en.setLastModifiedDate(now);
        } else {
            log.debug("{} is not auditable.", obj);
        }
    }
}
