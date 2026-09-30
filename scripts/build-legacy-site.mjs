import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
// This subtree is deployed on Poliklot/poliklot.github.io, never as a second spec.
const output = join(root, 'legacy-dist', 'bridge-design-methodology');
const canonical = 'https://poliklot.github.io/dfc-bridge/';
const version = JSON.parse(readFileSync(join(root, 'package.json'), 'utf8')).version;
if (!existsSync(join(dist, 'ru', 'index.html'))) throw new Error('Build the canonical site first.');

const hashes = {};
function redirects(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) redirects(file);
    else if (entry.name.endsWith('.html')) {
      const path = relative(dist, file).replaceAll('\\', '/');
      if (path.startsWith('pagefind/')) continue;
      const destination = new URL(path.replace(/index\.html$/u, ''), canonical).href;
      const target = join(output, path);
      mkdirSync(dirname(target), { recursive: true });
      writeFileSync(target, `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>DFC Bridge</title><meta name="robots" content="noindex"><link rel="canonical" href="${destination}"><meta http-equiv="refresh" content="0;url=${destination}"></head><body><a href="${destination}">Continue to DFC Bridge</a><script>location.replace(${JSON.stringify(destination)} + location.search + location.hash);</script></body></html>\n`);
      hashes[path] = createHash('sha256').update(readFileSync(target)).digest('hex');
    }
  }
}
redirects(dist);

// Machine readers need JSON, not an HTML redirect. Historic image URLs also
// remain usable. The built tree includes aliases for the renamed artwork.
for (const directory of ['schema', 'data', 'assets']) {
  if (!existsSync(join(dist, directory))) throw new Error(`Missing public ${directory}.`);
  cpSync(join(dist, directory), join(output, directory), { recursive: true });
}
for (const entry of readdirSync(join(dist, 'schema'))) {
  const source = readFileSync(join(dist, 'schema', entry));
  const copy = readFileSync(join(output, 'schema', entry));
  if (!source.equals(copy)) throw new Error(`Legacy schema differs: ${entry}`);
  const schema = JSON.parse(copy);
  if (schema.$id !== `https://poliklot.github.io/bridge-design-methodology/schema/${entry}`) {
    throw new Error(`Published schema identity changed: ${entry}`);
  }
  hashes[`schema/${entry}`] = createHash('sha256').update(copy).digest('hex');
}
writeFileSync(join(output, 'compatibility.json'), JSON.stringify({ canonical, version, hashes }, null, 2) + '\n');
writeFileSync(join(output, 'README.md'), `# DFC Bridge legacy URL compatibility\n\nGenerated from Poliklot/dfc-bridge v${version} with npm run build:legacy. This directory only preserves published URLs; it is not a methodology source.\n\nHTML routes redirect to ${canonical}, preserving query and fragment. Schema identifiers and JSON/image endpoints remain stable. Refresh this subtree from the next canonical release if those contracts change.\n`);
console.log(`Verified ${Object.keys(hashes).length} legacy route/schema deliveries at ${output}.`);
