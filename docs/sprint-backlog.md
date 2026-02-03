# Sprint Backlog

## Project: Enterprise AI Adoption Dashboard
**Client:** Acme Corporation
**Sponsor:** CTO / AI Governance Team
**Total Duration:** 8 weeks
**Total Budget:** $79,150

---

## Phase 1: Discovery & Data Engineering (Weeks 1-2)
**Team Active:** PM, Data Engineer, Power BI Lead, UX Designer

### Sprint 1 (Weeks 1-2)

| ID | User Story | Acceptance Criteria | Owner | Est. Hours | Status |
|----|------------|---------------------|-------|------------|--------|
| US-001 | As the AI Governance team, I need a kickoff meeting so that project goals and timeline are aligned | Kickoff deck delivered; meeting minutes captured; RACI confirmed | PM | 4 | To Do |
| US-002 | As a Data Engineer, I need to identify Enterprise AI telemetry data sources so that we understand what data is available | AWS Bedrock log location documented; available fields cataloged | DE | 8 | To Do |
| US-003 | As a Data Engineer, I need to assess data quality from Enterprise AI logs so that we can identify any data gaps | Data profiling report delivered; quality issues documented | DE | 8 | To Do |
| US-004 | As a Data Engineer, I need to identify HR/employee data source so that we can map users to business units | HR system access confirmed; business unit hierarchy documented | DE | 4 | To Do |
| US-005 | As the AI Governance team, I need to review the HTML prototype so that dashboard layout is validated | Prototype reviewed; feedback documented; changes prioritized | UX | 8 | To Do |
| US-006 | As a PM, I need to document adoption targets by business unit so that we can measure against goals | Targets confirmed for all 14 business units; documented in requirements | PM | 4 | To Do |
| US-007 | As a PM, I need requirements sign-off so that scope is locked | Requirements document signed by Governance team and CTO sponsor | PM | 4 | To Do |
| US-008 | As a Data Engineer, I need to design the star schema so that the data model is optimized for analytics | Star schema ERD approved; DimUser, DimBusinessUnit, DimTaskType, DimDate, FactSession defined | DE | 16 | To Do |
| US-009 | As a Data Engineer, I need to create dimension tables so that reference data is structured | All dimension tables created with sample data loaded | DE | 8 | To Do |

**Sprint 1 Milestone:** Requirements signed off, prototype feedback incorporated, data model design complete

---

## Phase 2: Data Pipeline & Core Build (Weeks 3-4)
**Team Active:** PM, Data Engineer, Power BI Lead

### Sprint 2 (Weeks 3-4)

| ID | User Story | Acceptance Criteria | Owner | Est. Hours | Status |
|----|------------|---------------------|-------|------------|--------|
| US-010 | As a Data Engineer, I need to build ETL for Enterprise AI session data so that telemetry flows into the data model | ETL extracts session data from AWS; incremental refresh configured | DE | 16 | To Do |
| US-011 | As a Data Engineer, I need to build ETL for user/business unit mapping so that sessions can be attributed | User-to-BU mapping populated; refresh schedule configured | DE | 8 | To Do |
| US-012 | As a Data Engineer, I need to configure daily scheduled refresh so that dashboard shows current data | Scheduled refresh running daily; failure alerts configured | DE | 4 | To Do |
| US-013 | As a Power BI Lead, I need to create core DAX measures so that KPIs can be calculated | Measures: Active Users, Adoption Rate, Session Count, Avg Sessions/User created | PBI | 8 | To Do |
| US-014 | As a Power BI Lead, I need to create engagement tier measures so that users can be classified | Engagement tier logic (Inactive, Tried, Regular, Power User) implemented | PBI | 4 | To Do |
| US-015 | As a Power BI Lead, I need to create target comparison measures so that adoption vs target can be shown | Target status measure (Above/On-Track/Below) working | PBI | 4 | To Do |
| US-016 | As a Power BI Lead, I need to create period-over-period measures so that trends can be calculated | MoM and YoY comparison measures working | PBI | 4 | To Do |
| US-017 | As a Power BI Lead, I need to implement RLS so that data access is controlled | RLS roles (Admin, BU Leader, Viewer) configured and tested | PBI | 8 | To Do |
| US-018 | As a Power BI Lead, I need to build View 1: Executive Summary so that overall adoption is visible | All 4 KPI cards, adoption trend, BU adoption bar chart, task type donut working | PBI | 24 | To Do |
| US-019 | As a Power BI Lead, I need to configure drill-through from View 1 so that users can explore details | Click on BU bar navigates to View 2; click on task type navigates to View 3 | PBI | 4 | To Do |

