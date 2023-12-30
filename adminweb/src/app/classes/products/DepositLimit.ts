export class DepositLimit {
    type: DepositLimitType = DepositLimitType.MIN_ONE_TIME_DEPOSIT;
    value: number = 0.0;
}

export enum DepositLimitType {
    /**
     * Minimum opening deposit amount.
     */
    MIN_OPENING_AMOUNT = "MIN_OPENING_AMOUNT",
    /**
     * Minimum one time deposit amount.
     */
    MIN_ONE_TIME_DEPOSIT = "MIN_ONE_TIME_DEPOSIT",
    /**
     * Recommended deposit amount.
     */
    RECOMMENDED_DEPOSIT_AMOUNT = "RECOMMENDED_DEPOSIT_AMOUNT",
    /**
     * Recommended opening amount.
     */
    RECOMMENDED_OPENING_AMOUNT = "RECOMMENDED_OPENING_AMOUNT",
    /**
     * Maximum deposit amount.
     */
    MAX_DEPOSIT_AMOUNT = "MAX_DEPOSIT_AMOUNT",
    /**
     * Maximum daily deposit limit.
     */
    MAX_DAILY_DEPOSIT = "MAX_DAILY_DEPOSIT",
    /**
     * Maximum opening deposit amount.
     */
    MAX_OPENING_AMOUNT = "MAX_OPENING_AMOUNT"
}