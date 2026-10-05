import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./dist/', import.meta.url));
const port = Number(process.env.PORT || 10000);
const host = '0.0.0.0';
const dev = process.argv.includes('--dev');
const webRoot = dev ? fileURLToPath(new URL('./', import.meta.url)) : root;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

function safePath(urlPath) {
  const clean = decodeURIComponent(urlPath.split('?')[0]).replaceAll('\\', '/');
  const relative = clean === '/' ? 'index.html' : clean.replace(/^\/+/, '');
  const resolved = normalize(join(webRoot, relative));
  return resolved.startsWith(normalize(webRoot)) ? resolved : null;
}

const server = http.createServer(async (req, res) => {
  try {
    const requested = safePath(req.url || '/');
    const target = requested && await stat(requested).catch(() => null) ? requested : join(webRoot, 'index.html');
    const data = await readFile(target);
    const type = MIME[extname(target)] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': type,
      'Cache-Control': dev ? 'no-store' : 'public, max-age=3600',
      'X-Content-Type-Options': 'nosniff'
    });
    res.end(data);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end(`PROJECT ECLIPSE server error: ${error instanceof Error ? error.message : 'unknown error'}`);
  }
});

server.listen(port, host, () => {
  console.log(`PROJECT ECLIPSE listening on http://${host}:${port} (${dev ? 'dev' : 'production'})`);
});
