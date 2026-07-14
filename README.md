# EMS — Employee Management Dashboard

A modern, premium, fully responsive Employee Management System built with **pure HTML5, CSS3, and Vanilla JavaScript** — no frameworks, no build step. Open `index.html` and it just works.

![Theme](https://img.shields.io/badge/theme-purple-6C4DF6) ![No Frameworks](https://img.shields.io/badge/frameworks-none-success) ![Responsive](https://img.shields.io/badge/responsive-yes-blue)

---

## Overview

EMS is a self-contained HR dashboard for managing an employee directory: add, edit, view, and remove employees; search and filter the directory; and import/export data as CSV. All data is persisted to the browser's `localStorage`, so records survive a page refresh with no backend required.

## Features

- **Dashboard** with animated, glassmorphic stat cards: total employees, total departments, average salary, new hires (last 90 days), and a male/female headcount split.
- **Employee registration form** with photo upload (drag-in preview via `FileReader`), full field validation, and inline error messages.
- **Employee directory table** — sortable, searchable, filterable, and paginated (8 rows per page), with avatar, status badges, and quick actions (View / Edit / Delete).
- **Live search & filters** — search by name/email/department, plus dropdown filters for department, status, and salary range, and five sort modes.
- **CSV import/export** — reads `employees.csv` via `FileReader`, auto-populates the table, and exports the current directory back to CSV in the same format.
- **Full CRUD** — create, read, update, delete, each with a toast notification; delete requires confirmation in a modal.
- **Profile modal** — a polished popup with the employee's photo and full details, animated in/out.
- **Departments view** — per-department headcount and average salary cards.
- **Dashboard charts** — gender distribution (doughnut) and department headcount (bar), built with Chart.js.
- **Fully responsive** — collapsible sidebar on tablet/mobile, horizontally scrollable table, stacked form on small screens.
- **Micro-interactions** — fade/slide-in sections, hover lift on cards, button ripple effect, animated counters, smooth modal transitions.
- **Empty state** illustration when no employees match the current filters.

## Technologies Used

| Layer | Choice |
|---|---|
| Structure | HTML5 |
| Styling | CSS3 (custom properties, Grid, Flexbox, glassmorphism, keyframe animations) |
| Behavior | Vanilla JavaScript (ES6+, no frameworks) |
| Charts | [Chart.js](https://www.chartjs.org/) (via CDN) |
| Icons | [Font Awesome 6](https://fontawesome.com/) (via CDN) |
| Font | [Poppins](https://fonts.google.com/specimen/Poppins) + JetBrains Mono (via Google Fonts) |
| Persistence | Browser `localStorage` |

No Bootstrap, no React, no Tailwind, no build tooling — just static files.

## Folder Structure

```
Employee-Management-System/
├── index.html          # App shell — layout, sections, modals
├── style.css            # Design tokens, components, responsive rules, animations
├── script.js            # State, CRUD, storage, CSV import/export, charts, filters
├── README.md
├── images/               # (reserved for static image assets)
├── icons/                # (reserved for custom icon assets)
└── data/
    └── employees.csv     # Empty CSV template (headers only) — matches the Import CSV format
```

## Installation

No installation required.

1. Download or clone this folder.
2. Open `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).

That's it — the directory starts empty. Add employees using the registration form, or import them from a CSV (see `data/employees.csv` for the expected header format).

### Optional: run with a local server

Opening via `file://` works fine for everything, including CSV import (which uses `FileReader`, not `fetch`). If you prefer a local server anyway:

```bash
# Python
python3 -m http.server 8000

# Node
npx serve .
```

Then visit `http://localhost:8000`.

## Usage Notes

- **Import CSV** expects the header row: `EmployeeID,Photo,Name,Email,Phone,Gender,DOB,Department,Position,Salary,JoiningDate,Status,Address` (Photo and DOB may be blank).
- **Export CSV** downloads the directory exactly as currently stored, including any edits made in the session.
- Data lives in `localStorage` under the key `ems_employees`, scoped to the browser/profile you're using — clearing browser data will reset the directory to empty.

## Future Improvements

- Multi-user roles and permission-based views (Admin / Manager / Employee).
- Server-backed persistence (REST API + database) in place of `localStorage`.
- Bulk edit and bulk delete from the table.
- Attendance and leave-request workflows.
- Exportable PDF employee profile cards.
- Column-level sorting directly from table headers.

## Author

Built as a self-contained front-end demo of a production-style HR dashboard experience.
