import { FormEvent, useEffect, useMemo, useRef, useState } from 'react';
import { MaterialPreview } from './MaterialPreview';
import {
  Alert,
  AlertDialog,
  Badge,
  Button,
  Checkbox,
  DataTable,
  DateField,
  DateRangePicker,
  Drawer,
  EmptyState,
  Pagination,
  Popover,
  RadioGroup,
  Select,
  Spinner,
  Textarea,
  TextField,
  ToastProvider,
  useToast,
  type DateRangeValue,
  type TableSort,
} from '@ritam-ui/react';
import {
  PROJECT_STORAGE_KEY,
  createProject,
  filterAndSortProjects,
  parseStoredProjects,
  readStoredProjects,
  seededProjects,
  serializeProjects,
  type Project,
  type ProjectDraft,
  type ProjectStatus,
} from './projects';

const pageSize = 5;
const initialDraft: ProjectDraft = {
  name: '',
  client: '',
  description: '',
  status: 'planning',
  dueDate: '',
};

const statusOptions = [
  { value: 'all', label: 'All statuses' },
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'on-hold', label: 'On hold' },
  { value: 'complete', label: 'Complete' },
];

const navigationFinishOptions = [
  { value: 'subtle', label: 'Subtle', description: 'Edge-to-edge navigation with quiet depth.' },
  { value: 'expressive', label: 'Expressive', description: 'An inset frame with more visible depth.' },
  { value: 'solid', label: 'Solid', description: 'An opaque bar without blur or shadow.' },
];

function statusLabel(status: ProjectStatus) {
  return status === 'on-hold' ? 'On hold' : status[0].toUpperCase() + status.slice(1);
}

function statusTone(status: ProjectStatus): 'neutral' | 'success' | 'warning' {
  if (status === 'complete') return 'success';
  if (status === 'on-hold') return 'warning';
  return 'neutral';
}

function draftFromProject(project: Project): ProjectDraft {
  return {
    name: project.name,
    client: project.client,
    description: project.description,
    status: project.status,
    dueDate: project.dueDate,
  };
}

