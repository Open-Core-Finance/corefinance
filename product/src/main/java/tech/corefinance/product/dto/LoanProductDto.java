package tech.corefinance.product.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;
import tech.corefinance.product.enums.CreditArrangementManaged;
import tech.corefinance.product.model.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class LoanProductDto extends ProductDto {
    private double loanMin;
    private double loanMax;
    private double loanDefault;
    private CreditArrangementManaged underCreditArrangementManaged;
    private LoanInterestRate interestRate;
    private RepaymentScheduling repaymentScheduling;
    private RepaymentCollection repaymentCollection;
    private ArrearsSetting arrearsSetting;
    private PenaltySetting penaltySetting;

    private boolean closeDormantAccounts;
    private boolean lockArrearsAccounts;
    private boolean capCharges;

    private Double percentGuarantors;
    private Double percentCollateral;
}
