import { useState } from 'react';
import { Checkbox, RadioGroup, Switch, Tabs, TextField } from '../dist/index.js';

export function SelectionStudy() {
  const [summary, setSummary] = useState(true);
  const [reminders, setReminders] = useState(false);
  const [mixed, setMixed] = useState(true);
  const [all, setAll] = useState(false);
  const [duration, setDuration] = useState('45');
  const [tab, setTab] = useState('overview');
  return <section id="selection" className="section">
    <div className="section-heading"><h2>Choices that feel clear.</h2><p>Small decisions, consistent feedback.</p></div>
    <div className="selection-grid">
      <div className="selection-stack">
        <h3>Your preferences</h3>
        <Checkbox label="Include a session summary" description="Keep a short record of your focus time." checked={summary} onCheckedChange={setSummary} />
        <Checkbox label="Select all updates" description="Starts partially selected. Click to select all." checked={all} indeterminate={mixed} onCheckedChange={v => { setMixed(false); setAll(v); }} />
        <Checkbox label="Team updates" description="Available when you join a team." checked={false} onCheckedChange={() => {}} disabled />
        <Switch label="Session reminders" description="A gentle prompt before your next session." checked={reminders} onCheckedChange={setReminders} />
        <Switch label="Calendar sync" description="Connect a calendar to enable this." checked={false} onCheckedChange={() => {}} disabled />
      </div>
      <div className="selection-stack">
        <RadioGroup label="Focus duration" value={duration} onValueChange={setDuration} options={[
          { value: '25', label: '25 minutes', description: 'A quick burst of focus.' },
          { value: '45', label: '45 minutes', description: 'Time to settle into your work.' },
          { value: '90', label: '90 minutes', description: 'Long sessions are unavailable in this preview.', disabled: true },
        ]} />
        <p className="small-note" role="status">{duration} minute session · reminders {reminders ? 'on' : 'off'} · summary {summary ? 'included' : 'off'}</p>
      </div>
    </div>
    <div className="tabs-study">
      <h3>A place for the details</h3>
      <Tabs label="Session information" value={tab} onValueChange={setTab} items={[
        { value: 'overview', label: 'Overview', content: <p className="muted">Your next focus session is {duration} minutes. Adjust the preferences above to make it yours.</p> },
        { value: 'notes', label: 'Notes', content: <TextField label="Session notes" placeholder="What would you like to work on?" description="Your draft stays here when you change tabs. It resets on refresh." /> },
        { value: 'history', label: 'History', content: <p className="muted">Completed sessions will appear here.</p> },
        { value: 'shared', label: 'Shared', disabled: true, content: null },
      ]} />
    </div>
  </section>;
}
