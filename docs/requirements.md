# Requirements Document

## Project: Acme Corporation - Enterprise AI Adoption Dashboard
**Version:** 2.0
**Last Updated:** 2026-02-12
**Status:** Approved (D11 MVP) / In Progress (D12 Post-MVP)

---

## 1. Executive Summary

This document outlines the functional and non-functional requirements for the Enterprise AI Adoption Dashboard. The dashboard tracks AI tool adoption across Acme Corporation's 14 business functional areas, starting with Enterprise AI (an internal multi-model, multi-modal AI tool hosted on AWS Bedrock) and extending to external custom GPT deployments including ToyotaGPT.

## 2. Business Objectives

- [x] Objective 1: Provide enterprise-wide visibility into AI tool adoption rates by business unit and function
- [x] Objective 2: Enable the AI Governance team to measure adoption against defined targets and identify lagging units
- [x] Objective 3: Analyze use case patterns to understand how AI tools are being leveraged across the organization
- [ ] Objective 4: Contextualize and analyze user prompts from ToyotaGPT to understand what information Toyota employees seek from the custom GPT
- [ ] Objective 5: Identify gaps between user intent and bot response coverage to improve AI tool effectiveness

## 3. Scope

### 3.1 In Scope — D11 MVP
- 1 Power BI dashboard with 3 views (Executive Summary, Business Unit Deep-Dive, Use Case Analysis)
- Data integration from 5 Acme source systems
- Up to 10 defined adoption metrics
- Row-level security (Admin, BU Leader, Viewer roles)
- Daily scheduled refresh configuration
- User documentation and training

### 3.2 In Scope — D12 Post-MVP
- ToyotaGPT prompt log data source discovery and integration
- Prompt categorization taxonomy and intent analysis
- View 4: Prompt Intelligence (ToyotaGPT analytics)
- Cross-platform AI usage correlation (Enterprise AI + ToyotaGPT)
- Enhanced dashboard with prompt pattern insights
- Extended UAT covering ToyotaGPT use cases

### 3.3 Out of Scope
- Historical data migration beyond 12 months
- Real-time streaming data
- Custom embedded solutions
- Mobile app development
- Modification of ToyotaGPT's underlying prompts or behavior
- PII-level user prompt content (all analysis uses anonymized/aggregated data)

---

## 4. Dashboard Views

### View 1: Executive Summary
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-V1-001 | Display Total Active Users KPI card with % change vs prior period | High | Approved |
| REQ-V1-002 | Display Adoption Rate KPI card as % with gauge visual | High | Approved |
| REQ-V1-003 | Display Total Sessions KPI card with trend sparkline | High | Approved |
| REQ-V1-004 | Display Avg Sessions/User/Month KPI card | High | Approved |
| REQ-V1-005 | 12-month Adoption Trend line chart with target line overlay | High | Approved |
| REQ-V1-006 | Business Unit Adoption horizontal bar chart, sorted and color-coded vs target | High | Approved |
| REQ-V1-007 | Top Use Cases donut chart showing task type distribution | Medium | Approved |
| REQ-V1-008 | Business Outcome stacked bar breakdown | Medium | Approved |
| REQ-V1-009 | Drill-through: click BU bar navigates to View 2 filtered to that unit | High | Approved |
| REQ-V1-010 | Drill-through: click use case navigates to View 3 filtered to that category | High | Approved |

