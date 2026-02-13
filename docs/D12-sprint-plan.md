# D12 Sprint Plan - Post-MVP Enhancement & ToyotaGPT Prompt Intelligence

**Deliverable:** D12 - Post-MVP Enhancement & ToyotaGPT Integration
**Client:** Acme Corporation
**Sponsor:** CTO / AI Governance Team
**Baseline:** D11 MVP (Delivered March 10, 2026)
**Start Date:** March 16, 2026
**Duration:** 8 Weeks (4 Sprints)
**End Date:** May 8, 2026

---

## D12 Objectives

1. Integrate ToyotaGPT prompt telemetry as a new data source
2. Build prompt categorization taxonomy and intent classification pipeline
3. Deliver View 4: Prompt Intelligence dashboard view
4. Conduct gap analysis between user intent and ToyotaGPT response coverage
5. Enable cross-platform correlation between Enterprise AI and ToyotaGPT usage
6. Harden and refine D11 MVP based on post-launch feedback

---

## D12 Deliverable Requirements

| Requirement | Description | Status |
|-------------|-------------|--------|
| ToyotaGPT Data Discovery | Identify and gain access to ToyotaGPT prompt/response log data | To Do |
| Prompt Taxonomy | Define and validate prompt categorization taxonomy (8 categories) | To Do |
| Data Pipeline | ETL for ToyotaGPT prompt logs with anonymization and daily refresh | To Do |
| Prompt Analytics Measures | DAX measures for prompt volume, themes, satisfaction, gaps | To Do |
| View 4: Prompt Intelligence | New dashboard view with 4 KPI cards and 6+ visuals | To Do |
| Gap Analysis | Response coverage gap analysis with recommendations | To Do |
| Cross-Platform Correlation | Link ToyotaGPT usage patterns with Enterprise AI adoption | To Do |
| Extended UAT | Use-case-based acceptance testing covering all 4 views | To Do |
| Documentation Update | Updated user guide, data dictionary, and training materials | To Do |

---

## Sprint Schedule Overview

| Sprint | Dates | Duration | Focus |
|--------|-------|----------|-------|
| Sprint 5 | Mar 16 - Mar 27 | 2 weeks | ToyotaGPT Discovery, Data Assessment, Taxonomy Design |
| Sprint 6 | Mar 30 - Apr 10 | 2 weeks | ToyotaGPT Data Pipeline, Prompt Analytics Measures |
| Sprint 7 | Apr 13 - Apr 24 | 2 weeks | View 4 Build, Cross-Platform Integration, UX Review |
| Sprint 8 | Apr 27 - May 8 | 2 weeks | Testing, UAT, Production Deployment, Documentation |

---

## Sprint 5: ToyotaGPT Discovery & Data Assessment

**Dates:** March 16 - March 27, 2026
**Focus:** Data source discovery, prompt taxonomy design, data model extension
**Team Active:** PM, Data Engineer, UX Designer

### Task 5.1: ToyotaGPT Stakeholder Alignment
**Owner:** PM | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 5.1.1 | Conduct kickoff meeting with Toyota AI Platform Team to define data sharing scope | 2 | To Do |
| 5.1.2 | Document ToyotaGPT deployment architecture (Custom GPT, OpenAI API, logging layer) | 4 | To Do |
| 5.1.3 | Identify data owners and establish access request process for prompt logs | 2 | To Do |
| 5.1.4 | Define data privacy and anonymization requirements with Legal/Compliance | 2 | To Do |
| 5.1.5 | Obtain formal data sharing agreement sign-off | 2 | To Do |

**Acceptance:** Data sharing agreement signed; ToyotaGPT architecture documented; data owners identified.

