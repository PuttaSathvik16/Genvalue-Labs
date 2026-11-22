export type LayoutType = 'table' | 'board' | 'roadmap';

export type ItemStatus = 'Todo' | 'In Progress' | 'In Review' | 'Done';

export type ItemPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type ItemType = 'issue' | 'pull_request' | 'draft';

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
  assignee: Assignee;
  startDate: string; // YYYY-MM-DD
  targetDate: string; // YYYY-MM-DD
  iteration: string;
  labels: string[];
  estimate: number;
}

export interface ViewConfig {
  id: string;
  name: string;
  layout: LayoutType;
  description?: string;
}
