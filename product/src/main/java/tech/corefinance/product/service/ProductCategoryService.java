package tech.corefinance.product.service;

import tech.corefinance.common.service.CommonService;
import tech.corefinance.product.entity.ProductCategory;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.repository.ProductCategoryRepository;

import java.util.List;

public interface ProductCategoryService extends CommonService<String, ProductCategory, ProductCategoryRepository> {

    List<ProductCategory> loadByType(ProductCategoryType categoryType);
}
