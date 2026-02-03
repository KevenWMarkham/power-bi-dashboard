# D11 Sprint Plan - Measurement & Adoption Scorecard

**Deliverable:** D11 - Measurement & Adoption Scorecard MVP
**Client:** Acme Corporation
**Sponsor:** CTO / AI Governance Team
**Delivery Date:** March 10, 2026 (Previously March 27, 2026)
**Duration:** 5 Weeks
**Start Date:** February 3, 2026

---

## Deliverable Requirements

| Requirement | Description | Status |
|-------------|-------------|--------|
| Scorecard Design | Fully designed AI adoption scorecard by tool and by function | To Do |
| Metrics | Up to 10 defined metrics | To Do |
| Data Sources | Data from up to 5 Acme systems | To Do |
| Reporting Structure | Defined reporting hierarchy | To Do |
| Dashboard | 1 screen with 3 populated views in Power BI | To Do |
| Documentation | Documentation for repeatable use | To Do |

---

## Sprint Schedule Overview

| Sprint | Dates | Duration | Focus |
|--------|-------|----------|-------|
| Sprint 1 | Feb 3 - Feb 14 | 2 weeks | Discovery, Data Engineering, Data Model |
| Sprint 2 | Feb 17 - Feb 28 | 2 weeks | Core Build, Views 1 & 2, DAX Measures |
| Sprint 3 | Mar 3 - Mar 10 | 1 week | View 3, Testing, UAT, Deployment |

---

## Sprint 1: Discovery & Data Engineering
**Dates:** February 3 - February 14, 2026
**Focus:** Requirements, Data Sources, Data Model

### Week 1 (Feb 3-7)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S1-001 | Kickoff meeting with AI Governance team | PM | 2 | To Do |
| S1-002 | Define 10 adoption metrics with stakeholders | PM | 4 | To Do |
| S1-003 | Document reporting structure by function/tool | PM | 4 | To Do |
| S1-004 | Identify 5 Acme data source systems | DE | 8 | To Do |
| S1-005 | Obtain data access for all source systems | DE | 4 | To Do |
| S1-006 | Review/update HTML prototype with stakeholders | UX | 4 | To Do |

### Week 2 (Feb 10-14)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S1-007 | Data profiling for all 5 source systems | DE | 8 | To Do |
| S1-008 | Document data quality findings | DE | 4 | To Do |
| S1-009 | Design star schema (Dims + Facts) | DE | 8 | To Do |
| S1-010 | Create dimension tables | DE | 8 | To Do |
| S1-011 | Requirements sign-off from Governance team | PM | 2 | To Do |
| S1-012 | Finalize metric definitions document | PM | 4 | To Do |

**Sprint 1 Deliverables:**
- [ ] 10 metrics defined and documented
- [ ] 5 data sources identified and access obtained
- [ ] Reporting structure documented
- [ ] Star schema design complete
- [ ] Requirements signed off

**Sprint 1 Hours:** 60 hours

---

## Sprint 2: Core Build & Views 1-2
**Dates:** February 17 - February 28, 2026
**Focus:** ETL Pipeline, DAX Measures, Executive Summary & Business Unit Views

### Week 3 (Feb 17-21)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S2-001 | Build ETL for Enterprise AI telemetry data | DE | 8 | To Do |
| S2-002 | Build ETL for HR/employee mapping | DE | 4 | To Do |
| S2-003 | Build ETL for remaining 3 data sources | DE | 8 | To Do |
| S2-004 | Configure daily scheduled refresh | DE | 4 | To Do |
| S2-005 | Create core DAX measures (10 metrics) | PBI | 8 | To Do |
| S2-006 | Create engagement tier measures | PBI | 4 | To Do |
| S2-007 | Create target comparison measures | PBI | 4 | To Do |

### Week 4 (Feb 24-28)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S2-008 | Implement Row-Level Security | PBI | 6 | To Do |
| S2-009 | Build View 1: Executive Summary | PBI | 16 | To Do |
| S2-010 | Build View 2: Business Unit Deep-Dive | PBI | 16 | To Do |
| S2-011 | Configure drill-through navigation | PBI | 4 | To Do |
| S2-012 | Add global filters (date, BU) | PBI | 4 | To Do |
| S2-013 | Internal demo & feedback | PM | 2 | To Do |

**Sprint 2 Deliverables:**
- [ ] All 5 data sources integrated
- [ ] ETL pipeline operational with daily refresh
- [ ] 10 DAX measures complete
- [ ] View 1: Executive Summary complete
- [ ] View 2: Business Unit Deep-Dive complete
- [ ] RLS implemented

**Sprint 2 Hours:** 88 hours

---

## Sprint 3: Completion, Testing & Deployment
**Dates:** March 3 - March 10, 2026
**Focus:** View 3, QA Testing, UAT, Documentation, Deployment

### Week 5 (Mar 3-7)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S3-001 | Build View 3: Use Case Analysis | PBI | 16 | To Do |
| S3-002 | Add export functionality (CSV) | PBI | 2 | To Do |
| S3-003 | Performance optimization | PBI | 4 | To Do |
| S3-004 | Execute functional test cases | QA | 8 | To Do |
| S3-005 | Execute data validation tests | QA | 4 | To Do |
| S3-006 | Create user documentation | PBI | 4 | To Do |

### Final Days (Mar 8-10)

