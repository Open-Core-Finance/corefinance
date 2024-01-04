package tech.corefinance.product.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class CryptoProductDto extends ProductDto {
    private String cryptoAddress;
    private String cryptoPrivate;
}
