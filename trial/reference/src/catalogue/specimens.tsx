import { useState } from 'react';
import * as UI from '@serein-ui/react';

export function Button() {
  const [saved, setSaved] = useState(false);
  return <UI.Button onClick={() => setSaved(!saved)}>{saved ? 'Saved — reset' : 'Save draft'}</UI.Button>;
}
export function IconButton() {
  const [saved, setSaved] = useState(false);
  return <><UI.IconButton label={saved ? 'Remove bookmark' : 'Bookmark'} aria-pressed={saved} onClick={() => setSaved(!saved)}><svg width="20" height="20" viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="M6 4h12v17l-6-4-6 4z" /></svg></UI.IconButton><p>{saved ? 'Bookmarked' : 'Not bookmarked'}</p></>;
}
export function Link() { return <UI.Link href="#foundations">Read the foundations</UI.Link>; }
export function TextField() { return <UI.TextField label="Project name" placeholder="e.g. Studio website" description="Use a short, recognizable name." />; }
export function Textarea() { return <UI.Textarea label="Project notes" placeholder="What should your team know?" />; }
export function NumberField() {
  const [value, setValue] = useState<number | null>(3);
  return <UI.NumberField label="Seats" min={1} max={20} value={value} onValueChange={setValue} />;
}
export function Select() {
  const [value, setValue] = useState('draft');
  return <UI.Select label="Status" value={value} onValueChange={setValue} options={[{ value: 'draft', label: 'Draft' }, { value: 'ready', label: 'Ready' }]} />;
}
export function Combobox() {
  const [value, setValue] = useState<string | null>(null);
  return <UI.Combobox label="Choose a city" value={value} onValueChange={setValue} options={[{ value: 'pune', label: 'Pune' }, { value: 'chennai', label: 'Chennai' }, { value: 'kochi', label: 'Kochi' }]} />;
}
export function MultiSelect() {
  const [value, setValue] = useState<string[]>(['design']);
  return <UI.MultiSelect label="Teams" value={value} onValueChange={setValue} options={[{ value: 'design', label: 'Design' }, { value: 'engineering', label: 'Engineering' }]} />;
}
export function Checkbox() {
  const [checked, setChecked] = useState(false);
  return <UI.Checkbox label="Include archived projects" checked={checked} onCheckedChange={setChecked} />;
}
export function Switch() {
  const [checked, setChecked] = useState(true);
  return <UI.Switch label="Email summaries" checked={checked} onCheckedChange={setChecked} description="Demonstration only; no email is sent." />;
}
export function RadioGroup() {
  const [value, setValue] = useState('weekly');
  return <UI.RadioGroup label="Summary frequency" value={value} onValueChange={setValue} options={[{ value: 'weekly', label: 'Weekly' }, { value: 'monthly', label: 'Monthly' }]} />;
}
export function ToggleGroup() {
  const [value, setValue] = useState(['list']);
  return <UI.ToggleGroup label="Layout" value={value} onValueChange={setValue} options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]} />;
}
export function Slider() {
  const [value, setValue] = useState(40);
  return <UI.Slider label="Volume" value={value} onValueChange={setValue} min={0} max={100} />;
}
export function DateField() {
  const [value, setValue] = useState('2026-09-28');
  return <UI.DateField label="Due date" value={value} onValueChange={setValue} />;
}
export function Calendar() {
  const [value, setValue] = useState<string | null>('2026-09-28');
  return <UI.Calendar label="Choose a date" value={value} onValueChange={setValue} defaultMonth="2026-09-01" />;
}
export function DatePicker() {
  const [value, setValue] = useState<string | null>(null);
  return <UI.DatePicker label="Start date" value={value} onValueChange={setValue} defaultMonth="2026-09-01" />;
}
export function DateRangePicker() {
  const [value, setValue] = useState<UI.DateRangeValue>({ from: null, to: null });
  return <UI.DateRangePicker label="Project dates" value={value} onValueChange={setValue} defaultMonth="2026-09-01" />;
}
export function FileUpload() {
  const [count, setCount] = useState(0);
  return <><UI.FileUpload label="Attach files" multiple onFilesChange={files => setCount(files?.length ?? 0)} description="Selection stays on this device. Nothing is uploaded." /><p>{count} files selected</p></>;
}
export function Tabs() {
  const [value, setValue] = useState('details');
  return <UI.Tabs label="Project information" value={value} onValueChange={setValue} items={[{ value: 'details', label: 'Details', content: <p>Website refresh for a fictional studio.</p> }, { value: 'notes', label: 'Notes', content: <UI.Textarea label="Notes" /> }]} />;
}
export function Breadcrumbs() { return <UI.Breadcrumbs items={[{ label: 'Catalogue', href: '?view=catalogue' }, { label: 'Breadcrumbs' }]} />; }
export function Pagination() {
  const [page, setPage] = useState(1);
  return <><UI.Pagination page={page} pageCount={8} onPageChange={setPage} /><p>Page {page} of 8</p></>;
}
export function DataTable() {
  return <UI.DataTable caption="Sample projects" rows={[{ id: 'one', name: 'Studio website', status: 'Draft' }, { id: 'two', name: 'Client portal', status: 'Ready' }]} rowKey={row => row.id} columns={[{ key: 'name', header: 'Project', cell: row => row.name, sortValue: row => row.name }, { key: 'status', header: 'Status', cell: row => row.status }]} />;
}
export function Tooltip() { return <UI.Tooltip content="Only you can see this draft."><UI.Button variant="secondary">Draft visibility</UI.Button></UI.Tooltip>; }
export function Popover() { return <UI.Popover triggerLabel="About this project" title="Project details"><p>A fictional project for trying the component.</p></UI.Popover>; }
export function DropdownMenu() {
  const [message, setMessage] = useState('Choose an action.');
  return <><UI.DropdownMenu triggerLabel="Project actions" items={[{ label: 'Duplicate locally', onSelect: () => setMessage('Demo project duplicated.') }, { label: 'Archive locally', onSelect: () => setMessage('Demo project archived.') }]} /><p role="status">{message}</p></>;
}
export function CommandPalette() {
  const [message, setMessage] = useState('Choose a command.');
  return <><UI.CommandPalette triggerLabel="Open commands" items={[{ id: 'project', label: 'Create project', onSelect: () => setMessage('Create project selected.') }, { id: 'settings', label: 'Open settings', onSelect: () => setMessage('Settings selected.') }]} /><p role="status">{message}</p></>;
}
export function Dialog() { return <UI.Dialog triggerLabel="Open project brief" title="Project brief" description="A local component demonstration."><p>Use a dialog for a focused task that needs a separate surface.</p></UI.Dialog>; }
export function AlertDialog() {
  const [message, setMessage] = useState('Draft available.');
  return <><UI.AlertDialog triggerLabel="Discard demo draft" title="Discard this draft?" description="Only the demonstration state changes." confirmLabel="Discard draft" onConfirm={() => setMessage('Demo draft discarded.')} /><p role="status">{message}</p></>;
}
export function Drawer() { return <UI.Drawer triggerLabel="Open project details" title="Project details" description="Inspect without losing your place."><UI.TextField label="Project name" defaultValue="Studio website" /></UI.Drawer>; }
export function Accordion() { return <UI.Accordion label="Common questions" items={[{ value: 'storage', label: 'Where is my data stored?', content: <p>This specimen uses temporary local state.</p> }, { value: 'reset', label: 'How do I reset it?', content: <p>Select another component, then return here.</p> }]} />; }
export function Alert() { return <UI.Alert title="Changes saved" tone="success">Your local demonstration is ready to review.</UI.Alert>; }
export function Badge() { return <UI.Badge tone="success">Ready for review</UI.Badge>; }
export function Avatar() { return <UI.Avatar name="Ananya Rao" />; }
export function Card() { return <UI.Card><h3>Studio website</h3><p>A noninteractive surface. Put explicit actions inside.</p><UI.Link href="#foundations">Read foundations</UI.Link></UI.Card>; }
export function Separator() { return <div><p>Project details</p><UI.Separator /><p>Team notes</p></div>; }
export function Skeleton() { return <UI.Skeleton width="100%" height={80} label="Loading project summary" />; }
export function Progress() {
  const [value, setValue] = useState(40);
  return <><UI.Progress label="Demo progress" value={value} /><UI.Button variant="secondary" onClick={() => setValue(value >= 100 ? 0 : value + 20)}>{value >= 100 ? 'Reset progress' : 'Advance progress'}</UI.Button></>;
}
export function Spinner() { return <UI.Spinner label="Loading demonstration" />; }
export function EmptyState() {
  const [created, setCreated] = useState(false);
  return created ? <UI.Alert title="Demo project created">Select another component to reset.</UI.Alert> : <UI.EmptyState title="No projects yet" description="Create a sample to explore this state." action={<UI.Button onClick={() => setCreated(true)}>Create demo project</UI.Button>} />;
}
export function StatusIcon() { return <div className="catalogue-inline"><UI.StatusIcon state="success" kind="send" /><span>Message saved locally</span></div>; }
export function ToastProvider() {
  return <UI.ToastProvider><ToastTrigger /></UI.ToastProvider>;
}
function ToastTrigger() {
  const toast = UI.useToast();
  return <UI.Button onClick={() => toast.add({ title: 'Demo draft saved', description: 'This notification is local.', tone: 'success' })}>Show notification</UI.Button>;
}
