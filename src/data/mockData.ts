import type { ProjectItem, ViewConfig } from '../types/project.ts';

export const initialViews: ViewConfig[] = [
  {
    id: 'view-1',
    name: 'Table',
    layout: 'table',
    description: 'High-density spreadsheet of issues and pull requests'
  },
  {
    id: 'view-2',
    name: 'Board',
    layout: 'board',
    description: 'Kanban view categorized by progress status'
  },
  {
    id: 'view-3',
    name: 'Roadmap',
    layout: 'roadmap',
    description: 'Timeline view across iterations and milestone dates'
  }
];

export const initialItems: ProjectItem[] = [
  {
    id: 'GV-101',
    title: 'Configure automated CI workflow for PR validation',
    status: 'Done',
    priority: 'High',
    type: 'issue',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-15',
    targetDate: '2026-11-18',
    iteration: 'Iteration 1',
    labels: ['ci/cd', 'infrastructure'],
    estimate: 3
  },
  {
    id: 'GV-102',
    title: 'Build multi-view project management layout (Table, Board, Roadmap)',
    status: 'In Progress',
    priority: 'Urgent',
    type: 'issue',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-19',
    targetDate: '2026-11-26',
    iteration: 'Iteration 1',
    labels: ['frontend', 'feature', 'views'],
    estimate: 5
  },
  {
    id: 'GV-103',
    title: 'Feat: Add drag-and-drop column sorting for Kanban board',
    status: 'In Review',
    priority: 'High',
    type: 'pull_request',
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-20',
    targetDate: '2026-11-24',
    iteration: 'Iteration 1',
    labels: ['kanban', 'ux'],
    estimate: 4
  },
  {
    id: 'GV-104',
    title: 'Design timeline milestone indicators for roadmap view',
    status: 'In Progress',
    priority: 'Medium',
    type: 'issue',
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-22',
    targetDate: '2026-11-29',
    iteration: 'Iteration 2',
    labels: ['design', 'roadmap'],
    estimate: 3
  },
  {
    id: 'GV-105',
    title: 'Support custom field filtering and search queries',
    status: 'Todo',
    priority: 'Medium',
    type: 'issue',
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-26',
    targetDate: '2026-12-03',
    iteration: 'Iteration 2',
    labels: ['filter', 'search'],
    estimate: 2
  },
  {
    id: 'GV-106',
    title: 'Draft: Research Atlassian Jira & Confluence two-way sync',
    status: 'Todo',
    priority: 'Low',
    type: 'draft',
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-28',
    targetDate: '2026-12-05',
    iteration: 'Iteration 2',
    labels: ['research', 'integrations'],
    estimate: 1
  }
];
