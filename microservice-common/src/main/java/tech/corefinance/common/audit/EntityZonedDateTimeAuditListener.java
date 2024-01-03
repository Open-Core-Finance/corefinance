package tech.corefinance.common.audit;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;

import java.time.ZonedDateTime;

public class EntityZonedDateTimeAuditListener {

    @PrePersist
    private void beforeInsert(Object obj) {
        if (obj instanceof AuditableEntity en) {
            if (en.getCreatedDate() == null) {
                en.setCreatedDate(ZonedDateTime.now());
            }
            if (en.getLastModifiedDate() == null) {
                en.setLastModifiedDate(ZonedDateTime.now());
            }
        }
    }

    @PreUpdate
    private void beforeUpdate(Object obj) {
        if (obj instanceof AuditableEntity en) {
            if (en.getLastModifiedDate() == null) {
                en.setLastModifiedDate(ZonedDateTime.now());
            }
        }
    }
}
