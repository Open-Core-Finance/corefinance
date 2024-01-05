import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DayOfWeek} from "../../classes/DayOfWeek";
import {FormBuilder, FormControl} from "@angular/forms";
import {LanguageService} from "../../services/language.service";
import {CommonService} from "../../services/common.service";
import {RestService} from "../../services/rest.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GeneralApiResponse} from "../../classes/GeneralApiResponse";
import {
  DepositInterestCalculationDateOption,
  DepositInterestRate,
  DepositProduct
} from "../../classes/products/DepositProduct";
import {ProductAvailability, ProductAvailabilityMode, ProductNewAccountSetting} from "../../classes/products/Product";
import {ValueConstraint} from "../../classes/products/ValueConstraint";
import {TieredInterestItem} from "../../classes/products/TieredInterestItem";
import {WithdrawalLimit} from "../../classes/products/WithdrawalLimit";
import {Organization} from "../../classes/Organization";
import {Role} from "../../classes/Role";
import {ProductCategory, ProductCategoryType} from "../../classes/products/ProductCategory";
import {ProductType} from "../../classes/products/ProductType";
import {MatCheckboxChange} from "@angular/material/checkbox";

@Component({
  selector: 'app-add-deposit-product',
  templateUrl: './add-deposit-product.component.html',
  styleUrl: './add-deposit-product.component.sass'
})
export class AddDepositProductComponent implements AfterViewInit, OnInit {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _addingItem: DepositProduct | null = null;
  listAvailableModes = [ProductAvailabilityMode.ALL_BRANCHES, ProductAvailabilityMode.ALL_GROUPS];
  productCategories: ProductCategory[] = [];
  productTypes: ProductType[] = [];

  addDepositProductForm = this.formBuilder.group(
    Object.assign(Object.assign({}, new DepositProduct()), {
      productAvailabilities: this.formBuilder.array([
        new FormControl(new ProductAvailability(ProductAvailabilityMode.ALL_GROUPS, [])),
        new FormControl(new ProductAvailability(ProductAvailabilityMode.ALL_BRANCHES, []))
      ]),
      // productAvailabilityModeInfo: this.formBuilder.array([]),
      newAccountSetting: this.formBuilder.group(new ProductNewAccountSetting()),
      productFees: this.formBuilder.array([]),
      supportedCurrencies: this.formBuilder.array([]),
      interestRate: this.initDepositInterestForm(),
      depositLimits: this.formBuilder.array([]),
      withdrawalLimit: this.formBuilder.group(new WithdrawalLimit()),
      overdraftsInterest: this.initDepositInterestForm()
    })
  );
  message: Record<string, any[]> = {
    success: [],
    error: []
  };

  constructor(public languageService: LanguageService, private commonService: CommonService,
              private restService: RestService, private http: HttpClient,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    let headers = this.restService.initRequestHeaders();
    this.http.get<GeneralApiResponse>(environment.apiUrl.productCategory + "/", { headers, params: {
        type: ProductCategoryType.DEPOSIT
      } }).subscribe({
      next: (data: GeneralApiResponse) => {
        if (data.status === 0) {
          this.productCategories = (data.result as ProductCategory[]);
        }
      }, error: (data: any) => {
        console.log(data)
      }
    });
    this.http.get<GeneralApiResponse>(environment.apiUrl.productType + "/", { headers, params: {
        type: ProductCategoryType.DEPOSIT
      } }).subscribe({
      next: (data: GeneralApiResponse) => {
        if (data.status === 0) {
          this.productTypes = (data.result as ProductType[]);
        }
      }, error: (data: any) => {
        console.log(data)
      }
    });
  }

  ngAfterViewInit(): void {
  }

  saveClick($event: any): any {
    this.clearMessages();
    const formData = this.addDepositProductForm.value;
    if (this.commonService.isNullOrEmpty(formData.name)) {
      this.message['error'].push("name_empty")
    }
    if (this.commonService.isNullOrEmpty(formData.id)) {
      delete formData.id;
    }
    if (this.message['error'].length < 1) {
      const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
      let serviceUrl = "";
      var responseHandler = {
        next: (data: GeneralApiResponse) => {
          if (this.save) {
            $event.organization = data.result;
            this.save.emit($event);
          }
        }, error: (data: any) => {
          const message = this.message;
          if (data.statusText) {
            message['error'].push(data.statusText);
          } else if (data.statusCode) {
            message['error'].push(data.statusCode);
          } else {
            message['error'].push("Unknown error: " + JSON.stringify(data));
          }
        }
      };
      if (formData.id) {
        serviceUrl = environment.apiUrl.depositProduct + "/" + formData.id;
        this.http.put<GeneralApiResponse>(serviceUrl, formData, {
          headers: requestHeaders, params: {}
        }).subscribe(responseHandler);
      } else {
        serviceUrl = environment.apiUrl.depositProduct + "/create";
        this.http.post<GeneralApiResponse>(serviceUrl, formData, {
          headers: requestHeaders, params: {}
        }).subscribe(responseHandler);
      }
    }
  }

  cancelClick($event: any): any {
    if (this.cancel) {
      this.cancel.emit($event);
    }
  }

  clearMessages() {
    this.message = {
      success: [],
      error: []
    };
  }

  @Input() set addingItem(item: DepositProduct| null) {
    this._addingItem = item;
    if (item != null) {
      // @ts-ignore
      this.addDepositProductForm.setValue(item);
    } else {
      // @ts-ignore
      this.addDepositProductForm.setValue(new DepositProduct());
    }
  }

  private initDepositInterestForm(): any {
    return this.formBuilder.group(
      Object.assign(Object.assign({}, new DepositInterestRate()), {
        calculationDateOption: this.formBuilder.group(new DepositInterestCalculationDateOption()),
        interestRateConstraint: this.formBuilder.group(new ValueConstraint()),
        interestItems: this.formBuilder.group(new TieredInterestItem())
      })
    );
  }

  availableChanged(availableName: string, event: MatCheckboxChange) {
    const availableLists = this.addDepositProductForm.controls.productAvailabilities.value;
    if (availableLists) {
      if (!event.checked) {
        for (let i = 0; i < availableLists.length; i++) {
          if ((availableName as ProductAvailabilityMode) == (availableLists[i] as ProductAvailability).availabilityMode) {
            availableLists.splice(i, 1);
            i--;
          }
        }
      } else {
        //availableLists.push(availableName as ProductAvailabilityMode);
      }
    }
  }

  availableChecked(availableName: string) {
    const availableLists = this.addDepositProductForm.controls.productAvailabilities.value;
    if (availableLists) {
      for (let i = 0; i < availableLists.length; i++) {
        if ((availableLists[i] as ProductAvailability).availabilityMode === (availableName as ProductAvailabilityMode)) {
          return true;
        }
      }
    }
    return false;
  }
}
