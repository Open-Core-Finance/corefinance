package tech.corefinance.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.util.List;

@Data
@Entity
@Table(name = "gl_product")
@EqualsAndHashCode(callSuper = true)
public class GlProduct extends Product {
    @JdbcTypeCode(SqlTypes.JSON)
    private List<String> supportedCurrencies;
}