### View 2: Business Unit Deep-Dive
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-V2-001 | Business Unit selector (single or multi-select) | High | Approved |
| REQ-V2-002 | Unit Adoption Rate KPI card vs unit-specific target | High | Approved |
| REQ-V2-003 | Active Users count KPI card with trend indicator | High | Approved |
| REQ-V2-004 | Avg Engagement KPI card (sessions per user per month for unit) | High | Approved |
| REQ-V2-005 | Top Task Type KPI card for selected unit | Medium | Approved |
| REQ-V2-006 | User Adoption Funnel (Licensed > Onboarded > Tried > Regular > Power User) | High | Approved |
| REQ-V2-007 | Monthly Active Users trend with unit target overlay | High | Approved |
| REQ-V2-008 | Task Type Distribution bar chart | Medium | Approved |
| REQ-V2-009 | Feature Usage chart (capabilities leveraged by unit) | Medium | Approved |
| REQ-V2-010 | User Table: User ID (anonymized), Last Active, Total Sessions, Primary Task Type, Engagement Tier | High | Approved |
| REQ-V2-011 | User Table sortable and exportable to CSV | Medium | Approved |

### View 3: Use Case Analysis
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-V3-001 | Task Type multi-select filter | High | Approved |
| REQ-V3-002 | Business Outcome multi-select filter | High | Approved |
| REQ-V3-003 | Total Use Cases Tracked KPI card | Medium | Approved |
| REQ-V3-004 | Most Popular Task KPI card (highest session count) | High | Approved |
| REQ-V3-005 | Fastest Growing Task KPI card (highest MoM growth) | High | Approved |
| REQ-V3-006 | Highest Engagement Task KPI card (longest avg session duration) | Medium | Approved |
| REQ-V3-007 | Task Type x Business Unit Heatmap (intensity matrix) | High | Approved |
| REQ-V3-008 | Task Type Trend stacked area chart (12 months) | High | Approved |
| REQ-V3-009 | Business Outcome Distribution donut with drill-through | Medium | Approved |
| REQ-V3-010 | Top Scenarios Table (ranked use cases with metrics) | High | Approved |
| REQ-V3-011 | Feature Adoption by Task correlation view | Medium | Approved |

### View 4: Prompt Intelligence — ToyotaGPT (D12)
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-V4-001 | Display total prompt volume KPI card with trend indicator | High | Draft |
| REQ-V4-002 | Display unique users KPI card (distinct ToyotaGPT users per period) | High | Draft |
| REQ-V4-003 | Display top prompt category KPI card (most frequent intent theme) | High | Draft |
| REQ-V4-004 | Display response satisfaction KPI card (avg user rating or thumbs-up rate) | Medium | Draft |
| REQ-V4-005 | Prompt Theme Distribution donut chart (categorized by taxonomy) | High | Draft |
| REQ-V4-006 | Prompt Volume Trend line chart (daily/weekly/monthly) | High | Draft |
| REQ-V4-007 | Intent Category x Department Heatmap (who asks what) | High | Draft |
| REQ-V4-008 | Top Prompt Themes Table with volume, trend, avg satisfaction | High | Draft |
| REQ-V4-009 | Response Gap Analysis visual — topics where bot coverage is low vs user demand is high | High | Draft |
| REQ-V4-010 | Prompt Complexity Distribution (simple lookup vs multi-step reasoning) | Medium | Draft |
| REQ-V4-011 | Drill-through: click prompt theme to see anonymized example prompts and response patterns | Medium | Draft |
| REQ-V4-012 | Cross-filter: link prompt patterns to Enterprise AI adoption data for correlation | Medium | Draft |
| REQ-V4-013 | Time-of-day usage pattern visual (when employees use ToyotaGPT) | Low | Draft |

---

## 5. Data Requirements

### 5.1 Data Sources — D11 MVP
| Source | Type | Refresh Frequency | Owner |
|--------|------|-------------------|-------|
| Enterprise AI Telemetry (AWS Bedrock) | API / Log Store | Daily | Platform Engineering |
| HR System (Workday) | API | Daily | HR IT |
| License Management | Database | Weekly | IT Operations |
| Azure AD | API | Daily | Identity & Access |
| Adoption Targets DB | Database | Monthly | AI Governance Team |

