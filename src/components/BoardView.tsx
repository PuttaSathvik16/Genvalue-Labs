import React from 'react';
import { 
  GitPullRequest, 
  CircleDot, 
  FileText, 
  Plus, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import { ProjectItem, ItemStatus } from '../types/project';

interface BoardViewProps {
  items: ProjectItem[];
  onUpdateStatus: (id: string, status: ItemStatus) => void;
  onOpenNewItemModal: () => void;
  onEditItem: (item: ProjectItem) => void;
}

export const BoardView: React.FC<BoardViewProps> = ({
  items,
  onUpdateStatus,
  onOpenNewItemModal,
  onEditItem
}) => {
  const columns: { status: ItemStatus; title: string; color: string; border: string }[] = [
    { status: 'Todo', title: 'Todo', color: 'text-[#8b949e]', border: 'border-[#30363d]' },
    { status: 'In Progress', title: 'In Progress', color: 'text-[#58a6ff]', border: 'border-[#1f6feb]' },
    { status: 'In Review', title: 'In Review', color: 'text-[#a371f7]', border: 'border-[#8957e5]' },
    { status: 'Done', title: 'Done', color: 'text-[#3fb950]', border: 'border-[#238636]' }
  ];

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
    }
  };

  const getNextStatus = (current: ItemStatus): ItemStatus | null => {
    switch (current) {
      case 'Todo': return 'In Progress';
      case 'In Progress': return 'In Review';
      case 'In Review': return 'Done';
      case 'Done': return null;
    }
  };

  const getPrevStatus = (current: ItemStatus): ItemStatus | null => {
    switch (current) {
      case 'Done': return 'In Review';
      case 'In Review': return 'In Progress';
      case 'In Progress': return 'Todo';
      case 'Todo': return null;
    }
  };

  return (
    <div className="flex-1 overflow-x-auto p-6 bg-[#0d1117]">
      <div className="flex space-x-5 min-w-[1000px] h-full items-start">
        {columns.map(col => {
          const columnItems = items.filter(item => item.status === col.status);

          return (
            <div 
              key={col.status}
              className="w-80 bg-[#161b22] border border-[#30363d] rounded-lg flex flex-col max-h-[calc(100vh-220px)] shadow-sm"
            >
              {/* Column Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-[#30363d]">
                <div className="flex items-center space-x-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.border.replace('border-', 'bg-')}`} />
                  <span className={`font-semibold text-sm ${col.color}`}>{col.title}</span>
                  <span className="text-xs text-[#8b949e] bg-[#21262d] px-2 py-0.5 rounded-full font-mono">
                    {columnItems.length}
                  </span>
                </div>
                <button
                  onClick={onOpenNewItemModal}
                  className="p-1 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded transition-colors"
                  title="Add item to column"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto p-3 space-x-0 space-y-3">
                {columnItems.length === 0 ? (
                  <div className="border border-dashed border-[#30363d] rounded-lg p-6 text-center text-xs text-[#8b949e]">
                    No items in {col.title}
                  </div>
                ) : (
                  columnItems.map(item => {
                    const prev = getPrevStatus(item.status);
                    const next = getNextStatus(item.status);

                    return (
                      <div
                        key={item.id}
                        onClick={() => onEditItem(item)}
                        className="bg-[#21262d] hover:bg-[#282e37] border border-[#30363d] rounded-md p-3.5 shadow-sm transition-all cursor-pointer group hover:border-[#58a6ff]/40"
                      >
                        {/* Type & ID Header */}
                        <div className="flex items-center justify-between text-xs text-[#8b949e] mb-1.5">
                          <div className="flex items-center space-x-1.5">
                            {getTypeIcon(item.type)}
                            <span className="font-mono text-[11px] text-[#8b949e]">{item.id}</span>
                          </div>
                          <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${getPriorityBadge(item.priority)}`}>
                            {item.priority}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-sm font-medium text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-2 mb-2.5">
                          {item.title}
                        </h4>

                        {/* Labels */}
                        {item.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-3">
                            {item.labels.map(label => (
                              <span 
                                key={label} 
                                className="text-[10px] px-1.5 py-0.5 bg-[#161b22] text-[#8b949e] rounded border border-[#30363d]"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Card Footer: Assignee & Timeline */}
                        <div className="flex items-center justify-between border-t border-[#30363d] pt-2 text-xs">
                          <div className="flex items-center space-x-2">
                            <img 
                              src={item.assignee.avatar} 
                              alt={item.assignee.name}
                              className="w-5 h-5 rounded-full border border-[#30363d]"
                              title={item.assignee.name}
                            />
                            <span className="text-[11px] text-[#8b949e]">{item.estimate} pts</span>
                          </div>

                          {/* Quick Column Move Actions */}
                          <div className="flex items-center space-x-1" onClick={e => e.stopPropagation()}>
                            {prev && (
                              <button
                                onClick={() => onUpdateStatus(item.id, prev)}
                                title={`Move back to ${prev}`}
                                className="p-1 text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#161b22] rounded transition-colors"
                              >
                                <ChevronLeft className="w-3.5 h-3.5" />
                              </button>
                            )}
                            {next && (
                              <button
                                onClick={() => onUpdateStatus(item.id, next)}
                                title={`Advance to ${next}`}
                                className="p-1 text-[#8b949e] hover:text-[#3fb950] hover:bg-[#161b22] rounded transition-colors"
                              >
                                <ChevronRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Add item bottom footer */}
              <div 
                onClick={onOpenNewItemModal}
                className="p-2.5 border-t border-[#30363d] text-center text-xs text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors cursor-pointer rounded-b-lg flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add card</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
