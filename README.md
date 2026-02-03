# Enterprise AI Adoption Dashboard

A Power BI dashboard prototype for tracking AI tool adoption across an organization. Built as an interactive HTML/JS prototype to validate requirements before Power BI development.

## Live Demo

**[View Live Dashboard](https://kevenwmarkham.github.io/power-bi-dashboard/prototype/)**

## Features

### 3 Dashboard Views
- **Executive Summary** - Overall adoption KPIs and trends
- **Business Unit Deep-Dive** - Unit-level metrics, user tables, and task type heatmap
- **Use Case Analysis** - Task type patterns, heatmaps, and outcome breakdowns

### Interactive Cross-Filtering
Click on any chart element to filter all other charts dynamically:

**Business Unit View:**
- Click funnel stages (Tried, Regular, Power User) to filter by engagement tier
- Click trend chart data points to filter by month
- Click heatmap cells/headers to filter by task type
- All KPIs, charts, and tables update instantly

**Use Case Analysis View:**
- Click heatmap cells to filter by task type
- Click heatmap row labels to filter by business unit
- Click outcome donut slices to filter by outcome
- Click task trend areas to filter by task type

### Visual Feedback
- Selected items highlighted with blue outline
- Non-selected items dimmed for focus
- Filter chips show active filters with remove buttons
- "Clear All" button to reset filters

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

### Option 3: VS Code Live Server
1. Install the "Live Server" extension
2. Open project folder in VS Code
3. Right-click `prototype/index.html` → "Open with Live Server"

## Project Structure

```
/prototype          - Interactive HTML/JS prototype
  /css              - Power BI theme styling
  /js               - Application logic and charts
  /data             - Mock JSON data files
  index.html        - Main dashboard

/docs               - Project documentation
/data-model         - Schema files, DAX measures
/dashboard          - PBIX backups, version history
/testing            - Test cases, UAT feedback
/deployment         - Runbooks, access matrix
```

## Tech Stack

- **Frontend:** Vanilla HTML/CSS/JavaScript (no frameworks)
- **Charts:** Custom SVG rendering
- **Styling:** Power BI theme (Segoe UI, Power BI color palette)
- **Data:** Mock JSON with seeded random generation

## Documentation

- [Sprint Backlog](./docs/sprint-backlog.md)
- [RACI Matrix](./docs/raci-matrix.md)
- [Status Report Template](./docs/status-report-template.md)
- [DAX Documentation](./data-model/dax-measures.md)
