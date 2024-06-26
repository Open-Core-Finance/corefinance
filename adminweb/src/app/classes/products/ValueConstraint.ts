export class CurrencyBasesValue {
    currencyId: string = "";
}

export class ValueConstraint extends CurrencyBasesValue {
    /**
     * Min amount of money.
     */
    minVal: number | null= 0.0;
    /**
     * Max amount of money.
     */
    maxVal: number | null= 0.0;
    /**
     * Default amount of money.
     */
    defaultVal: number | null= 0.0;
}

export class CurrencyLimitValue extends CurrencyBasesValue {
    value: number = 0.0;
}