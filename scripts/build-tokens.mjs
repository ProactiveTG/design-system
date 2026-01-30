import fs from 'node:fs';
import path from 'node:path';
import StyleDictionary from 'style-dictionary';

const SRC = path.resolve('new_tokens');
const OUT = path.resolve('dist');

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

// Merge token JSON files into a single object for easier consumption.
function walkJson(dir, acc = {}) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walkJson(p, acc);
    else if (entry.isFile() && entry.name.endsWith('.json')) {
      const rel = path.relative(SRC, p);
      const key = rel.replace(/\.json$/, '').replace(/\\/g, '/');
      acc[key] = JSON.parse(fs.readFileSync(p, 'utf8'));
    }
  }
  return acc;
}

const merged = walkJson(SRC, {});
fs.mkdirSync(path.join(OUT, 'json'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'json', 'tokens.source-map.json'), JSON.stringify(merged, null, 2));

// Style Dictionary config
const sd = new StyleDictionary({
  source: [
    'new_tokens/primitives/**/*.json',
    'new_tokens/semantic/**/*.json',
    'new_tokens/themes/**/*.json'
  ],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables'
        }
      ]
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens.flat.json',
          format: 'json/flat'
        }
      ]
    }
  }
});

sd.buildAllPlatforms();

// Generate minimal TypeScript typings (flat token names)
const flatPath = path.resolve('dist/json/tokens.flat.json');
const flat = JSON.parse(fs.readFileSync(flatPath, 'utf8'));
const keys = Object.keys(flat).sort();
const dts = `// Auto-generated. Do not edit.\n\nexport type TokenName =\n${keys.map(k => `  | '${k}'`).join('\n')};\n\nexport declare const tokens: Record<TokenName, string | number>;\n`;
fs.mkdirSync(path.join(OUT, 'ts'), { recursive: true });
fs.writeFileSync(path.join(OUT, 'ts', 'tokens.d.ts'), dts);

console.log('✅ Built tokens to dist/.');
