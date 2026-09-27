import { describe, expect, it } from 'vitest';
import {
  PROJECT_STORAGE_KEY,
  createProject,
  filterAndSortProjects,
  parseStoredProjects,
  serializeProjects,
  type Project,
} from './projects';

const projects: Project[] = [
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
    id: 'atlas-research',
    name: 'Atlas research',
    client: 'Helio',
    description: 'Interview synthesis and opportunity map.',
    status: 'planning',
    dueDate: '2026-10-12',
    archived: false,
  },
  {
    id: 'harbor-audit',
    name: 'Harbor audit',
    client: 'Harbor & Co.',
    description: 'Accessibility review before the next release.',
    status: 'complete',
    dueDate: '2026-09-04',
    archived: true,
  },
];

describe('project persistence contract', () => {
  it('uses a stable, versioned storage envelope', () => {
    expect(PROJECT_STORAGE_KEY).toBe('deepak-ui.reference.projects.v1');
    expect(JSON.parse(serializeProjects(projects))).toEqual({ version: 1, projects });
  });

  it('rejects malformed or incomplete saved data instead of treating it as projects', () => {
    expect(parseStoredProjects('{not json}')).toEqual({ ok: false, reason: 'corrupt' });
    expect(parseStoredProjects(JSON.stringify({ version: 1, projects: [{ name: 'Incomplete' }] }))).toEqual({
      ok: false,
      reason: 'corrupt',
    });
    expect(parseStoredProjects(JSON.stringify({ version: 1, projects: [{ ...projects[0], dueDate: '2026-02-30' }] }))).toEqual({
      ok: false,
      reason: 'corrupt',
    });
  });

  it('accepts only a supported version and complete project records', () => {
    expect(parseStoredProjects(serializeProjects(projects))).toEqual({ ok: true, projects });
    expect(parseStoredProjects(JSON.stringify({ version: 2, projects }))).toEqual({ ok: false, reason: 'version' });
    expect(parseStoredProjects(JSON.stringify({ version: 1, projects: [projects[0], { ...projects[1], id: projects[0].id }] }))).toEqual({
      ok: false,
      reason: 'corrupt',
    });
  });
});

describe('project workspace model', () => {
  it('searches client and project name, filters active records, then sorts before paginating', () => {
    const result = filterAndSortProjects(projects, {
      search: 'north',
      status: 'all',
      dateRange: { from: null, to: null },
      archived: false,
      sort: { key: 'dueDate', direction: 'asc' },
    });

    expect(result.map((project) => project.id)).toEqual(['website-refresh']);
  });

  it('limits dates inclusively and keeps archived records out of the active view', () => {
    const result = filterAndSortProjects(projects, {
      search: '',
      status: 'all',
      dateRange: { from: '2026-09-18', to: '2026-10-12' },
      archived: false,
      sort: { key: 'name', direction: 'asc' },
    });

    expect(result.map((project) => project.id)).toEqual(['atlas-research', 'website-refresh']);
  });

  it('creates a trimmed active project with a stable unique ID', () => {
    const project = createProject(
      {
        name: '  New workspace  ',
        client: '  Meridian  ',
        description: '  Kickoff and scope alignment.  ',
        status: 'planning',
        dueDate: '2026-10-22',
      },
      () => 'project-123',
    );

    expect(project).toEqual({
      id: 'project-123',
      name: 'New workspace',
      client: 'Meridian',
      description: 'Kickoff and scope alignment.',
      status: 'planning',
      dueDate: '2026-10-22',
      archived: false,
    });
  });
});
