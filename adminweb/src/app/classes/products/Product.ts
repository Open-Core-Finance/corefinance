import {User} from "../User";

export abstract class Product {
    id: string = "";
    name: string = "";
    index: number = 0;
    category: string = "";
    type: string = "";
    description: string = "";
    activated: boolean = true;
    productAvailabilities: ProductAvailability[] = [
      new ProductAvailability(ProductAvailabilityMode.ALL_GROUPS, []),
      new ProductAvailability(ProductAvailabilityMode.ALL_BRANCHES, [])
    ];
    productAvailabilityAllGroups: boolean = true;
    productAvailabilityAllBranches: boolean = true;
    productAvailabilityModeInfo: string[] = [];

    newAccountSetting: ProductNewAccountSetting = new ProductNewAccountSetting();
    currency: string = "";

    // Product Fees
    allowArbitraryFees: boolean  = false;
    showInactiveFees: boolean  = false;
    productFees: ProductFee[] = [];

    lastModifyDate: Date = new Date();
    createdDate: Date = new Date();
    createdBy: User = new User();
    lastModifiedBy: User = new User();
}

export class ProductFee {
    activated = true;
    id = "";
    name = "";
    type: ProductFeeType = ProductFeeType.MONTHLY_FEE;
    amount: number | null = 0.0;
    disbursedPercent: number | null = 0.0;

    monthlyPayOption: MonthlyPayOption = MonthlyPayOption.MONTHLY_FROM_ACTIVATION;
    requiredFeeApplication: boolean | null = false;
}

export enum ProductFeeType {
    /**
     * Manual for deposit or loan account.
     */
    MANUAL_FEE = "MANUAL_FEE",
    /**
     * Deposit monthly fee.
     */
    MONTHLY_FEE = "MONTHLY_FEE",
    /**
     * Planned (Applied on Due Dates) for loan.
     */
    PLANNED = "PLANNED",
    /**
     * Deducted Disbursement.
     */
    DEDUCTED_DISBURSEMENT = "DEDUCTED_DISBURSEMENT",
    /**
     * Capitalized Disbursement.
     */
    CAPITALIZED_DISBURSEMENT = "CAPITALIZED_DISBURSEMENT",
    /**
     * Upfront Disbursement.
     */
    UPFRONT_DISBURSEMENT = "UPFRONT_DISBURSEMENT",
    /**
     * Late Repayment.
     */
    LATE_REPAYMENT = "LATE_REPAYMENT",
    /**
     * Payment Due (Applied Upfront).
     */
    PAYMENT_DUE_UPFRONT = "PAYMENT_DUE_UPFRONT",
    /**
     * Payment Due (Applied on Due Dates).
     */
    PAYMENT_DUE_DUE_DATE = "PAYMENT_DUE_DUE_DATE"
}

export enum MonthlyPayOption {
    /**
     * Pay monthly base on activation date.
     */
    MONTHLY_FROM_ACTIVATION = "MONTHLY_FROM_ACTIVATION",
    /**
     * Pay first day every month.
     */
    MONTHLY_FIRST_DAY = "MONTHLY_FIRST_DAY",
    /**
     * Pay last day every month.
     */
    MONTHLY_LAST_DAY = "MONTHLY_LAST_DAY"
}

export class ProductAvailability {
    constructor(public availabilityMode: ProductAvailabilityMode, public modeInfo: string[]) {
    }
}

export enum ProductAvailabilityMode {
    ALL_BRANCHES = "ALL_BRANCHES",
    SPECIFIC_BRANCHES = "SPECIFIC_BRANCHES",
    ALL_GROUPS = "ALL_GROUPS",
    SPECIFIC_GROUPS = "SPECIFIC_GROUPS"
}

export class ProductNewAccountSetting {
    typeName: ProductNewAccountSettingType = ProductNewAccountSettingType.RANDOM_PATTERN;
    typeConfig: string = "@@@$#####";
    initialState: AccountState = AccountState.NEW;
}

export enum AccountState {
    PENDING_APPROVAL = "PENDING_APPROVAL",
    PARTIAL_APPLICATION = "PARTIAL_APPLICATION",
    APPROVED = "APPROVED",
    NEW = "NEW",
    DORMANT = "DORMANT",
    CLOSED = "CLOSED",
    OPEN = "OPEN"
}

export enum ProductNewAccountSettingType {
  /**
   * Sequential ID numbers that begin with a specified number.
   */
  INCREASEMENT = "INCREASEMENT",
  /**
   * Templates consist of the characters `#`, `@`, and `$`, where `#` specifies a number, `@` a letter, and `$` a number or a letter, chosen at random.
   * For example, `@#@#$` will configure system to generate five-character values of one letter, one number, one letter, one number, and one character
   * that is either a letter or a number, such as `B8J4P` or `P1F62`.
   */
  RANDOM_PATTERN = "RANDOM_PATTERN"
}
