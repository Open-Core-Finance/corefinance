import { Component, Input, OnDestroy, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Currency } from 'src/app/classes/Currency';
import { Subscription } from 'rxjs';
import { AccruedInterestPostingFrequency, LoanInterestCalculationMethod, LoanInterestRate, LoanInterestType, RepaymentsInterestCalculation } from 'src/app/classes/products/LoanProduct';
import { LanguageService } from 'src/app/services/language.service';
import { EntitiesService } from 'src/app/services/EntitiesService';
import { ValueConstraint } from 'src/app/classes/products/ValueConstraint';
import { InterestDayInYear } from 'src/app/classes/products/InterestDayInYear';
import { InterestCalculationMethod } from 'src/app/classes/products/InterestCalculationMethod';

@Component({
  selector: 'app-loan-interest-rate-input',
  templateUrl: './loan-interest-rate-input.component.html',
  styleUrl: './loan-interest-rate-input.component.sass',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoanInterestRateInputComponent),
      multi: true
    }
  ]
})
export class LoanInterestRateInputComponent implements OnInit, ControlValueAccessor, OnDestroy {
  isDisabled: boolean = false;
  lastSupportedCurrencies: string[] | undefined;
  currencies: Currency[] = [];
  currenciesToDisplay: Currency[] = [];
  currenciesSubscription: Subscription | undefined;
  value: LoanInterestRate = new LoanInterestRate();
  loanInterestCalculationMethodEnum = LoanInterestCalculationMethod;
  allLoanCalculationMethods = Object.keys(LoanInterestCalculationMethod);
  accruedInterestPostingFrequencyEnum = AccruedInterestPostingFrequency;
  allPostingFrequency = Object.keys(AccruedInterestPostingFrequency);
  loanInterestTypeEnum = LoanInterestType;
  allInterestTypes = Object.keys(LoanInterestType);
  interestDayInYearEnum = InterestDayInYear;
  allDayInYearOption = Object.keys(InterestDayInYear);
  interestCalculationMethodEnum = InterestCalculationMethod;
  allCalculationMethods = Object.keys(InterestCalculationMethod);
  repaymentsInterestCalculationEnum = RepaymentsInterestCalculation;
  allRepaymentsInterestCalculations = Object.keys(RepaymentsInterestCalculation);

  public constructor(public languageService: LanguageService, private entityService: EntitiesService) {
    this.currenciesSubscription?.unsubscribe();
    this.currenciesSubscription = this.entityService.organizationObservableMap.get(EntitiesService.ENTITY_TYPE_CURRENCY)?.subscribe( c => {
      this.currencies = c;
      if (this.lastSupportedCurrencies) {
        this.populateCurrenciesToUi(this.lastSupportedCurrencies);
      }
    });
  }

  ngOnDestroy(): void {
    this.currenciesSubscription?.unsubscribe();
  }

  ngOnInit(): void {
  }

  writeValue(value: LoanInterestRate): void {
    this.value = value;
    this.populateCurrenciesToUi(this.lastSupportedCurrencies ? this.lastSupportedCurrencies : []);
  }
 
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.propagateTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  propagateChange = (_: LoanInterestRate[]) => { };
  propagateTouched = (_: LoanInterestRate[]) => { };

  @Input()
  set supportedCurrencies(supportedCurrencies: string[]) {
    this.lastSupportedCurrencies = supportedCurrencies;
    this.populateCurrenciesToUi(supportedCurrencies);
  }

  private populateCurrenciesToUi(supportedCurrencies: string[]) {
    this.currenciesToDisplay = [];
    if (supportedCurrencies.length > 0) {
      this.currencies.forEach((value, index, arr) => {
        for(let  i = 0; i < supportedCurrencies.length; i++) {
          const c = supportedCurrencies[i];
          if (c == value.id) {
            this.currenciesToDisplay.push(value);
            this.checkAndUpdateCurrency(value);
            break;
          }
        }
      });
    } else {
      this.value.interestRateConstraints = [];
    }
  }

  private checkAndUpdateCurrency(currency: Currency) {
    let found = false;
    var constraints = this.value.interestRateConstraints;
    for (const currencyValue of constraints) {
      if (currencyValue.currencyId == currency.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      const item = new ValueConstraint();
      item.currencyId = currency.id;
      item.currencyName = currency.name;
      this.value.interestRateConstraints.push(item);
    }
    if (!this.lastSupportedCurrencies || this.lastSupportedCurrencies.length < 1) {
      this.value.interestRateConstraints = [];
    } else {
      // Clean remove currencies constraint
      for(let  i = 0; i < constraints.length; i++) {
        var c = constraints[i];
        found = false;
        for (const supportedCurrency of this.lastSupportedCurrencies) {
          if (supportedCurrency == c.currencyId) {
            found = true;
            break;
          }
        }
        if (!found) {
          constraints.splice(i, 1);
          i--;
        }
      }
    }
  }
}