**Sprint 2 Milestone:** Data pipeline operational, View 1 complete, DAX measures documented

---

## Phase 3: Dashboard Completion & Testing (Weeks 5-6)
**Team Active:** PM, Power BI Lead, QA Analyst (begins Week 6), UX Designer

### Sprint 3 (Weeks 5-6)

| ID | User Story | Acceptance Criteria | Owner | Est. Hours | Status |
|----|------------|---------------------|-------|------------|--------|
| US-020 | As a Power BI Lead, I need to build View 2: Business Unit Deep-Dive so that unit-level adoption is visible | BU selector, unit KPIs, adoption funnel, user table all working | PBI | 24 | To Do |
| US-021 | As a Power BI Lead, I need to build View 3: Use Case Analysis so that task patterns are visible | Heatmap, task type trend, outcome donut, scenarios table all working | PBI | 24 | To Do |
| US-022 | As a Power BI Lead, I need to add global filters so that users can slice by date range and business unit | Date range picker and BU filter affecting all views | PBI | 4 | To Do |
| US-023 | As a Power BI Lead, I need to add export functionality so that users can download data | Export to CSV working on all tables | PBI | 4 | To Do |
| US-024 | As a UX Designer, I need to conduct design review so that visual consistency is ensured | Color palette, fonts, spacing consistent across all views | UX | 8 | To Do |
| US-025 | As a UX Designer, I need to validate accessibility so that dashboard meets WCAG standards | Color contrast checked; alt text added; keyboard navigation tested | UX | 4 | To Do |
| US-026 | As a QA Analyst, I need to create test cases so that all functionality can be verified | Test cases for all 3 views, filters, drill-throughs documented | QA | 8 | To Do |
| US-027 | As a QA Analyst, I need to execute functional tests so that defects are identified | All test cases executed; defects logged | QA | 12 | To Do |
| US-028 | As a Power BI Lead, I need to optimize performance so that dashboard loads in <5 seconds | Performance analyzer run; slow queries optimized | PBI | 8 | To Do |

**Sprint 3 Milestone:** All 3 views complete, QA testing complete, dashboard development done

---

## Phase 4: UAT & Deployment (Weeks 7-8)
**Team Active:** PM, Power BI Lead, QA Analyst

### Sprint 4 (Weeks 7-8)

