package tech.corefinance.common.audit;

import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import tech.corefinance.common.context.ApplicationContextHolder;

public class EntityBasicUserAuditorListener {

    @PrePersist
    private void beforeInsert(Object obj) {
        var context = ApplicationContextHolder.getInstance().getApplicationContext();
        BasicUserAuditorAware userAuditorAware = context.getBean(BasicUserAuditorAware.class);
        if (obj instanceof AuditableEntity en) {
            if (en.getCreatedBy() == null) {
                en.setCreatedBy(userAuditorAware.getCurrentAuditor());
            }
            if (en.getLastModifiedBy() == null) {
                en.setLastModifiedBy(userAuditorAware.getCurrentAuditor());
            }
        }
    }

    @PreUpdate
    private void beforeUpdate(Object obj) {
        var context = ApplicationContextHolder.getInstance().getApplicationContext();
        BasicUserAuditorAware userAuditorAware = context.getBean(BasicUserAuditorAware.class);
        if (obj instanceof AuditableEntity en) {
            if (en.getLastModifiedBy() == null) {
                en.setLastModifiedBy(userAuditorAware.getCurrentAuditor());
            }
        }
    }
}
