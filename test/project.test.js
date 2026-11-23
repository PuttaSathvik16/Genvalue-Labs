import test from 'node:test';
import assert from 'node:assert/strict';
import { initialViews, initialItems } from '../src/data/mockData.ts';

test('Initial Views contains Table, Board, and Roadmap layouts', () => {
  assert.equal(initialViews.length, 3);
  const layouts = initialViews.map(v => v.layout);
  assert.ok(layouts.includes('table'), 'should have table layout');
  assert.ok(layouts.includes('board'), 'should have board layout');
  assert.ok(layouts.includes('roadmap'), 'should have roadmap layout');
});

test('Items have valid status, priority, and dates', () => {
  assert.ok(initialItems.length >= 5);
  for (const item of initialItems) {
    assert.ok(item.id.startsWith('GV-'), 'item id should follow GV- prefix');
    assert.ok(['Todo', 'In Progress', 'In Review', 'Done'].includes(item.status));
    assert.ok(['Low', 'Medium', 'High', 'Urgent'].includes(item.priority));
    assert.ok(item.startDate <= item.targetDate, 'startDate must precede or equal targetDate');
  }
});

test('Filter items by search query', () => {
  const query = 'kanban';
  const filtered = initialItems.filter(item =>
    item.title.toLowerCase().includes(query) ||
    item.labels.some(l => l.toLowerCase().includes(query))
  );
  assert.ok(filtered.length > 0);
  assert.ok(filtered.some(i => i.id === 'GV-103'));
});

test('Filter items by status', () => {
  const doneItems = initialItems.filter(item => item.status === 'Done');
  assert.ok(doneItems.length >= 1);
  assert.equal(doneItems[0].status, 'Done');
});
