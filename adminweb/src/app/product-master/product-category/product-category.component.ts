import { Component } from '@angular/core';
import { TableComponent } from 'src/app/generic-component/TableComponent';
import { ProductCategory } from 'src/app/classes/products/ProductCategory';
import { UiOrderEvent } from 'src/app/classes/UiOrderEvent';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrl: './product-category.component.sass'
})
export class ProductCategoryComponent extends TableComponent<ProductCategory> {

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
    return environment.apiUrl.productCategory;
  }

  override getDeleteConfirmContent(item: ProductCategory): string {
    return this.languageService.formatLanguage("productCategory.deleteConfirmContent", [item.name]);
  }

  override getDeleteConfirmTitle(item: ProductCategory): string {
    return this.languageService.formatLanguage("productCategory.deleteConfirmTitle", []);
  }

  override createNewItem(): ProductCategory {
    return new ProductCategory();
  }
}