| ID | Task | Owner | Est. Hrs | Status |
|----|------|-------|----------|--------|
| S3-007 | Conduct UAT with Governance team | PM | 4 | To Do |
| S3-008 | Fix critical UAT defects | PBI | 4 | To Do |
| S3-009 | UAT sign-off | PM | 1 | To Do |
| S3-010 | Deploy to production workspace | PBI | 2 | To Do |
| S3-011 | Configure production refresh | PBI | 1 | To Do |
| S3-012 | Provision user access | PM | 2 | To Do |
| S3-013 | Conduct training session | PBI | 2 | To Do |
| S3-014 | Final documentation handoff | PM | 2 | To Do |

**Sprint 3 Deliverables:**
- [ ] View 3: Use Case Analysis complete
- [ ] All 3 views tested and validated
- [ ] UAT sign-off obtained
- [ ] Production deployment complete
- [ ] User documentation delivered
- [ ] Training conducted

**Sprint 3 Hours:** 56 hours

---

## 10 Defined Metrics

| # | Metric Name | Description | View |
|---|-------------|-------------|------|
| 1 | Total Active Users | Users with 1+ sessions in period | V1, V2 |
| 2 | Adoption Rate | Active users / Licensed users | V1, V2 |
| 3 | Total Sessions | Count of all sessions | V1, V2 |
| 4 | Avg Sessions per User | Sessions / Active users | V1, V2 |
| 5 | Adoption vs Target | Current rate vs target rate | V1, V2 |
| 6 | Engagement Tier Distribution | Power User / Regular / Tried / Inactive | V2 |
| 7 | Month-over-Month Growth | % change from previous month | V1 |
| 8 | Top Task Type | Most used task category | V2, V3 |
| 9 | Business Outcome Distribution | Sessions by outcome category | V1, V3 |
| 10 | Task Type Growth Rate | Fastest growing use case | V3 |

---

## 5 Acme Data Sources

| # | System | Data | Refresh | Priority |
|---|--------|------|---------|----------|
| 1 | Enterprise AI Telemetry (AWS Bedrock) | Session logs, queries, responses | Daily | P1 |
| 2 | HR System (Workday) | Employee data, business unit mapping | Daily | P1 |
| 3 | License Management | Licensed users by tool/function | Weekly | P2 |
| 4 | Azure AD | User authentication, login data | Daily | P2 |
| 5 | Adoption Targets DB | Target rates by BU/function | Monthly | P3 |

---

## Resource Allocation

| Role | Sprint 1 | Sprint 2 | Sprint 3 | Total |
|------|----------|----------|----------|-------|
| Project Manager | 16 hrs | 2 hrs | 9 hrs | 27 hrs |
| Data Engineer | 40 hrs | 24 hrs | 0 hrs | 64 hrs |
| Power BI Lead | 0 hrs | 58 hrs | 35 hrs | 93 hrs |
| UX Designer | 4 hrs | 0 hrs | 0 hrs | 4 hrs |
| QA Analyst | 0 hrs | 0 hrs | 12 hrs | 12 hrs |
| **Total** | **60 hrs** | **84 hrs** | **56 hrs** | **200 hrs** |

---

## Key Milestones

| Milestone | Date | Criteria |
|-----------|------|----------|
| M1: Requirements Complete | Feb 14 | 10 metrics defined, 5 sources identified, sign-off |
| M2: Data Pipeline Live | Feb 21 | All ETL operational, daily refresh working |
| M3: Views 1 & 2 Complete | Feb 28 | Executive & BU views ready for testing |
| M4: All Views Complete | Mar 5 | View 3 complete, all functionality working |
| M5: UAT Sign-off | Mar 9 | Governance team approval |
| M6: Production Deployment | Mar 10 | Dashboard live, users trained |

---

## Risk Register

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Data source access delays | High | Medium | Start access requests Day 1, escalate early |
| Data quality issues | High | Medium | Profile data in Week 2, document workarounds |
| Compressed timeline (5 weeks vs 8) | High | High | Parallel workstreams, daily standups, scope control |
| UAT stakeholder availability | Medium | Medium | Schedule UAT sessions by Feb 21 |
| Performance issues | Medium | Low | Test with full data by Feb 28 |

---

## Accelerated Timeline Adjustments

Due to the compressed 5-week timeline (vs. original 8 weeks), the following adjustments apply:

1. **Parallel Workstreams:** Data engineering and Power BI development run concurrently in Sprint 2
2. **Reduced UAT Window:** UAT condensed to 2 days (Mar 8-9) vs. original 1 week
3. **Combined Testing:** QA and UAT partially overlap in Sprint 3
4. **Documentation:** User guide created in parallel with View 3 development
5. **Daily Standups:** Required during Sprints 2 and 3 to manage dependencies

---

## Definition of Done - D11

The D11 deliverable is complete when:

- [ ] 10 metrics defined and documented with calculations
- [ ] 5 Acme data sources integrated with automated refresh
- [ ] Reporting structure documented by tool and function
- [ ] 1 Power BI dashboard with 3 fully populated views
- [ ] Row-level security implemented and tested
- [ ] User documentation complete
- [ ] UAT sign-off obtained from AI Governance team
- [ ] Production deployment complete
- [ ] Training session conducted
- [ ] Handoff documentation delivered

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Project Sponsor | | | |
| AI Governance Lead | | | |
| Project Manager | | | |

---

*Document Created: February 3, 2026*
*Delivery Target: March 10, 2026*