### Task 5.2: ToyotaGPT Data Source Assessment
**Owner:** DE | **Estimate:** 20 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 5.2.1 | Identify ToyotaGPT prompt log location and access method (API, export, log store) | 4 | To Do |
| 5.2.2 | Document available data fields from prompt logs (timestamp, user ID, prompt text, response, rating) | 4 | To Do |
| 5.2.3 | Identify ToyotaGPT response/feedback log data (thumbs up/down, ratings, follow-ups) | 4 | To Do |
| 5.2.4 | Assess data quality: completeness, consistency, volume, date range coverage | 4 | To Do |
| 5.2.5 | Document data refresh capabilities and latency constraints | 2 | To Do |
| 5.2.6 | Create sample data extract for taxonomy design and prototyping | 2 | To Do |

**Acceptance:** All ToyotaGPT data fields cataloged; data quality report delivered; sample extract available.

### Task 5.3: Prompt Categorization Taxonomy Design
**Owner:** PM / UX | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 5.3.1 | Analyze sample prompt data to identify recurring themes and patterns | 4 | To Do |
| 5.3.2 | Draft prompt categorization taxonomy (8 categories: Technical Support, Policy Lookup, Process Guidance, Data & Reporting, Training & Development, Product & Engineering, Customer & Dealer Support, General Knowledge) | 4 | To Do |
| 5.3.3 | Define intent classification levels (informational, transactional, navigational) | 2 | To Do |
| 5.3.4 | Define prompt complexity levels (simple lookup, multi-step reasoning, creative) | 2 | To Do |
| 5.3.5 | Validate taxonomy with AI Governance team and Toyota stakeholders | 2 | To Do |
| 5.3.6 | Finalize and document taxonomy with examples and classification rules | 2 | To Do |

**Acceptance:** Taxonomy validated by stakeholders; 8 categories defined with examples; classification rules documented.

### Task 5.4: Data Model Extension Design
**Owner:** DE | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 5.4.1 | Design DimPromptCategory dimension table (taxonomy categories, intent types, complexity levels) | 2 | To Do |
| 5.4.2 | Design DimToyotaDepartment dimension table (Toyota org mapping) | 2 | To Do |
| 5.4.3 | Design FactPrompt fact table (prompt ID, user ID, timestamp, category, intent, complexity, satisfaction) | 4 | To Do |
| 5.4.4 | Design FactPromptDaily aggregation table (daily rollups by category/department) | 2 | To Do |
| 5.4.5 | Update star schema ERD with new tables and relationships | 2 | To Do |

**Acceptance:** Extended star schema ERD approved; new dimension and fact tables designed; relationships documented.

### Task 5.5: D11 MVP Post-Launch Feedback Collection
**Owner:** PM | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 5.5.1 | Collect post-launch feedback from AI Governance team on Views 1-3 | 2 | To Do |
| 5.5.2 | Collect feedback from BU Leaders on data accuracy and usability | 2 | To Do |
| 5.5.3 | Prioritize enhancement requests and bug fixes from D11 MVP | 2 | To Do |
| 5.5.4 | Document deferred items and incorporate into D12 scope | 2 | To Do |

**Acceptance:** Feedback collected from all stakeholder groups; enhancement backlog prioritized; D11 bugs triaged.

**Sprint 5 Total: 68 hrs**

**Sprint 5 Milestone:** ToyotaGPT data access secured, taxonomy approved, data model extension designed, D11 feedback captured.

---

## Sprint 6: ToyotaGPT Data Pipeline & Prompt Analytics

**Dates:** March 30 - April 10, 2026
**Focus:** ETL development, prompt classification pipeline, DAX measures, D11 refinements
**Team Active:** Data Engineer, Power BI Lead, PM

### Task 6.1: ToyotaGPT Data Pipeline Development
**Owner:** DE | **Estimate:** 28 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 6.1.1 | Set up connection to ToyotaGPT prompt log source (API/export) | 4 | To Do |
| 6.1.2 | Build ETL for prompt data extraction with PII anonymization | 8 | To Do |
| 6.1.3 | Build ETL for response/feedback data extraction | 4 | To Do |
| 6.1.4 | Set up connection to Toyota HR/department mapping data | 4 | To Do |
| 6.1.5 | Implement prompt auto-classification pipeline (keyword + LLM-based categorization) | 4 | To Do |
| 6.1.6 | Configure incremental refresh for ToyotaGPT data (daily) | 2 | To Do |
| 6.1.7 | Test data pipeline end-to-end with production data | 2 | To Do |

