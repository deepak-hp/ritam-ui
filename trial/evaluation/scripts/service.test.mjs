import test from 'node:test';
import assert from 'node:assert/strict';
test('each operation fails first, resolves a copy on retry, and journals outcomes', async () => {
  const { saveSettings, finishSetup, remindInvoice, journal } = await import('../shared/service.ts');
  const value = { displayName: 'Sam', timezone: 'Asia/Kolkata', digest: 'Weekly', productUpdates: false };
  await assert.rejects(saveSettings(value), /Simulated failure/);
  const saved = await saveSettings(value);
  assert.deepEqual(saved, value);
  assert.notEqual(saved, value);
  await assert.rejects(finishSetup({ studioName: 'Studio', workType: 'Design', digest: true }));
  await assert.rejects(remindInvoice('INV-2101'));
  await remindInvoice('INV-2101');
  assert.deepEqual(journal.map(x => x.outcome), ['rejected', 'resolved', 'rejected', 'rejected', 'resolved']);
  assert.equal(journal[4].input, 'INV-2101');
});
