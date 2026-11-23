import type { ProjectItem, ViewConfig } from '../types/project.ts';

export const initialViews: ViewConfig[] = [
  {
    id: 'view-1',
    name: 'GV Agile Board',
    layout: 'board',
    description: 'ZenHub-style Agile pipelines: New Issues, Icebox, Backlog, Ready, In Progress, Review, Done'
  },
  {
    id: 'view-2',
    name: 'Table Backlog',
    layout: 'table',
    description: 'High-density spreadsheet of user stories, issues, and PRs'
  },
  {
    id: 'view-3',
    name: 'Roadmap Timeline',
    layout: 'roadmap',
    description: 'Timeline view across iterations and milestone dates'
  }
];

export const initialItems: ProjectItem[] = [
  {
    id: 'GV-1',
    title: '[Jira] Create and Track Documentation Tasks Through Jira',
    status: 'Product Backlog',
    priority: 'Medium',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Integrations & Documentation',
    assignee: {
      name: 'Vishnu',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-20',
    targetDate: '2026-11-26',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['documentation', 'Jira'],
    estimate: 3
  },
  {
    id: 'GV-2',
    title: 'Reconstruct GenValue Website – Complete UI/UX Redesign, Brand Refresh & Product Repositioning',
    status: 'In Progress',
    priority: 'Urgent',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Core Platform & Infrastructure',
    assignee: {
      name: 'Sujith Putta',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-22',
    targetDate: '2026-12-08',
    iteration: 'Sprint 2 (Platform & Redesign)',
    labels: ['ui/ux', 'redesign', 'branding'],
    estimate: 8
  },
  {
    id: 'GV-3',
    title: 'Prepare Demo Presentation and Supporting Documentation',
    status: 'In Progress',
    priority: 'High',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Open-Source Initiative',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-22',
    targetDate: '2026-11-30',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['presentation', 'documentation'],
    estimate: 5
  },
  {
    id: 'GV-4',
    title: 'feat: implement project planning multi-view layouts (Table, Board, Roadmap)',
    status: 'Done',
    priority: 'High',
    type: 'pull_request',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-18',
    targetDate: '2026-11-22',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['accessibility', 'documentation', 'Jira'],
    estimate: 5,
    linkedPr: '#4'
  },
  {
    id: 'GV-5',
    title: 'feat(agile): automated project syncing, issue templates, and velocity tracking',
    status: 'Done',
    priority: 'High',
    type: 'pull_request',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-21',
    targetDate: '2026-11-22',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['ci/cd', 'automation', 'agile'],
    estimate: 5,
    linkedPr: '#5'
  },
  {
    id: 'GV-6',
    title: 'Test: Verify automated addition to Project 2',
    status: 'Done',
    priority: 'High',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-22',
    targetDate: '2026-11-22',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['accessibility', 'high-priority'],
    estimate: 1
  },
  {
    id: 'GV-7',
    title: 'Record Audio Narration for GenValue Demo Presentation',
    status: 'Done',
    priority: 'Urgent',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Open-Source Initiative',
    assignee: {
      name: 'Sandhya',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-16',
    targetDate: '2026-11-20',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['presentation', 'high-priority'],
    estimate: 3
  },
  {
    id: 'GV-8',
    title: 'Add multi-repo synchronization for GV Agile workspace',
    status: 'Ready for Dev',
    priority: 'Medium',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-23',
    targetDate: '2026-11-28',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['feature', 'agile', 'workspace'],
    estimate: 5
  },
  {
    id: 'GV-9',
    title: 'Automated burndown chart and sprint report export in GV Agile',
    status: 'New Issues',
    priority: 'Medium',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Elena Rostova',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-24',
    targetDate: '2026-12-01',
    iteration: 'Sprint 2 (Platform & Redesign)',
    labels: ['reporting', 'charts'],
    estimate: 3
  },
  {
    id: 'GV-10',
    title: 'Cross-repository release planner and automated tag publisher',
    status: 'Icebox',
    priority: 'Low',
    type: 'issue',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Agile Project Platform',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-12-01',
    targetDate: '2026-12-15',
    iteration: 'Sprint 3 (Integrations & Scale)',
    labels: ['releases', 'planning'],
    estimate: 8
  },
  {
    id: 'GV-11',
    title: 'Add automated code coverage and accessibility lint check in CI',
    status: 'In Review',
    priority: 'High',
    type: 'pull_request',
    repo: 'genvaluelabs-a11y/Genvalue-Labs',
    epic: 'Core Platform & Infrastructure',
    assignee: {
      name: 'Sathvik Putta',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
    },
    startDate: '2026-11-21',
    targetDate: '2026-11-24',
    iteration: 'Sprint 1 (Demo & Foundation)',
    labels: ['ci/cd', 'accessibility'],
    estimate: 3,
    linkedPr: '#8'
  }
];
