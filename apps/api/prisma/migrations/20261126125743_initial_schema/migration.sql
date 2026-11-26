-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('ACTIVE', 'DISABLED');

-- CreateEnum
CREATE TYPE "LenderType" AS ENUM ('BANK', 'NBFC', 'OTHER');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('UNVERIFIED', 'VERIFIED', 'STALE');

-- CreateEnum
CREATE TYPE "RateType" AS ENUM ('FIXED', 'FLOATING', 'MIXED', 'UNKNOWN');

-- CreateEnum
CREATE TYPE "FeeType" AS ENUM ('PROCESSING', 'PREPAYMENT', 'LATE_PAYMENT', 'OTHER');

-- CreateEnum
CREATE TYPE "EmploymentType" AS ENUM ('SALARIED', 'SELF_EMPLOYED', 'STUDENT', 'UNEMPLOYED', 'OTHER');

-- CreateEnum
CREATE TYPE "DocumentStatus" AS ENUM ('PENDING', 'PROCESSING', 'COMPLETED', 'FAILED');

-- CreateEnum
CREATE TYPE "MessageRole" AS ENUM ('USER', 'ASSISTANT');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL,
    "email" VARCHAR(254) NOT NULL,
    "displayName" VARCHAR(120),
    "passwordHash" TEXT,
    "emailVerifiedAt" TIMESTAMP(3),
    "role" "UserRole" NOT NULL DEFAULT 'USER',
    "status" "AccountStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthIdentity" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "provider" VARCHAR(40) NOT NULL,
    "providerSubject" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthIdentity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthSession" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "revokedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FinancialProfile" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "monthlyIncome" DECIMAL(15,2),
    "monthlyExpenses" DECIMAL(15,2),
    "employmentType" "EmploymentType",
    "selfReportedAge" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Liability" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "label" VARCHAR(120) NOT NULL,
    "outstandingPrincipal" DECIMAL(15,2) NOT NULL,
    "monthlyPayment" DECIMAL(15,2) NOT NULL,
    "annualRate" DECIMAL(7,4),
    "remainingMonths" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Liability_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanCategory" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(80) NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "LoanCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lender" (
    "id" UUID NOT NULL,
    "slug" VARCHAR(100) NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "type" "LenderType" NOT NULL,
    "websiteUrl" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Lender_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanProduct" (
    "id" UUID NOT NULL,
    "lenderId" UUID NOT NULL,
    "categoryId" UUID NOT NULL,
    "slug" VARCHAR(120) NOT NULL,
    "name" VARCHAR(160) NOT NULL,
    "description" TEXT NOT NULL,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "currency" CHAR(3) NOT NULL DEFAULT 'INR',
    "minAmount" DECIMAL(15,2),
    "maxAmount" DECIMAL(15,2),
    "minTenureMonths" INTEGER,
    "maxTenureMonths" INTEGER,
    "rateType" "RateType" NOT NULL DEFAULT 'UNKNOWN',
    "isDemo" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoanProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductSource" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "url" TEXT NOT NULL,
    "title" VARCHAR(200),
    "status" "VerificationStatus" NOT NULL DEFAULT 'UNVERIFIED',
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "verifiedAt" TIMESTAMP(3),

    CONSTRAINT "ProductSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RateSnapshot" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "sourceId" UUID,
    "minAnnualRate" DECIMAL(7,4) NOT NULL,
    "maxAnnualRate" DECIMAL(7,4) NOT NULL,
    "effectiveAt" TIMESTAMP(3) NOT NULL,
    "observedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RateSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LoanFee" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "type" "FeeType" NOT NULL,
    "label" VARCHAR(160) NOT NULL,
    "fixedAmount" DECIMAL(15,2),
    "percentage" DECIMAL(7,4),
    "notes" TEXT,

    CONSTRAINT "LoanFee_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EligibilityRule" (
    "id" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "minMonthlyIncome" DECIMAL(15,2),
    "employmentTypes" "EmploymentType"[],
    "notes" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EligibilityRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SavedLoan" (
    "userId" UUID NOT NULL,
    "productId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SavedLoan_pkey" PRIMARY KEY ("userId","productId")
);

-- CreateTable
CREATE TABLE "Comparison" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "amount" DECIMAL(15,2),
    "tenureMonths" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Comparison_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComparisonItem" (
    "comparisonId" UUID NOT NULL,
    "productId" UUID NOT NULL,

    CONSTRAINT "ComparisonItem_pkey" PRIMARY KEY ("comparisonId","productId")
);

