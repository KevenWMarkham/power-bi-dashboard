# D11 Detailed Sprint Plan — Measurement & Adoption Scorecard MVP

**Deliverable:** D11 — Measurement & Adoption Scorecard MVP
**Client:** Acme Corporation
**Sponsor:** CTO / AI Governance Team
**Start Date:** February 3, 2026
**End Date:** March 10, 2026
**Duration:** 5 Weeks (3 Sprints)
**Total Hours:** 200
**Total Tasks:** 14
**Total Subtasks:** 72

---

## D11 Objectives

1. Define 10 enterprise AI adoption metrics aligned with business goals
2. Integrate data from 5 Acme source systems into a unified star schema
3. Build 3 Power BI dashboard views (Executive Summary, BU Deep-Dive, Use Case Analysis)
4. Implement Row-Level Security for Admin, BU Leader, and Viewer roles
5. Deploy to production with automated daily refresh
6. Deliver user documentation and conduct training

---

## D11 Deliverable Requirements

| Requirement | Description | Status |
|-------------|-------------|--------|
| Scorecard Design | Fully designed AI adoption scorecard by tool and by function | To Do |
| 10 Metrics | Up to 10 defined adoption metrics with DAX calculations | To Do |
| 5 Data Sources | Data integrated from 5 Acme systems with automated refresh | To Do |
| Reporting Structure | Defined reporting hierarchy by business unit and function | To Do |
| 3 Dashboard Views | Executive Summary, BU Deep-Dive, Use Case Analysis in Power BI | To Do |
| Row-Level Security | Admin, BU Leader, Viewer roles configured and tested | To Do |
| Documentation | User guide, data dictionary, and handoff documentation | To Do |
| Training | Training session conducted for AI Governance team and BU leaders | To Do |

---

## Sprint Schedule Overview

| Sprint | Dates | Duration | Focus | Hours |
|--------|-------|----------|-------|-------|
| Sprint 1 | Feb 3 – Feb 14 | 2 weeks | Discovery, Data Engineering, Data Model | 60 |
| Sprint 2 | Feb 17 – Feb 28 | 2 weeks | Core Build, DAX Measures, Views 1 & 2, RLS | 88 |
| Sprint 3 | Mar 3 – Mar 10 | 1 week | View 3, Testing, UAT, Deployment, Training | 52 |

---

## Sprint 1: Discovery & Data Engineering

**Dates:** February 3 – February 14, 2026
**Focus:** Requirements gathering, data source identification, star schema design, prototype validation
**Team Active:** PM, Data Engineer, UX Designer

### Task 1.1: Project Kickoff & Requirements Gathering
**Owner:** PM | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 1.1.1 | Conduct kickoff meeting with CTO sponsor and AI Governance team | 2 | To Do |
| 1.1.2 | Review project charter, RACI, and confirm delivery timeline | 2 | To Do |
| 1.1.3 | Define 10 adoption metrics with stakeholder input (workshops) | 4 | To Do |
| 1.1.4 | Document reporting structure by business unit and AI tool/function | 2 | To Do |
| 1.1.5 | Finalize metric definitions document with calculation logic | 2 | To Do |

**Acceptance:** 10 metrics defined and documented; reporting structure agreed; kickoff minutes captured.

### Task 1.2: Data Source Identification & Access
**Owner:** DE | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 1.2.1 | Identify Enterprise AI telemetry data source (AWS Bedrock logs) | 2 | To Do |
| 1.2.2 | Identify HR/employee data source (Workday) and business unit hierarchy | 2 | To Do |
| 1.2.3 | Identify License Management database and available fields | 2 | To Do |
| 1.2.4 | Identify Azure AD source for authentication/login data | 2 | To Do |
| 1.2.5 | Identify Adoption Targets DB for target rates by BU | 2 | To Do |
| 1.2.6 | Submit data access requests and obtain credentials for all 5 systems | 2 | To Do |

**Acceptance:** All 5 data sources documented with connection details; access granted or in progress.