### 5.2 Data Sources — D12 Post-MVP
| Source | Type | Refresh Frequency | Owner |
|--------|------|-------------------|-------|
| ToyotaGPT Prompt Logs | OpenAI API / Custom GPT Analytics | Daily | Toyota AI Platform Team |
| ToyotaGPT Response Logs | OpenAI API / Custom GPT Analytics | Daily | Toyota AI Platform Team |
| ToyotaGPT User Mapping | HR / SSO Integration | Weekly | Toyota IT |

### 5.3 Data Quality Requirements
- Data completeness: 95%+
- Data accuracy: 98%+
- Acceptable latency: 24 hours
- Prompt data must be anonymized (no PII in prompt content stored in dashboard data model)

---

## 6. ToyotaGPT-Specific Requirements

### 6.1 Prompt Categorization Taxonomy
The following taxonomy shall be used to classify ToyotaGPT user prompts:

| Category | Description | Examples |
|----------|-------------|----------|
| Technical Support | Troubleshooting, system issues, how-to questions | "How do I reset my VPN?", "Error code 5021 fix" |
| Policy Lookup | Company policies, compliance, HR policies | "What is the PTO policy?", "Travel expense limits" |
| Process Guidance | Standard operating procedures, workflows | "Steps to submit a purchase order", "Onboarding checklist" |
| Data & Reporting | Data requests, report generation, analytics | "Q4 sales numbers by region", "Generate inventory report" |
| Training & Development | Learning resources, certification, skills | "Available leadership courses", "Certification requirements" |
| Product & Engineering | Vehicle specs, engineering standards, R&D | "Towing capacity for 2026 Tacoma", "Paint code lookup" |
| Customer & Dealer Support | Dealer inquiries, customer-facing content | "Dealer incentive programs", "Warranty coverage details" |
| General Knowledge | Broad questions, brainstorming, writing assistance | "Draft an email to...", "Summarize this document" |

### 6.2 Intent Analysis Requirements
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-TG-001 | Classify each prompt into the taxonomy above with >85% accuracy | High | Draft |
| REQ-TG-002 | Identify prompt intent (informational, transactional, navigational) | High | Draft |
| REQ-TG-003 | Map prompt themes to Toyota business functions/departments | High | Draft |
| REQ-TG-004 | Track prompt-to-response satisfaction (explicit rating or implicit signals) | Medium | Draft |
| REQ-TG-005 | Detect prompt complexity level (simple lookup, multi-step reasoning, creative) | Medium | Draft |
| REQ-TG-006 | Identify repeat/recurring prompt patterns indicating knowledge gaps | High | Draft |
| REQ-TG-007 | Flag topics with high volume but low satisfaction (coverage gaps) | High | Draft |
| REQ-TG-008 | All prompt data must be anonymized — no PII stored in analytics layer | High | Draft |

### 6.3 Gap Analysis Requirements
| Requirement ID | Description | Priority | Status |
|---------------|-------------|----------|--------|
| REQ-GA-001 | Compare user intent distribution vs bot response coverage by category | High | Draft |
| REQ-GA-002 | Identify top 10 unmet information needs (high demand, low satisfaction) | High | Draft |
| REQ-GA-003 | Provide recommendations for ToyotaGPT knowledge base improvements | Medium | Draft |
| REQ-GA-004 | Track gap closure over time (are previously identified gaps being resolved?) | Medium | Draft |

---

## 7. Non-Functional Requirements

### 7.1 Performance
- Dashboard load time: < 5 seconds
- Visual refresh: < 3 seconds
- Concurrent users: 50+

### 7.2 Security
- Row-level security required: Yes (Admin, BU Leader, Viewer roles)
- SSO integration: Yes (Azure AD)
- Data classification: Internal / Confidential
- ToyotaGPT prompt data: Anonymized before ingestion

### 7.3 Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Sufficient color contrast ratios

---

## 8. Assumptions

