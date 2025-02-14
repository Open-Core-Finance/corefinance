package tech.corefinance.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

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
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public class DepositProduct extends GenericDepositProduct {

}