| ID | User Story | Acceptance Criteria | Owner | Est. Hours | Status |
|----|------------|---------------------|-------|------------|--------|
| US-029 | As a QA Analyst, I need to validate data accuracy so that KPIs match source systems | KPI calculations verified against source data; discrepancies resolved | QA | 8 | To Do |
| US-030 | As a QA Analyst, I need to test RLS so that data access is properly restricted | RLS tested with users from different business units | QA | 4 | To Do |
| US-031 | As a PM, I need to prepare UAT environment so that Governance team can test | UAT workspace configured; test users provisioned | PM | 4 | To Do |
| US-032 | As a PM, I need to conduct UAT sessions so that business validation is complete | UAT sessions with Governance team; feedback captured | PM | 8 | To Do |
| US-033 | As a Power BI Lead, I need to fix UAT defects so that dashboard is production-ready | Critical/high defects resolved; retested and verified | PBI | 12 | To Do |
| US-034 | As a PM, I need to obtain UAT sign-off so that deployment can proceed | UAT sign-off document executed by Governance team | PM | 2 | To Do |
| US-035 | As a Power BI Lead, I need to deploy to production so that dashboard is live | Dashboard published to production workspace | PBI | 4 | To Do |
| US-036 | As a Power BI Lead, I need to configure production refresh so that data stays current | Production scheduled refresh running; alerts configured | PBI | 2 | To Do |
| US-037 | As a PM, I need to provision user access so that stakeholders can view dashboard | Access granted to Governance team and BU leaders per access matrix | PM | 4 | To Do |
| US-038 | As a Power BI Lead, I need to create user documentation so that users can self-serve | User guide with screenshots; FAQ document | PBI | 8 | To Do |
| US-039 | As a Power BI Lead, I need to conduct training so that users know how to use the dashboard | Training sessions for Governance team and BU leaders conducted | PBI | 4 | To Do |
| US-040 | As a PM, I need to complete knowledge transfer so that support team can maintain | Technical documentation complete; support team trained | PM | 4 | To Do |
| US-041 | As a PM, I need to close out the project so that lessons are captured | Retrospective conducted; lessons learned documented; sign-off obtained | PM | 4 | To Do |

**Sprint 4 Milestone:** UAT complete, production deployment, training complete, project closed

---

## Backlog Summary

| Phase | Weeks | User Stories | Total Est. Hours |
|-------|-------|--------------|------------------|
| Discovery & Data Engineering | 1-2 | 9 | 64 |
| Data Pipeline & Core Build | 3-4 | 10 | 84 |
| Dashboard Completion & Testing | 5-6 | 9 | 96 |
| UAT & Deployment | 7-8 | 13 | 68 |
| **Total** | **1-8** | **41** | **312** |

---

## Team Capacity by Sprint

| Role | Sprint 1 | Sprint 2 | Sprint 3 | Sprint 4 | Total |
|------|----------|----------|----------|----------|-------|
| Project Manager | 12 hrs | 0 hrs | 0 hrs | 26 hrs | 38 hrs |
| Data Engineer | 44 hrs | 28 hrs | 0 hrs | 0 hrs | 72 hrs |
| Power BI Lead | 0 hrs | 56 hrs | 64 hrs | 30 hrs | 150 hrs |
| UX Designer | 8 hrs | 0 hrs | 12 hrs | 0 hrs | 20 hrs |
| QA Analyst | 0 hrs | 0 hrs | 20 hrs | 12 hrs | 32 hrs |

---

## Definition of Ready (DoR)

A user story is ready for sprint when:
- [ ] Acceptance criteria are clearly defined
- [ ] Dependencies are identified and resolved
- [ ] Estimate is agreed by the team
- [ ] Required access/permissions are in place
- [ ] No blockers exist

## Definition of Done (DoD)

A user story is done when:
- [ ] All acceptance criteria are met
- [ ] Code/configuration is committed
- [ ] Documentation is updated (if applicable)
- [ ] Peer review completed (if applicable)
- [ ] QA verified (if applicable)
- [ ] Stakeholder demo completed (if applicable)

---

## Velocity Tracking

| Sprint | Planned (hrs) | Completed (hrs) | Velocity |
|--------|---------------|-----------------|----------|
| Sprint 1 | 64 | - | - |
| Sprint 2 | 84 | - | - |
| Sprint 3 | 96 | - | - |
| Sprint 4 | 68 | - | - |

---

## Story Point Reference

| Points | Effort | Hours |
|--------|--------|-------|
| 1 | Trivial | 1-2 |
| 2 | Small | 3-4 |
| 3 | Medium | 5-8 |
| 5 | Large | 9-16 |
| 8 | X-Large | 17-24 |
| 13 | Epic (split required) | 25+ |
