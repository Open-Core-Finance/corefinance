package tech.corefinance.geocode.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import tech.corefinance.common.audit.EntityZonedDateTimeAuditListener;
import tech.corefinance.common.model.CreateUpdateDto;
import tech.corefinance.common.model.GenericModel;
import tech.corefinance.common.model.ModifiedDateTrackedEntity;

import java.time.ZonedDateTime;

@Entity
@Data
@Table(name = "region")
@EntityListeners({EntityZonedDateTimeAuditListener.class})
public class Region implements GenericModel<Integer>, ModifiedDateTrackedEntity<ZonedDateTime>, CreateUpdateDto<Integer> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @JdbcTypeCode(SqlTypes.JSON)
    private String translations;
    private boolean enabled;
    /**
     * Rapid API GeoDB Cities.
     */
    @Column(name = "wiki_data_id")
    private String wikiDataId;
    @CreatedDate
    @Column(name = "created_date")
    private ZonedDateTime createdDate;
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private ZonedDateTime lastModifiedDate;
}
