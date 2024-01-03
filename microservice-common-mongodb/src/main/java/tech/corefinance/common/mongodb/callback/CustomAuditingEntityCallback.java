package tech.corefinance.common.mongodb.callback;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.ObjectFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.auditing.DateTimeProvider;
import org.springframework.data.auditing.IsNewAwareAuditingHandler;
import org.springframework.data.domain.AuditorAware;
import org.springframework.data.mongodb.core.mapping.event.AuditingEntityCallback;
import org.springframework.stereotype.Component;
import tech.corefinance.common.converter.ZonedDateTimeProvider;

import java.util.Optional;

@Component
@ConditionalOnProperty(name = "tech.corefinance.audit.enabled.zoned-date-time", havingValue = "true")
public class CustomAuditingEntityCallback extends AuditingEntityCallback {

    public CustomAuditingEntityCallback( @Autowired ObjectFactory<IsNewAwareAuditingHandler> originalObject,
                                         @Autowired (required = false) AuditorAware<?> auditorAware) {
        super(new CustomerAuditingHandlerObjectFactory(originalObject, auditorAware));
    }

    static class CustomerAuditingHandlerObjectFactory implements ObjectFactory<IsNewAwareAuditingHandler> {
        private ObjectFactory<IsNewAwareAuditingHandler> originalObject;
        private DateTimeProvider dateTimeProvider;
        private Optional<AuditorAware<?>> auditorAware;

        public CustomerAuditingHandlerObjectFactory(ObjectFactory<IsNewAwareAuditingHandler> originalObject,
                AuditorAware<?> auditorAware) {
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
}
