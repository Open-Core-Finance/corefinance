package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudServiceAndController;
import tech.corefinance.product.dto.LoanProductDto;
import tech.corefinance.product.entity.LoanProduct;
import tech.corefinance.product.repository.LoanProductRepository;

@RestController
@RequestMapping("/loan-products")
@ControllerManagedResource("loanproduct")
public class LoanProductController implements CrudServiceAndController<String, LoanProduct, LoanProductDto, LoanProductRepository> {

    @Autowired
    private LoanProductRepository repository;

    @Override
    public LoanProductRepository getRepository() {
        return repository;
    }
}
