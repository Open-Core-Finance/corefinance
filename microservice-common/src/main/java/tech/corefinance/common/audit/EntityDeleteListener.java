package tech.corefinance.common.audit;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.PreRemove;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import tech.corefinance.common.context.ApplicationContextHolder;
import tech.corefinance.common.context.JwtContext;
import tech.corefinance.common.model.DeleteTracking;
import tech.corefinance.common.repository.DeleteTrackingRepository;
import tech.corefinance.common.util.CoreFinanceUtil;

import java.time.ZonedDateTime;

@Configurable
@Slf4j
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.delete-track", havingValue = "true", matchIfMissing = true)
public class EntityDeleteListener {

    @PreRemove
    private void beforeDelete(Object obj) {
        log.debug("Received delete action for {}!", obj);
        var context = ApplicationContextHolder.getInstance().getApplicationContext();
        var deleteTrackingRepository = context.getBean(DeleteTrackingRepository.class);
        var auditorAware = context.getBean(BasicUserAuditorAware.class);
        var util = context.getBean(CoreFinanceUtil.class);
        var objectMapper = context.getBean(ObjectMapper.class);
        log.debug("Creating delete tracking...");
        var deleteTracking = new DeleteTracking();
        auditorAware.getCurrentAuditor().ifPresent( a -> {
            deleteTracking.setCreatedBy(a);
            deleteTracking.setLastModifiedBy(a);
        });
        var now = ZonedDateTime.now();
        deleteTracking.setLastModifiedDate(now);
        deleteTracking.setCreatedDate(now);
        deleteTracking.setEntityClassName(obj.getClass().getName());
        var json = util.writeValueToJson(objectMapper, obj);
        if (CoreFinanceUtil.PARSING_JSON_FAILURE.equals(json)) {
            json = obj.toString();
        }
        deleteTracking.setEntityData(json);
        log.debug("Saving delete tracking info to database...");
        deleteTrackingRepository.save(deleteTracking);
        log.debug("Saved delete tracking info to database.");
    }
}
