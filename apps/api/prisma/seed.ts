import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { databaseUrl } from '../src/database/database-env';

const categories = [
  ['personal', 'Personal loan', 'Unsecured borrowing for personal expenses.'],
  ['home', 'Home loan', 'Financing for residential property.'],
  ['education', 'Education loan', 'Financing for eligible education expenses.'],
  ['car', 'Car loan', 'Financing for a car purchase.'],
  ['business', 'Business loan', 'Financing for business needs.'],
  ['gold', 'Gold loan', 'Borrowing secured by eligible gold.'],
  ['two-wheeler', 'Two-wheeler loan', 'Financing for a two-wheeler purchase.'],
  ['property', 'Loan against property', 'Borrowing secured by property.'],
] as const;

async function main() {
  const connectionString = databaseUrl();
  const target = new URL(connectionString);
  if (process.env.NODE_ENV === 'production' ||
      !['localhost', '127.0.0.1', '[::1]'].includes(target.hostname) ||
      target.pathname !== '/kreditsmart') {
    throw new Error('Demo seed is allowed only on the local kreditsmart database.');
  }
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString }) });
  try {
    await prisma.$transaction(async (tx) => {
      for (const [slug, name, description] of categories) {
        await tx.loanCategory.upsert({
          where: { slug }, create: { slug, name, description },
          update: { name, description },
        });
      }
      const lender = await tx.lender.upsert({
        where: { slug: 'demo-kreditsmart-bank' },
        create: { slug: 'demo-kreditsmart-bank', name: 'Fictional Demo Bank', type: 'BANK', isDemo: true },
        update: { name: 'Fictional Demo Bank', isDemo: true },
      });
      const examples = [
        { slug: 'demo-personal', category: 'personal', name: 'Demo personal loan', min: '50000', max: '500000', months: 36, rate: '12.0000' },
        { slug: 'demo-education', category: 'education', name: 'Demo education loan', min: '100000', max: '1000000', months: 120, rate: '10.0000' },
        { slug: 'demo-car', category: 'car', name: 'Demo car loan', min: '100000', max: '1500000', months: 60, rate: '9.0000' },
      ];
      for (const item of examples) {
        const category = await tx.loanCategory.findUniqueOrThrow({ where: { slug: item.category } });
        const data = {
          lenderId: lender.id, categoryId: category.id, name: item.name,
          description: 'Fictional fixture for development only; not a lender offer.',
          status: 'DRAFT' as const, isDemo: true, minAmount: item.min, maxAmount: item.max,
          minTenureMonths: 12, maxTenureMonths: item.months, rateType: 'UNKNOWN' as const,
        };
        const product = await tx.loanProduct.upsert({
          where: { slug: item.slug }, create: { slug: item.slug, ...data }, update: data,
        });
        const effectiveAt = new Date('2026-01-01T00:00:00.000Z');
        await tx.rateSnapshot.upsert({
          where: { productId_effectiveAt: { productId: product.id, effectiveAt } },
          create: { productId: product.id, effectiveAt, minAnnualRate: item.rate, maxAnnualRate: item.rate },
          update: { minAnnualRate: item.rate, maxAnnualRate: item.rate },
        });
        await tx.loanFee.upsert({
          where: { productId_type_label: { productId: product.id, type: 'PROCESSING', label: 'Demo processing fee' } },
          create: { productId: product.id, type: 'PROCESSING', label: 'Demo processing fee', percentage: '1.0000' },
          update: { percentage: '1.0000' },
        });
      }
    });
    console.log('Seed complete: 8 categories, 1 fictional lender, 3 draft products.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error('Seed failed:', error instanceof Error ? error.name : 'Unknown error');
  process.exitCode = 1;
});
