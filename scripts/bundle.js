import { cpSync, mkdirSync, rmSync } from 'node:fs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist', { recursive: true });
for (const entry of ['index.html', 'manifest.json', 'sw.js', 'css', 'js', 'assets', 'icons']) {
  cpSync(entry, `dist/${entry}`, { recursive: true });
}
console.log('Build complete: dist/');