**Acceptance:** ETL operational; prompt data flowing daily with anonymization; auto-classification accuracy >85%; refresh alerts configured.

### Task 6.2: Create New Dimension & Fact Tables
**Owner:** DE | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 6.2.1 | Create DimPromptCategory table with taxonomy data | 2 | To Do |
| 6.2.2 | Create DimToyotaDepartment table with org hierarchy | 2 | To Do |
| 6.2.3 | Create FactPrompt table with classified prompt records | 4 | To Do |
| 6.2.4 | Create FactPromptDaily aggregation table | 2 | To Do |
| 6.2.5 | Validate table relationships and referential integrity | 2 | To Do |

**Acceptance:** All tables created, populated with data, relationships validated, sample queries returning correct results.

### Task 6.3: Prompt Analytics DAX Measures
**Owner:** PBI | **Estimate:** 20 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 6.3.1 | Create measure: Total Prompt Volume (with period filter) | 2 | To Do |
| 6.3.2 | Create measure: Unique ToyotaGPT Users | 2 | To Do |
| 6.3.3 | Create measure: Top Prompt Category (mode by volume) | 2 | To Do |
| 6.3.4 | Create measure: Avg Response Satisfaction (rating/thumbs-up rate) | 2 | To Do |
| 6.3.5 | Create measure: Prompt Volume MoM Growth | 2 | To Do |
| 6.3.6 | Create measure: Category Distribution % | 2 | To Do |
| 6.3.7 | Create measure: Response Gap Score (high demand / low satisfaction ratio) | 4 | To Do |
| 6.3.8 | Create measure: Prompt Complexity Distribution | 2 | To Do |
| 6.3.9 | Document all new DAX measures in dax-measures.md | 2 | To Do |

**Acceptance:** All 8 measures created and returning accurate values; measures documented with calculation logic.

### Task 6.4: D11 MVP Refinements
**Owner:** PBI | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 6.4.1 | Fix critical/high bugs identified in D11 post-launch feedback | 4 | To Do |
| 6.4.2 | Implement approved enhancement requests for Views 1-3 | 4 | To Do |
| 6.4.3 | Optimize slow-running DAX measures identified in production | 2 | To Do |
| 6.4.4 | Update RLS rules if new roles/departments identified | 2 | To Do |

**Acceptance:** All critical/high D11 bugs resolved; approved enhancements implemented; performance within SLA.

**Sprint 6 Total: 72 hrs**

**Sprint 6 Milestone:** ToyotaGPT data pipeline operational, prompt classification running, all DAX measures complete, D11 bugs fixed.

---

## Sprint 7: View 4 Build & Cross-Platform Integration

**Dates:** April 13 - April 24, 2026
**Focus:** Prompt Intelligence dashboard view, cross-platform correlation, UX review
**Team Active:** Power BI Lead, UX Designer, PM

### Task 7.1: View 4 — Prompt Intelligence Build
**Owner:** PBI | **Estimate:** 32 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 7.1.1 | Create View 4 page layout and navigation (add tab to existing dashboard) | 2 | To Do |
| 7.1.2 | Build KPI card: Total Prompt Volume with trend indicator | 2 | To Do |
| 7.1.3 | Build KPI card: Unique ToyotaGPT Users | 2 | To Do |
| 7.1.4 | Build KPI card: Top Prompt Category | 2 | To Do |
| 7.1.5 | Build KPI card: Avg Response Satisfaction | 2 | To Do |
| 7.1.6 | Build Prompt Theme Distribution donut chart | 4 | To Do |
| 7.1.7 | Build Prompt Volume Trend line chart (daily/weekly/monthly toggle) | 4 | To Do |
| 7.1.8 | Build Intent Category x Department Heatmap | 4 | To Do |
| 7.1.9 | Build Top Prompt Themes Table (volume, trend, satisfaction columns) | 4 | To Do |
| 7.1.10 | Build Response Gap Analysis visual (demand vs coverage scatter/bar) | 4 | To Do |
| 7.1.11 | Build Prompt Complexity Distribution chart | 2 | To Do |

