import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('.', import.meta.url));
const dist = join(root, 'dist');
const required = ['index.html', 'styles.css', 'game.js'];
await mkdir(dist, { recursive: true });
for (const name of required) await cp(join(root, name), join(dist, name));
const html = await readFile(join(dist, 'index.html'), 'utf8');
if (!html.includes('game.js') || !html.includes('PROJECT ECLIPSE')) throw new Error('Build validation failed: index.html is incomplete.');
const js = await readFile(join(dist, 'game.js'), 'utf8');
for (const marker of ['THE SILENT FACILITY', 'ECLIPSE', 'CORE WARDEN', 'localStorage', 'three@0.186.1']) {
  if (!js.includes(marker)) throw new Error(`Build validation failed: missing ${marker}.`);
}
await writeFile(join(dist, 'build-info.json'), JSON.stringify({ name: 'PROJECT ECLIPSE', version: '2.0.0', generatedAt: new Date().toISOString() }, null, 2));
console.log(`PROJECT ECLIPSE build complete: ${required.length + 1} runtime files copied to dist/.`);
