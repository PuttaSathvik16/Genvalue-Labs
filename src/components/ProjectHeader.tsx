import React, { useState } from 'react';
import { 
  Table as TableIcon, 
  Kanban, 
  Calendar, 
  Plus, 
  Search, 
  ChevronDown, 
  Check, 
  SlidersHorizontal,
  FolderGit2
} from 'lucide-react';
import { ViewConfig, LayoutType } from '../types/project';

interface ProjectHeaderProps {
  views: ViewConfig[];
  activeViewId: string;
  onSelectView: (viewId: string) => void;
  onUpdateViewLayout: (viewId: string, layout: LayoutType) => void;
  onAddNewView: (layout: LayoutType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatusFilter: string;
  onStatusFilterChange: (status: string) => void;
  onOpenNewItemModal: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  views,
  activeViewId,
  onSelectView,
  onUpdateViewLayout,
  onAddNewView,
  searchQuery,
  onSearchChange,
  selectedStatusFilter,
  onStatusFilterChange,
  onOpenNewItemModal
}) => {
  const [layoutDropdownOpen, setLayoutDropdownOpen] = useState(false);
  const [addViewDropdownOpen, setAddViewDropdownOpen] = useState(false);

  const activeView = views.find(v => v.id === activeViewId) || views[0];

  const getLayoutIcon = (layout: LayoutType) => {
    switch (layout) {
      case 'table':
        return <TableIcon className="w-4 h-4" />;
      case 'board':
        return <Kanban className="w-4 h-4" />;
      case 'roadmap':
        return <Calendar className="w-4 h-4" />;
    }
  };

  const layoutOptions: { type: LayoutType; label: string; desc: string }[] = [
    { type: 'table', label: 'Table', desc: 'Spreadsheet of items with rich fields' },
    { type: 'board', label: 'Board', desc: 'Kanban columns grouped by status' },
    { type: 'roadmap', label: 'Roadmap', desc: 'Timeline across iterations and dates' }
  ];

  return (
    <div className="border-b border-[#30363d] bg-[#161b22] px-6 pt-5 pb-0">
      {/* Breadcrumb & Project Title */}
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-[#21262d] rounded-md text-[#58a6ff]">
            <FolderGit2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center text-xs text-[#8b949e] space-x-1">
              <span>genvaluelabs-a11y</span>
              <span>/</span>
              <span>Genvalue-Labs</span>
              <span>/</span>
              <span>Projects</span>
            </div>
            <h1 className="text-xl font-semibold text-[#f0f6fc] tracking-tight">
              Genvalue Roadmap & Tracking
            </h1>
          </div>
        </div>

        {/* Global Action: New Item */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenNewItemModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-sm font-medium text-white bg-[#238636] hover:bg-[#2ea043] rounded-md shadow-sm transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New item</span>
          </button>
        </div>
      </div>

      {/* Views Navigation Tabs */}
      <div className="flex items-center justify-between border-t border-[#30363d] pt-2">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
          {views.map(view => {
            const isActive = view.id === activeViewId;
            return (
              <button
                key={view.id}
                onClick={() => onSelectView(view.id)}
                className={`flex items-center space-x-2 px-3 py-2 text-sm font-medium border-b-2 rounded-t transition-all ${
                  isActive
                    ? 'border-[#f78166] text-[#f0f6fc] bg-[#21262d]'
                    : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]/50'
                }`}
              >
                {getLayoutIcon(view.layout)}
                <span>{view.name}</span>
              </button>
            );
          })}

          {/* Add View Dropdown */}
          <div className="relative">
            <button
              onClick={() => setAddViewDropdownOpen(!addViewDropdownOpen)}
              className="flex items-center space-x-1 px-2.5 py-1.5 text-xs text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded transition-colors"
              title="Add a new view"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New view</span>
            </button>

            {addViewDropdownOpen && (
              <div 
                className="absolute left-0 mt-1 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl py-1 z-30"
                onMouseLeave={() => setAddViewDropdownOpen(false)}
              >
                <div className="px-3 py-1 text-xs font-semibold text-[#8b949e] uppercase tracking-wider">
                  Select Layout
                </div>
                {layoutOptions.map(opt => (
                  <button
                    key={opt.type}
                    onClick={() => {
                      onAddNewView(opt.type);
                      setAddViewDropdownOpen(false);
                    }}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left text-xs text-[#c9d1d9] hover:bg-[#21262d] transition-colors"
                  >
                    {getLayoutIcon(opt.type)}
                    <span>{opt.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Change Layout of Active View Button & Dropdown */}
        <div className="relative pb-2">
          <button
            onClick={() => setLayoutDropdownOpen(!layoutDropdownOpen)}
            className="flex items-center space-x-1.5 px-2.5 py-1 text-xs font-medium bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-md transition-colors shadow-sm"
          >
            {getLayoutIcon(activeView.layout)}
            <span className="capitalize font-semibold">{activeView.layout} layout</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
          </button>

          {layoutDropdownOpen && (
            <div 
              className="absolute right-0 mt-1.5 w-60 bg-[#161b22] border border-[#30363d] rounded-md shadow-2xl py-1.5 z-40"
              onMouseLeave={() => setLayoutDropdownOpen(false)}
            >
              <div className="px-3 py-1 text-xs font-semibold text-[#8b949e] border-b border-[#30363d] pb-1.5 mb-1">
                Layout
              </div>
              {layoutOptions.map(opt => {
                const isSelected = activeView.layout === opt.type;
                return (
                  <button
                    key={opt.type}
                    onClick={() => {
                      onUpdateViewLayout(activeView.id, opt.type);
                      setLayoutDropdownOpen(false);
                    }}
                    className={`w-full flex items-start justify-between px-3 py-2 text-left text-xs transition-colors ${
                      isSelected ? 'bg-[#21262d] text-[#58a6ff]' : 'text-[#c9d1d9] hover:bg-[#21262d]'
                    }`}
                  >
                    <div className="flex items-start space-x-2.5">
                      <div className="mt-0.5">{getLayoutIcon(opt.type)}</div>
                      <div>
                        <div className="font-medium text-sm">{opt.label}</div>
                        <div className="text-[11px] text-[#8b949e] leading-snug">{opt.desc}</div>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#58a6ff] ml-2 shrink-0" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex items-center justify-between py-3 border-t border-[#30363d]">
        <div className="flex items-center space-x-3 w-full max-w-lg">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#8b949e] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter by title, assignee, or label..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md pl-9 pr-3 py-1 text-xs text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Quick status filter */}
          <div className="flex items-center space-x-1 shrink-0">
            {['All', 'Todo', 'In Progress', 'In Review', 'Done'].map(status => (
              <button
                key={status}
                onClick={() => onStatusFilterChange(status)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-colors ${
                  selectedStatusFilter === status
                    ? 'bg-[#21262d] border-[#58a6ff] text-[#58a6ff] font-medium'
                    : 'border-transparent text-[#8b949e] hover:text-[#c9d1d9]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center text-xs text-[#8b949e] space-x-1">
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>GitHub Projects View Switcher Active</span>
        </div>
      </div>
    </div>
  );
};
