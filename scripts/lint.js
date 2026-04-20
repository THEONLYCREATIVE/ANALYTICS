import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from 'acorn';

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) walk(full, files);
    else if (entry.endsWith('.js')) files.push(full);
  }
  return files;
}

const targets = walk(new URL('../js', import.meta.url).pathname);
for (const file of targets) {
  const src = readFileSync(file, 'utf8');
  parse(src, { ecmaVersion: 'latest', sourceType: 'module' });
}
console.log(`Linted ${targets.length} JS files.`);
