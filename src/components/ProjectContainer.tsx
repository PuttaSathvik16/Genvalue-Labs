import React, { useState, useMemo } from 'react';
import { ProjectHeader } from './ProjectHeader';
import { TableView } from './TableView';
import { BoardView } from './BoardView';
import { RoadmapView } from './RoadmapView';
import { ItemModal } from './ItemModal';
import { SprintVelocityWidget } from './SprintVelocityWidget';
import { ProjectItem, ViewConfig, LayoutType, ItemStatus } from '../types/project';
import { initialViews, initialItems } from '../data/mockData';

export const ProjectContainer: React.FC = () => {
  const [views, setViews] = useState<ViewConfig[]>(initialViews);
  const [activeViewId, setActiveViewId] = useState<string>('view-1');
  const [items, setItems] = useState<ProjectItem[]>(initialItems);

  // Multi-Filter State (ZenHub / GV Agile style)
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedLabelFilter, setSelectedLabelFilter] = useState<string>('All');
  const [selectedSprintFilter, setSelectedSprintFilter] = useState<string>('All');
  const [selectedAssigneeFilter, setSelectedAssigneeFilter] = useState<string>('All');
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<string>('All');
  const [selectedEstimateFilter, setSelectedEstimateFilter] = useState<number | 'All'>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

  const activeView = views.find(v => v.id === activeViewId) || views[0];

  // Derive unique filter options
  const availableLabels = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => i.labels.forEach(l => set.add(l)));
    return Array.from(set).sort();
  }, [items]);

  const availableSprints = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => {
      if (i.iteration) set.add(i.iteration);
    });
    return Array.from(set).sort();
  }, [items]);

  const availableAssignees = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => set.add(i.assignee.name));
    return Array.from(set).sort();
  }, [items]);

  const availableEpics = useMemo(() => {
    const set = new Set<string>();
    items.forEach(i => {
      if (i.epic) set.add(i.epic);
    });
    return Array.from(set).sort();
  }, [items]);

  // Add a new view tab with designated layout
  const handleAddNewView = (layout: LayoutType) => {
    const newId = `view-${Date.now()}`;
    const name = `${layout.charAt(0).toUpperCase() + layout.slice(1)} ${views.length + 1}`;
    const newView: ViewConfig = {
      id: newId,
      name,
      layout,
      description: `Custom ${layout} view`
    };
    setViews(prev => [...prev, newView]);
    setActiveViewId(newId);
  };

  // Quick update item status
  const handleUpdateStatus = (id: string, newStatus: ItemStatus) => {
    setItems(prev =>
      prev.map(item => (item.id === id ? { ...item, status: newStatus } : item))
    );
  };

  // Save or edit item
  const handleSaveItem = (savedItem: ProjectItem) => {
    setItems(prev => {
      const exists = prev.some(i => i.id === savedItem.id);
      if (exists) {
        return prev.map(i => (i.id === savedItem.id ? savedItem : i));
      }
      return [savedItem, ...prev];
    });
  };

  // Filter items across all multi-filters
  const filteredItems = useMemo(() => {
    return items.filter(item => {
      // 1. Text Search
      const matchesSearch =
        searchQuery.trim() === '' ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.epic && item.epic.toLowerCase().includes(searchQuery.toLowerCase())) ||
        item.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.labels.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

      // 2. Label Filter
      const matchesLabel =
        selectedLabelFilter === 'All' || item.labels.includes(selectedLabelFilter);

      // 3. Sprint Filter
      const matchesSprint =
        selectedSprintFilter === 'All' || item.iteration === selectedSprintFilter;

      // 4. Assignee Filter
      const matchesAssignee =
        selectedAssigneeFilter === 'All' || item.assignee.name === selectedAssigneeFilter;

      // 5. Epic Filter
      const matchesEpic =
        selectedEpicFilter === 'All' || item.epic === selectedEpicFilter;

      // 6. Estimate Filter
      const matchesEstimate =
        selectedEstimateFilter === 'All' || item.estimate === selectedEstimateFilter;

      return (
        matchesSearch &&
        matchesLabel &&
        matchesSprint &&
        matchesAssignee &&
        matchesEpic &&
        matchesEstimate
      );
    });
  }, [
    items,
    searchQuery,
    selectedLabelFilter,
    selectedSprintFilter,
    selectedAssigneeFilter,
    selectedEpicFilter,
    selectedEstimateFilter
  ]);

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden select-text">
      {/* GV Agile Header with repository breadcrumbs, tabs, and multi-filter bar */}
      <ProjectHeader
        views={views}
        activeViewId={activeViewId}
        onSelectView={setActiveViewId}
        onAddNewView={handleAddNewView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedLabelFilter={selectedLabelFilter}
        onLabelFilterChange={setSelectedLabelFilter}
        selectedSprintFilter={selectedSprintFilter}
        onSprintFilterChange={setSelectedSprintFilter}
        selectedAssigneeFilter={selectedAssigneeFilter}
        onAssigneeFilterChange={setSelectedAssigneeFilter}
        selectedEpicFilter={selectedEpicFilter}
        onEpicFilterChange={setSelectedEpicFilter}
        selectedEstimateFilter={selectedEstimateFilter}
        onEstimateFilterChange={setSelectedEstimateFilter}
        availableLabels={availableLabels}
        availableSprints={availableSprints}
        availableAssignees={availableAssignees}
        availableEpics={availableEpics}
        onOpenNewItemModal={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
      />

      {/* Agile Sprint Velocity & Story Points Tracker */}
      <SprintVelocityWidget items={filteredItems} />

      {/* Main View Area rendering the active layout */}
      <main className="flex-1 overflow-hidden flex flex-col">
        {activeView.layout === 'board' && (
          <BoardView
            items={filteredItems}
            onUpdateStatus={handleUpdateStatus}
            onOpenNewItemModal={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            onEditItem={item => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
          />
        )}

        {activeView.layout === 'table' && (
          <TableView
            items={filteredItems}
            onUpdateStatus={handleUpdateStatus}
            onOpenNewItemModal={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            onEditItem={item => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
          />
        )}

        {activeView.layout === 'roadmap' && (
          <RoadmapView
            items={filteredItems}
            onOpenNewItemModal={() => {
              setEditingItem(null);
              setIsModalOpen(true);
            }}
            onEditItem={item => {
              setEditingItem(item);
              setIsModalOpen(true);
            }}
          />
        )}
      </main>

      {/* Item Modal (Create & Edit) */}
      <ItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveItem}
        initialItem={editingItem}
      />
    </div>
  );
};
