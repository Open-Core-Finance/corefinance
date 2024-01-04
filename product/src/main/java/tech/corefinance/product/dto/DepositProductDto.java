package tech.corefinance.product.dto;

import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import tech.corefinance.product.enums.CreditArrangementManaged;
import tech.corefinance.product.enums.FrequencyOptionYearly;
import tech.corefinance.product.model.DepositInterestRate;
import tech.corefinance.product.model.DepositLimit;
import tech.corefinance.product.model.WithdrawalLimit;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
public class DepositProductDto extends ProductDto {
    private List<String> supportedCurrencies;
    /**
     * Interest Rate.
     */
    private DepositInterestRate interestRate;

    // Internal control
    private Integer daysToSetToDormant;

    /**
     * Deposit transaction limits.
     */
    private List<DepositLimit> depositLimits;
    /**
     * Withdrawal Limits.
     */
    private WithdrawalLimit withdrawalLimit;
    /**
     * Early Closure Period.
     */
    private Integer earlyClosurePeriod;

    private Boolean allowOverdrafts;
    private DepositInterestRate overdraftsInterest;
    private Double maxOverdraftLimit;
    private CreditArrangementManaged overdraftsUnderCreditArrangementManaged;

    private FrequencyOptionYearly termUnit;
    private Double minTermLength;
    private Double maxTermLength;
    private Double defaultTermLength;
    private Boolean allowDepositAfterMaturityDate;
}
