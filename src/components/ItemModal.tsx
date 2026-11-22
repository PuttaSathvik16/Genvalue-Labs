import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { ProjectItem, ItemStatus, ItemPriority, ItemType } from '../types/project';

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (item: ProjectItem) => void;
  initialItem?: ProjectItem | null;
}

export const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialItem
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<ItemStatus>('Todo');
  const [priority, setPriority] = useState<ItemPriority>('Medium');
  const [type, setType] = useState<ItemType>('issue');
  const [assigneeName, setAssigneeName] = useState('Sathvik Putta');
  const [startDate, setStartDate] = useState('2026-11-20');
  const [targetDate, setTargetDate] = useState('2026-11-27');
  const [iteration, setIteration] = useState('Iteration 1');
  const [estimate, setEstimate] = useState(3);
  const [labelsStr, setLabelsStr] = useState('frontend, feature');

  useEffect(() => {
    if (initialItem) {
      setTitle(initialItem.title);
      setStatus(initialItem.status);
      setPriority(initialItem.priority);
      setType(initialItem.type);
      setAssigneeName(initialItem.assignee.name);
      setStartDate(initialItem.startDate);
      setTargetDate(initialItem.targetDate);
      setIteration(initialItem.iteration);
      setEstimate(initialItem.estimate);
      setLabelsStr(initialItem.labels.join(', '));
    } else {
      setTitle('');
      setStatus('Todo');
      setPriority('Medium');
      setType('issue');
      setAssigneeName('Sathvik Putta');
      setStartDate('2026-11-20');
      setTargetDate('2026-11-27');
      setIteration('Iteration 1');
      setEstimate(3);
      setLabelsStr('feature');
    }
  }, [initialItem, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const labels = labelsStr
      .split(',')
      .map(l => l.trim())
      .filter(Boolean);

    const savedItem: ProjectItem = {
      id: initialItem ? initialItem.id : `GV-${Math.floor(100 + Math.random() * 900)}`,
      title: title.trim(),
      status,
      priority,
      type,
      assignee: {
        name: assigneeName,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=64&h=64&fit=crop&crop=faces'
      },
      startDate,
      targetDate,
      iteration,
      labels,
      estimate: Number(estimate) || 1
    };

    onSave(savedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#161b22] border border-[#30363d] rounded-xl w-full max-w-lg shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#30363d]">
          <h3 className="text-base font-semibold text-[#f0f6fc]">
            {initialItem ? `Edit Item (${initialItem.id})` : 'Create New Item'}
          </h3>
          <button 
            onClick={onClose}
            className="text-[#8b949e] hover:text-[#c9d1d9] p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#8b949e] mb-1">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="What needs to be done?"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-2 text-sm text-[#f0f6fc] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Type
              </label>
              <select
                value={type}
                onChange={e => setType(e.target.value as ItemType)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="issue">Issue</option>
                <option value="pull_request">Pull Request</option>
                <option value="draft">Draft Item</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Status
              </label>
              <select
                value={status}
                onChange={e => setStatus(e.target.value as ItemStatus)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={e => setPriority(e.target.value as ItemPriority)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Estimate (Story Points)
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={estimate}
                onChange={e => setEstimate(Number(e.target.value))}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-[#8b949e] mb-1">
                Target Date
              </label>
              <input
                type="date"
                value={targetDate}
                onChange={e => setTargetDate(e.target.value)}
                className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#8b949e] mb-1">
              Labels (comma separated)
            </label>
            <input
              type="text"
              value={labelsStr}
              onChange={e => setLabelsStr(e.target.value)}
              placeholder="e.g. backend, ui, bug"
              className="w-full bg-[#0d1117] border border-[#30363d] rounded-md px-3 py-1.5 text-xs text-[#c9d1d9] focus:outline-none focus:border-[#58a6ff]"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end space-x-3 pt-3 border-t border-[#30363d]">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs font-medium text-[#c9d1d9] hover:bg-[#21262d] rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-medium text-white bg-[#238636] hover:bg-[#2ea043] rounded-md shadow-sm transition-colors"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
