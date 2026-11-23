import React, { useState } from 'react';
import { 
  GitPullRequest, 
  CircleDot, 
  FileText, 
  Plus, 
  ChevronRight, 
  ChevronLeft,
  Zap,
  AlertTriangle,
  FolderGit2,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ProjectItem, ItemStatus, PipelineConfig } from '../types/project';

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
  // Collapsible Icebox toggle (signature ZenHub feature)
  const [isIceboxCollapsed, setIsIceboxCollapsed] = useState(false);

  // 7 ZenHub / GV Agile Pipelines with WIP limits
  const pipelines: PipelineConfig[] = [
    { 
      status: 'New Issues', 
      title: 'New Issues', 
      color: 'text-[#8b949e]', 
      border: 'border-[#30363d]', 
      badgeBg: 'bg-[#30363d]', 
      desc: 'Triage & incoming items' 
    },
    { 
      status: 'Icebox', 
      title: 'Icebox', 
      color: 'text-[#8b949e]', 
      border: 'border-[#30363d]', 
      badgeBg: 'bg-[#30363d]', 
      desc: 'Deferred backlog items' 
    },
    { 
      status: 'Product Backlog', 
      title: 'Product Backlog', 
      color: 'text-[#58a6ff]', 
      border: 'border-[#1f6feb]', 
      badgeBg: 'bg-[#1f6feb]', 
      desc: 'Prioritized sprint backlog' 
    },
    { 
      status: 'Ready for Dev', 
      title: 'Ready for Dev', 
      color: 'text-[#d29922]', 
      border: 'border-[#d29922]', 
      badgeBg: 'bg-[#d29922]', 
      wipLimit: 4, 
      desc: 'Refined & estimated' 
    },
    { 
      status: 'In Progress', 
      title: 'In Progress', 
      color: 'text-[#f0883e]', 
      border: 'border-[#bd561d]', 
      badgeBg: 'bg-[#bd561d]', 
      wipLimit: 4, 
      desc: 'Active sprint development' 
    },
    { 
      status: 'In Review', 
      title: 'In Review / QA', 
      color: 'text-[#a371f7]', 
      border: 'border-[#8957e5]', 
      badgeBg: 'bg-[#8957e5]', 
      wipLimit: 3, 
      desc: 'PR review & QA verification' 
    },
    { 
      status: 'Done', 
      title: 'Done', 
      color: 'text-[#3fb950]', 
      border: 'border-[#238636]', 
      badgeBg: 'bg-[#238636]', 
      desc: 'Completed & verified' 
    }
  ];

  const pipelineOrder: ItemStatus[] = [
    'New Issues',
    'Icebox',
    'Product Backlog',
    'Ready for Dev',
    'In Progress',
    'In Review',
    'Done'
  ];

  const getNextStatus = (current: ItemStatus): ItemStatus | null => {
    // If Backlog, map to Product Backlog
    const normalized = current === 'Backlog' ? 'Product Backlog' : current;
    const idx = pipelineOrder.indexOf(normalized);
    return idx < pipelineOrder.length - 1 ? pipelineOrder[idx + 1] : null;
  };

  const getPrevStatus = (current: ItemStatus): ItemStatus | null => {
    const normalized = current === 'Backlog' ? 'Product Backlog' : current;
    const idx = pipelineOrder.indexOf(normalized);
    return idx > 0 ? pipelineOrder[idx - 1] : null;
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pull_request':
        return <GitPullRequest className="w-3.5 h-3.5 text-[#a371f7]" />;
      case 'issue':
        return <CircleDot className="w-3.5 h-3.5 text-[#3fb950]" />;
      case 'draft':
        return <FileText className="w-3.5 h-3.5 text-[#8b949e]" />;
      default:
        return <CircleDot className="w-3.5 h-3.5 text-[#8b949e]" />;
    }
  };

  const getEstimateBadgeColor = (estimate: number) => {
    if (estimate <= 2) return 'bg-[#238636] text-white';
    if (estimate <= 5) return 'bg-[#1f6feb] text-white';
    if (estimate <= 8) return 'bg-[#8957e5] text-white';
    return 'bg-[#d29922] text-white';
  };

  return (
    <div className="flex-1 overflow-x-auto p-4 bg-[#0d1117] select-text">
      <div className="flex space-x-3.5 min-w-[1550px] h-full items-start">
        {pipelines.map(col => {
          // Normalize items matching this status
          const columnItems = items.filter(item => {
            if (col.status === 'Product Backlog') {
              return item.status === 'Product Backlog' || item.status === 'Backlog';
            }
            return item.status === col.status;
          });

          const columnPoints = columnItems.reduce((sum, item) => sum + (item.estimate || 0), 0);
          const isLimitExceeded = Boolean(col.wipLimit && columnItems.length > col.wipLimit);

          // Render Collapsed Icebox
          if (col.status === 'Icebox' && isIceboxCollapsed) {
            return (
              <div
                key={col.status}
                onClick={() => setIsIceboxCollapsed(false)}
                className="w-12 bg-[#161b22] hover:bg-[#21262d] border border-[#30363d] rounded-lg py-4 flex flex-col items-center justify-between cursor-pointer transition-colors shrink-0 shadow-sm h-[calc(100vh-220px)]"
                title="Expand Icebox pipeline"
              >
                <Maximize2 className="w-4 h-4 text-[#8b949e]" />
                <div className="rotate-90 whitespace-nowrap text-xs font-semibold text-[#8b949e] tracking-wider uppercase flex items-center space-x-2">
                  <span>Icebox</span>
                  <span className="font-mono text-[10px] text-[#58a6ff]">({columnItems.length})</span>
                </div>
                <span className="text-[10px] text-[#8b949e] font-mono">{columnPoints}p</span>
              </div>
            );
          }

          return (
            <div
              key={col.status}
              className={`w-72 bg-[#161b22] border rounded-lg flex flex-col max-h-[calc(100vh-220px)] shadow-sm shrink-0 transition-colors ${
                isLimitExceeded ? 'border-[#f85149]/60' : 'border-[#30363d]'
              }`}
            >
              {/* Column Header */}
              <div className="px-3.5 py-2.5 border-b border-[#30363d] bg-[#161b22]">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-1.5 overflow-hidden">
                    <span className={`font-semibold text-xs tracking-tight ${col.color} truncate`}>
                      {col.title}
                    </span>
                    {col.status === 'Icebox' && (
                      <button
                        onClick={() => setIsIceboxCollapsed(true)}
                        className="text-[#8b949e] hover:text-[#c9d1d9] p-0.5"
                        title="Collapse Icebox"
                      >
                        <Minimize2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>

                  <button
                    onClick={onOpenNewItemModal}
                    className="p-1 text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded transition-colors"
                    title={`Add issue to ${col.title}`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Subtitle: WIP Limit & Issue / Points Counts (ZenHub exact style) */}
                <div className="flex items-center justify-between text-[11px] text-[#8b949e]">
                  <span>
                    {col.wipLimit ? `Limit: ${col.wipLimit} issues` : 'No limit'}
                  </span>
                  <span className="font-mono font-medium text-[#c9d1d9]">
                    {columnItems.length} Issues / {columnPoints} Points
                  </span>
                </div>

                {/* WIP Limit Exceeded Warning Banner */}
                {isLimitExceeded && (
                  <div className="mt-2 flex items-center space-x-1 bg-[#f85149]/15 border border-[#f85149]/30 rounded px-2 py-0.5 text-[10px] text-[#f85149] font-medium animate-pulse">
                    <AlertTriangle className="w-3 h-3" />
                    <span>WIP Limit Exceeded ({columnItems.length}/{col.wipLimit})</span>
                  </div>
                )}
              </div>

              {/* Cards List */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-2.5">
                {columnItems.length === 0 ? (
                  <div className="border border-dashed border-[#30363d] rounded-lg p-6 text-center text-xs text-[#8b949e]">
                    Empty pipeline
                  </div>
                ) : (
                  columnItems.map(item => {
                    const prev = getPrevStatus(item.status);
                    const next = getNextStatus(item.status);

                    return (
                      <div
                        key={item.id}
                        onClick={() => onEditItem(item)}
                        className="bg-[#21262d] hover:bg-[#282e37] border border-[#30363d] rounded-md p-3 shadow-sm transition-all cursor-pointer group hover:border-[#58a6ff]/50 relative"
                      >
                        {/* 1. Header: Repo Name + Issue Number + Type Icon */}
                        <div className="flex items-center justify-between text-xs text-[#8b949e] mb-1.5">
                          <div className="flex items-center space-x-1.5 truncate max-w-[180px]">
                            {getTypeIcon(item.type)}
                            <FolderGit2 className="w-3 h-3 text-[#8b949e]" />
                            <span className="text-[11px] font-mono text-[#8b949e] truncate">
                              {item.repo ? item.repo.split('/')[1] : 'Genvalue-Labs'} #{item.id.replace('GV-', '')}
                            </span>
                          </div>

                          {/* Assignee Avatar */}
                          <img
                            src={item.assignee.avatar}
                            alt={item.assignee.name}
                            className="w-5 h-5 rounded-full border border-[#30363d]"
                            title={item.assignee.name}
                          />
                        </div>

                        {/* 2. Issue Title */}
                        <h4 className="text-xs font-semibold text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors line-clamp-2 mb-2 leading-relaxed">
                          {item.title}
                        </h4>

                        {/* 3. Epic Banner Badge (ZenHub style) */}
                        {item.epic && (
                          <div className="flex items-center space-x-1 text-[10px] text-[#a371f7] bg-[#a371f7]/10 px-2 py-0.5 rounded border border-[#a371f7]/20 mb-2 font-medium w-fit max-w-full truncate">
                            <Zap className="w-3 h-3 shrink-0" />
                            <span className="truncate">{item.epic}</span>
                          </div>
                        )}

                        {/* 4. Sprint Pill (ZenHub style: ⚡ Sprint 1) */}
                        {item.iteration && (
                          <div className="flex items-center space-x-1 text-[10px] text-[#58a6ff] bg-[#58a6ff]/10 px-2 py-0.5 rounded border border-[#58a6ff]/20 mb-2 font-medium w-fit">
                            <span>⚡</span>
                            <span>{item.iteration.split(' ')[0]} {item.iteration.split(' ')[1]}</span>
                          </div>
                        )}

                        {/* 5. Labels */}
                        {item.labels.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2.5">
                            {item.labels.map(label => (
                              <span
                                key={label}
                                className="text-[10px] px-1.5 py-0.2 bg-[#161b22] text-[#8b949e] rounded border border-[#30363d]"
                              >
                                {label}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* 6. Card Footer: Circular Estimate Badge + Quick Navigation Chevrons */}
                        <div className="flex items-center justify-between border-t border-[#30363d]/80 pt-2 text-xs">
                          {/* Circular Fibonacci Story Points Badge (ZenHub style) */}
                          <div className="flex items-center space-x-1.5">
                            <span
                              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono shadow-sm ${getEstimateBadgeColor(
                                item.estimate
                              )}`}
                              title={`${item.estimate} Story Points`}
                            >
                              {item.estimate}
                            </span>
                            <span className="text-[10px] text-[#8b949e]">{item.priority}</span>
                          </div>

                          {/* Quick Column Shift Buttons */}
                          <div className="flex items-center space-x-1" onClick={e => e.stopPropagation()}>
                            {prev && (
                              <button
                                onClick={() => onUpdateStatus(item.id, prev)}
                                title={`Move to ${prev}`}
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

              {/* Add issue footer */}
              <div
                onClick={onOpenNewItemModal}
                className="p-2 border-t border-[#30363d] text-center text-xs text-[#8b949e] hover:text-[#58a6ff] hover:bg-[#21262d] transition-colors cursor-pointer rounded-b-lg flex items-center justify-center space-x-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add issue</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
