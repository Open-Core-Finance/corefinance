package tech.corefinance.product.service;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import tech.corefinance.product.entity.ProductCategory;
import tech.corefinance.product.enums.ProductCategoryType;
import tech.corefinance.product.repository.ProductCategoryRepository;

import java.util.List;

@Service
@Transactional
public class ProductCategoryServiceImpl implements ProductCategoryService {

    @Autowired
    private ProductCategoryRepository productCategoryRepository;

    @Override
    public ProductCategoryRepository getRepository() {
        return productCategoryRepository;
    }

    @Override
    public List<ProductCategory> loadByType(ProductCategoryType categoryType) {
        return productCategoryRepository.findAllByType(categoryType);
    }
}