### Task 1.3: Data Profiling & Quality Assessment
**Owner:** DE | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 1.3.1 | Profile Enterprise AI telemetry: record counts, date ranges, completeness | 2 | To Do |
| 1.3.2 | Profile Workday HR data: employee records, BU mapping coverage, hierarchy depth | 2 | To Do |
| 1.3.3 | Profile License Management: licensed user counts by tool, refresh cadence | 2 | To Do |
| 1.3.4 | Profile Azure AD: login event coverage, user identifiers, timestamp granularity | 2 | To Do |
| 1.3.5 | Profile Adoption Targets: target rates by BU, date versioning, completeness | 1 | To Do |
| 1.3.6 | Document data quality findings: gaps, inconsistencies, workarounds needed | 3 | To Do |

**Acceptance:** Data profiling report delivered; quality issues documented with severity ratings.

### Task 1.4: Prototype Review & UX Validation
**Owner:** UX | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 1.4.1 | Prepare HTML prototype for stakeholder review session | 2 | To Do |
| 1.4.2 | Conduct prototype walkthrough with AI Governance team | 2 | To Do |
| 1.4.3 | Document feedback: layout changes, visual priorities, filter needs | 2 | To Do |
| 1.4.4 | Prioritize changes and update prototype design notes | 2 | To Do |

**Acceptance:** Prototype reviewed; feedback documented; priority changes identified for implementation.

### Task 1.5: Star Schema Design & Dimension Tables
**Owner:** DE | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 1.5.1 | Design DimUser table (UserKey, BUKey, OnboardDate, LastActive, Sessions, Tier) | 2 | To Do |
| 1.5.2 | Design DimBusinessUnit table (BUKey, Name, Category, TotalEmp, Licensed, Target) | 2 | To Do |
| 1.5.3 | Design DimTaskType table (TaskTypeKey, Name, Category, Description) | 1 | To Do |
| 1.5.4 | Design DimBusinessOutcome table (OutcomeKey, Name, Category, Description) | 1 | To Do |
| 1.5.5 | Design DimDate table (DateKey, Date, Year, Quarter, Month, Week, FiscalYear) | 2 | To Do |
| 1.5.6 | Design FactSession table (SessionID, DateKey, UserKey, TaskTypeKey, OutcomeKey, Duration, QueryCount) | 2 | To Do |
| 1.5.7 | Design FactDailyAdoption table (DateKey, BUKey, ActiveUsers, TotalSessions, AdoptionRate) | 2 | To Do |
| 1.5.8 | Create ERD diagram documenting all relationships and cardinalities | 2 | To Do |
| 1.5.9 | Create all dimension tables with seed/reference data loaded | 2 | To Do |

**Acceptance:** Star schema ERD approved; all dimension tables created with sample data.

**Sprint 1 Milestone (M1):** Requirements signed off, prototype feedback incorporated, data model design complete.
**Sprint 1 Hours:** 60 hours

---

## Sprint 2: Core Build — ETL, DAX & Views 1-2

**Dates:** February 17 – February 28, 2026
**Focus:** ETL pipeline, DAX measures, Row-Level Security, Executive Summary & BU Deep-Dive views
**Team Active:** Data Engineer, Power BI Lead, PM

### Task 2.1: ETL Pipeline Development
**Owner:** DE | **Estimate:** 24 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.1.1 | Build Power Query connection to AWS Bedrock telemetry (session logs) | 4 | To Do |
| 2.1.2 | Build Power Query connection to Workday HR API (employee + BU mapping) | 4 | To Do |
| 2.1.3 | Build Power Query connection to License Management database | 2 | To Do |
| 2.1.4 | Build Power Query connection to Azure AD (login/authentication events) | 2 | To Do |
| 2.1.5 | Build Power Query connection to Adoption Targets DB | 2 | To Do |
| 2.1.6 | Implement data transformations: type casting, null handling, key generation | 4 | To Do |
| 2.1.7 | Configure incremental refresh for FactSession (daily append, 3-day lookback) | 2 | To Do |
| 2.1.8 | Configure daily scheduled refresh (06:00 UTC) with failure alerting | 2 | To Do |
| 2.1.9 | Validate ETL end-to-end: row counts, FK integrity, data freshness | 2 | To Do |

**Acceptance:** All 5 ETL pipelines operational; daily refresh running; failure alerts configured.

