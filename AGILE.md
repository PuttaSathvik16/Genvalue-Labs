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

## 2. Agile Pipeline Columns (Kanban & Sprint Boards)

Our GitHub Project and in-repo board use 5 structured pipelines:

1. **Icebox**: Unprioritized backlog of ideas and long-term proposals.
2. **Product Backlog**: Prioritized and estimated user stories ready for upcoming sprints.
3. **In Progress**: Work committed and currently in active development.
4. **In Review**: Pull Requests undergoing peer review, automated CI tests, and design verification.
5. **Done**: Merged, tested, and shipped to production.

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
