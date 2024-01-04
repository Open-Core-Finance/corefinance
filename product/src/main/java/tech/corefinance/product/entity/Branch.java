package tech.corefinance.product.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import tech.corefinance.common.dto.BasicUserDto;
import tech.corefinance.common.model.CreateUpdateDto;
import tech.corefinance.common.model.GenericModel;
import tech.corefinance.common.audit.*;

import java.time.DayOfWeek;
import java.time.ZonedDateTime;
import java.util.List;

@Data
@Entity
@Table(name = "branch")
@EntityListeners({EntityBasicUserAuditorListener.class, EntityZonedDateTimeAuditListener.class, EntityDeleteListener.class})
public class Branch implements GenericModel<String>, CreateUpdateDto<String>, AuditableEntity<ZonedDateTime, BasicUserDto> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    private String name;
    @Column(name = "street_address_line_1")
    private String streetAddressLine1;
    private String city;
    private String state;
    @Column(name = "zip_postal_code")
    private String zipPostalCode;
    private String country;
    @Column(name = "phone_number")
    private String phoneNumber;
    private String email;
    @Column(name = "parent_branch_id")
    private String parentBranchId;

    @Column(name = "non_working_days")
    @JdbcTypeCode(SqlTypes.JSON)
    private List<DayOfWeek> nonWorkingDays = List.of(DayOfWeek.SATURDAY, DayOfWeek.SUNDAY);

    @Column(name = "inherit_non_working_days")
    private boolean inheritNonWorkingDays;

    @CreatedDate
    @Column(name = "created_date")
    private ZonedDateTime createdDate;
    @CreatedBy
    @Column(name = "created_by")
    @JdbcTypeCode(SqlTypes.JSON)
    private BasicUserDto createdBy;
    @LastModifiedDate
    @Column(name = "last_modified_date")
    private ZonedDateTime lastModifiedDate;
    @CreatedBy
    @Column(name = "last_modified_by")
    @JdbcTypeCode(SqlTypes.JSON)
    private BasicUserDto lastModifiedBy;
}