### Task 2.2: Core DAX Measures
**Owner:** PBI | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.2.1 | M01: Total Active Users — DISTINCTCOUNT of users with 1+ sessions in period | 1 | To Do |
| 2.2.2 | M02: Adoption Rate — Active Users / Licensed Users as percentage | 1 | To Do |
| 2.2.3 | M03: Total Sessions — COUNT of all sessions in period | 1 | To Do |
| 2.2.4 | M04: Avg Sessions per User — Total Sessions / Active Users | 1 | To Do |
| 2.2.5 | M05: Adoption vs Target — Current adoption rate vs BU target with status (Above/On-Track/Below) | 2 | To Do |
| 2.2.6 | M06: Engagement Tier Distribution — classify users into Power User / Regular / Tried / Inactive | 2 | To Do |
| 2.2.7 | M07: Month-over-Month Growth — % change in active users vs prior month | 2 | To Do |
| 2.2.8 | M08: Top Task Type — task category with highest session count | 1 | To Do |
| 2.2.9 | M09: Business Outcome Distribution — session breakdown by outcome category | 1 | To Do |
| 2.2.10 | M10: Task Type Growth Rate — MoM growth for each task type, identify fastest growing | 2 | To Do |
| 2.2.11 | Document all measures in DAX measures reference (formula, filters, views used) | 2 | To Do |

**Acceptance:** All 10 DAX measures functional; documented with calculation logic and test results.

### Task 2.3: Row-Level Security
**Owner:** PBI | **Estimate:** 6 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.3.1 | Define RLS roles: Admin (all data), BU Leader (own BU), Viewer (read-only, all) | 1 | To Do |
| 2.3.2 | Create RLS filter expression for BU Leader role using DimBusinessUnit[BUKey] | 2 | To Do |
| 2.3.3 | Map Azure AD groups/users to RLS roles in Power BI Service | 1 | To Do |
| 2.3.4 | Test RLS with 3 test users (one per role) — verify data isolation | 2 | To Do |

**Acceptance:** RLS roles configured; tested with 3 different user profiles; data isolation verified.

### Task 2.4: View 1 — Executive Summary
**Owner:** PBI | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.4.1 | Create page layout with header, navigation tabs, and filter bar | 1 | To Do |
| 2.4.2 | KPI card: Total Active Users with % change vs prior period | 1 | To Do |
| 2.4.3 | KPI card: Adoption Rate as % with gauge visual | 1 | To Do |
| 2.4.4 | KPI card: Total Sessions with trend sparkline | 1 | To Do |
| 2.4.5 | KPI card: Avg Sessions/User/Month | 1 | To Do |
| 2.4.6 | 12-month Adoption Trend line chart with target line overlay | 2 | To Do |
| 2.4.7 | Business Unit Adoption horizontal bar chart, sorted desc, color-coded vs target | 2 | To Do |
| 2.4.8 | Top Use Cases donut chart showing task type distribution | 1 | To Do |
| 2.4.9 | Business Outcome stacked bar breakdown | 1 | To Do |
| 2.4.10 | Configure drill-through: click BU bar → View 2 filtered to that unit | 2 | To Do |
| 2.4.11 | Configure drill-through: click task type → View 3 filtered to that category | 2 | To Do |
| 2.4.12 | Apply Power BI theme (colors, fonts, formatting) per UX specs | 1 | To Do |

**Acceptance:** All 4 KPI cards, 3 visuals, and 2 drill-throughs working with live data.

### Task 2.5: View 2 — Business Unit Deep-Dive
**Owner:** PBI | **Estimate:** 20 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.5.1 | Business Unit selector (single or multi-select slicer) | 1 | To Do |
| 2.5.2 | KPI card: Unit Adoption Rate vs unit-specific target | 1 | To Do |
| 2.5.3 | KPI card: Active Users count with trend indicator (up/down arrow) | 1 | To Do |
| 2.5.4 | KPI card: Avg Engagement (sessions per user per month for selected unit) | 1 | To Do |
| 2.5.5 | KPI card: Top Task Type for selected unit | 1 | To Do |
| 2.5.6 | User Adoption Funnel (Licensed → Onboarded → Tried → Regular → Power User) | 3 | To Do |
| 2.5.7 | Monthly Active Users trend line with unit target overlay | 2 | To Do |
| 2.5.8 | Task Type Distribution bar chart for selected unit | 2 | To Do |
| 2.5.9 | Feature Usage chart (capabilities leveraged by unit) | 2 | To Do |
| 2.5.10 | User Table: anonymized User ID, Last Active, Total Sessions, Primary Task Type, Engagement Tier | 3 | To Do |
| 2.5.11 | Make User Table sortable by all columns | 1 | To Do |
| 2.5.12 | Enable CSV export on User Table | 1 | To Do |
| 2.5.13 | Apply theme and validate visual alignment with View 1 | 1 | To Do |

