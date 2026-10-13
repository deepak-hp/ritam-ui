import type { DateRangeValue, TableSort } from '@serein-ui/react';

export const PROJECT_STORAGE_KEY = 'ritam-ui.reference.projects.v1';
const LEGACY_PROJECT_STORAGE_KEY = 'deepak-ui.reference.projects.v1';

export type ProjectStatus = 'planning' | 'active' | 'complete' | 'on-hold';

export type Project = {
  id: string;
  name: string;
  client: string;
  description: string;
  status: ProjectStatus;
  dueDate: string;
  archived: boolean;
};

export type ProjectDraft = Pick<Project, 'name' | 'client' | 'description' | 'status' | 'dueDate'>;

export type ProjectFilters = {
  search: string;
  status: 'all' | ProjectStatus;
  dateRange: DateRangeValue;
  archived: boolean;
  sort: TableSort;
};

type StoredProjects = { version: 1; projects: Project[] };

const statuses: ProjectStatus[] = ['planning', 'active', 'complete', 'on-hold'];

export function readStoredProjects(storage: Pick<Storage, 'getItem'>): string | null {
  return storage.getItem(PROJECT_STORAGE_KEY) ?? storage.getItem(LEGACY_PROJECT_STORAGE_KEY);
}

function isCalendarDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
}

export const seededProjects: Project[] = [
  {
    id: 'website-refresh',
    name: 'Website refresh',
    client: 'Northstar',
    description: 'A clearer product story for the autumn launch.',
    status: 'active',
    dueDate: '2026-09-18',
    archived: false,
  },
  {
    id: 'field-notes',
    name: 'Field notes',
    client: 'Cedar House',
    description: 'Editorial system and article templates.',
    status: 'planning',
    dueDate: '2026-09-25',
    archived: false,
  },
  {
    id: 'onboarding-audit',
    name: 'Onboarding audit',
    client: 'Luma Health',
    description: 'Review first-run friction across product journeys.',
    status: 'active',
    dueDate: '2026-10-02',
    archived: false,
  },
  {
    id: 'harbor-audit',
    name: 'Harbor audit',
    client: 'Harbor & Co.',
    description: 'Accessibility review before the next release.',
    status: 'complete',
    dueDate: '2026-09-04',
    archived: false,
  },
  {
    id: 'seasonal-campaign',
    name: 'Seasonal campaign',
    client: 'Fable Goods',
    description: 'Launch direction for the October collection.',
    status: 'on-hold',
    dueDate: '2026-10-08',
    archived: false,
  },
  {
    id: 'atlas-research',
    name: 'Atlas research',
    client: 'Helio',
    description: 'Interview synthesis and opportunity map.',
    status: 'planning',
    dueDate: '2026-10-12',
    archived: false,
  },
  {
    id: 'service-blueprint',
    name: 'Service blueprint',
    client: 'Morrow Studio',
    description: 'Map ownership through the service handoff.',
    status: 'active',
    dueDate: '2026-10-20',
    archived: false,
  },
  {
    id: 'retail-toolkit',
    name: 'Retail toolkit',
    client: 'Nook',
    description: 'Guidelines for the new shop floor experience.',
    status: 'complete',
    dueDate: '2026-09-29',
    archived: false,
  },
  {
    id: 'archive-sample',
    name: 'Archive sample',
    client: 'Northstar',
    description: 'Completed discovery materials.',
    status: 'complete',
    dueDate: '2026-09-01',
    archived: true,
  },
];

function isProject(value: unknown): value is Project {
  if (!value || typeof value !== 'object') return false;
  const project = value as Record<string, unknown>;
  return (
    typeof project.id === 'string' && project.id.trim().length > 0 &&
    typeof project.name === 'string' && project.name.trim().length > 0 &&
    typeof project.client === 'string' && project.client.trim().length > 0 &&
    typeof project.description === 'string' && project.description.trim().length > 0 &&
    typeof project.dueDate === 'string' && isCalendarDate(project.dueDate) &&
    typeof project.archived === 'boolean' &&
    typeof project.status === 'string' &&
    statuses.includes(project.status as ProjectStatus)
  );
}

export function serializeProjects(projects: Project[]): string {
  const stored: StoredProjects = { version: 1, projects };
  return JSON.stringify(stored);
}

export function parseStoredProjects(raw: string):
  | { ok: true; projects: Project[] }
  | { ok: false; reason: 'corrupt' | 'version' } {
  try {
    const stored = JSON.parse(raw) as Partial<StoredProjects>;
    if (stored.version !== 1) return { ok: false, reason: 'version' };
    if (!Array.isArray(stored.projects) || !stored.projects.every(isProject)) return { ok: false, reason: 'corrupt' };
    if (new Set(stored.projects.map((project) => project.id)).size !== stored.projects.length) return { ok: false, reason: 'corrupt' };
    return { ok: true, projects: stored.projects };
  } catch {
    return { ok: false, reason: 'corrupt' };
  }
}

export function createProject(draft: ProjectDraft, idFactory: () => string): Project {
  return {
    id: idFactory(),
    name: draft.name.trim(),
    client: draft.client.trim(),
    description: draft.description.trim(),
    status: draft.status,
    dueDate: draft.dueDate,
    archived: false,
  };
}

export function filterAndSortProjects(projects: Project[], filters: ProjectFilters): Project[] {
  const search = filters.search.trim().toLocaleLowerCase();
  const filtered = projects.filter((project) => {
    const matchesSearch = !search || `${project.name} ${project.client}`.toLocaleLowerCase().includes(search);
    const matchesStatus = filters.status === 'all' || project.status === filters.status;
    const matchesStart = !filters.dateRange.from || project.dueDate >= filters.dateRange.from;
    const matchesEnd = !filters.dateRange.to || project.dueDate <= filters.dateRange.to;
    return project.archived === filters.archived && matchesSearch && matchesStatus && matchesStart && matchesEnd;
  });

  if (!filters.sort) return filtered;
  const { key, direction } = filters.sort;
  return [...filtered].sort((left, right) => {
    const a = left[key as keyof Project];
    const b = right[key as keyof Project];
    const comparison = String(a ?? '').localeCompare(String(b ?? ''), undefined, { numeric: true });
    return direction === 'asc' ? comparison : -comparison;
  });
}
