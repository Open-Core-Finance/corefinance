package tech.corefinance.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tech.corefinance.common.repository.CommonResourceRepository;
import tech.corefinance.product.entity.ProductType;
import tech.corefinance.product.enums.ProductCategoryType;

import java.util.List;

@Repository
public interface ProductTypeRepository extends JpaRepository<ProductType, String>, CommonResourceRepository<ProductType, String> {

    List<ProductType> findAllByType(ProductCategoryType categoryType);
}
