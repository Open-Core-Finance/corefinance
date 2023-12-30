export class WithdrawalLimit {

    /**
     * Limit type.
     */
    type: WithdrawalLimitType = WithdrawalLimitType.WITHDRAW_LIMIT_DAILY;
    /**
     * Channel ID null mean apply for all channel.
     */
    channelId: string = "";
    /**
     * Limit amount.
     */
    amount: number = 0.0;
}

export enum WithdrawalLimitType {
    /**
     * Yearly limit.
     */
    WITHDRAW_LIMIT_YEARLY = "WITHDRAW_LIMIT_YEARLY",
    /**
     * Monthly limit.
     */
    WITHDRAW_LIMIT_MONTHLY = "WITHDRAW_LIMIT_MONTHLY",
    /**
     * Daily limit.
     */
    WITHDRAW_LIMIT_DAILY = "WITHDRAW_LIMIT_DAILY",
    /**
     * One time withdrawal limit.
     */
    WITHDRAW_LIMIT_EACH_TIME = "WITHDRAW_LIMIT_EACH_TIME",
    /**
     * Max Withdrawal Amount As a % of total balance on the deposit account.
     */
    WITHDRAWAL_LIMIT_PERCENTAGE_OF_BALANCE = "WITHDRAWAL_LIMIT_PERCENTAGE_OF_BALANCE"
}