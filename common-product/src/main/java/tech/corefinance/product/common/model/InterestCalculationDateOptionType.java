package tech.corefinance.product.common.model;

public enum InterestCalculationDateOptionType {

    FIRST_DAY_EVERY_MOTNH, EVERY_DAY, EVERY_WEEK, EVERY_OTHER_WEEK, EVERY_MONTH, EVERY_THREE_MONTHS, EVERY_SIX_MONTHS,
    EVERY_YEAR,
    /**
     * For example fix every 1st January.
     */
    ON_FIXED_DATE;
}
