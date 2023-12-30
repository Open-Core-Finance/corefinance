import { ArrearsSetting } from "./ArrearsSetting";
import { CreditArrangementManaged } from "./CreditArrangementManaged";
import { FrequencyOptionYearly } from "./FrequencyOptionYearly";
import { InterestCalculationMethod } from "./InterestCalculationMethod";
import { InterestDayInYear } from "./InterestDayInYear";
import { InterestRate } from "./InterestRate";
import { PenaltySetting } from "./PenaltySetting";
import { Product } from "./Product";
import { RepaymentCollection, RepaymentScheduling } from "./Repayment";
import { ValueConstraint } from "./ValueConstraint";

export class LoanProduct extends Product {

    loanMin: number = 0.0;
    loanMax: number = 0.0;
    loanDefault: number = 0.0;
    
    underCreditArrangementManaged: CreditArrangementManaged | null = null;
    
    interestRate: LoanInterestRate | null = null;
    repaymentScheduling: RepaymentScheduling | null = null;
    repaymentCollection: RepaymentCollection | null = null;
    arrearsSetting: ArrearsSetting | null = null;
    penaltySetting: PenaltySetting | null = null;

    closeDormantAccounts: boolean = false;
    lockArrearsAccounts: boolean = false;
    capCharges: boolean = false;

    percentGuarantors: boolean | null = false;
    percentCollateral: boolean | null = false;
}

export class LoanInterestRate implements InterestRate {
    interestCalculationMethod: InterestCalculationMethod = InterestCalculationMethod.PERCENTAGE_PER_YEAR;
    accruedInterestPostingFrequency: AccruedInterestPostingFrequency = AccruedInterestPostingFrequency.REPAYMENT;
    interestType: LoanInterestType = LoanInterestType.CAPITALIZED;
    interestDayInYear: InterestDayInYear = InterestDayInYear.FIXED_365_DAYS;
    /**
     * Interest Rate Constraints (%) for fixed interest rate. <br/>
     * Interest Spread Constraints (%) for index rate source.
     */
    interestRateConstraint: ValueConstraint | null = null;
    interestRateIndexSource = "";
    repaymentsInterestCalculation: RepaymentsInterestCalculation | null = RepaymentsInterestCalculation.ACTUAL_NUMBER_OF_DAYS;

    /**
     * Interest Rate Floor (%).
     */
    rateFloor: number | null = 0.0;
    /**
     * Interest Rate Ceiling (%).
     */
    rateCeiling: number | null = 0.0;

    /**
     * Interest Rate Review Frequency.
     */
    reviewFrequency: number | null = 0;
    /**
     * Interest Rate Review Frequency type as Days|Weeks|Months.
     */
    reviewFrequencyType: FrequencyOptionYearly = FrequencyOptionYearly.MONTH;
}

export enum AccruedInterestPostingFrequency {
    /**
     * Accrued Interest Posting Frequency on Disbursement.
     */
    DISBURSEMENT = "DISBURSEMENT",
    /**
     * Accrued Interest Posting Frequency on Repayment.
     */
    REPAYMENT = "REPAYMENT"
}

export enum LoanInterestType {
    /**
     * Simple Interest.
     */
    SIMPLE = "SIMPLE",
    /**
     * Compound Interest with Compounding Frequency as Daily;
     */
    DAILY_COMPOUND = "DAILY_COMPOUND",
    /**
     * Capitalized Interest.
     */
    CAPITALIZED = "CAPITALIZED"
}

export enum RepaymentsInterestCalculation {

    /**
     * Using Actual Number of Days.
     */
    ACTUAL_NUMBER_OF_DAYS = "ACTUAL_NUMBER_OF_DAYS",
    /**
     * Using Repayment Periodicity.
     */
    REPAYMENT_PERIODICITY = "REPAYMENT_PERIODICITY"
}