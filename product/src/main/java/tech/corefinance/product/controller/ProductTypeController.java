package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudController;
import tech.corefinance.common.dto.GeneralApiResponse;
import tech.corefinance.common.service.CommonService;
import tech.corefinance.product.entity.ProductType;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.service.ProductTypeService;

import java.util.List;

@RestController
@RequestMapping("/product-types")
@ControllerManagedResource("producttype")
public class ProductTypeController implements CrudController<String, ProductType, ProductType> {

    @Autowired
    private ProductTypeService productTypeService;

    @Override
    public CommonService<String, ProductType, ?> getHandlingService() {
        return productTypeService;
    }

    @GetMapping("/")
    public GeneralApiResponse<List<ProductType>> loadByType(@RequestParam("type") ProductCategoryType categoryType) {
        return GeneralApiResponse.createSuccessResponse(productTypeService.loadByType(categoryType));
    }
}
