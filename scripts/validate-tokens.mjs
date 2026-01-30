import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';

const ROOT = path.resolve('new_tokens');
const ajv = new Ajv({ allErrors: true, allowUnionTypes: true });
const schema = JSON.parse(fs.readFileSync('schemas/token.schema.json', 'utf8'));
const validate = ajv.compile(schema);

const jsonFiles = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && entry.name.endsWith('.json')) jsonFiles.push(p);
  }
}
walk(ROOT);

let ok = true;

for (const file of jsonFiles) {
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));
  const valid = validate(data);
  if (!valid) {
    ok = false;
    console.error(`\n❌ Schema errors in ${file}:`);
    console.error(validate.errors);
  }
}

// Basic cross-check: logo token paths must exist if present
const logoPath = path.join(ROOT, 'semantic', 'logo.json');
if (fs.existsSync(logoPath)) {
  const logo = JSON.parse(fs.readFileSync(logoPath, 'utf8'));
  const entries = logo?.logo || {};
  for (const [k, v] of Object.entries(entries)) {
    if (typeof v !== 'string') continue;
    const rel = v.replace(/^\//, '');
    const asset = path.resolve('new_tokens', rel.replace(/^assets\//, 'assets/'));
    if (!fs.existsSync(asset)) {
      ok = false;
      console.error(`\n❌ Missing logo asset for logo.${k}: ${v}`);
    }
  }
}

if (!ok) {
  console.error('\nToken validation failed.');
  process.exit(1);
}

console.log(`✅ Token validation passed (${jsonFiles.length} JSON files checked).`);
