package tech.corefinance.product.common.enums;

public enum LoanProductFeeType {
    /**
     * Manual for deposit or loan account.
     */
    MANUAL_FEE,
    /**
     * Planned (Applied on Due Dates) for loan.
     */
    PLANNED,
    /**
     * Deducted Disbursement.
     */
    DEDUCTED_DISBURSEMENT,
    /**
     * Capitalized Disbursement.
     */
    CAPITALIZED_DISBURSEMENT,
    /**
     * Upfront Disbursement.
     */
    UPFRONT_DISBURSEMENT,
    /**
     * Late Repayment.
     */
    LATE_REPAYMENT,
    /**
     * Payment Due (Applied Upfront).
     */
    PAYMENT_DUE_UPFRONT,
    /**
     * Payment Due (Applied on Due Dates).
     */
    PAYMENT_DUE_DUE_DATE;
}