**Acceptance:** BU selector, 4 KPIs, funnel, trend, charts, and sortable/exportable table all working.

### Task 2.6: Global Filters & Navigation
**Owner:** PBI | **Estimate:** 4 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.6.1 | Add global Date Range picker (start/end) affecting all views | 1 | To Do |
| 2.6.2 | Add global Business Unit multi-select filter | 1 | To Do |
| 2.6.3 | Configure filter sync across View 1, View 2, View 3 | 1 | To Do |
| 2.6.4 | Add view navigation tabs (View 1 / View 2 / View 3) | 1 | To Do |

**Acceptance:** Date and BU filters apply across all views; navigation tabs work correctly.

### Task 2.7: Sprint 2 Demo & Feedback
**Owner:** PM | **Estimate:** 2 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 2.7.1 | Conduct internal demo of Views 1 & 2 with stakeholders | 1 | To Do |
| 2.7.2 | Document feedback and prioritize changes for Sprint 3 | 1 | To Do |

**Acceptance:** Demo completed; feedback documented and prioritized.

**Sprint 2 Milestones:**
- **M2: Data Pipeline Live (Feb 21)** — All ETL operational, daily refresh working
- **M3: Views 1 & 2 Complete (Feb 28)** — Executive & BU views ready for testing

**Sprint 2 Hours:** 88 hours

---

## Sprint 3: View 3, Testing, UAT & Deployment

**Dates:** March 3 – March 10, 2026
**Focus:** Use Case Analysis view, QA testing, UAT, documentation, production deployment
**Team Active:** Power BI Lead, QA Analyst, PM

### Task 3.1: View 3 — Use Case Analysis
**Owner:** PBI | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.1.1 | Task Type multi-select filter | 1 | To Do |
| 3.1.2 | Business Outcome multi-select filter | 1 | To Do |
| 3.1.3 | KPI card: Total Use Cases Tracked | 1 | To Do |
| 3.1.4 | KPI card: Most Popular Task (highest session count) | 1 | To Do |
| 3.1.5 | KPI card: Fastest Growing Task (highest MoM growth) | 1 | To Do |
| 3.1.6 | KPI card: Highest Engagement Task (longest avg session duration) | 1 | To Do |
| 3.1.7 | Task Type × Business Unit Heatmap (intensity matrix) | 3 | To Do |
| 3.1.8 | Task Type Trend stacked area chart (12 months) | 2 | To Do |
| 3.1.9 | Business Outcome Distribution donut with drill-through | 1 | To Do |
| 3.1.10 | Top Scenarios Table (ranked use cases with metrics: volume, growth, engagement) | 2 | To Do |
| 3.1.11 | Feature Adoption by Task correlation view | 1 | To Do |
| 3.1.12 | Apply theme and validate consistency with Views 1 & 2 | 1 | To Do |

**Acceptance:** All 4 KPIs, 2 filters, heatmap, trend chart, donut, and scenarios table working.

### Task 3.2: Export & Performance
**Owner:** PBI | **Estimate:** 6 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.2.1 | Enable CSV export on all data tables (Views 2 & 3) | 1 | To Do |
| 3.2.2 | Run Performance Analyzer on all 3 views | 1 | To Do |
| 3.2.3 | Identify and optimize slow DAX queries (target < 3s visual refresh) | 2 | To Do |
| 3.2.4 | Validate all views load in < 5 seconds with production data volume | 1 | To Do |
| 3.2.5 | Implement Sprint 2 demo feedback changes (priority items) | 1 | To Do |

