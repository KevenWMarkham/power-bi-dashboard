# Power BI Dashboard Project

## Project Overview
- **Client:** [CLIENT_NAME]
- **Duration:** 8 weeks
- **Scope:** 1 dashboard screen with 3 views
- **Budget:** $79,150
- **Start Date:** [DATE]

## Team Allocation
| Role | FTE | Hours | Active Weeks |
|------|-----|-------|--------------|
| Project Manager | 0.25 | 80 | 1-8 |
| Data Engineer | 0.5 | 80 | 1-4 |
| Power BI Lead | 0.75 | 180 | 1-6 |
| UX Designer | 0.25 | 30 | 2-4 |
| QA Analyst | 0.25 | 20 | 6-7 |

## Folder Structure
```
/docs           - Requirements, data dictionary, user guide
/data-model     - Schema files, DAX measures
/dashboard      - PBIX backups, version history
/testing        - Test cases, UAT feedback
/deployment     - Runbooks, access matrix
```

## Key Milestones
1. **Week 2:** Requirements sign-off, data model complete
2. **Week 4:** Initial dashboard build, UX review complete
3. **Week 6:** Dashboard development complete, QA begins
4. **Week 7:** UAT complete
5. **Week 8:** Production deployment, knowledge transfer

## Running Locally

This project is a static HTML site. To run it locally, you need to serve it with an HTTP server.

### Option 1: Python (Recommended)
```bash
# Navigate to the project folder
cd power-bi-dashboard

# Start the server
python -m http.server 8080
```
Then open http://localhost:8080 in your browser.

### Option 2: Node.js
```bash
# Install http-server globally (one-time)
npm install -g http-server

# Navigate to the project folder and start
cd power-bi-dashboard
http-server -p 8080
```
Then open http://localhost:8080 in your browser.

### Option 3: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Open the project folder in VS Code
3. Right-click `index.html` and select "Open with Live Server"

### Pages
- **Main Site:** http://localhost:8080 - Project documentation hub
- **Prototype Dashboard:** http://localhost:8080/prototype/ - Interactive Power BI prototype

## Quick Links
- [Sprint Backlog](./docs/sprint-backlog.md)
- [RACI Matrix](./docs/raci-matrix.md)
- [Status Report Template](./docs/status-report-template.md)
- [DAX Documentation](./data-model/dax-measures.md)
