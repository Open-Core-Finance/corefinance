import { CurrencyLimitValue, ValueConstraint } from "./ValueConstraint";

export class ArrearsSetting {
    sameConstraintForAllCurrency = true;
    /**
     * Arrears Tolerance Period in Days.
     */
    tolerancePeriods: ValueConstraint[] = [];
    /**
     * Include/Exclude Non-Working Days in Arrears Tolerance Period and Penalty Calculation Method.
     */
    includeNonWorkingDay = false;
    /**
     * Arrears Days Calculated From.
     */
    daysCalculatedFrom: ArrearsDaysCalculatedFrom | null = ArrearsDaysCalculatedFrom.OLDEST_LATE_REPAYMENT;
    /**
     * Arrears Tolerance Amount (% of Outstanding Principal).
     */
    toleranceAmounts: ValueConstraint[] = [];
    /**
     * With a floor (minimum).
     */
    floors: CurrencyLimitValue[] =[];
}

export enum ArrearsDaysCalculatedFrom {
    /**
     * Date Account First Went Into Arrears.
     */
    FIRST_INTO_ARREARS = "FIRST_INTO_ARREARS",
    /**
     * Date of Oldest Currently Late Repayment.
     */
    OLDEST_LATE_REPAYMENT = "OLDEST_LATE_REPAYMENT"
}