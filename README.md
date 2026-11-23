# Genvalue-Labs

<div align="center">

[![⚡ GV Agile Kanban Board](https://img.shields.io/badge/⚡_GV_Agile-Sprint_Kanban_Board-orange?style=for-the-badge&logo=github)](https://github.com/users/genvaluelabs-a11y/projects/2/views/2)
[![Projects Tab](https://img.shields.io/badge/GitHub-Projects_Tab-blue?style=for-the-badge&logo=github)](https://github.com/genvaluelabs-a11y/Genvalue-Labs/projects)
[![In-Repo Chrome Extension](https://img.shields.io/badge/Browser_Extension-In--Repo_Tab-green?style=for-the-badge&logo=googlechrome)](./extension)

**Live Agile Sprint Board, Issue Tracking & Project Planning for GenValue Labs**

[⚡ **Open GV Agile Board (Live)**](https://github.com/users/genvaluelabs-a11y/projects/2/views/2) · [📊 **Repository Projects**](https://github.com/genvaluelabs-a11y/Genvalue-Labs/projects) · [🧩 **In-Repo Tab Extension**](./extension)

</div>

---

Welcome to the official repository for **Genvalue Labs**.

## 📌 Accessing GV Agile from the Repository

Everyone visiting this repository can access and track the **GV Agile** board in multiple ways:

1. **Direct Board Link (No Extension Required)**:
   - ⚡ **[GV Agile Sprint Kanban Board](https://github.com/users/genvaluelabs-a11y/projects/2/views/2)** (7 Agile pipelines: *New Issues, Backlog, Ready for Dev, In Progress, In Review/QA, Done, Icebox*)
   - 📋 **[Sprint Backlog & Spreadsheet Table](https://github.com/users/genvaluelabs-a11y/projects/2/views/1)**
   - 📅 **[Roadmap & Gantt Timeline](https://github.com/users/genvaluelabs-a11y/projects/2/views/3)**
2. **Repository Top Navigation Bar**:
   - Click the **[Projects](https://github.com/genvaluelabs-a11y/Genvalue-Labs/projects)** tab in GitHub's repository menu bar to view the linked **GV Agile** project board.
3. **Repository About Header**:
   - Click the homepage link under the **About** section on the right sidebar of the repository page.
4. **In-Repo Tab (ZenHub-Style Integration)**:
   - To have the **`⚡ GV Agile`** tab permanently injected into GitHub's top repository navigation bar (between *Actions* and *Projects*), follow the 1-minute setup in the [`extension/`](./extension) folder.

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
