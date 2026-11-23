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

test('Items adhere to Agile pipelines, priorities, and Fibonacci estimates', () => {
  assert.ok(initialItems.length >= 5);
  const allowedPipelines = ['Icebox', 'Backlog', 'In Progress', 'In Review', 'Done'];
  const allowedPriorities = ['Low', 'Medium', 'High', 'Urgent'];
  const fibonacciPoints = [1, 2, 3, 5, 8, 13];

  for (const item of initialItems) {
    assert.ok(item.id.startsWith('GV-'), 'item id should follow GV- prefix');
    assert.ok(allowedPipelines.includes(item.status), `invalid pipeline status: ${item.status}`);
    assert.ok(allowedPriorities.includes(item.priority), `invalid priority: ${item.priority}`);
    assert.ok(fibonacciPoints.includes(item.estimate), `estimate ${item.estimate} must be a Fibonacci number`);
    assert.ok(item.startDate <= item.targetDate, 'startDate must precede or equal targetDate');
  }
});

test('Items have Epics assigned for portfolio tracking', () => {
  const itemsWithEpics = initialItems.filter(i => Boolean(i.epic));
  assert.ok(itemsWithEpics.length > 0, 'should have items with Epics assigned');
  assert.ok(itemsWithEpics.some(i => i.epic === 'Agile Project Platform'));
});

test('Calculate sprint velocity metrics', () => {
  const totalPoints = initialItems.reduce((acc, i) => acc + i.estimate, 0);
  const donePoints = initialItems.filter(i => i.status === 'Done').reduce((acc, i) => acc + i.estimate, 0);
  assert.ok(totalPoints > 0);
  assert.ok(donePoints >= 0);
  assert.ok(donePoints <= totalPoints);
});

test('Filter items by Agile pipeline status', () => {
  const inProgress = initialItems.filter(i => i.status === 'In Progress');
  assert.ok(inProgress.length >= 1);
  assert.equal(inProgress[0].status, 'In Progress');

  const backlog = initialItems.filter(i => i.status === 'Backlog');
  assert.ok(backlog.length >= 1);
});
