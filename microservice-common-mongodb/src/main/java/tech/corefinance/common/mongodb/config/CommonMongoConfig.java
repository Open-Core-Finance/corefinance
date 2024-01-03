package tech.corefinance.common.mongodb.config;

import jakarta.validation.Validator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDatabaseFactory;
import org.springframework.data.mongodb.config.MongoConfigurationSupport;
import org.springframework.data.mongodb.core.convert.DbRefResolver;
import org.springframework.data.mongodb.core.convert.DefaultDbRefResolver;
import org.springframework.data.mongodb.core.convert.MappingMongoConverter;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;
import org.springframework.data.mongodb.core.mapping.MongoMappingContext;
import org.springframework.data.mongodb.core.mapping.event.LoggingEventListener;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import tech.corefinance.common.converter.DateToZonedDateTimeConverter;
import tech.corefinance.common.converter.ZonedDateTimeToDateConverter;
import tech.corefinance.common.mongodb.converter.MongoConversionSupport;

import java.time.ZonedDateTime;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

@Configuration
@EnableMongoRepositories(basePackages = { "tech.corefinance.common-mongodb.repository" })
@ConditionalOnProperty(name = "tech.corefinance.app.enabled.common", havingValue = "true", matchIfMissing = true)
@Slf4j
public class CommonMongoConfig extends MongoConfigurationSupport {

    @Value("${spring.data.mongodb.database}")
    private String databaseName;

    @Bean
    public MongoCustomConversions customConversions(@Autowired List<MongoConversionSupport<?,?>> listConverters,
                                                    @Autowired DateToZonedDateTimeConverter dateToZonedDateTimeConverter,
                                                    @Autowired ZonedDateTimeToDateConverter zonedDateTimeToDateConverter) {
        List<MongoConversionSupport<?,?>> converters = new LinkedList<>(listConverters);
        converters.add((MongoConversionSupport<Date, ZonedDateTime>) dateToZonedDateTimeConverter::convert);
        converters.add((MongoConversionSupport<ZonedDateTime, Date>) zonedDateTimeToDateConverter::convert);
        return new MongoCustomConversions(listConverters);
    }

    @Bean
    MappingMongoConverter mappingMongoConverter(MongoDatabaseFactory factory, MongoMappingContext context,
                                                MongoCustomConversions conversions) {
        DbRefResolver dbRefResolver = new DefaultDbRefResolver(factory);
        MappingMongoConverter mappingConverter = new MappingMongoConverter(dbRefResolver, context);
        mappingConverter.setCustomConversions(conversions);
        return mappingConverter;
    }

    @Override
    protected String getDatabaseName() {
        return databaseName;
    }

    @Bean
    ValidatingMongoEventListener validatingMongoEventListener(Validator validator) {
        log.debug("MongoDB validator [{}]=[{}]", validator.getClass().getName(), validator);
        return new ValidatingMongoEventListener(validator);
    }

    @Bean
    LoggingEventListener loggingEventListener() {
        return new LoggingEventListener();
    }
}
