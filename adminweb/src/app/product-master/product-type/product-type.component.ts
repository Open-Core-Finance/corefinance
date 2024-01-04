import { Component } from '@angular/core';
import { TableComponent } from 'src/app/generic-component/TableComponent';
import { ProductCategory } from 'src/app/classes/products/ProductCategory';
import { UiOrderEvent } from 'src/app/classes/UiOrderEvent';
import { environment } from 'src/environments/environment';
import {ProductType} from "../../classes/products/ProductType";

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrl: './product-type.component.sass'
})
export class ProductTypeComponent extends TableComponent<ProductType> {

  override buildTableColumns(): string[] {
    return ["index", "id", "name", "type", "action"];
  }

  override ngAfterViewInit(): void {
    super.ngAfterViewInit();
    const order = new UiOrderEvent();
    order.active = "id";
    order.direction = "asc";
    this.changeOrder({ order });
  }

  getServiceUrl() {
    return environment.apiUrl.productType;
  }

  override getDeleteConfirmContent(item: ProductType): string {
    return this.languageService.formatLanguage("productType.deleteConfirmContent", [item.name]);
  }

  override getDeleteConfirmTitle(item: ProductType): string {
    return this.languageService.formatLanguage("productType.deleteConfirmTitle", []);
  }

  override createNewItem(): ProductType {
    return new ProductType();
  }
}
