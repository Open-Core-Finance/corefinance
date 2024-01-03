package tech.corefinance.common.audit;

import lombok.Data;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.auditing.IsNewAwareAuditingHandler;
import org.springframework.data.domain.AuditorAware;
import org.springframework.stereotype.Component;
import tech.corefinance.common.converter.ZonedDateTimeProvider;

import java.util.Optional;

@Data
@Component
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.zoned-date-time", havingValue = "true", matchIfMissing = true)
public class CustomerAuditingHandlerObjectFactory implements ObjectFactory<IsNewAwareAuditingHandler> {
    private ObjectFactory<IsNewAwareAuditingHandler> originalObject;
    private DateTimeProvider dateTimeProvider;
    private Optional<AuditorAware<?>> auditorAware;

    public CustomerAuditingHandlerObjectFactory(
            @Autowired ObjectFactory<IsNewAwareAuditingHandler> originalObject,
            @Autowired (required = false) AuditorAware<?> auditorAware) {
        this.originalObject = originalObject;
        this.dateTimeProvider = new ZonedDateTimeProvider();
        this.auditorAware = Optional.ofNullable(auditorAware);
    }

    @Override
    public IsNewAwareAuditingHandler getObject() throws BeansException {
        var result = originalObject.getObject();
        result.setDateTimeProvider(dateTimeProvider);
        this.auditorAware.ifPresent(result::setAuditorAware);
        return result;
    }
}
