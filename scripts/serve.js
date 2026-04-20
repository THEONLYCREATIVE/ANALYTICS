import { createServer } from 'node:http';
import { readFileSync, existsSync } from 'node:fs';
import { extname, join } from 'node:path';

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.svg': 'image/svg+xml'
};

const root = process.cwd();
const port = Number(process.env.PORT || 3000);

createServer((req, res) => {
  const urlPath = req.url === '/' ? '/index.html' : req.url;
  const filePath = join(root, decodeURIComponent(urlPath));
  if (!existsSync(filePath)) {
    res.statusCode = 404;
    res.end('Not found');
    return;
  }
  const ext = extname(filePath);
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream');
  res.end(readFileSync(filePath));
}).listen(port, () => {
  console.log(`Serving http://localhost:${port}`);
});
