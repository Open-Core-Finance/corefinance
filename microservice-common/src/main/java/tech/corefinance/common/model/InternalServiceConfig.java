package tech.corefinance.common.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.ZonedDateTime;

@Document(collection = "internal_service_config")
@Data
@Table(name = "internal_service_config")
@Entity
public class InternalServiceConfig implements GenericModel<String> {
    @Id
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotNull
    @Column(name = "service_name")
    private String serviceName;
    @NotNull
    @Column(name = "api_key")
    private String apiKey;
    private boolean activated = true;
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private ZonedDateTime lastModifiedDate;
    @CreatedDate
    @Column(name = "created_date")
    private ZonedDateTime createdDate;
}
