import assert from 'node:assert/strict';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client';
import { databaseUrl } from '../src/database/database-env';

async function main() {
  const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl() }) });
  try {
    await prisma.$queryRaw`SELECT 1`;
    const slugs = ['personal', 'home', 'education', 'car', 'business', 'gold', 'two-wheeler', 'property'];
    assert.equal(await prisma.loanCategory.count({ where: { slug: { in: slugs } } }), 8);
    const products = await prisma.loanProduct.findMany({
      where: { slug: { in: ['demo-personal', 'demo-education', 'demo-car'] } },
      include: { lender: true, category: true, rateSnapshots: true, fees: true },
    });
    assert.equal(products.length, 3);
    for (const product of products) {
      assert.equal(product.status, 'DRAFT');
      assert.equal(product.isDemo, true);
      assert.equal(product.lender.isDemo, true);
      assert.ok(product.category.slug);
      assert.equal(product.rateSnapshots.length, 1);
      assert.equal(product.fees.length, 1);
    }
    const constraints = await prisma.$queryRaw<{ conname: string }[]>`
      SELECT conname FROM pg_constraint
      WHERE connamespace = current_schema()::regnamespace
      AND conname IN ('loan_product_amount_range', 'loan_product_tenure_range',
        'loan_product_demo_not_published', 'rate_snapshot_range', 'loan_fee_nonnegative',
        'profile_nonnegative', 'liability_nonnegative', 'eligibility_range',
        'comparison_positive', 'document_positive_size')
    `;
    assert.equal(constraints.length, 10, 'Initial SQL checks must be applied');
    console.log('PASS: connection, seeded categories, relationships, demo isolation, SQL checks.');
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Database smoke test failed');
  process.exitCode = 1;
});
