package com.academiax.payment.model;

import jakarta.persistence.Embeddable;
import java.math.BigDecimal;
import java.math.RoundingMode;

/**
 * Detailed Tuition Invoice (DTI) Specification
 * Contains institutional itemization for:
 * 1. Base Academic Tuition
 * 2. Advanced Computing & Laboratory Surcharge
 * 3. Digital Library & Peer-Reviewed Resource Access
 * 4. Institutional Proctored Assessment Levy
 * 5. Educational Tax / GST
 * 6. Total Amount
 */
@Embeddable
public class DTIBreakdown {

    private BigDecimal baseTuition;
    private BigDecimal techLabSurcharge;
    private BigDecimal digitalLibraryFee;
    private BigDecimal examLevy;
    private BigDecimal taxGST;
    private BigDecimal total;

    public DTIBreakdown() {
        this.taxGST = BigDecimal.ZERO;
    }

    public static DTIBreakdown compute(BigDecimal totalFee) {
        DTIBreakdown dti = new DTIBreakdown();
        if (totalFee == null || totalFee.compareTo(BigDecimal.ZERO) <= 0) {
            dti.baseTuition = BigDecimal.ZERO;
            dti.techLabSurcharge = BigDecimal.ZERO;
            dti.digitalLibraryFee = BigDecimal.ZERO;
            dti.examLevy = BigDecimal.ZERO;
            dti.taxGST = BigDecimal.ZERO;
            dti.total = BigDecimal.ZERO;
            return dti;
        }

        // Standard institutional ratio: 78% Base, 12% Computing/Lab, 5% Digital Library, 5% Assessment
        dti.baseTuition = totalFee.multiply(new BigDecimal("0.78")).setScale(2, RoundingMode.HALF_UP);
        dti.techLabSurcharge = totalFee.multiply(new BigDecimal("0.12")).setScale(2, RoundingMode.HALF_UP);
        dti.digitalLibraryFee = totalFee.multiply(new BigDecimal("0.05")).setScale(2, RoundingMode.HALF_UP);
        dti.examLevy = totalFee.subtract(dti.baseTuition.add(dti.techLabSurcharge).add(dti.digitalLibraryFee));
        dti.taxGST = BigDecimal.ZERO;
        dti.total = totalFee;

        return dti;
    }

    // Getters and Setters
    public BigDecimal getBaseTuition() { return baseTuition; }
    public void setBaseTuition(BigDecimal baseTuition) { this.baseTuition = baseTuition; }

    public BigDecimal getTechLabSurcharge() { return techLabSurcharge; }
    public void setTechLabSurcharge(BigDecimal techLabSurcharge) { this.techLabSurcharge = techLabSurcharge; }

    public BigDecimal getDigitalLibraryFee() { return digitalLibraryFee; }
    public void setDigitalLibraryFee(BigDecimal digitalLibraryFee) { this.digitalLibraryFee = digitalLibraryFee; }

    public BigDecimal getExamLevy() { return examLevy; }
    public void setExamLevy(BigDecimal examLevy) { this.examLevy = examLevy; }

    public BigDecimal getTaxGST() { return taxGST; }
    public void setTaxGST(BigDecimal taxGST) { this.taxGST = taxGST; }

    public BigDecimal getTotal() { return total; }
    public void setTotal(BigDecimal total) { this.total = total; }
}
