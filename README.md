# Enterprise AI Adoption Dashboard

A Power BI dashboard prototype for tracking AI tool adoption across an organization. Built as an interactive HTML/JS prototype to validate requirements before Power BI development.

## Live Demo

**[View Live Dashboard](https://kevenwmarkham.github.io/power-bi-dashboard/prototype/)**

Or run locally (see [Running Locally](#running-locally)).

## Features

- **3 Dashboard Views:**
  - Executive Summary - Overall adoption KPIs and trends
  - Business Unit Deep-Dive - Unit-level metrics and user tables
  - Use Case Analysis - Task type patterns and heatmaps

- **10 Adoption Metrics:**
  - Total Active Users
  - Adoption Rate vs Target
  - Total Sessions
  - Avg Sessions per User
  - Engagement Tier Distribution
  - Month-over-Month Growth
  - Top Task Types
  - Business Outcome Distribution
  - Fastest Growing Use Case
  - Highest Engagement Task

- **Interactive Features:**
  - Drill-through navigation between views
  - Global date range and business unit filters
  - Sortable data tables with CSV export
  - Tooltips on all visualizations

## Project Structure

```
/docs               - Project documentation
  /plans            - Design and sprint plans
  D11-sprint-plan.md - Current sprint plan (Mar 10, 2026 delivery)
  sprint-backlog.md - User stories and tasks
  project-backlog.md - Full project backlog

/prototype          - Interactive HTML/JS prototype
  /css              - Power BI theme styling
  /js               - Application logic and charts
  /data             - Mock JSON data files
  index.html        - Main dashboard

/pages              - Project management views
  /project          - Sprint and backlog treeviews

/data-model         - Schema files, DAX measures
/dashboard          - PBIX backups, version history
/testing            - Test cases, UAT feedback
/deployment         - Runbooks, access matrix
```

## Running Locally

This project is a static HTML site. Serve it with an HTTP server:

### Option 1: Python (Recommended)
```bash
cd power-bi-dashboard
python -m http.server 8080
```
Open http://localhost:8080/prototype/ in your browser.

### Option 2: Node.js
```bash
npm install -g http-server
cd power-bi-dashboard
http-server -p 8080
```
Open http://localhost:8080/prototype/ in your browser.

### Option 3: GitHub Pages (No Install Required)
1. Fork this repository to your GitHub account
2. Go to your forked repo → **Settings** → **Pages**
3. Under "Source", select **Deploy from a branch**
4. Select **main** branch and **/ (root)** folder
5. Click **Save**
6. Wait 1-2 minutes for deployment
7. Access at: `https://[your-username].github.io/power-bi-dashboard/prototype/`

### Option 4: VS Code Live Server
1. Install the "Live Server" extension
2. Open project folder in VS Code
3. Right-click `prototype/index.html` → "Open with Live Server"

### Option 5: Direct File Access
Open `prototype/index.html` directly in your browser (some features may be limited due to CORS).

## Pages

| URL | Description |
|-----|-------------|
| `/prototype/` | Interactive dashboard prototype |
| `/pages/project/sprint-treeview.html` | Sprint timeline view |
| `/pages/project/backlog-treeview.html` | Project backlog view |

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no frameworks)
- **Charts:** Custom SVG rendering
- **Styling:** Power BI theme (Segoe UI, Power BI color palette)
- **Data:** Mock JSON with seeded random generation

## Project Timeline

| Phase | Duration | Focus |
|-------|----------|-------|
| Sprint 1 | Feb 3-14 | Discovery, Data Model |
| Sprint 2 | Feb 17-28 | ETL, Views 1 & 2 |
| Sprint 3 | Mar 3-10 | View 3, Testing, Deployment |

**Delivery Date:** March 10, 2026

## Documentation

- [D11 Sprint Plan](./docs/D11-sprint-plan.md) - Current sprint schedule
- [Sprint Backlog](./docs/sprint-backlog.md) - User stories and tasks
- [Project Backlog](./docs/project-backlog.md) - Full epic breakdown
- [Prototype Design](./docs/plans/2026-01-22-prototype-design.md) - Design specification
- [RACI Matrix](./docs/raci-matrix.md) - Role assignments
- [Data Dictionary](./docs/data-dictionary.md) - Field definitions

## License

This project is for demonstration purposes.
