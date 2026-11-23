import React, { useState } from 'react';
import { 
  Table as TableIcon, 
  Kanban, 
  Calendar, 
  Plus, 
  Search, 
  ChevronDown, 
  Code2,
  CircleDot,
  GitPullRequest,
  Zap,
  PlayCircle,
  FolderGit2,
  BookOpen,
  Shield,
  BarChart3,
  X
} from 'lucide-react';
import { ViewConfig, LayoutType } from '../types/project';

interface ProjectHeaderProps {
  views: ViewConfig[];
  activeViewId: string;
  onSelectView: (viewId: string) => void;
  onAddNewView: (layout: LayoutType) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedLabelFilter: string;
  onLabelFilterChange: (label: string) => void;
  selectedSprintFilter: string;
  onSprintFilterChange: (sprint: string) => void;
  selectedAssigneeFilter: string;
  onAssigneeFilterChange: (assignee: string) => void;
  selectedEpicFilter: string;
  onEpicFilterChange: (epic: string) => void;
  selectedEstimateFilter: number | 'All';
  onEstimateFilterChange: (estimate: number | 'All') => void;
  availableLabels: string[];
  availableSprints: string[];
  availableAssignees: string[];
  availableEpics: string[];
  onOpenNewItemModal: () => void;
}

export const ProjectHeader: React.FC<ProjectHeaderProps> = ({
  views,
  activeViewId,
  onSelectView,
  onAddNewView,
  searchQuery,
  onSearchChange,
  selectedLabelFilter,
  onLabelFilterChange,
  selectedSprintFilter,
  onSprintFilterChange,
  selectedAssigneeFilter,
  onAssigneeFilterChange,
  selectedEpicFilter,
  onEpicFilterChange,
  selectedEstimateFilter,
  onEstimateFilterChange,
  availableLabels,
  availableSprints,
  availableAssignees,
  availableEpics,
  onOpenNewItemModal
}) => {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (name: string) => {
    setActiveDropdown(prev => (prev === name ? null : name));
  };

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

  const hasActiveFilters = 
    selectedLabelFilter !== 'All' || 
    selectedSprintFilter !== 'All' || 
    selectedAssigneeFilter !== 'All' || 
    selectedEpicFilter !== 'All' || 
    selectedEstimateFilter !== 'All' || 
    searchQuery.trim() !== '';

  const clearAllFilters = () => {
    onLabelFilterChange('All');
    onSprintFilterChange('All');
    onAssigneeFilterChange('All');
    onEpicFilterChange('All');
    onEstimateFilterChange('All');
    onSearchChange('');
  };

  return (
    <div className="bg-[#161b22] border-b border-[#30363d] select-none">
      {/* 1. GitHub-Native Top Repository Navigation Bar */}
      <div className="px-6 pt-3 pb-2 flex items-center justify-between border-b border-[#30363d]/60 text-xs">
        {/* Repo Breadcrumbs */}
        <div className="flex items-center space-x-2">
          <FolderGit2 className="w-4 h-4 text-[#8b949e]" />
          <span className="text-[#58a6ff] hover:underline cursor-pointer font-normal">genvaluelabs-a11y</span>
          <span className="text-[#8b949e]">/</span>
          <span className="text-[#58a6ff] font-semibold hover:underline cursor-pointer">Genvalue-Labs</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-[#30363d] text-[#8b949e] font-medium ml-1">
            Public
          </span>
        </div>

        {/* Status Pill */}
        <div className="flex items-center space-x-2 text-[11px] text-[#8b949e]">
          <span className="flex items-center space-x-1 bg-[#238636]/15 text-[#3fb950] border border-[#238636]/30 px-2 py-0.5 rounded-full font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3fb950] animate-pulse" />
            <span>GV Agile Active</span>
          </span>
        </div>
      </div>

      {/* 2. Repository Tabs (Code, Issues, PRs, GV Agile, Actions, Projects, etc.) */}
      <div className="px-6 flex items-center space-x-1 border-b border-[#30363d] overflow-x-auto scrollbar-none text-xs">
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <Code2 className="w-4 h-4" />
          <span>Code</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <CircleDot className="w-4 h-4" />
          <span>Issues</span>
          <span className="px-1.5 py-0.2 bg-[#30363d] rounded-full text-[10px]">7</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <GitPullRequest className="w-4 h-4" />
          <span>Pull requests</span>
          <span className="px-1.5 py-0.2 bg-[#30363d] rounded-full text-[10px]">2</span>
        </button>
        
        {/* GV Agile Dedicated Tab (Highlighted exactly like ZenHub in screenshot) */}
        <button className="flex items-center space-x-1.5 px-3.5 py-2 font-semibold text-[#f0f6fc] border-b-2 border-[#f78166] bg-[#21262d]/50 transition-colors">
          <Zap className="w-4 h-4 text-[#f78166]" />
          <span>GV Agile</span>
          <span className="px-1.5 py-0.5 bg-[#f78166]/20 text-[#f78166] text-[10px] font-bold rounded">
            PRO
          </span>
        </button>

        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <PlayCircle className="w-4 h-4" />
          <span>Actions</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <TableIcon className="w-4 h-4" />
          <span>Projects</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <BookOpen className="w-4 h-4" />
          <span>Wiki</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <Shield className="w-4 h-4" />
          <span>Security</span>
        </button>
        <button className="flex items-center space-x-1.5 px-3 py-2 text-[#8b949e] hover:text-[#c9d1d9] border-b-2 border-transparent transition-colors">
          <BarChart3 className="w-4 h-4" />
          <span>Insights</span>
        </button>
      </div>

      {/* 3. ZenHub / GV Agile Multi-Filter Toolbar */}
      <div className="px-6 py-2.5 flex items-center justify-between flex-wrap gap-2 text-xs bg-[#161b22]">
        <div className="flex items-center flex-wrap gap-2">
          {/* Views Dropdown */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('views')}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] rounded-md transition-colors"
            >
              {getLayoutIcon(activeView.layout)}
              <span className="font-medium">Views: {activeView.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'views' && (
              <div className="absolute left-0 mt-1 w-52 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1">
                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#8b949e] uppercase tracking-wider">
                  Select Workspace View
                </div>
                {views.map(v => (
                  <button
                    key={v.id}
                    onClick={() => {
                      onSelectView(v.id);
                      setActiveDropdown(null);
                    }}
                    className={`w-full px-3 py-1.5 flex items-center space-x-2 text-left hover:bg-[#21262d] transition-colors ${
                      v.id === activeViewId ? 'text-[#58a6ff] font-semibold bg-[#21262d]/60' : 'text-[#c9d1d9]'
                    }`}
                  >
                    {getLayoutIcon(v.layout)}
                    <span>{v.name}</span>
                  </button>
                ))}
                <div className="border-t border-[#30363d] my-1" />
                <div className="px-3 py-1 text-[11px] font-semibold text-[#8b949e]">Add View</div>
                <button
                  onClick={() => {
                    onAddNewView('board');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d]"
                >
                  + New Kanban Board
                </button>
              </div>
            )}
          </div>

          {/* Repo Filter Pill */}
          <div className="flex items-center px-2.5 py-1.5 bg-[#21262d] text-[#c9d1d9] border border-[#30363d] rounded-md">
            <span className="text-[#8b949e] mr-1">Repo:</span>
            <span className="font-medium text-[#58a6ff]">Genvalue-Labs</span>
            <span className="text-[10px] ml-1 bg-[#30363d] px-1.5 rounded text-[#8b949e]">1/1</span>
          </div>

          {/* Sprint Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('sprint')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border rounded-md transition-colors ${
                selectedSprintFilter !== 'All' ? 'border-[#58a6ff] text-[#58a6ff]' : 'border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              <span>Sprint{selectedSprintFilter !== 'All' ? `: ${selectedSprintFilter}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'sprint' && (
              <div className="absolute left-0 mt-1 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    onSprintFilterChange('All');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                >
                  All Sprints
                </button>
                {availableSprints.map(s => (
                  <button
                    key={s}
                    onClick={() => {
                      onSprintFilterChange(s);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9] flex items-center space-x-2"
                  >
                    <Zap className="w-3.5 h-3.5 text-[#f78166]" />
                    <span>{s}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Epic Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('epic')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border rounded-md transition-colors ${
                selectedEpicFilter !== 'All' ? 'border-[#a371f7] text-[#a371f7]' : 'border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              <span>Epic{selectedEpicFilter !== 'All' ? `: ${selectedEpicFilter}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'epic' && (
              <div className="absolute left-0 mt-1 w-64 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    onEpicFilterChange('All');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                >
                  All Epics
                </button>
                {availableEpics.map(epic => (
                  <button
                    key={epic}
                    onClick={() => {
                      onEpicFilterChange(epic);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                  >
                    {epic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Assignee Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('assignee')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border rounded-md transition-colors ${
                selectedAssigneeFilter !== 'All' ? 'border-[#58a6ff] text-[#58a6ff]' : 'border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              <span>Assignee{selectedAssigneeFilter !== 'All' ? `: ${selectedAssigneeFilter}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'assignee' && (
              <div className="absolute left-0 mt-1 w-52 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    onAssigneeFilterChange('All');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                >
                  All Assignees
                </button>
                {availableAssignees.map(a => (
                  <button
                    key={a}
                    onClick={() => {
                      onAssigneeFilterChange(a);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                  >
                    {a}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Label Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('label')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border rounded-md transition-colors ${
                selectedLabelFilter !== 'All' ? 'border-[#3fb950] text-[#3fb950]' : 'border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              <span>Label{selectedLabelFilter !== 'All' ? `: ${selectedLabelFilter}` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'label' && (
              <div className="absolute left-0 mt-1 w-48 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1 max-h-60 overflow-y-auto">
                <button
                  onClick={() => {
                    onLabelFilterChange('All');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                >
                  All Labels
                </button>
                {availableLabels.map(l => (
                  <button
                    key={l}
                    onClick={() => {
                      onLabelFilterChange(l);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                  >
                    {l}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Estimate Filter */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('estimate')}
              className={`flex items-center space-x-1 px-2.5 py-1.5 bg-[#21262d] hover:bg-[#30363d] border rounded-md transition-colors ${
                selectedEstimateFilter !== 'All' ? 'border-[#d29922] text-[#d29922]' : 'border-[#30363d] text-[#c9d1d9]'
              }`}
            >
              <span>Estimate{selectedEstimateFilter !== 'All' ? `: ${selectedEstimateFilter} pts` : ''}</span>
              <ChevronDown className="w-3.5 h-3.5 text-[#8b949e]" />
            </button>
            {activeDropdown === 'estimate' && (
              <div className="absolute left-0 mt-1 w-44 bg-[#161b22] border border-[#30363d] rounded-md shadow-xl z-50 py-1">
                <button
                  onClick={() => {
                    onEstimateFilterChange('All');
                    setActiveDropdown(null);
                  }}
                  className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9]"
                >
                  All Estimates
                </button>
                {[1, 2, 3, 5, 8, 13].map(pts => (
                  <button
                    key={pts}
                    onClick={() => {
                      onEstimateFilterChange(pts);
                      setActiveDropdown(null);
                    }}
                    className="w-full px-3 py-1.5 text-left hover:bg-[#21262d] text-[#c9d1d9] flex items-center justify-between"
                  >
                    <span>{pts} Story Points</span>
                    <span className="w-5 h-5 rounded-full bg-[#1f6feb] text-white flex items-center justify-center text-[10px] font-bold">
                      {pts}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Filters button */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 px-2 py-1 text-xs text-[#f85149] hover:bg-[#f85149]/10 rounded transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>

        {/* Right side: Search + New GV Issue Button */}
        <div className="flex items-center space-x-3">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-[#8b949e] absolute left-2.5 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              placeholder="Find issues (f+i)"
              className="pl-8 pr-3 py-1.5 bg-[#0d1117] border border-[#30363d] rounded-md text-xs text-[#c9d1d9] placeholder-[#8b949e] focus:outline-none focus:border-[#58a6ff] w-48 transition-all focus:w-64"
            />
          </div>

          {/* ZenHub-style Green Button: + New GV Issue */}
          <button
            onClick={onOpenNewItemModal}
            className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#238636] hover:bg-[#2ea043] rounded-md shadow-sm transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>New GV Issue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
