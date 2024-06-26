package tech.corefinance.product.common.model;

import lombok.Data;
import tech.corefinance.product.common.enums.ArrearsDaysCalculatedFrom;

import java.util.List;

@Data
public class ArrearsSetting {
    private boolean sameConstraintForAllCurrency;
    /**
     * Arrears Tolerance Period in Days.
     */
    private List<ValueConstraint> tolerancePeriods;
    /**
     * Include/Exclude Non-Working Days in Arrears Tolerance Period and Penalty Calculation Method.
     */
    private boolean includeNonWorkingDay;
    /**
     * Arrears Days Calculated From.
     */
    private ArrearsDaysCalculatedFrom daysCalculatedFrom;
    /**
     * Arrears Tolerance Amount (% of Outstanding Principal).
     */
    private List<ValueConstraint> toleranceAmounts;
    /**
     * With a floor (minimum).
     */
    private List<CurrencyValue> floors;
}
