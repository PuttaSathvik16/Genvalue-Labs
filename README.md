# Genvalue-Labs

Welcome to the official repository for **Genvalue Labs**.

## Overview

This repository hosts tools, libraries, and open-source experiments developed by Genvalue Labs.

### 📌 Project Board & Roadmap

Track active issues, sprint progress, and release milestones on our public board:
👉 **[GenValue Labs Roadmap & Planning (Projects v2)](https://github.com/users/genvaluelabs-a11y/projects/2/views/1)**

---

## Features: Project Planning & Multi-Layout Views

Inspired by [GitHub Projects: Changing the layout of a view](https://docs.github.com/en/issues/planning-and-tracking-with-projects/customizing-views-in-your-project/changing-the-layout-of-a-view), this repository features a project tracking interface with interactive layout switching:

- **GV Agile Kanban Board**: ZenHub-equivalent board layout featuring 7 Agile pipelines (`New Issues`, collapsible `Icebox` sidebar, `Product Backlog`, `Ready for Dev`, `In Progress` with WIP limit tracking, `In Review / QA`, and `Done`).
- **ZenHub Multi-Filter Toolbar**: Deep filtering across `Views`, `Repo`, `Label`, `Sprint`, `Assignee`, `Epic`, `Estimate`, plus quick issue search and `+ New GV Issue`.
- **Sprint Iteration & Velocity Tracking**: Real-time story point completion percentages, active sprint burndown tracking, and circular Fibonacci story point badges.
- **Spreadsheet / Table Layout**: High-density table of issues, pull requests, and draft items with sortable columns, inline status dropdowns, priority pills, assignees, iterations, and estimates.
- **Roadmap / Timeline Layout**: High-level Gantt visualization mapping work items across iterations and calendar dates, complete with a **Today** indicator line and status color coding.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- npm

### Installation & Run

```bash
# Clone the repository
git clone https://github.com/genvaluelabs-a11y/Genvalue-Labs.git
cd Genvalue-Labs

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Contribution Workflow

All contributions must follow our pull request process:
1. Create a feature branch off `main`.
2. Push changes to your fork.
3. Open a Pull Request targeting `upstream/main`.
