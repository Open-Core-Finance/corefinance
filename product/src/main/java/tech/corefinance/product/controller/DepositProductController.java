package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudController;
import tech.corefinance.common.controller.CrudServiceAndController;
import tech.corefinance.common.service.CommonService;
import tech.corefinance.product.dto.DepositProductDto;
import tech.corefinance.product.entity.DepositProduct;
import tech.corefinance.product.repository.DepositProductRepository;
import tech.corefinance.product.service.DepositProductService;

@RestController
@RequestMapping("/deposit-products")
@ControllerManagedResource("depositproduct")
public class DepositProductController implements CrudController<String, DepositProduct, DepositProductDto> {

    @Autowired
    private DepositProductService depositProductService;

    @Override
    public CommonService<String, DepositProduct, ?> getHandlingService() {
        return depositProductService;
    }
}