**Acceptance:** All 4 KPI cards and 6 visuals rendering with live ToyotaGPT data; filters working; layout consistent with Views 1-3.

### Task 7.2: Cross-Platform Integration
**Owner:** PBI | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 7.2.1 | Configure drill-through from View 4 prompt theme to anonymized example detail | 2 | To Do |
| 7.2.2 | Build cross-filter linking View 4 department filter to View 1/View 2 BU data | 4 | To Do |
| 7.2.3 | Add ToyotaGPT usage summary card to View 1 Executive Summary | 2 | To Do |
| 7.2.4 | Enable global date range and department filters to apply across all 4 views | 2 | To Do |
| 7.2.5 | Test cross-platform data integrity (no data leakage, correct RLS) | 2 | To Do |

**Acceptance:** Cross-filtering works between all views; ToyotaGPT summary visible on View 1; RLS enforced across all views.

### Task 7.3: Gap Analysis Report Build
**Owner:** PBI / PM | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 7.3.1 | Build gap analysis visual: demand vs coverage by category | 4 | To Do |
| 7.3.2 | Create Top 10 Unmet Needs ranked list visual | 2 | To Do |
| 7.3.3 | Add gap trend tracking (are gaps closing over time?) | 2 | To Do |
| 7.3.4 | Draft recommendations section for ToyotaGPT knowledge base improvements | 4 | To Do |

**Acceptance:** Gap analysis visual shows clear demand-coverage mismatches; top 10 unmet needs listed; recommendations documented.

### Task 7.4: UX Review & Accessibility
**Owner:** UX | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 7.4.1 | Review View 4 visual consistency with Views 1-3 (colors, fonts, spacing) | 2 | To Do |
| 7.4.2 | Validate color palette accessibility (WCAG 2.1 AA contrast ratios) | 2 | To Do |
| 7.4.3 | Review tooltip content and formatting for View 4 visuals | 2 | To Do |
| 7.4.4 | Test filter interactions and cross-filtering across all 4 views | 2 | To Do |
| 7.4.5 | Validate keyboard navigation and screen reader compatibility | 2 | To Do |
| 7.4.6 | Document UX feedback and implement priority changes | 2 | To Do |

**Acceptance:** View 4 visually consistent with existing views; WCAG AA compliant; all interactions working.

### Task 7.5: Performance Optimization
**Owner:** PBI | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 7.5.1 | Run Performance Analyzer on View 4 with full data volume | 2 | To Do |
| 7.5.2 | Optimize slow prompt analytics DAX queries | 2 | To Do |
| 7.5.3 | Configure aggregations for FactPrompt if needed | 2 | To Do |
| 7.5.4 | Validate <5 second load time across all 4 views | 2 | To Do |

**Acceptance:** All views load in <5 seconds; no visual refresh exceeds 3 seconds.

**Sprint 7 Total: 76 hrs**

**Sprint 7 Milestone:** View 4 complete, cross-platform integration working, gap analysis delivered, UX approved, performance validated.

---

## Sprint 8: Testing, UAT & Production Deployment

**Dates:** April 27 - May 8, 2026
**Focus:** QA testing, use-case-based UAT, production deployment, documentation
**Team Active:** QA Analyst, PM, Power BI Lead