**Acceptance:** Export working; all views load < 5s; Performance Analyzer results documented.

### Task 3.3: QA Testing
**Owner:** QA | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.3.1 | Create test cases for View 1: KPI accuracy, trend chart, bar chart, drill-throughs | 1 | To Do |
| 3.3.2 | Create test cases for View 2: BU selector, funnel, user table, export | 1 | To Do |
| 3.3.3 | Create test cases for View 3: heatmap, trend, scenarios table, filters | 1 | To Do |
| 3.3.4 | Create test cases for global filters, navigation, RLS | 1 | To Do |
| 3.3.5 | Execute View 1 functional tests | 2 | To Do |
| 3.3.6 | Execute View 2 functional tests | 2 | To Do |
| 3.3.7 | Execute View 3 functional tests | 2 | To Do |
| 3.3.8 | Execute data validation: KPI values vs source system spot-checks | 1 | To Do |
| 3.3.9 | Document all defects with severity, steps to reproduce, screenshots | 1 | To Do |

**Acceptance:** All test cases executed; defects logged with severity; critical/high defects flagged.

### Task 3.4: UAT & Sign-Off
**Owner:** PM | **Estimate:** 7 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.4.1 | Prepare UAT environment with production-like data | 1 | To Do |
| 3.4.2 | Create UAT scripts for 3 use cases (UC-01, UC-02, UC-03) | 1 | To Do |
| 3.4.3 | UC-01: Executive Reviews AI Adoption — walkthrough with CTO/Governance Lead | 1 | To Do |
| 3.4.4 | UC-02: BU Leader Analyzes Unit Adoption — walkthrough with BU Leader | 1 | To Do |
| 3.4.5 | UC-03: Governance Analyzes Use Cases — walkthrough with Governance Analyst | 1 | To Do |
| 3.4.6 | Document UAT feedback and acceptance decisions | 1 | To Do |
| 3.4.7 | Obtain formal UAT sign-off from AI Governance team | 1 | To Do |

**Acceptance:** 3 use cases executed with stakeholders; sign-off document obtained.

### Task 3.5: Defect Resolution
**Owner:** PBI | **Estimate:** 4 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.5.1 | Fix all critical severity defects from QA and UAT | 2 | To Do |
| 3.5.2 | Fix high severity defects from QA and UAT | 1 | To Do |
| 3.5.3 | Re-test fixed defects and confirm resolution | 1 | To Do |

**Acceptance:** All critical/high defects resolved and re-verified.

### Task 3.6: Production Deployment
**Owner:** PBI | **Estimate:** 3 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.6.1 | Publish dashboard to production Power BI workspace | 1 | To Do |
| 3.6.2 | Configure production scheduled refresh (daily 06:00 UTC) | 0.5 | To Do |
| 3.6.3 | Verify all data connections and gateway configuration | 0.5 | To Do |
| 3.6.4 | Production smoke test: all 3 views, filters, drill-throughs, RLS | 1 | To Do |

**Acceptance:** Dashboard live in production; refresh running; smoke test passed.

### Task 3.7: Documentation, Training & Handoff
**Owner:** PBI / PM | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 3.7.1 | Create user guide with screenshots of all 3 views, filter usage, export | 2 | To Do |
| 3.7.2 | Create data dictionary documenting all tables, columns, relationships | 1 | To Do |
| 3.7.3 | Document DAX measure reference (10 measures with formulas) | 1 | To Do |
| 3.7.4 | Provision user access per access matrix (Governance team, BU leaders) | 1 | To Do |
| 3.7.5 | Conduct training session for AI Governance team (demo + Q&A) | 1 | To Do |
| 3.7.6 | Conduct training session for BU Leaders (demo + Q&A) | 1 | To Do |
| 3.7.7 | Final handoff: technical documentation to support team | 1 | To Do |

**Acceptance:** User guide delivered; training conducted; access provisioned; handoff complete.

**Sprint 3 Milestones:**
- **M4: All Views Complete (Mar 5)** — View 3 complete, all functionality working
- **M5: UAT Sign-off (Mar 9)** — Governance team approval
- **M6: Production Deployment (Mar 10)** — Dashboard live, users trained

