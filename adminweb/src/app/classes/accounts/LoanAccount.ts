import { CustomerType } from "../customers/CustomerType";
import { CreditArrangementManaged } from "../products/CreditArrangementManaged";
import { LoanProductFee } from "../products/LoanProduct";
import { RepaymentCollection } from "../products/Repayment";
import { CurrencyLimitValue } from "../products/ValueConstraint";
import { Account, CreateAccountRequest } from "./Account";
import { AccountArrearsSetting } from "./AccountArrearsSetting";
import { AccountPenaltySetting } from "./AccountPenaltySetting";
import { AccountRepaymentScheduling } from "./AccountRepaymentScheduling";
import { LoanAccountInterestRate } from "./LoanAccountInterestRate";

export class LoanAccount extends Account {
    customerType = CustomerType.INDIVIDUAL;
    customerId: any = "";

    productFees: LoanProductFee[] = [];

    loanAppliedValues: CurrencyLimitValue[] = [];

    underCreditArrangementManaged: CreditArrangementManaged | null = CreditArrangementManaged.NO;
    
    accountInterestRate: LoanAccountInterestRate = new LoanAccountInterestRate();

    accountRepaymentScheduling: AccountRepaymentScheduling = new AccountRepaymentScheduling();
    
    repaymentCollection: RepaymentCollection = new RepaymentCollection();
    
    accountArrearsSetting: AccountArrearsSetting = new AccountArrearsSetting();
    
    accountPenaltySetting: AccountPenaltySetting = new AccountPenaltySetting();

    closeDormantAccounts = false;
    lockArrearsAccounts = false;
    capCharges = false;

    percentSecurityPerLoan = 0.0;
    enableGuarantors = false;
    enableCollateral = false;
}

export class CreateLoanAccountRequest extends CreateAccountRequest {
    customerId: any = 0;
    customerType: CustomerType = CustomerType.INDIVIDUAL;

    loanAppliedValues: CurrencyLimitValue[] = [];
    interestRateValues: CurrencyLimitValue[] = [];

    /**
     * Repayment scheduling settings.
     */
    installmentsValues: CurrencyLimitValue[] = [];
    /**
     * Automatically add a default offset in days to the first installment due date and specify
     * the minimum and maximum days that can be added to the first installment date.
     */
    firstDueDateOffsetValues: CurrencyLimitValue[] = [];
    /**
     * Principal Grace Period. If this option is not null then Pure Grace Period must be null.
     */
    gracePeriodValues: CurrencyLimitValue[] = [];

    /**
     * Arrears Tolerance Period in Days.
     */
    tolerancePeriods: CurrencyLimitValue[] = [];
    /**
     * Arrears Tolerance Amount (% of Outstanding Principal).
     */
    toleranceAmounts: CurrencyLimitValue[] = [];

    /**
     * Penalty Rate Constraints (%).
     */
    penaltyRateValues: CurrencyLimitValue[] = [];
}