### Task 8.1: Test Case Development
**Owner:** QA | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.1.1 | Create test cases for View 4: Prompt Intelligence (KPI cards, visuals, filters) | 4 | To Do |
| 8.1.2 | Create test cases for cross-platform filtering and drill-through | 2 | To Do |
| 8.1.3 | Create test cases for ToyotaGPT data accuracy and classification | 2 | To Do |
| 8.1.4 | Create test cases for prompt anonymization validation | 2 | To Do |
| 8.1.5 | Create test cases for RLS with ToyotaGPT data | 2 | To Do |

**Acceptance:** Test cases documented for all View 4 features, cross-platform flows, data accuracy, and security.

### Task 8.2: Functional & Data Validation Testing
**Owner:** QA | **Estimate:** 16 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.2.1 | Execute View 4 KPI card test cases | 2 | To Do |
| 8.2.2 | Execute View 4 visual and filter test cases | 4 | To Do |
| 8.2.3 | Execute cross-platform navigation and filtering test cases | 2 | To Do |
| 8.2.4 | Validate prompt classification accuracy against manual sample | 2 | To Do |
| 8.2.5 | Validate prompt anonymization (no PII in data model) | 2 | To Do |
| 8.2.6 | Validate RLS with ToyotaGPT data across roles | 2 | To Do |
| 8.2.7 | Document defects and verify fixes | 2 | To Do |

**Acceptance:** All test cases executed; critical/high defects resolved; data accuracy validated; no PII found in data model.

### Task 8.3: Use-Case-Based User Acceptance Testing
**Owner:** PM | **Estimate:** 20 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.3.1 | Prepare UAT environment with production-equivalent ToyotaGPT data | 2 | To Do |
| 8.3.2 | Create UAT scripts based on 7 defined use cases (UC-01 through UC-07) | 4 | To Do |
| 8.3.3 | **UAT Session 1 — UC-01:** Executive Reviews Enterprise AI Adoption (View 1 drill-through flow) | 2 | To Do |
| 8.3.4 | **UAT Session 2 — UC-02:** BU Leader Analyzes Unit Adoption (View 2 RLS and export) | 2 | To Do |
| 8.3.5 | **UAT Session 3 — UC-03:** Governance Team Analyzes Use Cases (View 3 filtering and heatmap) | 2 | To Do |
| 8.3.6 | **UAT Session 4 — UC-04:** Governance Team Reviews ToyotaGPT Prompt Themes (View 4 prompt analytics) | 2 | To Do |
| 8.3.7 | **UAT Session 5 — UC-05:** Governance Team Identifies Coverage Gaps (View 4 gap analysis) | 2 | To Do |
| 8.3.8 | **UAT Session 6 — UC-06:** Analyst Correlates Prompt Patterns with Adoption (cross-platform) | 1 | To Do |
| 8.3.9 | **UAT Session 7 — UC-07:** Manager Reviews Department Prompt Activity (View 4 RLS) | 1 | To Do |
| 8.3.10 | Document UAT feedback, prioritize fixes, implement critical changes | 2 | To Do |

**Acceptance:** All 7 use cases pass acceptance criteria; stakeholder feedback documented; critical fixes implemented.

### Task 8.4: UAT Sign-Off & Defect Resolution
**Owner:** PM / PBI | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.4.1 | Fix critical/high defects identified in UAT | 4 | To Do |
| 8.4.2 | Conduct UAT re-verification session with stakeholders | 2 | To Do |
| 8.4.3 | Obtain UAT sign-off from AI Governance team and Toyota stakeholders | 2 | To Do |

**Acceptance:** All critical/high defects resolved; UAT sign-off document executed by both Acme and Toyota stakeholders.

### Task 8.5: Production Deployment
**Owner:** PBI | **Estimate:** 8 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.5.1 | Deploy updated dashboard (4 views) to production workspace | 2 | To Do |
| 8.5.2 | Configure production ToyotaGPT data refresh schedule | 1 | To Do |
| 8.5.3 | Verify all data connections and refresh in production | 1 | To Do |
| 8.5.4 | Update RLS roles to include ToyotaGPT data access | 1 | To Do |
| 8.5.5 | Provision user access for Toyota stakeholders | 1 | To Do |
| 8.5.6 | Conduct production smoke test | 2 | To Do |