**Sprint 3 Hours:** 56 hours (Note: 4 hours moved from docs to Sprint 2 View 2 expansion)

---

## Use Cases for Acceptance Testing

### UC-01: Executive Reviews Enterprise AI Adoption
**Actor:** CTO / AI Governance Lead
**Precondition:** Dashboard loaded, user has Admin role
**Flow:**
1. User opens View 1 (Executive Summary)
2. Reviews 4 KPI cards (Active Users, Adoption Rate, Sessions, Avg Sessions/User)
3. Examines 12-month adoption trend line with target overlay
4. Identifies lowest-performing BU from the horizontal bar chart
5. Clicks on the BU bar to drill through to View 2

**Expected Result:** All KPIs populated with current data; drill-through navigates correctly with BU filter applied.

**Acceptance Checklist:**
- [ ] All 4 KPI cards display correct, current values
- [ ] Adoption trend shows 12-month history with target line
- [ ] BU adoption bar chart sorted correctly with color-coded target status
- [ ] Clicking a BU bar drills through to View 2 filtered to that unit
- [ ] Clicking a use case drills through to View 3 filtered to that category

### UC-02: BU Leader Analyzes Unit Adoption
**Actor:** Business Unit Leader
**Precondition:** User has BU Leader role, RLS restricts to their unit
**Flow:**
1. User opens View 2 (Business Unit Deep-Dive)
2. Sees their unit's KPIs (adoption rate, active users, engagement, top task)
3. Reviews the adoption funnel (Licensed → Onboarded → Tried → Regular → Power User)
4. Examines the user table, sorts by "Last Active"
5. Exports user table to CSV

**Expected Result:** Only their BU data visible; export contains correct data; funnel stages are accurate.

**Acceptance Checklist:**
- [ ] RLS restricts BU Leader to only their unit's data
- [ ] Adoption funnel shows accurate stage counts
- [ ] User table is sortable by all columns
- [ ] CSV export contains correct, complete data
- [ ] KPI cards reflect selected BU only

### UC-03: Governance Team Analyzes Use Cases
**Actor:** AI Governance Analyst
**Precondition:** Dashboard loaded, multi-select filters available
**Flow:**
1. User opens View 3 (Use Case Analysis)
2. Selects "Code Generation" and "Data Analysis" task types
3. Examines the Task Type × BU heatmap for intensity patterns
4. Reviews the top scenarios table for ranked use cases

**Expected Result:** Heatmap filters correctly; scenarios table shows ranked use cases with metrics for selected types.

**Acceptance Checklist:**
- [ ] Multi-select task type filter correctly filters all visuals
- [ ] Heatmap intensity values match underlying data
- [ ] Top scenarios table ranks use cases correctly
- [ ] Business outcome donut drill-through works

---

## 10 Defined Metrics

| # | Metric | DAX Measure | Description | Views |
|---|--------|-------------|-------------|-------|
| 1 | Total Active Users | `M01_ActiveUsers` | DISTINCTCOUNT of users with 1+ sessions in period | V1, V2 |
| 2 | Adoption Rate | `M02_AdoptionRate` | Active Users / Licensed Users | V1, V2 |
| 3 | Total Sessions | `M03_TotalSessions` | COUNT of all sessions in period | V1, V2 |
| 4 | Avg Sessions/User | `M04_AvgSessionsPerUser` | Total Sessions / Active Users | V1, V2 |
| 5 | Adoption vs Target | `M05_AdoptionVsTarget` | Current rate vs BU target (Above / On-Track / Below) | V1, V2 |
| 6 | Engagement Tier Dist. | `M06_EngagementTier` | Classify: Power User / Regular / Tried / Inactive | V2 |
| 7 | MoM Growth | `M07_MoMGrowth` | % change in active users vs prior month | V1 |
| 8 | Top Task Type | `M08_TopTaskType` | Task category with highest session count | V2, V3 |
| 9 | Outcome Distribution | `M09_OutcomeDist` | Session breakdown by outcome category | V1, V3 |
| 10 | Task Growth Rate | `M10_TaskGrowthRate` | MoM growth per task type; identify fastest growing | V3 |

