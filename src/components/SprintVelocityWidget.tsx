import React from 'react';
import { Zap, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { ProjectItem } from '../types/project';

interface SprintVelocityWidgetProps {
  items: ProjectItem[];
}

export const SprintVelocityWidget: React.FC<SprintVelocityWidgetProps> = ({ items }) => {
  const totalPoints = items.reduce((sum, item) => sum + (item.estimate || 0), 0);
  const donePoints = items
    .filter(i => i.status === 'Done')
    .reduce((sum, item) => sum + (item.estimate || 0), 0);
  const inProgressPoints = items
    .filter(i => i.status === 'In Progress' || i.status === 'In Review')
    .reduce((sum, item) => sum + (item.estimate || 0), 0);
  const backlogPoints = items
    .filter(i => i.status === 'Backlog' || i.status === 'Icebox')
    .reduce((sum, item) => sum + (item.estimate || 0), 0);

  const completionPct = totalPoints > 0 ? Math.round((donePoints / totalPoints) * 100) : 0;

  return (
    <div className="bg-[#161b22] border-b border-[#30363d] px-6 py-2.5 flex items-center justify-between text-xs">
      {/* Left: Sprint Info & Velocity Metrics */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-[#d29922]/15 text-[#d29922] rounded">
            <Zap className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="font-semibold text-[#f0f6fc]">Sprint 1 (Active)</span>
            <span className="text-[#8b949e] ml-2 font-mono text-[11px]">4 days remaining</span>
          </div>
        </div>

        <div className="h-4 w-px bg-[#30363d]" />

        {/* Story Point Breakdowns */}
        <div className="flex items-center space-x-4 font-mono text-[11px]">
          <div className="flex items-center space-x-1.5" title="Completed points">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#3fb950]" />
            <span className="text-[#3fb950] font-semibold">{donePoints}</span>
            <span className="text-[#8b949e]">done</span>
          </div>

          <div className="flex items-center space-x-1.5" title="In progress points">
            <Clock className="w-3.5 h-3.5 text-[#58a6ff]" />
            <span className="text-[#58a6ff] font-semibold">{inProgressPoints}</span>
            <span className="text-[#8b949e]">in progress</span>
          </div>

          <div className="flex items-center space-x-1.5" title="Backlog / Icebox points">
            <AlertCircle className="w-3.5 h-3.5 text-[#8b949e]" />
            <span className="text-[#c9d1d9] font-semibold">{backlogPoints}</span>
            <span className="text-[#8b949e]">backlog</span>
          </div>

          <div className="text-[#8b949e]">
            Total: <span className="text-[#f0f6fc] font-bold">{totalPoints} pts</span>
          </div>
        </div>
      </div>

      {/* Right: Visual Sprint Progress Bar */}
      <div className="flex items-center space-x-3 w-64">
        <div className="w-full bg-[#21262d] rounded-full h-2 overflow-hidden flex border border-[#30363d]">
          <div
            className="bg-[#238636] h-full transition-all duration-500"
            style={{ width: `${completionPct}%` }}
            title={`Completed: ${completionPct}%`}
          />
          <div
            className="bg-[#1f6feb] h-full transition-all duration-500"
            style={{
              width: `${totalPoints > 0 ? (inProgressPoints / totalPoints) * 100 : 0}%`
            }}
            title={`In Progress: ${Math.round((inProgressPoints / totalPoints) * 100)}%`}
          />
        </div>
        <span className="text-[11px] font-mono text-[#f0f6fc] font-semibold shrink-0">
          {completionPct}%
        </span>
      </div>
    </div>
  );
};
