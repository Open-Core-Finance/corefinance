package tech.corefinance.product.model;

import lombok.Data;
import tech.corefinance.product.enums.AccountState;

@Data
public class ProductNewAccountSetting {
    private ProductNewAccountSettingType type;
    private String typeConfig;
    private AccountState initialState;
}