-- CreateTable
CREATE TABLE "Document" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "storageKey" TEXT NOT NULL,
    "originalName" VARCHAR(255) NOT NULL,
    "mimeType" VARCHAR(120) NOT NULL,
    "byteSize" INTEGER NOT NULL,
    "status" "DocumentStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiConversation" (
    "id" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "title" VARCHAR(160),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AiConversation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AiMessage" (
    "id" UUID NOT NULL,
    "conversationId" UUID NOT NULL,
    "role" "MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AiMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuditEvent" (
    "id" UUID NOT NULL,
    "actorId" UUID,
    "action" VARCHAR(100) NOT NULL,
    "entityType" VARCHAR(100) NOT NULL,
    "entityId" VARCHAR(120),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuditEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "AuthIdentity_userId_idx" ON "AuthIdentity"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "AuthIdentity_provider_providerSubject_key" ON "AuthIdentity"("provider", "providerSubject");

-- CreateIndex
CREATE UNIQUE INDEX "AuthSession_tokenHash_key" ON "AuthSession"("tokenHash");

-- CreateIndex
CREATE INDEX "AuthSession_userId_expiresAt_idx" ON "AuthSession"("userId", "expiresAt");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialProfile_userId_key" ON "FinancialProfile"("userId");

-- CreateIndex
CREATE INDEX "Liability_userId_idx" ON "Liability"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "LoanCategory_slug_key" ON "LoanCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Lender_slug_key" ON "Lender"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "LoanProduct_slug_key" ON "LoanProduct"("slug");

-- CreateIndex
CREATE INDEX "LoanProduct_categoryId_status_isDemo_idx" ON "LoanProduct"("categoryId", "status", "isDemo");

-- CreateIndex
CREATE INDEX "LoanProduct_lenderId_status_idx" ON "LoanProduct"("lenderId", "status");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSource_productId_url_key" ON "ProductSource"("productId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "ProductSource_id_productId_key" ON "ProductSource"("id", "productId");

-- CreateIndex
CREATE INDEX "RateSnapshot_productId_observedAt_idx" ON "RateSnapshot"("productId", "observedAt");

-- CreateIndex
CREATE UNIQUE INDEX "RateSnapshot_productId_effectiveAt_key" ON "RateSnapshot"("productId", "effectiveAt");

-- CreateIndex
CREATE UNIQUE INDEX "LoanFee_productId_type_label_key" ON "LoanFee"("productId", "type", "label");

-- CreateIndex
CREATE UNIQUE INDEX "EligibilityRule_productId_key" ON "EligibilityRule"("productId");

-- CreateIndex
CREATE INDEX "SavedLoan_productId_idx" ON "SavedLoan"("productId");

-- CreateIndex
CREATE INDEX "Comparison_userId_createdAt_idx" ON "Comparison"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "ComparisonItem_productId_idx" ON "ComparisonItem"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Document_storageKey_key" ON "Document"("storageKey");

-- CreateIndex
CREATE INDEX "Document_userId_createdAt_idx" ON "Document"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "AiConversation_userId_updatedAt_idx" ON "AiConversation"("userId", "updatedAt");

-- CreateIndex
CREATE INDEX "AiMessage_conversationId_createdAt_idx" ON "AiMessage"("conversationId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_actorId_createdAt_idx" ON "AuditEvent"("actorId", "createdAt");

-- CreateIndex
CREATE INDEX "AuditEvent_entityType_entityId_createdAt_idx" ON "AuditEvent"("entityType", "entityId", "createdAt");

-- AddForeignKey
ALTER TABLE "AuthIdentity" ADD CONSTRAINT "AuthIdentity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuthSession" ADD CONSTRAINT "AuthSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FinancialProfile" ADD CONSTRAINT "FinancialProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Liability" ADD CONSTRAINT "Liability_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanProduct" ADD CONSTRAINT "LoanProduct_lenderId_fkey" FOREIGN KEY ("lenderId") REFERENCES "Lender"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanProduct" ADD CONSTRAINT "LoanProduct_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "LoanCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductSource" ADD CONSTRAINT "ProductSource_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateSnapshot" ADD CONSTRAINT "RateSnapshot_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RateSnapshot" ADD CONSTRAINT "RateSnapshot_sourceId_productId_fkey" FOREIGN KEY ("sourceId", "productId") REFERENCES "ProductSource"("id", "productId") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LoanFee" ADD CONSTRAINT "LoanFee_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EligibilityRule" ADD CONSTRAINT "EligibilityRule_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedLoan" ADD CONSTRAINT "SavedLoan_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SavedLoan" ADD CONSTRAINT "SavedLoan_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comparison" ADD CONSTRAINT "Comparison_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonItem" ADD CONSTRAINT "ComparisonItem_comparisonId_fkey" FOREIGN KEY ("comparisonId") REFERENCES "Comparison"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComparisonItem" ADD CONSTRAINT "ComparisonItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "LoanProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiConversation" ADD CONSTRAINT "AiConversation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AiMessage" ADD CONSTRAINT "AiMessage_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "AiConversation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AuditEvent" ADD CONSTRAINT "AuditEvent_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

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
