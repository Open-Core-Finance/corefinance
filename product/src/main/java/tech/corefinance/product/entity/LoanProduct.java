package tech.corefinance.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;
import tech.corefinance.product.enums.CreditArrangementManaged;
import tech.corefinance.product.model.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Data
@Entity
@Table(name = "loan_product")
public class LoanProduct extends Product {

    private double loanMin;
    private double loanMax;
    private double loanDefault;
    @Enumerated(EnumType.STRING)
    private CreditArrangementManaged underCreditArrangementManaged;
    @JdbcTypeCode(SqlTypes.JSON)
    @NotNull
    private LoanInterestRate interestRate;
    @JdbcTypeCode(SqlTypes.JSON)
    @NotNull
    private RepaymentScheduling repaymentScheduling;
    @JdbcTypeCode(SqlTypes.JSON)
    @NotNull
    private RepaymentCollection repaymentCollection;
    @JdbcTypeCode(SqlTypes.JSON)
    @NotNull
    private ArrearsSetting arrearsSetting;
    @JdbcTypeCode(SqlTypes.JSON)
    @NotNull
    private PenaltySetting penaltySetting;

    private boolean closeDormantAccounts;
    private boolean lockArrearsAccounts;
    private boolean capCharges;

    private Double percentGuarantors;
    private Double percentCollateral;
}
