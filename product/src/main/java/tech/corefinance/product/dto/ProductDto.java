package tech.corefinance.product.dto;

import jakarta.persistence.Column;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import tech.corefinance.common.dto.BasicUserDto;
import tech.corefinance.common.model.CreateUpdateDto;
import tech.corefinance.common.model.GenericModel;
import tech.corefinance.product.model.ProductAvailability;
import tech.corefinance.product.model.ProductFee;
import tech.corefinance.product.model.ProductNewAccountSetting;

import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.List;

@Data
public class ProductDto implements Serializable, CreateUpdateDto<String>, GenericModel<String> {

    private String id;
    private String name;
    private String category;
    private String type;
    private String description;
    private boolean activated;
    private List<ProductAvailability> productAvailabilities;
    private ProductNewAccountSetting newAccountSetting;
    private String currency;

    // Product Fees
    private boolean allowArbitraryFees;
    private boolean showInactiveFees;
    private List<ProductFee> productFees;

    private ZonedDateTime createdDate;
    private BasicUserDto createdBy;
    private ZonedDateTime lastModifiedDate;
    private BasicUserDto lastModifiedBy;
}
