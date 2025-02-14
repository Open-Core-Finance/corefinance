import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralEntityAddComponent } from 'src/app/generic-component/GeneralEntityAddComponent';
import { SharedModule } from 'src/app/generic-component/SharedModule';
import { FormBuilder, FormControl } from '@angular/forms';
import { UiFormCheckbox, UiFormComplexInput, UiFormDivider, UiFormInput, UiFormItem, UiFormSelect, UiFormTextarea, UiSelectItem } from 'src/app/classes/ui/UiFormInput';
import { environment } from 'src/environments/environment';
import { LanguageService } from 'src/app/services/language.service';
import { CommonService } from 'src/app/services/common.service';
import { RestService } from 'src/app/services/rest.service';
import { HttpClient } from '@angular/common/http';
import { OrganizationService } from 'src/app/services/organization.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CryptoProductService } from 'src/app/services/product/product.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CurrencyModule } from 'src/app/generic-currency/CurrencyModule';
import { CreateCryptoAccountRequest, CryptoAccount } from 'src/app/classes/accounts/DepositAccount';
import { CustomerType } from 'src/app/classes/customers/CustomerType';
import { AbstractCustomerService, CorporateCustomerService, InvidualCustomerService } from 'src/app/services/customer.service';
import { DepositInterestRateTerms } from 'src/app/classes/products/DepositProduct';
import { Currency } from 'src/app/classes/Currency';
import { CurrencyService } from 'src/app/services/currency.service';
import { FrequencyOptionYearly } from 'src/app/classes/products/FrequencyOption';
import { TieredInterestItem } from 'src/app/classes/products/TieredInterestItem';
import { CryptoProduct } from 'src/app/classes/products/CryptoProduct';


@Component({
    selector: 'app-add-crypto-account',
    imports: [CommonModule, SharedModule, CurrencyModule],
    templateUrl: './add-crypto-account.component.html',
    styleUrl: './add-crypto-account.component.sass'
})
export class AddCryptoAccountComponent extends GeneralEntityAddComponent<CreateCryptoAccountRequest> implements OnDestroy, OnInit {

  cryptoProducts: CryptoProduct[] = [];
  cryptoProductSubscription: Subscription | undefined;
  productCurrencies: string[] = [];
  currencies: Currency[] = [];
  currenciesSubscription: Subscription | undefined;

  previousProductId: String | undefined;
  selectedProduct: CryptoProduct | undefined;
  protected valueChangeSubscription: Subscription | undefined;
  customersObservable : undefined | BehaviorSubject<UiSelectItem[]>;
  protected supportedCurrenciesObjects: Currency[] = [];

  constructor(public override languageService: LanguageService, protected override commonService: CommonService,
    protected override restService: RestService, protected override http: HttpClient, protected override formBuilder: FormBuilder,
    protected override organizationService: OrganizationService, protected override changeDetector: ChangeDetectorRef,
    protected override authenticationService: AuthenticationService, private cryptoProductService: CryptoProductService,
    protected invidualCustomerService: InvidualCustomerService, protected corporateCustomerService: CorporateCustomerService,
    protected currencyService: CurrencyService) {
      super(languageService, commonService, restService, http, formBuilder, organizationService, changeDetector, authenticationService);
  }

  ngOnInit(): void {
    this.cryptoProductSubscription?.unsubscribe();
    this.cryptoProductSubscription = this.cryptoProductService.entityListSubject.subscribe( cryptoProducts => {
      this.cryptoProducts = cryptoProducts ? cryptoProducts : [];
      this.updateSelectItem("productId");
      this.updateSelectedProduct();
    });
    this.valueChangeSubscription?.unsubscribe();
    this.valueChangeSubscription = this.addForm.valueChanges.subscribe( v => this.valueChanged(v));
    this.currenciesSubscription?.unsubscribe();
    this.currenciesSubscription = this.currencyService.currenciesSubject.subscribe( c => {
        this.currencies = c;
        this.updateSelectedProduct();
    });
  }

  valueChanged(v: any): void {
    let selectedProductId = v.productId;

    if (this.previousProductId != selectedProductId) {
      this.previousProductId = selectedProductId;
      this.productCurrencies = [];
      this.updateSelectedProduct();
    }
  }

  updateSelectedProduct() {
    if (this.cryptoProducts) {
      for (let i = 0; i < this.cryptoProducts.length; i++) {
        const depositProduct = this.cryptoProducts[i];
        if (depositProduct.id == this.previousProductId) {
          this.productCurrencies = depositProduct.currencies;
          this.selectedProduct = depositProduct;
          this.addForm.patchValue({
            termUnit: depositProduct.termUnit,
            enableTermDeposit: depositProduct.enableTermDeposit,
            enableInterestRate: depositProduct.enableInterestRate
          });
          if (depositProduct.interestRate) {
            this.addForm.patchValue({interestItems: depositProduct.interestRate.interestItems});
          }
        }
      }
    }
    this.currenciesChanged();
  }

  ngOnDestroy(): void {
    this.cryptoProductSubscription?.unsubscribe();
    this.valueChangeSubscription?.unsubscribe();
    this.currenciesSubscription?.unsubscribe();
  }

