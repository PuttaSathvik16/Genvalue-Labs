import React, { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);

  const activeView = views.find(v => v.id === activeViewId) || views[0];

  // Change layout of current view
  const handleUpdateViewLayout = (viewId: string, newLayout: LayoutType) => {
    setViews(prev =>
      prev.map(v => (v.id === viewId ? { ...v, layout: newLayout, name: `${newLayout.charAt(0).toUpperCase() + newLayout.slice(1)}` } : v))
    );
  };

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

  // Filter items by search query & status pill
  const filteredItems = items.filter(item => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.epic && item.epic.toLowerCase().includes(searchQuery.toLowerCase())) ||
      item.assignee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.labels.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus =
      selectedStatusFilter === 'All' || item.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden select-text">
      {/* Header with breadcrumbs, tabs, search, and layout switcher */}
      <ProjectHeader
        views={views}
        activeViewId={activeViewId}
        onSelectView={setActiveViewId}
        onUpdateViewLayout={handleUpdateViewLayout}
        onAddNewView={handleAddNewView}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedStatusFilter={selectedStatusFilter}
        onStatusFilterChange={setSelectedStatusFilter}
        onOpenNewItemModal={() => {
          setEditingItem(null);
          setIsModalOpen(true);
        }}
      />

      {/* Agile Sprint Velocity & Story Points Tracker */}
      <SprintVelocityWidget items={items} />

      {/* Main View Area rendering the active layout */}
      <main className="flex-1 overflow-hidden flex flex-col">
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingItem(null);
        }}
        onSave={handleSaveItem}
        initialItem={editingItem}
      />
    </div>
  );
};
