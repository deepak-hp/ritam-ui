import contract from '../../../ai/contract.json';
import * as specimens from './specimens';
import source from './specimens.tsx?raw';

export type ComponentName = keyof typeof specimens;
export const entries = Object.entries(contract.families).flatMap(([family, components]) =>
  Object.entries(components).map(([name, description]) => ({ name: name as ComponentName, family, description })),
);
export const families = Object.keys(contract.families);
export function specimenSource(name: ComponentName) {
  const start = source.indexOf(`export function ${name}()`);
  const next = source.indexOf('\nexport function ', start + 1);
  return `import { useState } from 'react';\nimport * as UI from '@ritam-ui/react';\nimport '@ritam-ui/react/styles.css';\n\n${source.slice(start, next === -1 ? undefined : next).trim()}`;
}
export function declaration(name: ComponentName) {
  return Object.entries(contract.declarations).find(([, text]) => (text.includes(`declare function ${name}(`) || text.includes(`declare function ${name}<`))) ?? ['', ''];
}
export { specimens, contract };
