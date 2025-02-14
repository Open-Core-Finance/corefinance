package tech.corefinance.account.crypto.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.corefinance.account.deposit.entity.GenericDepositAccount;
import tech.corefinance.common.annotation.CustomAuditor;
import tech.corefinance.common.audit.EntityBasicUserAuditorListener;
import tech.corefinance.common.audit.EntityDeleteListener;
import tech.corefinance.common.audit.EntityZonedDateTimeAuditListener;
import tech.corefinance.common.enums.CustomAuditorField;

@Entity
@Table(name = "crypto_account")
@Data
@EqualsAndHashCode(callSuper = true)
@CustomAuditor(createdByType = CustomAuditorField.BASIC_USER_JSON, lastModifiedByType = CustomAuditorField.BASIC_USER_JSON)
@EntityListeners({EntityBasicUserAuditorListener.class, EntityZonedDateTimeAuditListener.class, EntityDeleteListener.class})
public class CryptoAccount extends GenericDepositAccount {
}
