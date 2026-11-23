export type LayoutType = 'table' | 'board' | 'roadmap';

export type ItemStatus = 'Icebox' | 'Backlog' | 'In Progress' | 'In Review' | 'Done';

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
  epic?: string;
  assignee: Assignee;
  startDate: string; // YYYY-MM-DD
  targetDate: string; // YYYY-MM-DD
  iteration: string;
  labels: string[];
  estimate: number; // Story Points (1, 2, 3, 5, 8, 13)
}

export interface ViewConfig {
  id: string;
  name: string;
  layout: LayoutType;
  description?: string;
}
