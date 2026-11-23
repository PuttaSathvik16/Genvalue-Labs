import React from 'react';
import { 
  GitPullRequest, 
  CircleDot, 
  FileText, 
  Flag
} from 'lucide-react';
import { ProjectItem } from '../types/project';

interface RoadmapViewProps {
  items: ProjectItem[];
  onEditItem: (item: ProjectItem) => void;
  onOpenNewItemModal: () => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  items,
  onEditItem,
  onOpenNewItemModal
}) => {
  // Timeline bounds: 2026-11-15 to 2026-12-07 (approx 23 days)
  const timelineStart = new Date('2026-11-14');
  const timelineEnd = new Date('2026-12-07');
  const totalDays = Math.round((timelineEnd.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));

  // Current simulated date (2026-11-22)
  const today = new Date('2026-11-22');
  const todayOffsetDays = Math.round((today.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
  const todayPercent = Math.max(0, Math.min(100, (todayOffsetDays / totalDays) * 100));

  // Generate calendar days for timeline header
  const days: Date[] = [];
  for (let i = 0; i <= totalDays; i++) {
    const d = new Date(timelineStart);
    d.setDate(d.getDate() + i);
    days.push(d);
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'pull_request':
        return <GitPullRequest className="w-3.5 h-3.5 text-[#a371f7]" />;
      case 'issue':
        return <CircleDot className="w-3.5 h-3.5 text-[#3fb950]" />;
      case 'draft':
        return <FileText className="w-3.5 h-3.5 text-[#8b949e]" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Done':
        return 'bg-[#238636] border-[#3fb950] text-white';
      case 'In Progress':
        return 'bg-[#1f6feb] border-[#58a6ff] text-white';
      case 'In Review':
        return 'bg-[#8957e5] border-[#a371f7] text-white';
      case 'Todo':
      default:
        return 'bg-[#30363d] border-[#484f58] text-[#c9d1d9]';
    }
  };

  const calculateSpan = (startDateStr: string, targetDateStr: string) => {
    const start = new Date(startDateStr);
    const end = new Date(targetDateStr);

    const startOffset = Math.round((start.getTime() - timelineStart.getTime()) / (1000 * 60 * 60 * 24));
    const duration = Math.max(1, Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));

    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (duration / totalDays) * 100;

    return {
      left: `${Math.max(0, leftPercent)}%`,
      width: `${Math.min(100 - leftPercent, Math.max(4, widthPercent))}%`
    };
  };

  return (
    <div className="flex-1 overflow-auto p-6 bg-[#0d1117]">
      <div className="border border-[#30363d] rounded-lg bg-[#161b22] overflow-hidden shadow-sm">
        {/* Roadmap Toolbar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#30363d] bg-[#161b22]">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-semibold text-[#f0f6fc]">Roadmap (Timeline)</span>
            <span className="text-xs text-[#8b949e]">November - December 2026</span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <div className="flex items-center space-x-1 px-2.5 py-1 bg-[#21262d] border border-[#30363d] rounded text-[#8b949e]">
              <Flag className="w-3 h-3 text-[#f78166]" />
              <span>Today: Nov 22</span>
            </div>
            <button
              onClick={onOpenNewItemModal}
              className="px-2.5 py-1 bg-[#238636] hover:bg-[#2ea043] text-white font-medium rounded transition-colors"
            >
              + Add milestone
            </button>
          </div>
        </div>

        {/* Timeline Grid Table */}
        <div className="relative min-w-[900px] overflow-x-auto">
          {/* Header Row: Days & Dates */}
          <div className="flex border-b border-[#30363d] bg-[#161b22]/90 sticky top-0 z-20">
            {/* Left title column label */}
            <div className="w-72 shrink-0 p-3 text-xs font-semibold text-[#8b949e] border-r border-[#30363d]">
              Work Items & Milestones
            </div>

            {/* Timeline header days */}
            <div className="flex-1 flex relative">
              {days.map((day, idx) => {
                const isToday = day.getDate() === 22 && day.getMonth() === 10;
                return (
                  <div
                    key={idx}
                    className={`flex-1 text-center py-2 text-[10px] border-r border-[#30363d]/40 font-mono ${
                      isToday ? 'bg-[#58a6ff]/10 text-[#58a6ff] font-bold' : 'text-[#8b949e]'
                    }`}
                  >
                    <div>{day.toLocaleDateString('en-US', { weekday: 'narrow' })}</div>
                    <div className="text-[11px]">{day.getDate()}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Items Timeline Body */}
          <div className="relative divide-y divide-[#30363d]/50">
            {/* Today's Vertical Marker Line */}
            <div 
              className="absolute top-0 bottom-0 z-10 pointer-events-none border-l-2 border-dashed border-[#f78166]"
              style={{ left: `calc(288px + (100% - 288px) * ${todayPercent / 100})` }}
            >
              <span className="absolute -top-1.5 -left-3 text-[9px] bg-[#f78166] text-black font-bold px-1 rounded-sm shadow">
                TODAY
              </span>
            </div>

            {items.map(item => {
              const span = calculateSpan(item.startDate, item.targetDate);

              return (
                <div 
                  key={item.id}
                  className="flex items-center h-14 hover:bg-[#21262d]/40 transition-colors group cursor-pointer"
                  onClick={() => onEditItem(item)}
                >
                  {/* Left Metadata Column */}
                  <div className="w-72 shrink-0 px-4 flex items-center space-x-2.5 border-r border-[#30363d] overflow-hidden">
                    {getTypeIcon(item.type)}
                    <div className="truncate">
                      <div className="text-xs font-medium text-[#f0f6fc] group-hover:text-[#58a6ff] transition-colors truncate">
                        {item.title}
                      </div>
                      <div className="text-[11px] text-[#8b949e] font-mono flex items-center space-x-2">
                        <span>{item.id}</span>
                        <span>•</span>
                        <span>{item.iteration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Timeline Bar Area */}
                  <div className="flex-1 relative h-full flex items-center px-2">
                    {/* Gantt Bar */}
                    <div
                      className={`absolute h-7 rounded-md border flex items-center px-2.5 shadow-sm transition-all group-hover:brightness-110 ${getStatusColor(
                        item.status
                      )}`}
                      style={{
                        left: span.left,
                        width: span.width
                      }}
                      title={`${item.title} (${item.startDate} to ${item.targetDate})`}
                    >
                      <span className="text-xs font-medium truncate select-none">
                        {item.title}
                      </span>
                      <span className="ml-auto text-[10px] opacity-80 pl-2 shrink-0 select-none">
                        {item.status}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-[#8b949e] px-1">
        <span>Timeline spans 3 active iterations</span>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded bg-[#238636]" />
            <span>Done</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded bg-[#1f6feb]" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded bg-[#8957e5]" />
            <span>In Review</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-3 h-3 rounded bg-[#30363d]" />
            <span>Todo</span>
          </div>
        </div>
      </div>
    </div>
  );
};
