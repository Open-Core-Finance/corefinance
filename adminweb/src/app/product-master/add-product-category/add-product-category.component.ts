import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductCategory, ProductCategoryType } from 'src/app/classes/products/ProductCategory';
import { FormControl, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonService } from 'src/app/services/common.service';
import { RestService } from 'src/app/services/rest.service';
import { LanguageService } from 'src/app/services/language.service';
import { environment } from 'src/environments/environment';
import { GeneralApiResponse } from 'src/app/classes/GeneralApiResponse';

@Component({
  selector: 'app-add-product-category',
  templateUrl: './add-product-category.component.html',
  styleUrl: './add-product-category.component.sass'
})
export class AddProductCategoryComponent {
  @Output() cancel = new EventEmitter();
  @Output() save = new EventEmitter();
  _addingItem: ProductCategory | null = null;
  productCategoryTypes = Object.keys(ProductCategoryType);

  addCurrencyForm = new FormGroup({
    index: new FormControl(0),
    id: new FormControl(""),
    name: new FormControl('', {nonNullable: true}),
    type: new FormControl(ProductCategoryType.DEPOSIT, {nonNullable: true})
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
    const formData = this.addCurrencyForm.value;
    if (this.commonService.isNullOrEmpty(formData.name)) {
      this.message['error'].push("name_empty");
    }
    if (formData.type == null) {
      this.message['error'].push("type_empty");
    }
    if (this.commonService.isNullOrEmpty(formData.id)) {
      delete formData.id;
    }
    if (this.message['error'].length < 1) {
      const requestHeaders = this.restService.initApplicationJsonRequestHeaders();
      let serviceUrl = environment.apiUrl.productCategory + "/";
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
        serviceUrl = environment.apiUrl.productCategory + "/" + formData.id;
        this.http.put<GeneralApiResponse>(serviceUrl, formData, {
          headers: requestHeaders, params: {}
        }).subscribe(responseHandler);
      } else {
        serviceUrl = environment.apiUrl.productCategory + "/create";
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

  @Input() set addingItem(item: ProductCategory| null) {
    this._addingItem = item;
    if (item) {
      this.addCurrencyForm.setValue(item);
    } else {
      this.addCurrencyForm.setValue(new ProductCategory());
    }
  }
}
