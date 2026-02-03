# Enterprise AI Adoption Dashboard - Prototype Design

**Date:** 2026-01-22
**Status:** Approved
**Author:** Keven / AI Governance Team
**Sponsor:** CTO, Acme Corporation

---

## 1. Overview

An interactive HTML/JS prototype to validate requirements for the Enterprise AI Adoption Dashboard before Power BI development begins. The prototype uses mock JSON data and allows rapid iteration based on stakeholder feedback.

### Purpose
Track AI adoption across Acme business functional areas, starting with Enterprise AI - an internal multi-model, multi-modal AI tool hosted on AWS Bedrock.

### Primary Audience
AI Governance Team (internal to Acme, sponsored by CTO)

### Key Objectives
- Understand usage depth (frequency and engagement levels)
- Track business unit coverage across functional areas
- Analyze use case scenarios by task type and business outcome

---

## 2. Business Functional Areas

### Corporate Functions
- Finance
- HR
- Legal
- IT
- Marketing
- Sales
- Operations

### Industry-Specific Divisions
- OEM Assembly Plants
- Logistics
- Parts & Service
- Financial Services
- Connected Services
- Dealer Network
- R&D

---

## 3. Use Case Categorization

### By Task Type
- Writing/Editing
- Data Analysis
- Code Generation
- Research/Summarization
- Brainstorming
- Translation

### By Business Outcome
- Process Automation
- Decision Support
- Customer-Facing Content
- Internal Communications
- Technical Documentation

---

## 4. Dashboard Views

### View 1: Executive Summary
**Purpose:** Quick pulse on overall Enterprise AI adoption in under 30 seconds.

**KPI Cards:**
| Metric | Description |
|--------|-------------|
| Total Active Users | Users with 1+ session in period, with % change vs prior period |
| Adoption Rate | Active users ÷ Total licensed users, shown as % with gauge |
| Total Sessions | Query count across all users, with trend sparkline |
| Avg Sessions/User/Month | Engagement depth indicator |

**Visualizations:**
- Adoption Trend Line Chart (12-month view with target line)
- Business Unit Adoption Bar Chart (horizontal, sorted, color-coded vs target)
- Top Use Cases Donut Chart (task type distribution)
- Business Outcome Breakdown (stacked bar)

**Interactions:**
- Click business unit → Navigate to View 2 filtered to that unit
- Click use case → Navigate to View 3 filtered to that category

---

### View 2: Business Unit Deep-Dive
**Purpose:** Explore adoption patterns within each functional area.

**Filters:**
- Business Unit selector (single or multi-select)
- Compare to: Target, Company Average, or Prior Period

**KPI Cards:**
| Metric | Description |
|--------|-------------|
| Unit Adoption Rate | % of unit's employees active vs unit-specific target |
| Active Users | Count with trend indicator |
| Avg Engagement | Sessions per user per month for this unit |
| Top Task Type | Most common use case in this unit |

**Visualizations:**
- User Adoption Funnel (Licensed → Onboarded → Tried → Regular → Power User)
- Monthly Active Users Trend (with unit target overlay)
- Task Type Distribution (bar chart)
- Feature Usage (capabilities leveraged by this unit)

**User Table:**
- Columns: User ID (anonymized), Last Active, Total Sessions, Primary Task Type, Engagement Tier
- Sortable, exportable to CSV

---

### View 3: Use Case Analysis
**Purpose:** Understand how Enterprise AI is being used across the organization.

**Filters:**
- Task Type (multi-select)
- Business Outcome (multi-select)
- Business Unit (inherited from global filter)

**KPI Cards:**
| Metric | Description |
|--------|-------------|
| Total Use Cases Tracked | Distinct scenario categories observed |
| Most Popular Task | Task type with highest session count |
| Fastest Growing | Task type with highest MoM growth |
| Highest Engagement | Task type with longest avg session duration |

**Visualizations:**
- Task Type × Business Unit Heatmap (intensity matrix)
- Task Type Trend (stacked area chart over 12 months)
- Business Outcome Distribution (donut with drill-through)
- Top Scenarios Table (ranked use cases with metrics)
- Feature Adoption by Task (correlation view)

---

## 5. Data Structure

### business-units.json
```json
{
  "businessUnits": [
    {
      "id": "bu-001",
      "name": "Information Technology",
      "category": "corporate",
      "totalEmployees": 850,
      "licensedUsers": 720,
      "adoptionTarget": 0.75,
      "targetDate": "2025-12-31"
    }
  ]
}
```

### users.json
```json
{
  "users": [
    {
      "userId": "usr-00001",
      "businessUnitId": "bu-001",
      "onboardedDate": "2025-03-15",
      "lastActiveDate": "2026-01-18",
      "totalSessions": 142,
      "engagementTier": "power-user"
    }
  ]
}
```

### sessions.json
```json
{
  "sessions": [
    {
      "sessionId": "sess-000001",
      "userId": "usr-00001",
      "date": "2026-01-18",
      "durationMinutes": 12,
      "queryCount": 8,
      "taskType": "code-generation",
      "businessOutcome": "process-automation",
      "featuresUsed": ["code-mode", "doc-upload"],
      "userRating": 4
    }
  ]
}
```

### reference-data.json
- Task types enum with display labels
- Business outcomes enum with display labels
- Engagement tier definitions (thresholds)
- Feature list with descriptions

---

## 6. Technical Implementation

### Prototype Structure
```
/prototype
  index.html              # Main dashboard (3 tabbed views)
  /data
    business-units.json
    users.json
    sessions.json
    reference-data.json
  /js
    app.js                # Main application logic
    charts.js             # Visualization rendering
    filters.js            # Interactive filtering
  /css
    powerbi-theme.css     # Power BI visual styling
```

### Mock Data Specifications
- 14 business units (7 corporate + 7 industry-specific)
- ~5,000 simulated users across units
- ~150,000 sessions over 12 months
- Realistic patterns: adoption ramp-up, seasonal dips, unit-specific task preferences

### Power BI Visual Styling
- Font: Segoe UI
- Colors:
  - Primary Blue: #118DFF
  - Dark Blue: #12239E
  - Orange Accent: #E66C37
  - Gray: #6B6B6B
- Card layouts with subtle shadows
- 8px border radius on containers

---

## 7. Feedback Iteration Process

1. **Initial build** - All 3 views functional with mock data
2. **Stakeholder review** - Walk through with Governance team
3. **Capture feedback** - Document in `docs/uat-feedback.md`
4. **Iterate** - Modify prototype based on feedback
5. **Repeat** until requirements stabilize
6. **Finalize** - Lock requirements, hand off to Power BI development

### What the Prototype Validates
- Layout and visual hierarchy
- Metric definitions and calculations
- Filter interactions and drill-down flows
- Data granularity needs

---

## 8. Adoption Targets

Targets vary by business unit based on:
- Size and nature of work
- AI applicability to function
- Unit-specific goals set by Governance team

Target tracking displayed as color-coded indicators:
- Green: At or above target
- Yellow: Within 10% of target
- Red: More than 10% below target

---

## 9. Next Steps

- [ ] Set up prototype file structure
- [ ] Generate mock data (12 months, 14 business units)
- [ ] Build View 1: Executive Summary
- [ ] Build View 2: Business Unit Deep-Dive
- [ ] Build View 3: Use Case Analysis
- [ ] Initial stakeholder review
- [ ] Iterate based on feedback