  protected override buildFormItems(): UiFormItem[] {
    this.customersObservable = new BehaviorSubject<UiSelectItem[]>([]);
    const formItems: UiFormItem[] = [];
    const prefix = "cryptoAccount.";
    const that = this;
    // ID auto generate
    formItems.push(new UiFormInput(prefix + "name", "name"));
    formItems.push(new UiFormSelect(prefix + "product", this.buildListSelection("productId"), "productId"));
    formItems.push(new UiFormSelect("customerType.type", this.buildListSelection("customerType"), "customerType"));
    var item :UiFormItem = new UiFormInput(prefix + "customer", "customerId");
    (item as UiFormInput).autoComleteItems = that.customersObservable;
    formItems.push(item);
    formItems.push(new UiFormCheckbox(prefix + "enableTermDeposit", "enableTermDeposit", null, () => true));
    formItems.push(new UiFormInput(prefix + "termLength", "termLength", "number", () => this.addForm.value.enableTermDeposit));
    formItems.push(new UiFormSelect(prefix + "termUnit", this.buildListSelection("termUnit"), "termUnit",
      () => this.addForm.value.enableTermDeposit, () => true));
    // Description
    formItems.push(new UiFormDivider());
    item = new UiFormTextarea(prefix + "description", "description");
    item.additionClass = 'full-width';
    formItems.push(item);
    formItems.push(new UiFormDivider());
    // Currencies
    formItems.push(new UiFormComplexInput("currencies", "supportedCurrencies", () => {
      return that.selectedProduct != undefined;
    }));
    // Main currency
    formItems.push(new UiFormSelect( "mainCurrency", that.buildListSelection("mainCurrency"), "mainCurrency",
      () => that.previousProductId != null && that.previousProductId != ''));
    // interestRateValues
    formItems.push(new UiFormComplexInput("interestRateValues", "interestRateValues", () => {
      return that.selectedProduct != undefined && that.selectedProduct.enableInterestRate
        && that.selectedProduct.interestRate?.interestRateTerms == DepositInterestRateTerms.FIXED;
    }));
    // tiered rate items
    formItems.push(new UiFormComplexInput("interestItems", "interestItems", () => {
      return that.selectedProduct != undefined && that.selectedProduct.enableInterestRate
        && that.selectedProduct.interestRate?.interestRateTerms != DepositInterestRateTerms.FIXED;
    }));
    // Return
    return formItems;
  }

  protected override getServiceUrl(): string {
    return environment.apiUrl.cryptoAccount;
  }

  protected override validateFormData(formData: any): void {
    const errors = this.message['error'];
    if (this.commonService.isNullOrEmpty(formData.name)) {
      errors.push("name_empty")
    }
    if (isNaN(Number(formData.customerId.toString()))) {
      if (this.commonService.isNullOrEmpty(formData.customerId)) {
        errors.push("customer_empty")
      } else {
        var index = formData.customerId.indexOf("-");
        if (index > 0) {
          formData.customerId = formData.customerId.substring(index + 1, formData.customerId.length).trim();
        }
      }
    }
  }

  protected override newEmptyEntity(): CreateCryptoAccountRequest {
    return new CreateCryptoAccountRequest();
  }

  protected override buildListSelection(selectName: string): UiSelectItem[] {
    if (selectName == 'productId') {
      return this.cryptoProducts ? this.cryptoProducts.map( m => ({ selectValue: m.id, labelKey: m.name} as UiSelectItem)) : [];
    } else if (selectName == 'customerType') {
      return Object.keys(CustomerType).map( m => ({ selectValue: m, labelKey: "customerType.type_" + m} as UiSelectItem));
    } else if (selectName == "termUnit") {
      return Object.keys(FrequencyOptionYearly).map( m => ({ selectValue: m, labelKey: "depositProduct.termDepositUnit_" + m} as UiSelectItem));
    } else if (selectName == 'mainCurrency') {
      var supportedCurrencies: string[] = this.addForm.value.supportedCurrencies;
      return supportedCurrencies.map( m => ({ selectValue: m, labelKey: m } as UiSelectItem));
    }
    return super.buildListSelection(selectName);
  }

  protected override get additionalFormGroupElement(): any {
    return {
      supportedCurrencies: new FormControl<string[]>([]),
      interestItems: new FormControl<TieredInterestItem[]>([])
    };
  }

  fieldInput($event: any) {
    const that = this;
    if ($event.name == 'customerId') {
      const filterText: string = $event.value;
      var customerService: AbstractCustomerService = (that.addForm.value.customerType == CustomerType.INDIVIDUAL) ? that.invidualCustomerService :
        that.corporateCustomerService;
      customerService.filterCustomer(filterText).subscribe( r => {
        var customers: any[] = r.result;
        if (customers) {
          that.customersObservable?.next(customers.map( m => {
            const label = m[customerService.autocompleteAttr] + " - " + m.id;
            return ({selectValue: label, labelKey: label} as UiSelectItem);
          }));
        } else {
          that.customersObservable?.next([]);
        }
      });
    }
  }

  override set addingItem(item: CryptoAccount | null) {
    let settingItem: CreateCryptoAccountRequest | null = null;
    if (item != null) {
      settingItem = new CreateCryptoAccountRequest();
      item.assignDataTo(settingItem);
      this.previousProductId = settingItem.productId;
    }
    super.addingItem = settingItem;
  }

  protected currenciesChanged(): void {
    const form = this.addForm;
    this.supportedCurrenciesObjects = [];
    this.supportedCurrenciesObjects.push(new Currency());
    const supportedCurrencies = form.value.supportedCurrencies ? form.value.supportedCurrencies : [];
    for (let currency of supportedCurrencies) {
        for(let  i = 0; i < this.currencies.length; i++) {
            const c = this.currencies[i];
            if (c.id == currency) {
                this.supportedCurrenciesObjects.push(c);
                break;
            }
        }
    }
    this.updateSelectItem("mainCurrency");
  }

  tieredInterestSubComponentChanged() {

  }
}
