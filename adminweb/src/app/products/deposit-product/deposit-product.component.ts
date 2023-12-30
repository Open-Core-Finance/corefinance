import { Component } from '@angular/core';
import {TableComponent} from "../../generic-component/TableComponent";
import {UiOrderEvent} from "../../classes/UiOrderEvent";
import {environment} from "../../../environments/environment";
import {DepositProduct} from "../../classes/products/DepositProduct";

@Component({
  selector: 'app-deposit-product',
  templateUrl: './deposit-product.component.html',
  styleUrl: './deposit-product.component.sass'
})
export class DepositProductComponent extends TableComponent<DepositProduct> {

  override buildTableColumns(): string[] {
    return ["index", "id", "name", "category", "type", "lastModifyDate", "activated", "action"];
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const order = new UiOrderEvent();
    order.active = "id";
    order.direction = "asc";
    this.changeOrder({ order });
  }

  getServiceUrl() {
    return environment.apiUrl.depositProduct;
  }

  override getDeleteConfirmContent(item: DepositProduct): string {
    return this.languageService.formatLanguage("depositProduct.deleteConfirmContent", [item.name]);
  }

  override getDeleteConfirmTitle(item: DepositProduct): string {
    return this.languageService.formatLanguage("depositProduct.deleteConfirmTitle", []);
  }

  override createNewItem(): DepositProduct {
    return new DepositProduct();
  }
}