1. Enterprise AI telemetry data is accessible via AWS Bedrock logs with session-level granularity
2. HR/Workday data includes business unit hierarchy for all 14 functional areas
3. ToyotaGPT prompt logs are accessible via OpenAI's Custom GPT analytics or a logging layer
4. ToyotaGPT data can be anonymized at the source before ingestion into the dashboard data model
5. Toyota AI Platform Team will provide API access or data export for ToyotaGPT telemetry
6. Prompt categorization can be automated using keyword matching and/or LLM classification
7. Stakeholders are available for UAT sessions within scheduled windows

## 9. Dependencies

1. AWS Bedrock log access must be provisioned by Platform Engineering
2. Workday API access requires HR IT approval
3. ToyotaGPT data access requires coordination with Toyota AI Platform Team
4. OpenAI Custom GPT analytics availability determines ToyotaGPT data granularity
5. Azure AD integration required for SSO and RLS

---

## 10. Use Cases for Acceptance Testing

### UC-01: Executive Reviews Enterprise AI Adoption
**Actor:** CTO / AI Governance Lead
**Precondition:** Dashboard loaded, user has Admin role
**Flow:** User opens View 1, reviews 4 KPI cards, examines adoption trend, identifies lowest-performing BU, clicks to drill through to View 2.
**Expected:** All KPIs populated with current data; drill-through navigates correctly with BU filter applied.

### UC-02: BU Leader Analyzes Unit Adoption
**Actor:** Business Unit Leader
**Precondition:** User has BU Leader role, RLS restricts to their unit
**Flow:** User opens View 2, sees their unit's KPIs, reviews adoption funnel, examines user table, exports to CSV.
**Expected:** Only their BU data visible; export contains correct data; funnel stages are accurate.

### UC-03: Governance Team Analyzes Use Cases
**Actor:** AI Governance Analyst
**Precondition:** Dashboard loaded, multi-select filters available
**Flow:** User opens View 3, selects "Code Generation" and "Data Analysis" task types, examines heatmap, reviews top scenarios table.
**Expected:** Heatmap filters correctly; scenarios table shows ranked use cases with metrics for selected types.

### UC-04: Governance Team Reviews ToyotaGPT Prompt Themes
**Actor:** AI Governance Analyst
**Precondition:** ToyotaGPT data integrated, View 4 available
**Flow:** User opens View 4, reviews prompt volume trend, examines theme distribution donut, identifies top prompt category, drills into theme detail.
**Expected:** Prompt themes categorized per taxonomy; volume trends accurate; drill-through shows anonymized examples.

### UC-05: Governance Team Identifies ToyotaGPT Coverage Gaps
**Actor:** AI Governance Lead
**Precondition:** ToyotaGPT data integrated, gap analysis visual populated
**Flow:** User opens View 4, scrolls to Response Gap Analysis visual, identifies topics with high demand but low satisfaction, reviews recommendations.
**Expected:** Gap analysis visual highlights mismatches; top 10 unmet needs listed; recommendations actionable.

### UC-06: Analyst Correlates Prompt Patterns with Adoption
**Actor:** AI Governance Analyst
**Precondition:** Both Enterprise AI and ToyotaGPT data available
**Flow:** User cross-filters between View 1/View 4 to see if departments with high ToyotaGPT usage also show high Enterprise AI adoption.
**Expected:** Cross-filter applies correctly; correlation patterns visible; no data leakage across RLS boundaries.

### UC-07: Manager Reviews Department Prompt Activity
**Actor:** Department Manager
**Precondition:** User has BU Leader role, ToyotaGPT data available
**Flow:** User opens View 4, filters by their department, reviews what their team is asking ToyotaGPT, identifies training needs.
**Expected:** Department filter restricts data correctly; prompt themes relevant to department functions visible.

---

## 11. Sign-off

| Name | Role | Signature | Date |
|------|------|-----------|------|
| | CTO Sponsor | | |
| | AI Governance Lead | | |
| | Project Manager | | |
| | Toyota AI Platform Lead | | |
