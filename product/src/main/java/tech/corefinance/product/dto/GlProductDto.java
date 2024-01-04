package tech.corefinance.product.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class GlProductDto extends ProductDto {
    private List<String> supportedCurrencies;
}
