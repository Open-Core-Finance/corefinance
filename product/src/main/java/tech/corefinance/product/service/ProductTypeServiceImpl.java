package tech.corefinance.product.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.corefinance.product.entity.ProductType;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.repository.ProductTypeRepository;

import java.util.List;

@Service
@Transactional
public class ProductTypeServiceImpl implements ProductTypeService {

    @Autowired
    private ProductTypeRepository productTypeRepository;

    @Override
    public ProductTypeRepository getRepository() {
        return productTypeRepository;
    }

    @Override
    public List<ProductType> loadByType(ProductCategoryType categoryType) {
        return productTypeRepository.findAllByType(categoryType);
    }
}
