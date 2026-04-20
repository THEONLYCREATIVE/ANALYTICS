import { readFileSync } from 'node:fs';

const app = readFileSync(new URL('../js/app.js', import.meta.url), 'utf8');
if (!app.includes('DOMContentLoaded')) {
  console.error('js/app.js does not appear to bootstrap correctly.');
  process.exit(1);
}

console.log('Basic app bootstrap check passed.');
