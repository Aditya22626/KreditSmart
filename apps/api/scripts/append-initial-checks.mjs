import { readdirSync, readFileSync, appendFileSync } from 'node:fs';
import { join } from 'node:path';
const dir = 'prisma/migrations';
const migrations = readdirSync(dir, { withFileTypes: true }).filter((entry) => entry.isDirectory());
if (migrations.length !== 1 || !migrations[0].name.endsWith('_initial_schema')) {
  throw new Error('Expected exactly one newly created initial_schema migration. Do not modify applied migrations.');
}
const sqlPath = join(dir, migrations[0].name, 'migration.sql');
const existing = readFileSync(sqlPath, 'utf8');
if (!existing.includes('KreditSmart domain constraints')) {
  appendFileSync(sqlPath, '\n' + readFileSync('prisma/initial-checks.sql', 'utf8'));
  console.log('Domain constraints appended. Apply the migration next.');
} else {
  console.log('Domain constraints already present.');
}
