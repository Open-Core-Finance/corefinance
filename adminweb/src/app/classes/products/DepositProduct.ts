import { CreditArrangementManaged } from "./CreditArrangementManaged";
import { DepositLimit } from "./DepositLimit";
import { FrequencyOptionYearly } from "./FrequencyOption";
import { InterestCalculationMethod } from "./InterestCalculationMethod";
import { InterestDayInYear } from "./InterestDayInYear";
import { InterestRate } from "./InterestRate";
import { Product } from "./Product";
import { TieredInterestItem } from "./TieredInterestItem";
import { ValueConstraint } from "./ValueConstraint";
import { WithdrawalLimit } from "./WithdrawalLimit";

export class DepositProduct extends Product {

    supportedCurrencies: string[] = [];
    /**
     * Interest Rate.
     */
    interestRate: DepositInterestRate | null = new DepositInterestRate();

    // Internal control
    daysToSetToDormant: number | null = 0;

    /**
     * Deposit transaction limits.
     */
    depositLimits: DepositLimit[] = [];
    /**
     * Withdrawal Limits.
     */
    withdrawalLimit: WithdrawalLimit | null = new WithdrawalLimit();
    /**
     * Early Closure Period.
     */
    earlyClosurePeriod: number | null = 0;

    allowOverdrafts: boolean = false;
    overdraftsInterest: DepositInterestRate | null = new DepositInterestRate();
    maxOverdraftLimit: number | null = 0.0;
    overdraftsUnderCreditArrangementManaged: CreditArrangementManaged | null = CreditArrangementManaged.NO;

    termUnit: FrequencyOptionYearly | null = FrequencyOptionYearly.DAY;
    minTermLength: number | null = 0.0;
    maxTermLength: number | null = 0.0;
    defaultTermLength: number | null = 0.0;
    allowDepositAfterMaturityDate: boolean | null = false;
}

export class DepositInterestRate implements InterestRate {
    interestCalculationMethod: InterestCalculationMethod | null = InterestCalculationMethod.PERCENTAGE_PER_MONTH;
    balanceInterestCalculation: DepositBalanceInterestCalculation | null = DepositBalanceInterestCalculation.END_OF_dAY;
    calculationDateOption: DepositInterestCalculationDateOption | null = new DepositInterestCalculationDateOption();
    interestDayInYear: InterestDayInYear | null = InterestDayInYear.FIXED_365_DAYS;

    applyWithholdingTaxes: boolean | null = false;
    // Fixed interest rate
    allowNegativeInterestRate: boolean | null = false;
    /**
     * Interest Rate Constraints (%) for fixed interest rate. <br/>
     * Interest Spread Constraints (%) for index rate source.
     */
    interestRateConstraint: ValueConstraint | null = new ValueConstraint();
    interestRateIndexSource: string = "";
    // Tiered interest rate
    interestItems: TieredInterestItem | null = new TieredInterestItem();
}

export enum DepositBalanceInterestCalculation {
    /**
     * Minimum Daily Balance: <br/>
     * System will base the interest calculation on the minimum balance the client had in their account during the day.
     */
    DAILY_MIN = "DAILY_MIN",
    /**
     * Average Daily Balance: <br/>
     * System will calculate the average balance that the client had in their account during the day, and base the interest calculation on that amount.
     */
    DAILY_AVG = "DAILY_AVG",
    /**
     * End of Day Balance: <br/>
     * System will base the interest calculation on the balance the client had in their account at the end of the day.
     */
    END_OF_dAY = "END_OF_dAY"
}

export class DepositInterestCalculationDateOption {
    type: InterestCalculationDateOptionType = InterestCalculationDateOptionType.EVERY_MONTH;
    typeConfig: any;
}

export enum InterestCalculationDateOptionType {
    FIRST_DAY_EVERY_MOTNH = "FIRST_DAY_EVERY_MOTNH",
    EVERY_DAY = "EVERY_DAY",
    EVERY_WEEK = "EVERY_WEEK",
    EVERY_OTHER_WEEK = "EVERY_OTHER_WEEK",
    EVERY_MONTH = "EVERY_MONTH",
    EVERY_THREE_MONTHS = "EVERY_THREE_MONTHS",
    EVERY_SIX_MONTHS = "EVERY_SIX_MONTHS",
    EVERY_YEAR = "EVERY_YEAR",
    /**
     * For example fix every 1st January.
     */
    ON_FIXED_DATE = "ON_FIXED_DATE"
}