function ReferenceWorkspace() {
  const toast = useToast();
  const [projects, setProjects] = useState<Project[]>(seededProjects);
  const [storageError, setStorageError] = useState<string | null>(null);
  const [storageBlocked, setStorageBlocked] = useState(false);
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<'all' | ProjectStatus>('all');
  const [dateRange, setDateRange] = useState<DateRangeValue>({ from: null, to: null });
  const [sort, setSort] = useState<TableSort>({ key: 'dueDate', direction: 'asc' });
  const [archivedView, setArchivedView] = useState(false);
  const [page, setPage] = useState(1);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [confirmClose, setConfirmClose] = useState(false);
  const keepEditingRef = useRef<HTMLButtonElement>(null);
  const [editing, setEditing] = useState<Project | null>(null);
  const [draft, setDraft] = useState<ProjectDraft>(initialDraft);
  const [errors, setErrors] = useState<Partial<Record<keyof ProjectDraft, string>>>({});
  const [saving, setSaving] = useState(false);
  const [failNextSave, setFailNextSave] = useState(false);
  const [archiveTarget, setArchiveTarget] = useState<Project | null>(null);
  const archiveSaveInFlight = useRef(false);
  const [darkTheme, setDarkTheme] = useState(() => document.documentElement.dataset.dpTheme === 'dark');
  const [navigationFinish, setNavigationFinish] = useState('subtle');
  const [previewGlass, setPreviewGlass] = useState(false);

  const loadProjects = () => {
    try {
      const raw = readStoredProjects(window.localStorage);
      if (!raw) {
        setStorageBlocked(false);
        setStorageError(null);
        return;
      }
      const parsed = parseStoredProjects(raw);
      if (parsed.ok) {
        setProjects(parsed.projects);
        setStorageBlocked(false);
        setStorageError(null);
      } else {
        setStorageBlocked(true);
        setStorageError('Saved projects could not be read. Your current browser data was left untouched. Clear or repair it, then retry loading.');
      }
    } catch {
      setStorageBlocked(true);
      setStorageError('This browser is not allowing local project storage. Changes cannot be saved here.');
    }
  };

  useEffect(() => { loadProjects(); }, []);

  useEffect(() => {
    if (confirmClose) keepEditingRef.current?.focus();
  }, [confirmClose]);

  function updateDraft<Key extends keyof ProjectDraft>(field: Key, value: ProjectDraft[Key]) {
    setDraft(current => ({ ...current, [field]: value }));
    setErrors(current => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  useEffect(() => {
    document.documentElement.dataset.dpTheme = darkTheme ? 'dark' : 'light';
    document.body.classList.toggle('dp-theme-dark', darkTheme);
    document.body.classList.toggle('dp-theme-light', !darkTheme);
  }, [darkTheme]);

  const filteredProjects = useMemo(
    () => filterAndSortProjects(projects, { search, status, dateRange, archived: archivedView, sort }),
    [archivedView, dateRange, projects, search, sort, status],
  );
  const pageCount = Math.max(1, Math.ceil(filteredProjects.length / pageSize));
  const pageRows = filteredProjects.slice((Math.min(page, pageCount) - 1) * pageSize, Math.min(page, pageCount) * pageSize);

  useEffect(() => setPage(1), [search, status, dateRange, archivedView, sort]);

  const clearFilters = () => {
    setSearch('');
    setStatus('all');
    setDateRange({ from: null, to: null });
    setSort({ key: 'dueDate', direction: 'asc' });
  };

  const openCreate = () => {
    setEditing(null);
    setDraft(initialDraft);
    setErrors({});
    setConfirmClose(false);
    setDrawerOpen(true);
  };

  const openEdit = (project: Project) => {
    setEditing(project);
    setDraft(draftFromProject(project));
    setErrors({});
    setConfirmClose(false);
    setDrawerOpen(true);
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof ProjectDraft, string>> = {};
    if (!draft.name.trim()) nextErrors.name = 'Enter a project name.';
    if (!draft.client.trim()) nextErrors.client = 'Enter a client name.';
    if (!draft.description.trim()) nextErrors.description = 'Add a short project description.';
    if (!draft.dueDate) nextErrors.dueDate = 'Choose a due date.';
    setErrors(nextErrors);
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) window.setTimeout(() => document.getElementById(`project-${firstInvalid}`)?.focus(), 0);
    return Object.keys(nextErrors).length === 0;
  };

  const saveProjects = async (nextProjects: Project[], successMessage: string) => {
    if (storageBlocked) return false;
    setSaving(true);
    await new Promise((resolve) => window.setTimeout(resolve, 500));
    try {
      if (failNextSave) {
        setFailNextSave(false);
        throw new Error('demo');
      }
      window.localStorage.setItem(PROJECT_STORAGE_KEY, serializeProjects(nextProjects));
      setProjects(nextProjects);
      setStorageError(null);
      toast.add({ title: successMessage, tone: 'success' });
      return true;
    } catch {
      setStorageError('Project changes were not saved. Check browser storage, then retry. Your draft is still here.');
      return false;
    } finally {
      setSaving(false);
    }
  };

  const submitProject = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (saving || storageBlocked) return;
    if (!validate()) return;
    const nextProject = editing
      ? { ...editing, ...createProject(draft, () => editing.id), archived: editing.archived }
      : createProject(draft, () => `project-${crypto.randomUUID()}`);
    const nextProjects = editing
      ? projects.map((project) => (project.id === editing.id ? nextProject : project))
      : [nextProject, ...projects];
    if (await saveProjects(nextProjects, editing ? 'Project updated' : 'Project created')) {
      setDrawerOpen(false);
    }
  };

  const archiveProject = async () => {
    if (!archiveTarget || archiveSaveInFlight.current) return;
    archiveSaveInFlight.current = true;
    const nextProjects = projects.map((project) =>
      project.id === archiveTarget.id ? { ...project, archived: !archivedView } : project,
    );
    const saved = await saveProjects(nextProjects, archivedView ? 'Project restored' : 'Project archived');
    archiveSaveInFlight.current = false;
    if (saved) {
      setArchiveTarget(null);
      requestAnimationFrame(() => document.getElementById('project-workspace')?.focus());
    }
  };

  const requestEditorClose = () => {
    if (saving) return;
    const initial = editing ? draftFromProject(editing) : initialDraft;
    if (JSON.stringify(draft) !== JSON.stringify(initial)) setConfirmClose(true);
    else setDrawerOpen(false);
  };

  const editor = (project: Project | null) => (
    <Drawer
      triggerLabel={project ? project.name : 'Create project'}
      title={project ? `Edit ${project.name}` : 'Create project'}
      description="Project name, client, description and due date are required."
      open={drawerOpen && (project ? editing?.id === project.id : editing === null)}
      onOpenChange={open => open ? (project ? openEdit(project) : openCreate()) : requestEditorClose()}
    >
      <form className="project-form" onSubmit={submitProject} noValidate>
        <TextField id="project-name" label="Project name" required disabled={saving} value={draft.name} error={errors.name} onChange={event => updateDraft('name', event.target.value)} />
        <TextField id="project-client" label="Client" required disabled={saving} value={draft.client} error={errors.client} onChange={event => updateDraft('client', event.target.value)} />
        <Textarea id="project-description" label="Description" required disabled={saving} value={draft.description} error={errors.description} onChange={event => updateDraft('description', event.target.value)} />
        <Select label="Status" disabled={saving} value={draft.status} onValueChange={value => updateDraft('status', value as ProjectStatus)} options={statusOptions.slice(1)} />
        <DateField id="project-dueDate" label="Due date" required disabled={saving} value={draft.dueDate} error={errors.dueDate} onValueChange={dueDate => updateDraft('dueDate', dueDate)} />
        {storageError && <Alert title="Save not complete" tone="error" live="polite">{storageError}</Alert>}
        {confirmClose && <Alert title="Discard unsaved changes?" tone="warning" live="polite">
          <p>Your saved project will stay unchanged.</p>
          <div className="form-actions">
            <Button ref={keepEditingRef} type="button" variant="secondary" onClick={() => { setConfirmClose(false); document.getElementById('project-name')?.focus(); }}>Keep editing</Button>
            <Button type="button" onClick={() => setDrawerOpen(false)}>Discard changes</Button>
          </div>
        </Alert>}
        <div className="form-actions">
          <Button type="button" variant="secondary" onClick={requestEditorClose} disabled={saving}>Cancel</Button>
          <Button type="submit" loading={saving} disabled={storageBlocked}>{saving ? 'Saving project' : editing ? 'Save changes' : 'Create project'}</Button>
        </div>
      </form>
    </Drawer>
  );

  const archiveAction = (project: Project) => (
    <AlertDialog
      triggerLabel={archivedView ? 'Restore' : 'Archive'}
      title={archivedView ? 'Restore this project?' : 'Archive this project?'}
      description={`${project.name} will ${archivedView ? 'return to active projects' : 'move to archived projects'}.`}
      confirmLabel={archivedView ? 'Restore project' : 'Archive project'}
      open={archiveTarget?.id === project.id}
      onOpenChange={open => {
        if (archiveSaveInFlight.current) return;
        setArchiveTarget(open ? project : null);
      }}
      onConfirm={archiveProject}
    >
      {saving && <Spinner label="Saving project change" />}
      {storageError && <Alert title="Save not complete" tone="error" live="polite">{storageError}</Alert>}
    </AlertDialog>
  );

  const columns = [
    {
      key: 'name',
      header: 'Project',
      sortValue: (project: Project) => project.name,
      cell: (project: Project) => editor(project),
    },
    { key: 'client', header: 'Client', sortValue: (project: Project) => project.client, cell: (project: Project) => project.client },
    {
      key: 'status',
      header: 'Status',
      sortValue: (project: Project) => project.status,
      cell: (project: Project) => <Badge tone={statusTone(project.status)}>{statusLabel(project.status)}</Badge>,
    },
    { key: 'dueDate', header: 'Due date', sortValue: (project: Project) => project.dueDate, cell: (project: Project) => project.dueDate },
    {
      key: 'actions',
      header: 'Actions',
      cell: (project: Project) => archiveAction(project),
    },
  ];

  return (
    <div className="workspace-shell" data-preview-glass={previewGlass}>
      <a className="skip-link" href="#project-workspace">Skip to project workspace</a>
      <header className="topbar dp-navigation-surface" data-dp-material={navigationFinish}>
        <a className="wordmark" href="#project-workspace" aria-label="Ritam UI projects home">Ritam UI</a>
        <div className="topbar-actions">
          <a className="wordmark" href="/?view=composition">Composition lab</a>
          <span className="local-note">Local-only sample</span>
          <Popover triggerLabel="Appearance" title="Appearance">
            <div className="appearance-controls">
            <RadioGroup
              label="Navigation finish"
              value={navigationFinish}
              onValueChange={setNavigationFinish}
              options={navigationFinishOptions}
            />
            <Checkbox label="Preview glass effects" checked={previewGlass} onCheckedChange={setPreviewGlass}
              description="Preview transparency in this demo without changing your device settings." />
            <p className="appearance-note">{previewGlass ? 'Glass preview is on for this demo. Solid remains opaque; high-contrast settings still take priority.' : 'Glass follows your device’s transparency and contrast settings.'}</p>
            {!previewGlass && <p className="appearance-note appearance-system-note">Your accessibility settings are keeping these surfaces opaque. Enable the preview to compare glass.</p>}
            </div>
          </Popover>
          <Button variant="quiet" onClick={() => setDarkTheme((theme) => !theme)}>
            {darkTheme ? 'Use light theme' : 'Use dark theme'}
          </Button>
        </div>
      </header>

      {previewGlass && <MaterialPreview />}

      <main id="project-workspace" className="workspace-main" tabIndex={-1}>
        <section className="workspace-intro" aria-labelledby="projects-heading">
          <div>
            <h1 id="projects-heading">Projects</h1>
            <p>Fictional client work kept in this browser only.</p>
          </div>
          {editor(null)}
        </section>

        {storageError && <Alert title="Storage needs attention" tone="error" live="polite">{storageError} <Button variant="quiet" onClick={loadProjects}>Retry loading</Button></Alert>}

        <section className="workspace-panel" aria-label="Project workspace">
          <div className="view-toolbar">
            <div>
              <h2>{archivedView ? 'Archived projects' : 'All projects'}</h2>
              <p>{filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}</p>
            </div>
            <Button variant="secondary" onClick={() => setArchivedView((value) => !value)}>
              {archivedView ? 'View active projects' : 'View archived projects'}
            </Button>
          </div>

          <div className="filters" aria-label="Project filters">
            <TextField label="Search projects" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Name or client" />
            <Select label="Status filter" value={status} onValueChange={(value) => setStatus(value as 'all' | ProjectStatus)} options={statusOptions} />
            <DateRangePicker label="Due dates" value={dateRange} onValueChange={setDateRange} defaultMonth="2026-09-01" />
            <Button variant="quiet" onClick={clearFilters}>Clear filters</Button>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="table-region">
              <DataTable
                caption={archivedView ? 'Archived projects' : 'Projects'}
                rows={pageRows}
                columns={columns}
                rowKey={(project) => project.id}
                sort={sort}
                onSortChange={setSort}
              />
            </div>
          ) : (
            <EmptyState
              title="No projects found"
              description="Try clearing filters, or create a new project for this local workspace."
              action={<Button onClick={clearFilters}>Clear filters</Button>}
            />
          )}
          {filteredProjects.length > pageSize && <Pagination page={Math.min(page, pageCount)} pageCount={pageCount} onPageChange={setPage} label="Project pages" />}
        </section>

        <section className="workspace-help" aria-labelledby="local-help-heading">
          <h2 id="local-help-heading">About this workspace</h2>
          <p>Projects save to local browser storage on this device. The demo control lets you check the save error and retry experience.</p>
          <Popover triggerLabel="Demo controls" title="Demo controls">
            <Checkbox
              label="Simulate next save failure"
              description="The next project save will fail after a short delay; your draft remains ready to retry."
              checked={failNextSave}
              onCheckedChange={setFailNextSave}
            />
          </Popover>
        </section>
      </main>
    </div>
  );
}

export default function App() {
  return <ToastProvider><ReferenceWorkspace /></ToastProvider>;
}
