import {ProductCategoryType} from "./ProductCategory";

export class ProductType {
    id: string = "";
    name: string = "";
    index: number = 0;
    type: ProductCategoryType = ProductCategoryType.DEPOSIT;
}