---

## 5 Acme Data Sources

| # | System | Data | Refresh | Priority | Access Method |
|---|--------|------|---------|----------|---------------|
| 1 | Enterprise AI Telemetry (AWS Bedrock) | Session logs, queries, model usage | Daily | P1 | API / Log Store |
| 2 | HR System (Workday) | Employee data, BU hierarchy, onboarding dates | Daily | P1 | Workday API |
| 3 | License Management | Licensed users by tool and function | Weekly | P2 | Database query |
| 4 | Azure AD | User authentication, login events | Daily | P2 | MS Graph API |
| 5 | Adoption Targets DB | Target adoption rates by BU and function | Monthly | P3 | Database query |

---

## Star Schema — Data Model

| Table | Type | Key | Description |
|-------|------|-----|-------------|
| DimUser | Dimension | UserKey | Employee profile with BU assignment and engagement tier |
| DimBusinessUnit | Dimension | BUKey | 13 business units with targets and headcounts |
| DimTaskType | Dimension | TaskTypeKey | 6 AI task categories (Code Gen, Data Analysis, etc.) |
| DimBusinessOutcome | Dimension | OutcomeKey | 5 business outcome classifications |
| DimDate | Dimension | DateKey | Calendar table with fiscal periods |
| FactSession | Fact | SessionID | One row per AI session (grain: session-level) |
| FactDailyAdoption | Fact | DateKey + BUKey | Pre-aggregated daily rollup by BU |

### Relationships

| From | Column | To | Column | Cardinality |
|------|--------|----|--------|-------------|
| FactSession | DateKey | DimDate | DateKey | M:1 |
| FactSession | UserKey | DimUser | UserKey | M:1 |
| FactSession | TaskTypeKey | DimTaskType | TaskTypeKey | M:1 |
| FactSession | OutcomeKey | DimBusinessOutcome | OutcomeKey | M:1 |
| DimUser | BUKey | DimBusinessUnit | BUKey | M:1 |
| FactDailyAdoption | DateKey | DimDate | DateKey | M:1 |
| FactDailyAdoption | BUKey | DimBusinessUnit | BUKey | M:1 |

---

## Resource Allocation

| Role | Sprint 1 | Sprint 2 | Sprint 3 | Total |
|------|----------|----------|----------|-------|
| Project Manager | 12 hrs | 2 hrs | 8 hrs | 22 hrs |
| Data Engineer | 40 hrs | 24 hrs | 0 hrs | 64 hrs |
| Power BI Lead | 0 hrs | 62 hrs | 29 hrs | 91 hrs |
| UX Designer | 8 hrs | 0 hrs | 0 hrs | 8 hrs |
| QA Analyst | 0 hrs | 0 hrs | 12 hrs | 12 hrs |
| **Total** | **60 hrs** | **88 hrs** | **52 hrs (+4 buffer)** | **200 hrs** |

---

## Key Milestones

| ID | Milestone | Date | Sprint | Success Criteria |
|----|-----------|------|--------|------------------|
| M1 | Requirements Complete | Feb 14 | S1 | 10 metrics defined; 5 sources identified; prototype reviewed; sign-off obtained |
| M2 | Data Pipeline Live | Feb 21 | S2 | All 5 ETL pipelines operational; daily refresh running; data flowing into star schema |
| M3 | Views 1 & 2 Complete | Feb 28 | S2 | Executive Summary and BU Deep-Dive ready for testing with live data |
| M4 | All Views Complete | Mar 5 | S3 | View 3 complete; all 3 views functional with drill-throughs and filters |
| M5 | UAT Sign-off | Mar 9 | S3 | 3 use cases executed; AI Governance team approval documented |
| M6 | Production Deployment | Mar 10 | S3 | Dashboard live; users trained; documentation delivered |

---

## Risk Register

