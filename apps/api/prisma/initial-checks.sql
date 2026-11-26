-- KreditSmart domain constraints: apply once as part of initial migration.
ALTER TABLE "LoanProduct" ADD CONSTRAINT "loan_product_amount_range" CHECK (("minAmount" IS NULL OR "minAmount" > 0) AND ("maxAmount" IS NULL OR "maxAmount" > 0) AND ("minAmount" IS NULL OR "maxAmount" IS NULL OR "minAmount" <= "maxAmount"));
ALTER TABLE "LoanProduct" ADD CONSTRAINT "loan_product_tenure_range" CHECK (("minTenureMonths" IS NULL OR "minTenureMonths" > 0) AND ("maxTenureMonths" IS NULL OR "maxTenureMonths" > 0) AND ("minTenureMonths" IS NULL OR "maxTenureMonths" IS NULL OR "minTenureMonths" <= "maxTenureMonths"));
ALTER TABLE "LoanProduct" ADD CONSTRAINT "loan_product_demo_not_published" CHECK (NOT "isDemo" OR "status" <> 'PUBLISHED');
ALTER TABLE "RateSnapshot" ADD CONSTRAINT "rate_snapshot_range" CHECK ("minAnnualRate" >= 0 AND "maxAnnualRate" >= "minAnnualRate");
ALTER TABLE "LoanFee" ADD CONSTRAINT "loan_fee_nonnegative" CHECK (("fixedAmount" IS NULL OR "fixedAmount" >= 0) AND ("percentage" IS NULL OR "percentage" >= 0));
ALTER TABLE "FinancialProfile" ADD CONSTRAINT "profile_nonnegative" CHECK (("monthlyIncome" IS NULL OR "monthlyIncome" >= 0) AND ("monthlyExpenses" IS NULL OR "monthlyExpenses" >= 0) AND ("selfReportedAge" IS NULL OR "selfReportedAge" BETWEEN 0 AND 120));
ALTER TABLE "Liability" ADD CONSTRAINT "liability_nonnegative" CHECK ("outstandingPrincipal" >= 0 AND "monthlyPayment" >= 0 AND ("annualRate" IS NULL OR "annualRate" >= 0) AND ("remainingMonths" IS NULL OR "remainingMonths" >= 0));
ALTER TABLE "EligibilityRule" ADD CONSTRAINT "eligibility_range" CHECK (("minAge" IS NULL OR "minAge" BETWEEN 0 AND 120) AND ("maxAge" IS NULL OR "maxAge" BETWEEN 0 AND 120) AND ("minAge" IS NULL OR "maxAge" IS NULL OR "minAge" <= "maxAge") AND ("minMonthlyIncome" IS NULL OR "minMonthlyIncome" >= 0));
ALTER TABLE "Comparison" ADD CONSTRAINT "comparison_positive" CHECK (("amount" IS NULL OR "amount" > 0) AND ("tenureMonths" IS NULL OR "tenureMonths" > 0));
ALTER TABLE "Document" ADD CONSTRAINT "document_positive_size" CHECK ("byteSize" > 0);
