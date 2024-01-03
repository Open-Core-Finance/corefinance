package tech.corefinance.product.config;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.convert.Jsr310Converters;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import tech.corefinance.common.converter.DateToZonedDateTimeConverter;
import tech.corefinance.common.converter.ZonedDateTimeToDateConverter;

@EnableJpaAuditing
@Configuration
public class JpaAuditConfig {

    @Autowired
    private DateToZonedDateTimeConverter dateToZonedDateTimeConverter;
    @Autowired
    private ZonedDateTimeToDateConverter zonedDateTimeToDateConverter;

    @PostConstruct
    public void postConstruct() {
        Jsr310Converters.getConvertersToRegister().add(dateToZonedDateTimeConverter);
        Jsr310Converters.getConvertersToRegister().add(zonedDateTimeToDateConverter);
    }
}
