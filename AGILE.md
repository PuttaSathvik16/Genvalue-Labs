# Agile Project Management Guide for Genvalue Labs

This document outlines our Agile Scrum & Kanban workflows on GitHub, following modern best practices (inspired by Zenhub & GitHub Projects).

---

## 1. Work Item Hierarchy

```
       🎯 EPIC (Large initiative / Theme)
          │
          ├── 📖 User Story (Customer value: "As a... I want... So that...")
          │     ├── Sub-tasks / Acceptance Criteria
          │     └── Linked Pull Request (Code implementation)
          │
          └── 🐛 Bug / Spike (Defects or technical research)
```

- **Epics**: Large feature sets spanning multiple sprints (e.g., *Website Modernization*, *Project Multi-Layout Views*).
- **User Stories**: Sized to be deliverable within a single sprint (1 to 5 story points). Always structured as:
  > **As a** `<user type>`, **I want** `<goal>`, **so that** `<benefit>`.
- **Pull Requests**: Code changes linked to an issue using GitHub keywords (`Closes #123`).

---

## 2. GV Agile Pipeline Columns & WIP Limits (Kanban & Sprint Boards)

Our GitHub Project and **GV Agile** board use 7 structured pipelines with Work-In-Progress (WIP) limits:

1. **New Issues**: Newly created issues and customer requests awaiting triage and estimation.
2. **Icebox**: Unprioritized backlog of ideas, with collapsible sidebar view.
3. **Product Backlog**: Prioritized and estimated user stories ready for sprint planning.
4. **Ready for Dev**: Refined stories committed to the active sprint (*WIP Limit: 4 issues*).
5. **In Progress**: Work committed and currently in active development (*WIP Limit: 4 issues*).
6. **In Review / QA**: Pull Requests undergoing peer review, automated CI checks, and QA (*WIP Limit: 3 issues*).
7. **Done**: Merged, verified, and shipped to production.

---

## 3. Story Points & Estimation

We use the modified **Fibonacci scale** for sizing complexity:

| Points | Complexity | Guideline |
| :---: | :--- | :--- |
| **1** | Trivial | Small copy change, minor config update (< 2 hours) |
| **2** | Small | Well-understood task or bug fix (half day) |
| **3** | Medium | Standard feature with tests (1–2 days) |
| **5** | Large | Complex feature touching multiple components (3–5 days) |
| **8** | Epic-sized | Too large for a single story; must be decomposed into smaller stories |

---

## 4. Definition of Done (DoD)

A user story or issue is only moved to **Done** when:
1. All acceptance criteria checklist items are checked.
2. Code passes linting and production build (`npm run build`).
3. Unit and integration tests pass (`npm test`).
4. Pull Request has been reviewed and merged into `main`.
5. Linked GitHub Project item moves to `Done`.
