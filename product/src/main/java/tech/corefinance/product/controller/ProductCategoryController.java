package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudController;
import tech.corefinance.common.controller.CrudServiceAndController;
import tech.corefinance.common.dto.GeneralApiResponse;
import tech.corefinance.common.service.CommonService;
import tech.corefinance.product.entity.ProductCategory;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.repository.ProductCategoryRepository;
import tech.corefinance.product.service.ProductCategoryService;

import java.util.List;

@RestController
@RequestMapping("/product-categories")
@ControllerManagedResource("productcategory")
public class ProductCategoryController implements CrudController<String, ProductCategory, ProductCategory> {

    @Autowired
    private ProductCategoryService productCategoryService;

    @Override
    public CommonService<String, ProductCategory, ?> getHandlingService() {
        return productCategoryService;
    }

    @GetMapping("/")
    public GeneralApiResponse<List<ProductCategory>> loadByType(@RequestParam("type") ProductCategoryType categoryType) {
        return GeneralApiResponse.createSuccessResponse(productCategoryService.loadByType(categoryType));
    }
}
