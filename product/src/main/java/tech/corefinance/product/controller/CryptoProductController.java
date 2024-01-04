package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudServiceAndController;
import tech.corefinance.product.dto.CryptoProductDto;
import tech.corefinance.product.entity.CryptoProduct;
import tech.corefinance.product.repository.CryptoProductRepository;

@RestController
@RequestMapping("/crypto-products")
@ControllerManagedResource("cryptoproduct")
public class CryptoProductController implements CrudServiceAndController<String, CryptoProduct, CryptoProductDto, CryptoProductRepository> {

    @Autowired
    private CryptoProductRepository repository;

    @Override
    public CryptoProductRepository getRepository() {
        return repository;
    }
}
