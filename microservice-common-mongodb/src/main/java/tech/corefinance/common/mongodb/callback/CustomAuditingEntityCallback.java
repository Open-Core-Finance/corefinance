package tech.corefinance.common.mongodb.callback;

import org.springframework.beans.factory.ObjectFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.data.mongodb.core.mapping.event.AuditingEntityCallback;
import org.springframework.stereotype.Component;
import tech.corefinance.common.audit.CustomerAuditingHandlerObjectFactory;

@Component
@ConditionalOnProperty(name = "tech.corefinance.common-mongodb.converter.zonedDateTime", havingValue = "true", matchIfMissing = true)
public class CustomAuditingEntityCallback extends AuditingEntityCallback {

    /**
     * Creates a new {@link AuditingEntityCallback} using the given {@link ObjectFactory}.
     *
     * @param customerAuditingHandlerObjectFactory must not be {@literal null}.
     */
    public CustomAuditingEntityCallback(CustomerAuditingHandlerObjectFactory customerAuditingHandlerObjectFactory) {
        super(customerAuditingHandlerObjectFactory);

    }
}