| ID | Risk | Impact | Probability | Mitigation | Owner |
|----|------|--------|-------------|------------|-------|
| R1 | Data source access delays | High | Medium | Start access requests Day 1; escalate by Day 3 if not resolved | DE / PM |
| R2 | Data quality issues in source systems | High | Medium | Profile data in Week 2; document workarounds; degrade gracefully | DE |
| R3 | Compressed timeline (5 weeks vs original 8) | High | High | Parallel workstreams in Sprint 2; daily standups; strict scope control | PM |
| R4 | UAT stakeholder availability | Medium | Medium | Schedule UAT sessions by Feb 21; identify backup reviewers | PM |
| R5 | Performance issues at production data volume | Medium | Low | Test with full data by Feb 28; optimize before Sprint 3 | PBI |
| R6 | RLS configuration complexity with Azure AD | Medium | Low | Prototype RLS in Sprint 2 Week 3; validate with IT early | PBI |

---

## Accelerated Timeline Adjustments

Due to the compressed 5-week timeline (vs. original 8 weeks), the following adjustments apply:

1. **Parallel Workstreams:** Data engineering and Power BI development run concurrently in Sprint 2 — DE builds ETL in Week 3 while PBI starts DAX measures; Views 1 & 2 built in Week 4 after data is flowing
2. **Reduced UAT Window:** UAT condensed to 2 days (Mar 8-9) vs. original 1 week
3. **Combined Testing:** QA and UAT partially overlap in Sprint 3
4. **Documentation in Parallel:** User guide created alongside View 3 development
5. **Daily Standups:** Required during Sprints 2 and 3 to manage dependencies
6. **No Buffer Sprint:** All 3 sprints are back-to-back with no gap between them

---

## Definition of Done — D11

The D11 deliverable is complete when:

- [ ] 10 adoption metrics defined and documented with DAX calculations
- [ ] 5 Acme data sources integrated with automated daily refresh
- [ ] Reporting structure documented by tool and business function
- [ ] Star schema implemented (5 dimensions + 2 fact tables + 7 relationships)
- [ ] 1 Power BI dashboard with 3 fully populated views
- [ ] Row-Level Security implemented and tested (Admin, BU Leader, Viewer)
- [ ] Global filters (date range, business unit) working across all views
- [ ] Drill-through navigation working between views
- [ ] CSV export functional on data tables
- [ ] All views load in < 5 seconds
- [ ] User documentation complete (user guide, data dictionary, DAX reference)
- [ ] UAT sign-off obtained from AI Governance team
- [ ] Production deployment complete with daily refresh configured
- [ ] Training sessions conducted for Governance team and BU leaders
- [ ] Handoff documentation delivered to support team

---

## Sprint Backlog Traceability

| Sprint | Task | Related User Stories |
|--------|------|---------------------|
| Sprint 1 | 1.1 Kickoff & Requirements | US-001, US-006, US-007 |
| Sprint 1 | 1.2 Data Source Identification | US-002, US-004 |
| Sprint 1 | 1.3 Data Profiling | US-003 |
| Sprint 1 | 1.4 Prototype Review | US-005 |
| Sprint 1 | 1.5 Star Schema & Dimensions | US-008, US-009 |
| Sprint 2 | 2.1 ETL Pipeline | US-010, US-011, US-012 |
| Sprint 2 | 2.2 DAX Measures | US-013, US-014, US-015, US-016 |
| Sprint 2 | 2.3 Row-Level Security | US-017 |
| Sprint 2 | 2.4 View 1 Executive Summary | US-018, US-019 |
| Sprint 2 | 2.5 View 2 BU Deep-Dive | US-020 |
| Sprint 2 | 2.6 Global Filters | US-022 |
| Sprint 3 | 3.1 View 3 Use Case Analysis | US-021 |
| Sprint 3 | 3.2 Export & Performance | US-023, US-028 |
| Sprint 3 | 3.3 QA Testing | US-026, US-027, US-029, US-030 |
| Sprint 3 | 3.4 UAT & Sign-off | US-031, US-032, US-034 |
| Sprint 3 | 3.5 Defect Resolution | US-033 |
| Sprint 3 | 3.6 Production Deployment | US-035, US-036, US-037 |
| Sprint 3 | 3.7 Docs, Training & Handoff | US-038, US-039, US-040, US-041 |

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor (CTO) | | | |
| AI Governance Lead | | | |
| Project Manager | | | |

---

*Document Created: February 3, 2026*
*Last Updated: February 12, 2026*
*Delivery Target: March 10, 2026*
