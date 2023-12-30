import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DayOfWeek} from "../../classes/DayOfWeek";
import {FormControl, FormGroup} from "@angular/forms";
import {LanguageService} from "../../services/language.service";
import {CommonService} from "../../services/common.service";
import {RestService} from "../../services/rest.service";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {GeneralApiResponse} from "../../classes/GeneralApiResponse";
import {DepositProduct} from "../../classes/products/DepositProduct";
import {ProductAvailability, ProductFee, ProductNewAccountSetting} from "../../classes/products/Product";

@Component({
  selector: 'app-add-deposit-product',
  templateUrl: './add-deposit-product.component.html',
  styleUrl: './add-deposit-product.component.sass'
})
export class AddDepositProductComponent {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _addingItem: DepositProduct | null = null;
  listDayOfWeeks = Object.keys(DayOfWeek);

  addDepositProductForm = new FormGroup({
    index: new FormControl(0),
    id: new FormControl(""),
    name: new FormControl('', {nonNullable: true}),
    category: new FormControl("", {nonNullable: true}),
    type: new FormControl("", {nonNullable: true}),
    description: new FormControl(""),
    activated: new FormControl(true),
    productAvailabilities: new FormControl<ProductAvailability[]>([]),
    newAccountSetting: new FormControl<ProductNewAccountSetting>(new ProductNewAccountSetting()),
    currency: new FormControl(""),
    allowArbitraryFees: new FormControl(false),
    showInactiveFees: new FormControl(false),
    productFees: new FormControl<ProductFee[]>([]),
    lastModifyDate: new FormControl<any>(new Date())
  });
  message: Record<string, any[]> = {
    success: [],
    error: []
  };

  constructor(public languageService: LanguageService, private commonService: CommonService,
              private restService: RestService, private http: HttpClient) {
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
    if (item) {
      this.addDepositProductForm.setValue(item);
    } else {
      this.addDepositProductForm.setValue(new DepositProduct());
    }
  }

}
