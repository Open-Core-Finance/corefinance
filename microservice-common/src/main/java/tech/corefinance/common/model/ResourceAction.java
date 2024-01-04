package tech.corefinance.common.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.web.bind.annotation.RequestMethod;

@Data
@NoArgsConstructor
@Document("resource_action")
@Table(name = "resource_action")
@Entity
public class ResourceAction implements GenericModel<String> {
    public static final String COMMON_ACTION_ADD = "add";
    public static final String COMMON_ACTION_UPDATE = "update";
    public static final String COMMON_ACTION_DELETE = "delete";
    public static final String COMMON_ACTION_LIST = "list";
    public static final String COMMON_ACTION_VIEW = "view";
    public static final String COMMON_ACTION_INITIAL = "initial";

    @Id
    @jakarta.persistence.Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Column(name = "resource_type")
    private String resourceType;
    private String action = COMMON_ACTION_ADD;
    private String url;
    @Column(name = "request_method")
    @Enumerated(EnumType.STRING)
    private RequestMethod requestMethod;

    public ResourceAction(String resourceType, String action, String url, RequestMethod requestMethod) {
        this.resourceType = resourceType;
        this.action = action;
        this.url = url;
        this.id = action + "-" + resourceType + "-" + url.replace("/", "_");
        this.requestMethod = requestMethod;
    }
}
