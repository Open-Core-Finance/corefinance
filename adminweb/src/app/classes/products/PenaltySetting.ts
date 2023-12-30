import { ValueConstraint } from "./ValueConstraint";

export class PenaltySetting {
    /**
     * 1 => No Penalty
     * 2 => Overdue Principal * # of Late Days * Penalty Rate
     * 3 => (Overdue Principal + Overdue Interest) * # of Late Days * Penalty Rate
     * 4 => Outstanding Principal * # of Late Days * Penalty Rate
     */
    calculationMethod: number = 1;
    /**
     * Penalty Tolerance Period X Days.
     */
    penaltyTolerancePeriod: number | null = null;
    /**
     * Penalty Rate Constraints (%).
     */
    penaltyRateConstraint: ValueConstraint | null = null;
}