**Acceptance:** Dashboard live in production; all 4 views functional; scheduled refresh running; access provisioned.

### Task 8.6: Documentation & Training
**Owner:** PBI / PM | **Estimate:** 12 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.6.1 | Update user guide with View 4: Prompt Intelligence screenshots and instructions | 2 | To Do |
| 8.6.2 | Update data dictionary with ToyotaGPT fields and taxonomy | 2 | To Do |
| 8.6.3 | Create FAQ section for ToyotaGPT prompt analytics | 2 | To Do |
| 8.6.4 | Conduct training session for AI Governance team on View 4 | 2 | To Do |
| 8.6.5 | Conduct training session for Toyota stakeholders | 2 | To Do |
| 8.6.6 | Update technical documentation for support team | 2 | To Do |

**Acceptance:** All documentation updated; training sessions conducted; support team briefed.

### Task 8.7: Project Closeout
**Owner:** PM | **Estimate:** 6 hrs

| Subtask ID | Description | Est. Hrs | Status |
|------------|-------------|----------|--------|
| 8.7.1 | Conduct D12 retrospective | 2 | To Do |
| 8.7.2 | Document lessons learned | 2 | To Do |
| 8.7.3 | Obtain final D12 sign-off from CTO sponsor | 2 | To Do |

**Acceptance:** Retrospective completed; lessons learned documented; D12 formally signed off.

**Sprint 8 Total: 82 hrs**

**Sprint 8 Milestone:** All testing complete, UAT signed off, production deployment live, documentation delivered, D12 closed.

---

## User Acceptance Test Plan — Use Case Matrix

| UC ID | Use Case | View(s) | Actor | Key Validations | Sprint 8 Subtask |
|-------|----------|---------|-------|-----------------|------------------|
| UC-01 | Executive Reviews Enterprise AI Adoption | V1 > V2 | CTO / Governance Lead | KPI accuracy, drill-through navigation, data currency | 8.3.3 |
| UC-02 | BU Leader Analyzes Unit Adoption | V2 | BU Leader | RLS enforcement, funnel accuracy, CSV export | 8.3.4 |
| UC-03 | Governance Team Analyzes Use Cases | V3 | Governance Analyst | Multi-select filtering, heatmap accuracy, scenario ranking | 8.3.5 |
| UC-04 | Governance Team Reviews ToyotaGPT Prompt Themes | V4 | Governance Analyst | Taxonomy classification, volume trends, drill-through | 8.3.6 |
| UC-05 | Governance Team Identifies Coverage Gaps | V4 | Governance Lead | Gap analysis accuracy, top 10 unmet needs, recommendations | 8.3.7 |
| UC-06 | Analyst Correlates Prompt Patterns with Adoption | V1 + V4 | Governance Analyst | Cross-filter accuracy, no data leakage, correlation visible | 8.3.8 |
| UC-07 | Manager Reviews Department Prompt Activity | V4 | Department Manager | Department filter RLS, prompt themes relevant to function | 8.3.9 |

### Acceptance Criteria per Use Case

**UC-01: Executive Reviews Enterprise AI Adoption**
- [ ] All 4 KPI cards on View 1 display correct, current values
- [ ] Adoption trend line shows 12-month history with target overlay
- [ ] BU adoption bar chart sorted correctly with color-coded target status
- [ ] Clicking a BU bar drills through to View 2 filtered to that unit
- [ ] Clicking a use case drills through to View 3 filtered to that category

**UC-02: BU Leader Analyzes Unit Adoption**
- [ ] RLS restricts BU Leader to only their unit's data
- [ ] Unit adoption funnel shows accurate stage counts (Licensed > Onboarded > Tried > Regular > Power User)
- [ ] User table is sortable by all columns
- [ ] CSV export contains correct, complete data matching the table
- [ ] KPI cards reflect selected BU only

