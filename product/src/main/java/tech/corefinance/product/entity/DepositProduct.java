package tech.corefinance.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import tech.corefinance.product.enums.CreditArrangementManaged;
import tech.corefinance.product.enums.FrequencyOptionYearly;
import tech.corefinance.product.model.*;

import java.util.List;

/**
 * <b>CurrentAccount:</b> <br/>
 * A transactional account where a client may perform regular deposit and withdrawals,
 * accrue interest and may optionally be allowed to go into overdraft.<br/><br/>
 *
 * <b>Savings Account:</b> <br/>
 * Allows you to create accounts where clients can make deposits and withdrawals when they wish.
 * The interest is posted at the frequency you choose and accrued over time. It doesn't allow overdrafts.<br/><br/>
 *
 * <b>Fixed Deposit:</b> <br/>
 * As the name suggests, fixed deposits have a fixed term after which they should be withdrawn or closed.
 * With this type of product, clients are able to make deposits until the minimum opening balance has been reached.
 * At this point, you can begin the maturity period, during which they will be unable to deposit, but will be able to withdraw.
 * Before the maturity date, you have the option to undo maturity. <br/><br/>
 * <b>Savings Plan: </b><br/>Uses a maturity period like fixed deposits,
 * but once the minimum opening balance has been reached, they will still be able to make deposits,
 * even during the maturity period itself.
 * However, they will no longer be able to make deposits once the maturity period has ended. <br/><br/>
 *
 * <b>Savings Plan:</b> <br/>
 * Uses a maturity period like fixed deposits, but once the minimum opening balance has been reached,
 * they will still be able to make deposits, even during the maturity period itself.
 * However, they will no longer be able to make deposits once the maturity period has ended.<br/><br/>
 */
@Data
@Entity
@Table(name = "deposit_product")
@EqualsAndHashCode(callSuper = true)
public class DepositProduct extends Product {

    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> supportedCurrencies;
    /**
     * Interest Rate.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    private DepositInterestRate interestRate;

    // Internal control
    private Integer daysToSetToDormant;

    /**
     * Deposit transaction limits.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    private List<DepositLimit> depositLimits;
    /**
     * Withdrawal Limits.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    private WithdrawalLimit withdrawalLimit;
    /**
     * Early Closure Period.
     */
    @JdbcTypeCode(SqlTypes.JSON)
    private Integer earlyClosurePeriod;

    private Boolean allowOverdrafts;
    @JdbcTypeCode(SqlTypes.JSON)
    private DepositInterestRate overdraftsInterest;
    private Double maxOverdraftLimit;
    @Enumerated(EnumType.STRING)
    private CreditArrangementManaged overdraftsUnderCreditArrangementManaged;

    @Enumerated(EnumType.STRING)
    private FrequencyOptionYearly termUnit;
    private Double minTermLength;
    private Double maxTermLength;
    private Double defaultTermLength;
    private Boolean allowDepositAfterMaturityDate;
}
