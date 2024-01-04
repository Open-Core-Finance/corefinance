package tech.corefinance.product.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import tech.corefinance.common.audit.AuditableEntity;
import tech.corefinance.common.audit.EntityBasicUserAuditorListener;
import tech.corefinance.common.audit.EntityDeleteListener;
import tech.corefinance.common.audit.EntityZonedDateTimeAuditListener;
import tech.corefinance.common.dto.BasicUserDto;
import tech.corefinance.common.model.CreateUpdateDto;
import tech.corefinance.common.model.GenericModel;
import tech.corefinance.product.model.ProductAvailability;
import tech.corefinance.product.model.ProductFee;
import tech.corefinance.product.model.ProductNewAccountSetting;

import java.time.ZonedDateTime;
import java.util.List;

@MappedSuperclass
@Data
@EntityListeners({EntityBasicUserAuditorListener.class, EntityZonedDateTimeAuditListener.class, EntityDeleteListener.class})
public abstract class Product implements GenericModel<String>, CreateUpdateDto<String>, AuditableEntity<ZonedDateTime, BasicUserDto> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    @NotNull
    private String category;
    private String type;
    private String description;
    private boolean activated;
    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    private List<ProductAvailability> productAvailabilities;
    @NotNull
    @JdbcTypeCode(SqlTypes.JSON)
    private ProductNewAccountSetting newAccountSetting;
    @NotNull
    private String currency;

    // Product Fees
    private boolean allowArbitraryFees;
    private boolean showInactiveFees;
    @JdbcTypeCode(SqlTypes.JSON)
    private List<ProductFee> productFees;

    @CreatedDate
    @Column(name = "created_date")
    private ZonedDateTime createdDate;
    @CreatedBy
    @Column(name = "created_by")
    @JdbcTypeCode(SqlTypes.JSON)
    private BasicUserDto createdBy;
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private ZonedDateTime lastModifiedDate;
    @CreatedBy
    @Column(name = "last_modified_by")
    @JdbcTypeCode(SqlTypes.JSON)
    private BasicUserDto lastModifiedBy;
}