**UC-03: Governance Team Analyzes Use Cases**
- [ ] Multi-select task type filter correctly filters all visuals
- [ ] Heatmap intensity values match underlying data
- [ ] Top scenarios table ranks use cases correctly by selected metric
- [ ] Business outcome donut drill-through works

**UC-04: Governance Team Reviews ToyotaGPT Prompt Themes**
- [ ] Prompt volume KPI shows correct total for selected period
- [ ] Theme distribution donut categories match defined taxonomy (8 categories)
- [ ] Prompt volume trend line reflects actual daily/weekly/monthly data
- [ ] Top prompt themes table shows volume, trend direction, and satisfaction
- [ ] Drill-through to theme detail shows anonymized example prompts (no PII)

**UC-05: Governance Team Identifies Coverage Gaps**
- [ ] Response Gap Analysis visual clearly shows demand-coverage mismatches
- [ ] Top 10 unmet needs are ranked by gap score (high demand + low satisfaction)
- [ ] Gap trend tracking shows improvement or regression over time
- [ ] Recommendations are actionable and linked to specific gap categories

**UC-06: Analyst Correlates Prompt Patterns with Adoption**
- [ ] Cross-filter from View 4 department applies correctly to View 1/View 2
- [ ] Departments with high ToyotaGPT usage can be compared to Enterprise AI adoption
- [ ] No data leakage across RLS boundaries during cross-filtering
- [ ] ToyotaGPT summary card on View 1 updates with global filters

**UC-07: Manager Reviews Department Prompt Activity**
- [ ] Department filter in View 4 restricts to manager's department via RLS
- [ ] Prompt themes displayed are relevant to the department's function
- [ ] Manager cannot see other departments' prompt data
- [ ] Time-of-day usage pattern reflects the department's actual activity

---

## Sprint Backlog Traceability

All items from the sprint backlog (US-001 through US-042) are traced to D12 as follows:

### D11 MVP Items (US-001 through US-041) — Baseline
These items were delivered as part of D11 MVP (March 10, 2026). D12 inherits them as baseline and addresses any post-launch refinements in Task 6.4.

| Sprint Backlog Phase | User Stories | D12 Status |
|---------------------|-------------|------------|
| Phase 1: Discovery & Data Engineering (US-001 to US-009) | 9 stories | Delivered in D11; refinements in Task 5.5 / 6.4 |
| Phase 2: Data Pipeline & Core Build (US-010 to US-019) | 10 stories | Delivered in D11; refinements in Task 6.4 |
| Phase 3: Dashboard Completion & Testing (US-020 to US-028) | 9 stories | Delivered in D11; refinements in Task 6.4 |
| Phase 4: UAT & Deployment (US-029 to US-041) | 13 stories | Delivered in D11; documentation updated in Task 8.6 |

### D12 New Items (US-042+) — ToyotaGPT Integration
| Sprint Backlog ID | Description | D12 Sprint | D12 Tasks |
|-------------------|-------------|------------|-----------|
| US-042 | ToyotaGPT prompt analysis and contextualization | Sprint 5-8 | 5.1, 5.2, 5.3, 6.1, 6.2, 6.3, 7.1, 7.2, 7.3 |
| US-043 (new) | View 4: Prompt Intelligence dashboard build | Sprint 7 | 7.1 |
| US-044 (new) | Cross-platform correlation (Enterprise AI + ToyotaGPT) | Sprint 7 | 7.2 |
| US-045 (new) | ToyotaGPT response gap analysis and recommendations | Sprint 7 | 7.3 |
| US-046 (new) | Use-case-based UAT for all 4 views | Sprint 8 | 8.3 |
| US-047 (new) | Updated documentation and training for View 4 | Sprint 8 | 8.6 |

---

## Resource Allocation

