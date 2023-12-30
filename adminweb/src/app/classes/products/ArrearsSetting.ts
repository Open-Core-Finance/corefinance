import { ValueConstraint } from "./ValueConstraint";

export class ArrearsSetting {
    /**
     * Arrears Tolerance Period in Days.
     */
    tolerancePeriod: ValueConstraint | null = null;
    /**
     * Include/Exclude Non-Working Days in Arrears Tolerance Period and Penalty Calculation Method.
     */
    includeNonWorkingDay = false;
    /**
     * Arrears Days Calculated From.
     */
    daysCalculatedFrom: ArrearsDaysCalculatedFrom | null = null;
    /**
     * Arrears Tolerance Amount (% of Outstanding Principal).
     */
    toleranceAmount: ValueConstraint | null = null;
    /**
     * With a floor (minimum).
     */
    floor: number | null = null;
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