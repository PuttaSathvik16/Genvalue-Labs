export type LayoutType = 'table' | 'board' | 'roadmap';

export type ItemStatus = 
  | 'New Issues' 
  | 'Icebox' 
  | 'Product Backlog' 
  | 'Backlog' 
  | 'Ready for Dev' 
  | 'In Progress' 
  | 'In Review' 
  | 'Done';

export type ItemPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ItemType = 'issue' | 'pull_request' | 'draft' | 'epic';

export interface Assignee {
  name: string;
  avatar: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  status: ItemStatus;
  priority: ItemPriority;
  type: ItemType;
  repo?: string; // e.g. "genvaluelabs-a11y/Genvalue-Labs"
  epic?: string;
  assignee: Assignee;
  startDate: string; // YYYY-MM-DD
  targetDate: string; // YYYY-MM-DD
  iteration: string; // e.g. "Sprint 1 (Demo & Foundation)"
  labels: string[];
  estimate: number; // Story Points (1, 2, 3, 5, 8, 13)
  linkedPr?: string;
  blocked?: boolean;
}

export interface ViewConfig {
  id: string;
  name: string;
  layout: LayoutType;
  description?: string;
}

export interface PipelineConfig {
  status: ItemStatus;
  title: string;
  color: string;
  border: string;
  badgeBg: string;
  wipLimit?: number;
  desc: string;
}
