export enum InterestDayInYear {
    /**
     * The Actual/365 Fixed is a day count convention that counts the actual number of days in each month, but deems each year to be 365 days.
     * It applies in leap years as well as in normal years.<br/>
     * Formula: <br/>
     * Interest = AnnualInterestRate * OutstandingPrincipalBalance/365 * NumberOfDaysInTheTargetMonth<br/>
     * Let’s consider a loan with the following terms.<br/>
     * Loan amount : USD 1000<br/>
     * Interest rate: 10% per year<br/>
     * Number of installments: 5<br/>
     * Interest expected for one month with 30 days: 10%* 1000/365 * 30 = USD 8.22<br/>
     * Interest expected for one month with 31 days: 10%* 1000/365 * 31 = USD 8.49<br/>
     */
    FIXED_365_DAYS = "FIXED_365_DAYS",
    /**
     * Actual/360 is a day count convention that counts the actual number of days in each month, but deems each year to be 360 days.<br/>
     * Formula: <br/>
     * Interest = AnnualInterestRate * OutstandingPrincipalBalance/360 * NumberOfDaysInTheTargetMonth<br/>
     * Let’s consider a loan with the following terms.<br/>
     * Loan amount : USD 1000<br/>
     * Interest rate: 10% per year<br/>
     * Number of installments: 5<br/>
     * Interest expected for one month with 28 days: 10%* 1000/360 * 28 = USD 7.78<br/>
     * Interest expected for one month with 31 days: 10%* 1000/360 * 31 = USD 8.61<br/>
     */
    FIXED_360_DAYS = "FIXED_360_DAYS",
    /**
     * Actual ISDA: <br/>
     * Calculates the interest daily by counting the number of days in the calendar and also considers leap years.
     */
    ACTUAL_ISDA = "ACTUAL_ISDA",
    /**
     * The 30E/360 ISDA day count convention deems all months to be 30 days in length and each year to be 360 days. <br/>
     * With this method, the interest accrues at a daily interest rate equal to 1/360th of the interest rate,
     * but for each full month is deemed to accrue for 30 days, regardless whether the month has 28, 29, 30, or 31 days.<br/>
     * In all cases, with this day count convention, the total number of days in a year will always be 360.<br/>
     * Formula: <br/>
     * Interest = AnnualInterestRate * OutstandingPrincipalBalance/360 * 30<br/>
     * Let’s consider a loan with the following terms.<br/>
     * Loan amount : USD 1000<br/>
     * Interest rate: 10% per year<br/>
     * Number of installments: 5<br/>
     * Interest expected for one month with 28 days: 10%* 1000/360 * 30 = USD 8.33<br/>
     * Interest expected for one month with 31 days: 10%* 1000/360 * 30 = USD 8.33<br/>
     */
    GERMAN_30E_360ISDA = "GERMAN_30E_360ISDA"
}
