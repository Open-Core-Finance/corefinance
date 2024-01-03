package tech.corefinance.common.audit;

import java.time.temporal.TemporalAccessor;

public interface AuditableEntity<D extends TemporalAccessor, A> {

    void setCreatedDate(D createdDate);

    D getCreatedDate();

    void setLastModifiedDate(D createdDate);

    D getLastModifiedDate();

    void setCreatedBy(A createdBy);

    A getCreatedBy();

    void setLastModifiedBy(A createdBy);

    A getLastModifiedBy();
}
