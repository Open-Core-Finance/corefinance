package tech.corefinance.common.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RequestMethod;
import tech.corefinance.common.enums.AccessControl;

@Data
@Document("permission")
@Table(name = "permission")
@Entity
public class Permission implements GenericModel<String> {
    public static final String ANY_ROLE_APPLIED_VALUE = "ANY";
    @Id
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @NotNull
    @Column(name = "role_id")
    private String roleId;
    @NotNull
    @Column(name = "resource_type")
    private String resourceType;
    @NotNull
    private String action;
    private String url;

    @NotNull
    @Enumerated(EnumType.STRING)
    private AccessControl control;

    @Column(name = "request_method")
    @Enumerated(EnumType.STRING)
    private RequestMethod requestMethod;
}
