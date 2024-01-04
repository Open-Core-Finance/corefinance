package tech.corefinance.product.service;

import tech.corefinance.common.service.CommonService;
import tech.corefinance.product.entity.ProductType;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.repository.ProductTypeRepository;

import java.util.List;

public interface ProductTypeService extends CommonService<String, ProductType, ProductTypeRepository> {

    List<ProductType> loadByType(ProductCategoryType categoryType);
}
