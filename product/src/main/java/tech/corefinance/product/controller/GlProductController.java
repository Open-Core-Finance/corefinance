package tech.corefinance.product.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tech.corefinance.common.annotation.ControllerManagedResource;
import tech.corefinance.common.controller.CrudServiceAndController;
import tech.corefinance.product.dto.GlProductDto;
import tech.corefinance.product.entity.GlProduct;
import tech.corefinance.product.repository.GlProductRepository;

@RestController
@RequestMapping("/gl-products")
@ControllerManagedResource("glproduct")
public class GlProductController implements CrudServiceAndController<String, GlProduct, GlProductDto, GlProductRepository> {

    @Autowired
    private GlProductRepository repository;

    @Override
    public GlProductRepository getRepository() {
        return repository;
    }
}
