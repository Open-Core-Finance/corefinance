import { FrequencyOption } from "./FrequencyOption";
import { ValueConstraint } from "./ValueConstraint";

export class RepaymentCollection {
    /**
     * Horizontal or Vertical.
     */
    repaymentHorizontal: boolean | null = null;
    /**
     * Accept Pre-Payments. Whether interest that's not yet applied in the account can be paid in advance.
     */
    acceptInterestPrePayments: boolean | null = null;
    /**
     * Accept Pre-Payments. Whether interest that's not yet applied in the account can be paid in advance.
     */
    acceptPostdatedPrePayments: boolean | null = null;
    /**
     * Dynamic term loan. Auto Apply Interest on Pre-Payment.
     */
    autoApplyInterestPrePayment: boolean | null = null;
    /**
     * Dynamic term loan Pre-Payment Recalculation.
     */
    prePaymentRecalculation: PrePaymentRecalculation | null = null;
    /**
     *  Arrange repayment types according to which should be paid first and last on partial or over-payments.
     */
    repaymentTypesOrder: RepaymentType[] = [];
}

export enum PrePaymentRecalculation {
    /**
     * No Recalculation.
     */
    NO_RECALCULATION = "NO_RECALCULATION",
    /**
     * Reschedule Remaining Repayments.
     */
    RESCHEDULE_REMAINING_REPAYMENTS = "RESCHEDULE_REMAINING_REPAYMENTS",
    /**
     * Recalculate the Schedule, Keep the Same Number of Terms.
     */
    RECALCULATE_SCHEDULE_KEEP_SAME_NUMBER_OF_TERMS = "RECALCULATE_SCHEDULE_KEEP_SAME_NUMBER_OF_TERMS",
    /**
     * Recalculate the Schedule, Keep the Same Principal Amount.
     */
    RECALCULATE_SCHEDULE_KEEP_SAME_PRINCIPAL_AMOUNT = "RECALCULATE_SCHEDULE_KEEP_SAME_PRINCIPAL_AMOUNT"
}

export enum RepaymentType {
    FEE = "FEE", PENALTY = "PENALTY", INTEREST = "INTEREST", PRINCIPAL = "PRINCIPAL"
}

export class RepaymentScheduling {
    /**
     * Interval repayment scheduling value.
     */
    intervalValue: number | null = null;
    /**
     * Interval repayment scheduling option.
     */
    intervalOption: FrequencyOption | null = null;
    /**
     * Fixed days repayment scheduling value.
     */
    repaymentDays: number[] = [];

    shortMonthHandling: ShortMonthHandling | null = null;
    installmentsConstraint: ValueConstraint | null = null;
    /**
     * Automatically add a default offset in days to the first installment due date and specify
     * the minimum and maximum days that can be added to the first installment date.
     */
    firstDueDateOffsetConstraint: ValueConstraint | null = null;
    /**
     * Collect Principal Every X Repayments.
     */
    collectPrincipalEveryRepayments: number | null = null;
    /**
     * Principal Grace Period. If this option is not null then Pure Grace Period must be null.
     */
    principalGracePeriod: ValueConstraint | null = null;
    /**
     * Pure Grace Period. If this option is not null then Principal Grace Period must be null.
     */
    pureGracePeriod: ValueConstraint | null = null;

    scheduleRounding: RepaymentScheduleRounding = RepaymentScheduleRounding.NO_ROUNDING;

    nonWorkingDaysRescheduling: NonWorkingDaysRescheduling = NonWorkingDaysRescheduling.NO_RESCHEDULING;

    repaymentsScheduleEditing: RepaymentsScheduleEditing = new RepaymentsScheduleEditing();
}

export enum ShortMonthHandling {
    LAST_DAY_OF_MONTH = "LAST_DAY_OF_MONTH", FIRST_DAY_NEXT_MONTH = "FIRST_DAY_NEXT_MONTH"
}

export enum RepaymentScheduleRounding {
    NO_ROUNDING = "NO_ROUNDING", ROUND_TO_NEAREST = "ROUND_TO_NEAREST", ROUND_UP_TO_NEAREST = "ROUND_UP_TO_NEAREST"
}

export enum NonWorkingDaysRescheduling {
    NO_RESCHEDULING = "NO_RESCHEDULING", MOVE_NEXT_WORKING_DAY = "MOVE_NEXT_WORKING_DAY",
    MOVE_BACKWARD_WORKING_DAY = "MOVE_BACKWARD_WORKING_DAY", EXTEND_SCHEDULE = "EXTEND_SCHEDULE"
}

export class RepaymentsScheduleEditing {

    adjustPaymentDates: boolean = false;
    adjustPrincipalPaymentSchedule: boolean = false;
    adjustNumberInstallments: boolean = false;
    configurePaymentHolidays: boolean = false;
}