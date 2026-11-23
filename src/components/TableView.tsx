import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CircleDot, 
  FileText, 
  ArrowUpDown, 
  Plus, 
  Calendar,
  Sparkles,
  Target
} from 'lucide-react';
import { ProjectItem, ItemStatus } from '../types/project';

interface TableViewProps {
  items: ProjectItem[];
  onUpdateStatus: (id: string, status: ItemStatus) => void;
  onOpenNewItemModal: () => void;
  onEditItem: (item: ProjectItem) => void;
}

export const TableView: React.FC<TableViewProps> = ({
  items,
  onUpdateStatus,
  onOpenNewItemModal,
  onEditItem
}) => {
  const [sortField, setSortField] = useState<keyof ProjectItem>('id');
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  const handleSort = (field: keyof ProjectItem) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const sortedItems = [...items].sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return sortAsc ? aVal - bVal : bVal - aVal;
    }
    return 0;
  });

  const getStatusBadge = (status: ItemStatus) => {
    switch (status) {
      case 'Icebox':
        return 'bg-[#21262d] text-[#8b949e] border-[#30363d]';
      case 'Backlog':
        return 'bg-[#2e261a] text-[#d29922] border-[#9e6a03]';
      case 'In Progress':
        return 'bg-[#1f2d3d] text-[#58a6ff] border-[#1f6feb]';
      case 'In Review':
        return 'bg-[#2e1f3d] text-[#a371f7] border-[#8957e5]';
      case 'Done':
        return 'bg-[#1b342b] text-[#3fb950] border-[#238636]';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return 'text-[#f85149] bg-[#f85149]/10 border-[#f85149]/30';
      case 'High':
        return 'text-[#d29922] bg-[#d29922]/10 border-[#d29922]/30';
      case 'Medium':
        return 'text-[#58a6ff] bg-[#58a6ff]/10 border-[#58a6ff]/30';
      case 'Low':
        return 'text-[#8b949e] bg-[#8b949e]/10 border-[#8b949e]/30';
      default:
        return 'text-[#8b949e]';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pull_request':
        return <GitPullRequest className="w-4 h-4 text-[#a371f7]" />;
      case 'issue':
        return <CircleDot className="w-4 h-4 text-[#3fb950]" />;
      case 'draft':
        return <FileText className="w-4 h-4 text-[#8b949e]" />;
      default:
        return <CircleDot className="w-4 h-4 text-[#8b949e]" />;
    }
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-[#0d1117]">
      <div className="border border-[#30363d] rounded-lg overflow-hidden bg-[#161b22] shadow-sm">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#161b22] border-b border-[#30363d] text-[#8b949e] select-none">
              <th 
                className="py-2.5 px-4 font-semibold cursor-pointer hover:text-[#c9d1d9] transition-colors"
                onClick={() => handleSort('title')}
              >
                <div className="flex items-center space-x-1.5">
                  <span>User Story / Title</span>
                  <ArrowUpDown className="w-3 h-3 text-[#484f58]" />
                </div>
              </th>
              <th className="py-2.5 px-3 font-semibold">Epic</th>
              <th 
                className="py-2.5 px-3 font-semibold cursor-pointer hover:text-[#c9d1d9] transition-colors"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center space-x-1.5">
                  <span>Pipeline</span>
                  <ArrowUpDown className="w-3 h-3 text-[#484f58]" />
                </div>
              </th>
              <th 
                className="py-2.5 px-3 font-semibold cursor-pointer hover:text-[#c9d1d9] transition-colors"
                onClick={() => handleSort('priority')}
              >
                <div className="flex items-center space-x-1.5">
                  <span>Priority</span>
                  <ArrowUpDown className="w-3 h-3 text-[#484f58]" />
                </div>
              </th>
              <th className="py-2.5 px-3 font-semibold">Assignee</th>
              <th className="py-2.5 px-3 font-semibold">Sprint</th>
              <th className="py-2.5 px-3 font-semibold">Timeline</th>
              <th className="py-2.5 px-3 font-semibold">Points</th>
              <th className="py-2.5 px-3 font-semibold">Labels</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#30363d] text-[#c9d1d9]">
            {sortedItems.map(item => (
              <tr 
                key={item.id} 
                className="hover:bg-[#21262d]/70 transition-colors group cursor-pointer"
                onClick={() => onEditItem(item)}
              >
                {/* Title & Type */}
                <td className="py-3 px-4 font-medium">
                  <div className="flex items-center space-x-2.5">
                    <span title={item.type}>{getTypeIcon(item.type)}</span>
                    <span className="text-[#8b949e] font-mono text-[11px]">{item.id}</span>
                    <span className="text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors">
                      {item.title}
                    </span>
                  </div>
                </td>

                {/* Epic */}
                <td className="py-3 px-3">
                  {item.epic ? (
                    <div className="flex items-center space-x-1 text-[11px] text-[#a371f7] bg-[#a371f7]/10 px-2 py-0.5 rounded border border-[#a371f7]/20 w-fit">
                      <Target className="w-3 h-3" />
                      <span>{item.epic}</span>
                    </div>
                  ) : (
                    <span className="text-[#484f58]">—</span>
                  )}
                </td>

                {/* Status Dropdown */}
                <td className="py-3 px-3" onClick={e => e.stopPropagation()}>
                  <select
                    value={item.status}
                    onChange={e => onUpdateStatus(item.id, e.target.value as ItemStatus)}
                    className={`text-[11px] font-medium px-2 py-0.5 rounded-full border bg-transparent focus:outline-none cursor-pointer ${getStatusBadge(
                      item.status
                    )}`}
                  >
                    <option value="Icebox" className="bg-[#161b22] text-[#8b949e]">Icebox</option>
                    <option value="Backlog" className="bg-[#161b22] text-[#d29922]">Backlog</option>
                    <option value="In Progress" className="bg-[#161b22] text-[#58a6ff]">In Progress</option>
                    <option value="In Review" className="bg-[#161b22] text-[#a371f7]">In Review</option>
                    <option value="Done" className="bg-[#161b22] text-[#3fb950]">Done</option>
                  </select>
                </td>

                {/* Priority */}
                <td className="py-3 px-3">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                    {item.priority}
                  </span>
                </td>

                {/* Assignee */}
                <td className="py-3 px-3">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={item.assignee.avatar} 
                      alt={item.assignee.name} 
                      className="w-5 h-5 rounded-full border border-[#30363d]"
                    />
                    <span className="text-xs text-[#c9d1d9]">{item.assignee.name}</span>
                  </div>
                </td>

                {/* Iteration */}
                <td className="py-3 px-3 text-[#8b949e] text-xs font-mono">
                  {item.iteration}
                </td>

                {/* Dates */}
                <td className="py-3 px-3 text-[#8b949e] text-xs">
                  <div className="flex items-center space-x-1.5 font-mono text-[11px]">
                    <Calendar className="w-3.5 h-3.5 text-[#484f58]" />
                    <span>{item.startDate.slice(5)} &rarr; {item.targetDate.slice(5)}</span>
                  </div>
                </td>

                {/* Estimate */}
                <td className="py-3 px-3">
                  <span className="px-2 py-0.5 bg-[#30363d] text-[#f0f6fc] font-bold rounded border border-[#484f58] font-mono text-[11px]">
                    {item.estimate} pts
                  </span>
                </td>

                {/* Labels */}
                <td className="py-3 px-3">
                  <div className="flex flex-wrap gap-1">
                    {item.labels.map(l => (
                      <span key={l} className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#21262d] text-[#8b949e] border border-[#30363d]">
                        {l}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Quick Add Row */}
        <div 
          onClick={onOpenNewItemModal}
          className="flex items-center space-x-2 px-4 py-2.5 text-xs text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors cursor-pointer border-t border-[#30363d]"
        >
          <Plus className="w-4 h-4" />
          <span>Add user story or task to backlog...</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#8b949e] px-1">
        <span>Showing {items.length} items across active backlog</span>
        <div className="flex items-center space-x-1">
          <Sparkles className="w-3.5 h-3.5 text-[#d29922]" />
          <span>Fibonacci story points (1, 2, 3, 5, 8, 13) enabled</span>
        </div>
      </div>
    </div>
  );
};
