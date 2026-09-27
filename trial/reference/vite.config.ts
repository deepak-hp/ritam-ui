import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

// Publish the same offline guidance in development and static builds, under Vite's base.
function catalogueAssets(): Plugin {
  const root = resolve(import.meta.dirname, '..');
  function assets() {
    const files = new Map<string, string>();
    for (const dir of ['ai', 'docs']) {
      for (const name of readdirSync(resolve(root, dir))) {
        if (/\.(md|txt|json)$/.test(name)) files.set(`${dir}/${name}`, readFileSync(resolve(root, dir, name), 'utf8'));
      }
    }
    // Explicitly expose only generated, reviewed client examples.
    for (const name of ['README.md', 'Invoices.tsx', 'Settings.tsx', 'Onboarding.tsx', 'Shell.tsx', 'model.ts', 'workflows.css']) {
      files.set(`ai/examples/${name}`, readFileSync(resolve(root, 'ai', 'examples', name), 'utf8'));
    }
    const contract = JSON.parse(files.get('ai/contract.json')!);
    for (const [name, content] of Object.entries(contract.declarations)) files.set(`api/${name}`, content as string);
    for (const name of readdirSync(resolve(root, 'src'))) {
      if (/\.(tsx?|css)$/.test(name) && !/\.(test|stories)\./.test(name)) files.set(`source/${name}`, readFileSync(resolve(root, 'src', name), 'utf8'));
    }
    files.set('tokens.css', readFileSync(resolve(root, 'src/tokens.css'), 'utf8'));
    return files;
  }
  return {
    name: 'catalogue-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const prefix = `${server.config.base}catalogue-assets/`;
        const path = (req.url ?? '').split('?')[0];
        if (!path.startsWith(prefix)) return next();
        const content = assets().get(path.slice(prefix.length));
        if (content === undefined) { res.statusCode = 404; res.end('Document not found'); return; }
        res.setHeader('Content-Type', path.endsWith('.json') ? 'application/json; charset=utf-8' : 'text/plain; charset=utf-8');
        res.end(content);
      });
    },
    generateBundle() {
      for (const [name, source] of assets()) this.emitFile({ type: 'asset', fileName: `catalogue-assets/${name}`, source });
    },
  };
}
export default defineConfig({ base: './', plugins: [react(), catalogueAssets()] });
