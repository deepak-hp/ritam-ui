import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import * as api from '../dist/index.js';
import { families, storySlug } from './component-catalogue.mjs';

await mkdir('ai', { recursive: true });
await mkdir('docs', { recursive: true });
const files = (await readdir('dist')).filter(f => f.endsWith('.d.ts')).sort();
const declarations = Object.fromEntries(await Promise.all(files.map(async f => [f, await readFile(`dist/${f}`, 'utf8')])));
const tokens = await readFile('src/tokens.css', 'utf8');
const guide = await readFile('ai/README.md', 'utf8');
const composition = await readFile('ai/COMPOSITION.md', 'utf8');
const fingerprint = createHash('sha256').update(JSON.stringify({ declarations, tokens, guide, composition })).digest('hex');
const pkg = JSON.parse(await readFile('package.json', 'utf8'));
const components = Object.values(families).flatMap(family => Object.keys(family));
const hooks = Object.keys(api).filter(name => name.startsWith('use')).sort();
assert.deepEqual([...components, ...hooks].sort(), Object.keys(api).sort(), 'Every public export must appear in the catalogue');
await writeFile('ai/contract.json', JSON.stringify({ schemaVersion: 1, package: pkg.name, version: pkg.version, platform: 'react-web', components, hooks, families, declarations, tokens, fingerprint, accessibility: { target: 'WCAG 2.2 AA', conformanceClaim: false, guidance: 'docs/ACCESSIBILITY.md' } }, null, 2) + '\n');
await writeFile('ai/llms.txt', '# Ritam UI\n\nReact web component library; unpublished.\n\n- [Full integration guide and API](./llms-full.txt)\n- [Composition recipes](./COMPOSITION.md)\n- [Machine-readable contract](./contract.json)\n- [Agent guidance](./AGENTS.md)\n- [Setup](./README.md)\n');
await writeFile('ai/llms-full.txt', `${guide}\n\n${composition}\n\n# Exact public TypeScript declarations\n\n${Object.entries(declarations).map(([name, body]) => `## ${name}\n\n\`\`\`tsx\n${body}\`\`\`\n`).join('\n')}\n# Theme tokens\n\n\`\`\`css\n${tokens}\`\`\`\n`);
// Keep Vite raw-module imports outside the /ai static-file mount.
await writeFile('docs/agent-api.generated.md', await readFile('ai/llms-full.txt', 'utf8'));
await writeFile('docs/ai-integration.generated.md', guide);
await writeFile('docs/composition.generated.md', composition);
const catalogue = `# Component catalogue\n\n${components.length} exported React components (including ToastProvider) and ${hooks.length} hooks. All entries below are implemented and have Storybook examples. This is an unpublished React web library; release accessibility review remains open.\n\n${Object.entries(families).map(([family, entries]) => `## ${family}\n\n| Component | Supported behaviour |\n| --- | --- |\n${Object.entries(entries).map(([name, description]) => `| [${name}](/?path=/docs/components-${storySlug(name)}--docs) | ${description} |`).join('\n')}\n`).join('\n')}\n## Hooks\n\n- \`useAsyncAction\`: real asynchronous operation, cancellation, pending/success/error state.\n- \`useToast\`: add, update and dismiss notifications beneath ToastProvider.\n\n## Separate modules not yet implemented\n\nNative mobile/desktop adapters, rich-text editing, charts, tree view, drag-and-drop upload transport and enterprise data grids (virtualization, grouping, cell editing) are not included. DataTable and DateField intentionally describe their current capabilities above.\n\n## Quality and integration\n\nUse the theme and motion toolbar on any story. Documentation includes source-derived prop types. Read Integration and Agent API for the compiled package and MCP setup, and Accessibility for automated coverage and manual release checks.\n`;
await writeFile('docs/catalogue.generated.md', catalogue);