| Role | Sprint 5 | Sprint 6 | Sprint 7 | Sprint 8 | Total |
|------|----------|----------|----------|----------|-------|
| Project Manager | 20 hrs | 0 hrs | 0 hrs | 34 hrs | 54 hrs |
| Data Engineer | 32 hrs | 40 hrs | 0 hrs | 0 hrs | 72 hrs |
| Power BI Lead | 0 hrs | 32 hrs | 52 hrs | 22 hrs | 106 hrs |
| UX Designer | 16 hrs | 0 hrs | 12 hrs | 0 hrs | 28 hrs |
| QA Analyst | 0 hrs | 0 hrs | 0 hrs | 28 hrs | 28 hrs |
| **Total** | **68 hrs** | **72 hrs** | **64 hrs** | **84 hrs** | **288 hrs** |

---

## Key Milestones

| Milestone | Date | Criteria |
|-----------|------|----------|
| M1: ToyotaGPT Data Access Secured | Mar 27 | Data sharing agreement signed; prompt logs accessible |
| M2: Taxonomy Approved | Mar 27 | 8-category taxonomy validated by stakeholders |
| M3: Data Pipeline Operational | Apr 10 | ToyotaGPT ETL running daily; classification pipeline active |
| M4: View 4 Complete | Apr 24 | Prompt Intelligence view built; cross-platform integration working |
| M5: UAT Sign-Off | May 6 | All 7 use cases passed; stakeholder approval obtained |
| M6: D12 Production Deployment | May 8 | Updated dashboard live; documentation delivered; training complete |

---

## Risk Register

| Risk ID | Description | Impact | Probability | Mitigation |
|---------|-------------|--------|-------------|------------|
| R1 | ToyotaGPT prompt log access delayed or restricted | High | Medium | Engage Toyota AI Platform Team in Sprint 5 Week 1; define fallback (manual export) |
| R2 | Prompt data contains PII that complicates anonymization | High | Medium | Define anonymization rules in Task 5.1.4; validate with Legal before pipeline build |
| R3 | Prompt auto-classification accuracy below 85% threshold | Medium | Medium | Start with keyword matching; augment with LLM classification; manual review sample |
| R4 | OpenAI Custom GPT analytics API changes or limitations | Medium | Low | Document alternative data extraction methods; build adapter layer |
| R5 | Toyota stakeholder availability for UAT sessions | Medium | Medium | Schedule UAT sessions by Sprint 6; identify backup reviewers |
| R6 | Cross-platform data model complexity impacts performance | Medium | Low | Design aggregation tables early; test with full volume in Sprint 7 |

---

## Definition of Done — D12

The D12 deliverable is complete when:

- [ ] ToyotaGPT prompt log data integrated with daily automated refresh
- [ ] Prompt categorization taxonomy (8 categories) implemented with >85% classification accuracy
- [ ] Intent and complexity classification operational
- [ ] View 4: Prompt Intelligence fully built with 4 KPI cards and 6+ visuals
- [ ] Response gap analysis delivered with top 10 unmet needs and recommendations
- [ ] Cross-platform correlation between Enterprise AI and ToyotaGPT functional
- [ ] All 7 use cases (UC-01 through UC-07) pass acceptance criteria
- [ ] RLS enforced across all 4 views including ToyotaGPT data
- [ ] No PII present in ToyotaGPT data within the dashboard data model
- [ ] Performance: all views load in <5 seconds
- [ ] User documentation updated with View 4 coverage
- [ ] Training conducted for AI Governance team and Toyota stakeholders
- [ ] UAT sign-off obtained
- [ ] Production deployment complete

---

## Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| CTO Sponsor | | | |
| AI Governance Lead | | | |
| Toyota AI Platform Lead | | | |
| Project Manager | | | |

---

*Document Created: February 12, 2026*
*D11 MVP Baseline: March 10, 2026*
*D12 Target Delivery: May 8, 2026*
