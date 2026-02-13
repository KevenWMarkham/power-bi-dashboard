# D12 Detailed Design Document

## Post-MVP Enhancement & ToyotaGPT Prompt Intelligence

**Version:** 1.0
**Date:** February 12, 2026
**Author:** Keven / AI Governance Team
**Status:** Draft
**Baseline:** D11 MVP (Delivered March 10, 2026)

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [System Architecture](#2-system-architecture)
3. [Data Source Specifications](#3-data-source-specifications)
4. [Data Model Design](#4-data-model-design)
5. [ETL Pipeline Design](#5-etl-pipeline-design)
6. [Prompt Classification Pipeline](#6-prompt-classification-pipeline)
7. [DAX Measures Specification](#7-dax-measures-specification)
8. [View 4: Prompt Intelligence — UI Design](#8-view-4-prompt-intelligence--ui-design)
9. [Cross-Platform Integration Design](#9-cross-platform-integration-design)
10. [Gap Analysis Engine](#10-gap-analysis-engine)
11. [Security & Privacy Design](#11-security--privacy-design)
12. [Performance Design](#12-performance-design)
13. [Testing Strategy](#13-testing-strategy)
14. [Deployment Design](#14-deployment-design)
15. [Appendices](#15-appendices)

---

## 1. Introduction

### 1.1 Purpose

This document provides the detailed technical design for D12, the post-MVP enhancement of the Enterprise AI Adoption Dashboard. D12 extends the D11 MVP by integrating ToyotaGPT prompt telemetry, building a Prompt Intelligence dashboard view (View 4), and enabling cross-platform correlation between Enterprise AI and ToyotaGPT usage.

### 1.2 Scope

| Area | In Scope | Out of Scope |
|------|----------|--------------|
| Data Sources | ToyotaGPT prompt logs, response logs, Toyota user mapping | Modification of ToyotaGPT behavior or prompts |
| Data Model | Extended star schema with prompt dimension and fact tables | Migration of historical D11 data model |
| Dashboard | View 4: Prompt Intelligence + cross-platform integration | Redesign of Views 1-3 (refinement only) |
| Analytics | Prompt classification, gap analysis, intent mapping | Real-time streaming analytics |
| Security | PII anonymization, RLS extension, Toyota role integration | Changes to Azure AD SSO configuration |

### 1.3 D11 Baseline

D12 builds on the D11 MVP which delivered:

- **3 Dashboard Views:** Executive Summary, Business Unit Deep-Dive, Use Case Analysis
- **Star Schema:** DimUser, DimBusinessUnit, DimTaskType, DimBusinessOutcome, DimDate, FactSession, FactDailyAdoption
- **5 Data Sources:** Enterprise AI Telemetry (AWS Bedrock), HR System (Workday), License Management, Azure AD, Adoption Targets DB
- **10 DAX Measures:** Active Users, Adoption Rate, Session Count, Avg Sessions/User, Adoption vs Target, Engagement Tier Distribution, MoM Growth, Top Task Type, Business Outcome Distribution, Task Type Growth Rate
- **RLS Roles:** Admin, BU Leader, Viewer
- **Reference Data:** 6 task types, 5 business outcomes, 4 engagement tiers, 5 features, 13 business units

### 1.4 Design Principles

1. **Anonymization by default** — No PII stored in the analytics data model; prompts are categorized, never stored verbatim
2. **Additive schema** — New tables and relationships extend the D11 star schema without modifying existing tables
3. **Consistent UX** — View 4 follows the same visual language, color palette, and interaction patterns as Views 1-3
4. **Classification accuracy first** — Pipeline validated to >85% accuracy before View 4 goes live
5. **Performance parity** — All views (including View 4) load in <5 seconds

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
                         ┌──────────────────────────────────────────────────────────────────┐
                         │                        POWER BI SERVICE                          │
                         │                                                                  │
                         │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────────────┐   │
                         │  │ View 1  │ │ View 2  │ │ View 3  │ │ View 4: Prompt      │   │
                         │  │ Exec    │ │ BU Deep │ │ Use Case│ │ Intelligence (NEW)  │   │
                         │  │ Summary │ │ Dive    │ │ Analysis│ │                     │   │
                         │  └────┬────┘ └────┬────┘ └────┬────┘ └─────────┬───────────┘   │
                         │       │            │           │                │               │
                         │       └────────────┴─────┬─────┴────────────────┘               │
                         │                          │                                      │
                         │              ┌───────────┴───────────┐                          │
                         │              │   TABULAR DATA MODEL  │                          │
                         │              │                       │                          │
                         │              │  D11 Tables (existing)│                          │
                         │              │  ├─ DimUser           │                          │
                         │              │  ├─ DimBusinessUnit   │                          │
                         │              │  ├─ DimTaskType       │                          │
                         │              │  ├─ DimBusinessOutcome│                          │
                         │              │  ├─ DimDate           │                          │
                         │              │  ├─ FactSession       │                          │
                         │              │  └─ FactDailyAdoption │                          │
                         │              │                       │                          │
                         │              │  D12 Tables (NEW)     │                          │
                         │              │  ├─ DimPromptCategory │                          │
                         │              │  ├─ DimToyotaDept     │                          │
                         │              │  ├─ FactPrompt        │                          │
                         │              │  └─ FactPromptDaily   │                          │
                         │              └───────────┬───────────┘                          │
                         │                          │                                      │
                         │              ┌───────────┴───────────┐                          │
                         │              │    DATA GATEWAY       │                          │
                         │              │  (Scheduled Refresh)  │                          │
                         │              └───────────┬───────────┘                          │
                         └──────────────────────────┼──────────────────────────────────────┘
                                                    │
                    ┌───────────────────────────────┼───────────────────────────────┐
                    │                               │                               │
         ┌──────────┴──────────┐       ┌───────────┴───────────┐      ┌────────────┴────────────┐
         │  D11 DATA SOURCES   │       │  CLASSIFICATION LAYER │      │  D12 DATA SOURCES       │
         │                     │       │        (NEW)          │      │       (NEW)              │
         │  AWS Bedrock Logs   │       │                       │      │                          │
         │  Workday HR         │       │  Keyword Matcher      │      │  ToyotaGPT Prompt Logs   │
         │  License Mgmt       │       │       ↓               │      │  ToyotaGPT Response Logs │
         │  Azure AD           │       │  LLM Classifier       │      │  Toyota HR / SSO         │
         │  Adoption Targets   │       │       ↓               │      │                          │
         └─────────────────────┘       │  Taxonomy Output      │      └──────────────────────────┘
                                       │  (8 categories)       │
                                       └───────────────────────┘
```

### 2.2 Component Inventory

| Component | Technology | D11/D12 | Description |
|-----------|-----------|---------|-------------|
| Dashboard | Power BI Service | D11 | 4-view dashboard with tabular model |
| Data Gateway | Power BI On-Premises Gateway | D11 | Manages scheduled refresh from all sources |
| Enterprise AI ETL | Power Query / Dataflows | D11 | Extracts from AWS Bedrock logs |
| HR ETL | Power Query / Dataflows | D11 | Extracts from Workday |
| ToyotaGPT ETL | Power Query / Dataflows | D12 | Extracts from OpenAI Custom GPT analytics |
| Classification Pipeline | Python / Azure Function | D12 | Keyword + LLM prompt classifier |
| Anonymization Layer | Power Query M / Python | D12 | PII stripping before data model load |
| RLS Engine | Power BI Tabular Model | D11 | Extended with Toyota department roles |

### 2.3 Integration Points

```
ToyotaGPT (OpenAI) ──── REST API / Export ──── Classification Pipeline ──── Power Query ──── Data Model
                                                       │
Toyota HR/SSO ────────── API / CSV Export ─────────────┘
                                                       │
D11 Star Schema ───────── (existing relationships) ────┘
```

---

## 3. Data Source Specifications

### 3.1 ToyotaGPT Prompt Logs

| Field | Type | Description | Nullable | PII |
|-------|------|-------------|----------|-----|
| `conversation_id` | STRING | Unique conversation identifier | No | No |
| `message_id` | STRING | Unique message within conversation | No | No |
| `timestamp` | DATETIME | UTC timestamp of prompt submission | No | No |
| `user_id` | STRING | Toyota SSO / employee identifier | No | **Yes** |
| `prompt_text` | STRING | Raw user prompt content | No | **Yes** |
| `prompt_token_count` | INT | Token count of the prompt | No | No |
| `model_version` | STRING | GPT model version used | Yes | No |
| `session_duration_sec` | INT | Total conversation duration | Yes | No |
| `is_follow_up` | BOOLEAN | Whether prompt is a follow-up in conversation | No | No |

**Access Method:** OpenAI Custom GPT Analytics API or scheduled CSV export from Toyota AI Platform Team
**Volume Estimate:** ~2,000-5,000 prompts/day across Toyota org
**Retention:** 12 months rolling
**Refresh:** Daily (02:00 UTC)

### 3.2 ToyotaGPT Response Logs

| Field | Type | Description | Nullable | PII |
|-------|------|-------------|----------|-----|
| `message_id` | STRING | Links to prompt message_id | No | No |
| `response_token_count` | INT | Token count of response | No | No |
| `response_time_ms` | INT | Time to generate response | No | No |
| `thumbs_up` | BOOLEAN | User gave positive feedback | Yes | No |
| `thumbs_down` | BOOLEAN | User gave negative feedback | Yes | No |
| `user_rating` | INT (1-5) | Explicit rating if provided | Yes | No |
| `was_regenerated` | BOOLEAN | User requested regeneration | No | No |
| `error_flag` | BOOLEAN | Response encountered an error | No | No |

**Access Method:** Same as prompt logs (joined on `message_id`)
**Refresh:** Daily (02:00 UTC)

### 3.3 Toyota HR / Department Mapping

| Field | Type | Description | Nullable | PII |
|-------|------|-------------|----------|-----|
| `user_id` | STRING | Toyota employee identifier | No | **Yes** |
| `department_id` | STRING | Toyota department code | No | No |
| `department_name` | STRING | Department display name | No | No |
| `division` | STRING | Higher-level division | No | No |
| `location` | STRING | Office / plant location | Yes | No |
| `job_level` | STRING | Job level (Manager, IC, Director) | Yes | No |
| `hire_date` | DATE | Employee hire date | Yes | No |

**Access Method:** Toyota HR API or weekly CSV export
**Refresh:** Weekly (Sunday 06:00 UTC)

### 3.4 Field Mapping to Analytics Layer (Post-Anonymization)

| Source Field | Analytics Field | Transformation |
|-------------|----------------|----------------|
| `user_id` | `anonymized_user_hash` | SHA-256 hash with rotating salt |
| `prompt_text` | *not stored* | Classified into category, intent, complexity only |
| `prompt_token_count` | `prompt_token_count` | Pass-through |
| `timestamp` | `prompt_date`, `prompt_hour` | Split into date key and hour |
| `department_id` | `department_key` | Foreign key to DimToyotaDept |
| `thumbs_up/down` | `satisfaction_score` | Computed: +1 / -1 / 0 |
| `user_rating` | `user_rating` | Pass-through (nullable) |

---

## 4. Data Model Design

### 4.1 Extended Star Schema — Entity Relationship Diagram

```
                                    ┌──────────────────────┐
                                    │      DimDate         │
                                    │ (existing D11)       │
                                    ├──────────────────────┤
                                    │ PK DateKey      INT  │
                                    │    Date         DATE │
                                    │    Year         INT  │
                                    │    Quarter      INT  │
                                    │    Month        INT  │
                                    │    MonthName    VCHAR│
                                    │    WeekOfYear   INT  │
                                    │    DayOfWeek    INT  │
                                    │    DayName      VCHAR│
                                    │    IsWeekend    BIT  │
                                    │    FiscalYear   INT  │
                                    │    FiscalQuarter INT │
                                    └──────────┬───────────┘
                                               │
                       ┌───────────────────────┼───────────────────────┐
                       │ 1:M                   │ 1:M                   │ 1:M
              ┌────────┴─────────┐    ┌────────┴────────┐    ┌────────┴─────────┐
              │   FactSession    │    │  FactPrompt     │    │ FactPromptDaily  │
              │   (existing D11) │    │  (NEW - D12)    │    │ (NEW - D12)      │
              ├──────────────────┤    ├─────────────────┤    ├──────────────────┤
              │ PK SessionID     │    │ PK PromptID     │    │ PK DateKey       │
              │ FK DateKey       │    │ FK DateKey       │    │ PK CategoryKey   │
              │ FK UserKey       │    │ FK CategoryKey   │    │ PK DeptKey       │
              │ FK TaskTypeKey   │    │ FK DeptKey       │    │    PromptCount   │
              │ FK OutcomeKey    │    │    PromptHour    │    │    UniqueUsers   │
              │    Duration      │    │    UserHash      │    │    AvgSatisfact  │
              │    QueryCount    │    │    TokenCount    │    │    ThumbsUp      │
              │    Rating        │    │    Satisfaction   │    │    ThumbsDown    │
              └────────┬─────────┘    │    IntentType    │    │    AvgTokens     │
                       │              │    Complexity    │    │    AvgComplexity │
                       │              │    IsFollowUp    │    │    FollowUpPct   │
                       │              │    WasRegenerated│    └────────┬─────────┘
                       │              │    ResponseTimeMs│             │
                       │              └───────┬─────────┘             │
                       │                      │                       │
         ┌─────────────┤              ┌───────┼───────────────────────┤
         │             │              │       │                       │
         │     ┌───────┴──────┐   ┌───┴───────┴────┐    ┌────────────┴────┐
         │     │DimBusinessUnit│   │DimPromptCategory│    │ DimToyotaDept   │
         │     │(existing D11) │   │  (NEW - D12)    │    │ (NEW - D12)     │
         │     ├──────────────┤   ├─────────────────┤    ├─────────────────┤
         │     │PK BUKey       │   │PK CategoryKey   │    │PK DeptKey       │
         │     │   Name        │   │   CategoryID     │    │   DeptID        │
         │     │   Category    │   │   CategoryName   │    │   DeptName      │
         │     │   TotalEmp    │   │   CategoryGroup  │    │   Division      │
         │     │   Licensed    │   │   Description    │    │   Location      │
         │     │   Target      │   │   SortOrder      │    │   HeadCount     │
         │     │   TargetDate  │   │   IconID         │    │   MappedBUKey   │
         │     └──────────────┘   │   Color           │    └─────────────────┘
         │                        └──────────────────┘
   ┌─────┴──────┐
   │  DimUser   │
   │(existing)  │
   ├────────────┤
   │PK UserKey  │
   │FK BUKey    │
   │  Onboarded │
   │  LastActive│
   │  Sessions  │
   │  Tier      │
   └────────────┘
```

### 4.2 New Table Definitions

#### DimPromptCategory

Stores the 8-category prompt classification taxonomy plus intent and complexity reference data.

| Column | Data Type | Nullable | Description | Sample |
|--------|-----------|----------|-------------|--------|
| `CategoryKey` | INT | No | Primary key (auto-increment) | 1 |
| `CategoryID` | VARCHAR(50) | No | Unique category slug | `technical-support` |
| `CategoryName` | VARCHAR(100) | No | Display label | `Technical Support` |
| `CategoryGroup` | VARCHAR(50) | No | Grouping (Category, Intent, Complexity) | `Category` |
| `Description` | VARCHAR(500) | Yes | Human-readable description | `Troubleshooting, system issues, how-to questions` |
| `SortOrder` | INT | No | Display sort order | 1 |
| `IconID` | VARCHAR(30) | Yes | Icon identifier for UI | `wrench` |
| `Color` | VARCHAR(7) | Yes | Hex color for charts | `#118DFF` |

**Seed Data — Categories (8 rows):**

| Key | ID | Name | Color |
|-----|----|------|-------|
| 1 | `technical-support` | Technical Support | `#118DFF` |
| 2 | `policy-lookup` | Policy Lookup | `#12239E` |
| 3 | `process-guidance` | Process Guidance | `#E66C37` |
| 4 | `data-reporting` | Data & Reporting | `#4CAF50` |
| 5 | `training-development` | Training & Development | `#FFC107` |
| 6 | `product-engineering` | Product & Engineering | `#9C27B0` |
| 7 | `customer-dealer` | Customer & Dealer Support | `#00BCD4` |
| 8 | `general-knowledge` | General Knowledge | `#6B6B6B` |

**Seed Data — Intent Types (3 rows):**

| Key | ID | Name |
|-----|----|------|
| 101 | `informational` | Informational |
| 102 | `transactional` | Transactional |
| 103 | `navigational` | Navigational |

**Seed Data — Complexity Levels (3 rows):**

| Key | ID | Name |
|-----|----|------|
| 201 | `simple-lookup` | Simple Lookup |
| 202 | `multi-step` | Multi-Step Reasoning |
| 203 | `creative` | Creative / Open-Ended |

#### DimToyotaDept

Toyota organizational hierarchy for prompt attribution.

| Column | Data Type | Nullable | Description | Sample |
|--------|-----------|----------|-------------|--------|
| `DeptKey` | INT | No | Primary key (auto-increment) | 1 |
| `DeptID` | VARCHAR(50) | No | Toyota department code | `dept-engineering` |
| `DeptName` | VARCHAR(100) | No | Display name | `Vehicle Engineering` |
| `Division` | VARCHAR(100) | No | Parent division | `R&D` |
| `Location` | VARCHAR(100) | Yes | Primary location | `Plano, TX` |
| `HeadCount` | INT | Yes | Department headcount | 340 |
| `MappedBUKey` | INT | Yes | FK to DimBusinessUnit for cross-platform mapping | 14 |

> **Note:** `MappedBUKey` enables cross-platform correlation by linking Toyota departments to Acme business units where a logical mapping exists (e.g., Toyota R&D maps to Acme R&D).

#### FactPrompt

One row per classified prompt interaction. This is the primary fact table for prompt analytics.

| Column | Data Type | Nullable | Description | Sample |
|--------|-----------|----------|-------------|--------|
| `PromptID` | BIGINT | No | Primary key (sequential) | 10042587 |
| `DateKey` | INT | No | FK to DimDate (YYYYMMDD) | 20260401 |
| `CategoryKey` | INT | No | FK to DimPromptCategory | 3 |
| `DeptKey` | INT | No | FK to DimToyotaDept | 7 |
| `PromptHour` | TINYINT | No | Hour of day (0-23) | 14 |
| `AnonymizedUserHash` | VARCHAR(64) | No | SHA-256 hashed user ID | `a3f2b8...` |
| `TokenCount` | INT | No | Prompt token count | 128 |
| `SatisfactionScore` | TINYINT | Yes | -1 (thumbs down), 0 (none), +1 (thumbs up) | 1 |
| `UserRating` | TINYINT | Yes | Explicit 1-5 rating | 4 |
| `IntentType` | TINYINT | No | 1=Informational, 2=Transactional, 3=Navigational | 1 |
| `ComplexityLevel` | TINYINT | No | 1=Simple, 2=Multi-Step, 3=Creative | 2 |
| `IsFollowUp` | BIT | No | Follow-up message in conversation | 0 |
| `WasRegenerated` | BIT | No | User requested regeneration | 0 |
| `ResponseTimeMs` | INT | Yes | Time to generate response | 2340 |
| `ConversationLength` | TINYINT | Yes | Total messages in this conversation | 4 |

**Volume Estimate:** ~1.5M rows/year at 5,000 prompts/day
**Partition:** By `DateKey` (monthly partitions)
**Indexes:** Clustered on `DateKey`, non-clustered on `CategoryKey`, `DeptKey`

#### FactPromptDaily

Pre-aggregated daily rollup for fast dashboard rendering. One row per date/category/department combination.

| Column | Data Type | Nullable | Description | Sample |
|--------|-----------|----------|-------------|--------|
| `DateKey` | INT | No | PK + FK to DimDate | 20260401 |
| `CategoryKey` | INT | No | PK + FK to DimPromptCategory | 3 |
| `DeptKey` | INT | No | PK + FK to DimToyotaDept | 7 |
| `PromptCount` | INT | No | Total prompts | 142 |
| `UniqueUsers` | INT | No | Distinct user hashes | 87 |
| `AvgSatisfaction` | DECIMAL(3,2) | Yes | Mean satisfaction (-1 to +1) | 0.62 |
| `ThumbsUpCount` | INT | No | Positive feedback count | 94 |
| `ThumbsDownCount` | INT | No | Negative feedback count | 12 |
| `AvgTokenCount` | DECIMAL(8,1) | No | Mean prompt tokens | 98.4 |
| `AvgComplexity` | DECIMAL(3,2) | No | Mean complexity (1-3) | 1.73 |
| `FollowUpPct` | DECIMAL(5,2) | No | % of prompts that were follow-ups | 32.40 |
| `AvgResponseTimeMs` | INT | Yes | Mean response generation time | 1870 |
| `RegeneratedPct` | DECIMAL(5,2) | No | % of prompts regenerated | 8.20 |

**Volume Estimate:** ~70K rows/year (365 days x 8 categories x ~25 departments)
**Composite PK:** (`DateKey`, `CategoryKey`, `DeptKey`)

### 4.3 Relationships

| From Table | From Column | To Table | To Column | Cardinality | Cross-Filter | D11/D12 |
|------------|-------------|----------|-----------|-------------|--------------|---------|
| FactSession | DateKey | DimDate | DateKey | M:1 | Single | D11 |
| FactSession | UserKey | DimUser | UserKey | M:1 | Single | D11 |
| FactSession | TaskTypeKey | DimTaskType | TaskTypeKey | M:1 | Single | D11 |
| FactSession | OutcomeKey | DimBusinessOutcome | OutcomeKey | M:1 | Single | D11 |
| DimUser | BUKey | DimBusinessUnit | BUKey | M:1 | Single | D11 |
| **FactPrompt** | **DateKey** | **DimDate** | **DateKey** | **M:1** | **Single** | **D12** |
| **FactPrompt** | **CategoryKey** | **DimPromptCategory** | **CategoryKey** | **M:1** | **Single** | **D12** |
| **FactPrompt** | **DeptKey** | **DimToyotaDept** | **DeptKey** | **M:1** | **Single** | **D12** |
| **FactPromptDaily** | **DateKey** | **DimDate** | **DateKey** | **M:1** | **Single** | **D12** |
| **FactPromptDaily** | **CategoryKey** | **DimPromptCategory** | **CategoryKey** | **M:1** | **Single** | **D12** |
| **FactPromptDaily** | **DeptKey** | **DimToyotaDept** | **DeptKey** | **M:1** | **Single** | **D12** |
| **DimToyotaDept** | **MappedBUKey** | **DimBusinessUnit** | **BUKey** | **M:1** | **Single** | **D12** |

> **Cross-platform bridge:** The `DimToyotaDept.MappedBUKey -> DimBusinessUnit.BUKey` relationship is the key integration point that enables correlation between ToyotaGPT prompt patterns and Enterprise AI adoption by business unit.

---

## 5. ETL Pipeline Design

### 5.1 Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DAILY ETL PIPELINE (02:00 UTC)                  │
│                                                                     │
│  STAGE 1: Extract                                                   │
│  ┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐  │
│  │ ToyotaGPT API    │  │ Response/Feedback │  │ Toyota HR Export │  │
│  │ Prompt Export     │  │ Log Export        │  │ (weekly only)    │  │
│  └────────┬─────────┘  └────────┬─────────┘  └────────┬─────────┘  │
│           │                      │                      │           │
│  STAGE 2: Anonymize                                                 │
│  ┌────────┴──────────────────────┴──────────────────────┴────────┐  │
│  │                    ANONYMIZATION LAYER                         │  │
│  │  - Hash user_id with SHA-256 + rotating daily salt            │  │
│  │  - Strip prompt_text (do NOT store raw prompts)               │  │
│  │  - Retain only metadata + classification output               │  │
│  └────────┬──────────────────────────────────────────────────────┘  │
│           │                                                         │
│  STAGE 3: Classify                                                  │
│  ┌────────┴──────────────────────────────────────────────────────┐  │
│  │                 CLASSIFICATION PIPELINE                        │  │
│  │  Step 1: Keyword Matcher (fast, rule-based)                   │  │
│  │  Step 2: LLM Classifier (GPT-4o-mini, batch, for ambiguous)  │  │
│  │  Step 3: Output: category, intent, complexity per prompt      │  │
│  └────────┬──────────────────────────────────────────────────────┘  │
│           │                                                         │
│  STAGE 4: Transform & Load                                          │
│  ┌────────┴──────────────────────────────────────────────────────┐  │
│  │  - Join prompt + response on message_id                       │  │
│  │  - Compute satisfaction_score from thumbs/rating              │  │
│  │  - Lookup DeptKey from Toyota HR mapping                      │  │
│  │  - Lookup CategoryKey from classification output              │  │
│  │  - Generate DateKey from timestamp                            │  │
│  │  - Insert into FactPrompt (incremental, new records only)     │  │
│  │  - Rebuild FactPromptDaily aggregations for affected dates    │  │
│  └───────────────────────────────────────────────────────────────┘  │
│                                                                     │
│  STAGE 5: Validate                                                  │
│  ┌───────────────────────────────────────────────────────────────┐  │
│  │  - Row count check (expected vs loaded)                       │  │
│  │  - PII scan (regex for email, phone, SSN patterns)            │  │
│  │  - Classification coverage (% of prompts categorized)         │  │
│  │  - Referential integrity check (all FKs resolve)              │  │
│  │  - Trigger alert on failure                                   │  │
│  └───────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
```

### 5.2 Incremental Refresh Strategy

| Table | Strategy | Key Column | Lookback | Partition |
|-------|----------|-----------|----------|-----------|
| FactPrompt | Incremental append | `DateKey` | 3 days (re-process for late-arriving data) | Monthly |
| FactPromptDaily | Full rebuild for affected dates | `DateKey` | 3 days | None (small table) |
| DimPromptCategory | Full refresh | N/A | N/A | None (< 20 rows) |
| DimToyotaDept | Full refresh (weekly) | N/A | N/A | None (< 100 rows) |

### 5.3 Error Handling

| Error Type | Detection | Action | Alert |
|------------|-----------|--------|-------|
| Source unavailable | Connection timeout after 3 retries | Skip run, retry next cycle | Email to PM + DE |
| PII detected in output | Regex scan post-classification | Quarantine batch, halt load | Immediate alert to PM + Legal |
| Classification failure (>15% uncategorized) | Coverage check | Load with `general-knowledge` fallback | Email to DE |
| Row count mismatch (>10% variance) | Count check | Log warning, proceed | Email to DE |
| FK violation | Referential integrity check | Reject orphan rows, log | Email to DE |

### 5.4 Power Query M — Pseudocode

```
// ToyotaGPT Prompt Extract
let
    Source = Json.Document(Web.Contents(TOYOTAGPT_API_ENDPOINT, [
        Headers = [Authorization = "Bearer " & API_KEY],
        Query = [start_date = LastRefreshDate, end_date = Today]
    ])),
    Prompts = Table.FromRecords(Source[prompts]),

    // STAGE 2: Anonymize
    AnonymizeUser = Table.TransformColumns(Prompts, {
        {"user_id", each HashSHA256(_ & DAILY_SALT)}
    }),
    RemoveRawPrompt = Table.RemoveColumns(AnonymizeUser, {"prompt_text"}),

    // STAGE 3: Classification results joined (pre-computed by Azure Function)
    ClassificationResults = GetClassificationResults(LastRefreshDate),
    Joined = Table.NestedJoin(RemoveRawPrompt, "message_id", ClassificationResults, "message_id", "Classification"),
    Expanded = Table.ExpandTableColumn(Joined, "Classification", {"category_id", "intent_type", "complexity_level"}),

    // STAGE 4: Transform
    AddDateKey = Table.AddColumn(Expanded, "DateKey", each Number.From(Date.ToText([timestamp], "yyyyMMdd"))),
    LookupCategory = Table.NestedJoin(AddDateKey, "category_id", DimPromptCategory, "CategoryID", "Cat"),
    LookupDept = Table.NestedJoin(LookupCategory, "department_id", DimToyotaDept, "DeptID", "Dept"),

    // Compute satisfaction
    AddSatisfaction = Table.AddColumn(LookupDept, "SatisfactionScore", each
        if [thumbs_up] = true then 1
        else if [thumbs_down] = true then -1
        else 0
    ),

    FinalColumns = Table.SelectColumns(AddSatisfaction, {
        "PromptID", "DateKey", "CategoryKey", "DeptKey", "PromptHour",
        "AnonymizedUserHash", "TokenCount", "SatisfactionScore", "UserRating",
        "IntentType", "ComplexityLevel", "IsFollowUp", "WasRegenerated",
        "ResponseTimeMs", "ConversationLength"
    })
in
    FinalColumns
```

---

## 6. Prompt Classification Pipeline

### 6.1 Two-Stage Classification Architecture

```
                     Raw Prompt Text
                           │
                    ┌──────┴──────┐
                    │  STAGE 1:   │
                    │  KEYWORD    │   ~70% classified here (fast, deterministic)
                    │  MATCHER    │
                    └──────┬──────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
         Classified    Ambiguous    Unmatched
         (~70%)        (~20%)       (~10%)
              │            │            │
              │     ┌──────┴──────┐     │
              │     │  STAGE 2:   │     │
              │     │  LLM        │◄────┘
              │     │  CLASSIFIER │   Handles ambiguous + unmatched
              │     └──────┬──────┘
              │            │
              └────────────┼────────────┐
                           │            │
                      Classified    Still Unclassified
                      (~28%)        (~2%) → "General Knowledge"
                           │
                    ┌──────┴──────┐
                    │  OUTPUT:    │
                    │  category   │
                    │  intent     │
                    │  complexity │
                    └─────────────┘
```

### 6.2 Stage 1: Keyword Matcher Rules

| Category | Primary Keywords | Secondary Keywords | Exclusion Keywords |
|----------|-----------------|--------------------|--------------------|
| Technical Support | `error`, `fix`, `reset`, `troubleshoot`, `not working`, `broken`, `issue`, `bug` | `VPN`, `password`, `login`, `install`, `update`, `crash` | `policy`, `purchase` |
| Policy Lookup | `policy`, `regulation`, `compliance`, `rule`, `guideline`, `allowed`, `permitted` | `PTO`, `vacation`, `expense`, `travel`, `code of conduct`, `handbook` | `code generation`, `programming` |
| Process Guidance | `steps to`, `how do I`, `procedure`, `process`, `workflow`, `checklist`, `SOP` | `submit`, `request`, `approve`, `onboard`, `purchase order` | `troubleshoot`, `error` |
| Data & Reporting | `report`, `data`, `numbers`, `metrics`, `dashboard`, `spreadsheet`, `analysis` | `Q1`, `Q2`, `Q3`, `Q4`, `YTD`, `revenue`, `sales figures`, `inventory` | — |
| Training & Development | `training`, `course`, `certification`, `learn`, `skills`, `development` | `workshop`, `webinar`, `onboarding`, `career`, `mentor` | — |
| Product & Engineering | `vehicle`, `spec`, `engineering`, `torque`, `capacity`, `model year`, `assembly` | `Tacoma`, `Camry`, `RAV4`, `paint code`, `part number`, `tolerance` | — |
| Customer & Dealer | `dealer`, `customer`, `warranty`, `incentive`, `rebate`, `financing` | `MSRP`, `lease`, `service plan`, `recall`, `satisfaction survey` | — |
| General Knowledge | *(fallback — no keyword match)* | `draft`, `write`, `summarize`, `brainstorm`, `translate`, `email` | — |

**Matching algorithm:** Case-insensitive. Score = (primary keyword matches * 3) + (secondary keyword matches * 1) - (exclusion keyword matches * 5). Assign to highest-scoring category if score >= 3; otherwise route to Stage 2.

### 6.3 Stage 2: LLM Classifier

**Model:** GPT-4o-mini (via OpenAI API, batch mode)
**Batch size:** 50 prompts per API call
**Prompt template:**

```
You are a prompt classifier for a Toyota internal AI assistant called ToyotaGPT.
Classify each user prompt into exactly ONE category, ONE intent type, and ONE complexity level.

CATEGORIES (pick one):
1. Technical Support - Troubleshooting, system issues, how-to for IT systems
2. Policy Lookup - Company policies, compliance, HR policies
3. Process Guidance - SOPs, workflows, step-by-step procedures
4. Data & Reporting - Data requests, report generation, metrics
5. Training & Development - Learning resources, certifications, skills
6. Product & Engineering - Vehicle specs, engineering standards, R&D
7. Customer & Dealer Support - Dealer inquiries, customer-facing content
8. General Knowledge - Brainstorming, writing assistance, broad questions

INTENT TYPE (pick one):
- Informational: User wants to learn or understand something
- Transactional: User wants to complete a task or action
- Navigational: User wants to find a specific resource or document

COMPLEXITY (pick one):
- Simple Lookup: Single fact or direct answer
- Multi-Step Reasoning: Requires synthesizing multiple pieces of information
- Creative: Open-ended, generative, or requires original content

Respond as JSON array:
[{"id": 1, "category": "...", "intent": "...", "complexity": "..."}, ...]

PROMPTS TO CLASSIFY:
{prompt_batch}
```

**Cost estimate:** ~$0.15/1000 prompts (GPT-4o-mini input/output pricing)
**Daily cost at 5,000 prompts/day:** ~$0.23 for Stage 2 (~1,500 prompts routed to LLM)

### 6.4 Classification Quality Monitoring

| Metric | Target | Measurement Method | Action if Below Target |
|--------|--------|-------------------|----------------------|
| Overall accuracy | >85% | Weekly manual review of 100 random prompts | Retune keyword rules, update LLM prompt |
| Stage 1 coverage | >65% | % classified by keyword matcher | Expand keyword lists |
| Stage 2 accuracy | >90% | Manual review of LLM outputs | Adjust LLM prompt template, add few-shot examples |
| Uncategorized rate | <3% | % falling to "General Knowledge" by default | Investigate new themes, add categories if warranted |
| Category distribution skew | No single category >40% | Daily distribution check | Review for misclassification patterns |

---

## 7. DAX Measures Specification

### 7.1 Prompt Analytics Measures (8 new measures)

#### M11: Total Prompt Volume
```dax
Total Prompt Volume =
CALCULATE(
    SUM(FactPromptDaily[PromptCount]),
    USERELATIONSHIP(FactPromptDaily[DateKey], DimDate[DateKey])
)
```
**Used in:** View 4 KPI card, trend chart
**Filters responsive to:** Date range, Department, Category

#### M12: Unique ToyotaGPT Users
```dax
Unique ToyotaGPT Users =
CALCULATE(
    SUM(FactPromptDaily[UniqueUsers]),
    USERELATIONSHIP(FactPromptDaily[DateKey], DimDate[DateKey])
)
```
**Note:** This is an approximation from daily rollups. For exact distinct count, use:
```dax
Unique ToyotaGPT Users (Exact) =
DISTINCTCOUNT(FactPrompt[AnonymizedUserHash])
```

#### M13: Top Prompt Category
```dax
Top Prompt Category =
VAR TopCat =
    TOPN(1,
        SUMMARIZE(
            FactPromptDaily,
            DimPromptCategory[CategoryName],
            "TotalPrompts", SUM(FactPromptDaily[PromptCount])
        ),
        [TotalPrompts], DESC
    )
RETURN
    MAXX(TopCat, DimPromptCategory[CategoryName])
```

#### M14: Avg Response Satisfaction
```dax
Avg Response Satisfaction =
VAR TotalUp = SUM(FactPromptDaily[ThumbsUpCount])
VAR TotalDown = SUM(FactPromptDaily[ThumbsDownCount])
VAR TotalFeedback = TotalUp + TotalDown
RETURN
    IF(
        TotalFeedback > 0,
        DIVIDE(TotalUp - TotalDown, TotalFeedback),
        BLANK()
    )
```
**Range:** -1.00 (all negative) to +1.00 (all positive)
**Display format:** Percentage with color scale (red < 0, yellow 0-0.5, green > 0.5)

#### M15: Prompt Volume MoM Growth
```dax
Prompt Volume MoM Growth =
VAR CurrentMonth = [Total Prompt Volume]
VAR PriorMonth =
    CALCULATE(
        [Total Prompt Volume],
        DATEADD(DimDate[Date], -1, MONTH)
    )
RETURN
    IF(
        PriorMonth > 0,
        DIVIDE(CurrentMonth - PriorMonth, PriorMonth),
        BLANK()
    )
```

#### M16: Category Distribution %
```dax
Category Distribution % =
DIVIDE(
    [Total Prompt Volume],
    CALCULATE([Total Prompt Volume], ALL(DimPromptCategory))
)
```

#### M17: Response Gap Score
```dax
Response Gap Score =
VAR Demand = [Total Prompt Volume]
VAR Satisfaction = [Avg Response Satisfaction]
VAR NormalizedDemand =
    DIVIDE(
        Demand,
        CALCULATE([Total Prompt Volume], ALL(DimPromptCategory)),
        0
    )
RETURN
    IF(
        NOT ISBLANK(Satisfaction),
        NormalizedDemand * (1 - Satisfaction),
        NormalizedDemand
    )
```
**Logic:** High gap score = high demand + low satisfaction. Categories with high volume but negative/low satisfaction score highest, indicating areas where ToyotaGPT falls short.

#### M18: Prompt Complexity Distribution
```dax
Simple Lookup % =
DIVIDE(
    CALCULATE(SUM(FactPromptDaily[PromptCount]), FactPromptDaily[AvgComplexity] < 1.5),
    [Total Prompt Volume]
)

Multi-Step % =
DIVIDE(
    CALCULATE(SUM(FactPromptDaily[PromptCount]),
        FactPromptDaily[AvgComplexity] >= 1.5 && FactPromptDaily[AvgComplexity] < 2.5),
    [Total Prompt Volume]
)

Creative % =
DIVIDE(
    CALCULATE(SUM(FactPromptDaily[PromptCount]), FactPromptDaily[AvgComplexity] >= 2.5),
    [Total Prompt Volume]
)
```

### 7.2 Cross-Platform Measure

#### M19: ToyotaGPT Users Also on Enterprise AI
```dax
Cross-Platform Active Rate =
VAR ToyotaDepts = VALUES(DimToyotaDept[MappedBUKey])
VAR EnterpriseAIUsers =
    CALCULATE(
        [Active Users],
        TREATAS(ToyotaDepts, DimBusinessUnit[BUKey])
    )
VAR TotalLicensed =
    CALCULATE(
        SUM(DimBusinessUnit[LicensedUsers]),
        TREATAS(ToyotaDepts, DimBusinessUnit[BUKey])
    )
RETURN
    DIVIDE(EnterpriseAIUsers, TotalLicensed)
```

---

## 8. View 4: Prompt Intelligence — UI Design

### 8.1 Layout Specification

```
┌─────────────────────────────────────────────────────────────────────────────┐
│  [View 1] [View 2] [View 3] [View 4: Prompt Intelligence]     [Filters ▾] │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────┐ ┌─────────────┐ ┌─────────────┐ ┌─────────────┐          │
│  │ TOTAL       │ │ UNIQUE      │ │ TOP PROMPT  │ │ SATISFACTION│          │
│  │ PROMPTS     │ │ USERS       │ │ CATEGORY    │ │ SCORE       │          │
│  │ 142,830     │ │ 3,247       │ │ Technical   │ │ +0.68       │          │
│  │ ▲ 12.3% MoM │ │ ▲ 8.1% MoM  │ │ Support     │ │ ████████░░  │          │
│  └─────────────┘ └─────────────┘ └─────────────┘ └─────────────┘          │
│                                                                             │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐         │
│  │ PROMPT THEME DISTRIBUTION   │ │ PROMPT VOLUME TREND           │         │
│  │                              │ │                              │         │
│  │      ┌─────┐                │ │  ╱─╲    ╱──╲                 │         │
│  │     ╱  Tech ╲               │ │ ╱   ╲──╱    ╲──╱╲           │         │
│  │    │ Support │              │ │╱                  ╲──        │         │
│  │    │  28.3%  │              │ │                              │         │
│  │     ╲ Policy╱               │ │  Jan  Feb  Mar  Apr  May    │         │
│  │      ╲─────╱                │ │  [Daily] [Weekly] [Monthly] │         │
│  │   (donut chart)             │ │  (line chart with toggle)   │         │
│  └──────────────────────────────┘ └──────────────────────────────┘         │
│                                                                             │
│  ┌──────────────────────────────┐ ┌──────────────────────────────┐         │
│  │ INTENT × DEPARTMENT HEATMAP │ │ RESPONSE GAP ANALYSIS        │         │
│  │                              │ │                              │         │
│  │        Eng  Sales IT  HR    │ │  Tech Support    ████████░░  │         │
│  │ Tech   ███  ██   ███ █     │ │  Policy Lookup   ██████░░░░  │         │
│  │ Policy ██   █    ██  ███   │ │  Process Guide   █████░░░░░  │         │
│  │ Data   ███  ███  ██  █     │ │  Data & Report   ████░░░░░░  │         │
│  │ ...    ..   ..   ..  ..    │ │                              │         │
│  │   (intensity matrix)        │ │  ■ Demand  ░ Gap            │         │
│  └──────────────────────────────┘ └──────────────────────────────┘         │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │ TOP PROMPT THEMES TABLE                                      │          │
│  │                                                              │          │
│  │  Category          Volume  Trend   Satisfaction  Gap Score   │          │
│  │  Technical Support  40,420  ▲ 15%    +0.72        0.28      │          │
│  │  Policy Lookup      28,180  ▲  8%    +0.54        0.41      │          │
│  │  Process Guidance   21,340  ▲ 22%    +0.61        0.35      │          │
│  │  Data & Reporting   18,960  ▼  3%    +0.48        0.52  ⚠   │          │
│  │  ...                                                         │          │
│  │  (sortable, with drill-through on click)                     │          │
│  └──────────────────────────────────────────────────────────────┘          │
│                                                                             │
│  ┌──────────────────────────────────────────────────────────────┐          │
│  │ PROMPT COMPLEXITY DISTRIBUTION                                │          │
│  │                                                              │          │
│  │  Simple Lookup  ██████████████████████████████░░░░░░  62%    │          │
│  │  Multi-Step     ████████████████░░░░░░░░░░░░░░░░░░░  28%    │          │
│  │  Creative       ██████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  10%    │          │
│  │  (horizontal stacked bar)                                    │          │
│  └──────────────────────────────────────────────────────────────┘          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Visual Specifications

| Visual | Type | Data Source | Dimensions | Measures | Interactions |
|--------|------|------------|------------|----------|-------------|
| KPI: Total Prompts | Card | FactPromptDaily | — | M11: Total Prompt Volume, M15: MoM Growth | Responds to all filters |
| KPI: Unique Users | Card | FactPromptDaily | — | M12: Unique ToyotaGPT Users | Responds to all filters |
| KPI: Top Category | Card | FactPromptDaily | DimPromptCategory | M13: Top Prompt Category | Responds to date + dept filters |
| KPI: Satisfaction | Card + gauge | FactPromptDaily | — | M14: Avg Response Satisfaction | Responds to all filters; color-coded |
| Theme Donut | Donut chart | FactPromptDaily | DimPromptCategory[CategoryName] | M16: Category Distribution % | Click category -> cross-filter all visuals |
| Volume Trend | Line chart | FactPromptDaily | DimDate[Date] | M11: Total Prompt Volume | Toggle: daily/weekly/monthly granularity |
| Dept Heatmap | Matrix | FactPromptDaily | DimPromptCategory x DimToyotaDept | M11: Total Prompt Volume (intensity) | Click cell -> drill-through |
| Gap Analysis | Clustered bar | FactPromptDaily | DimPromptCategory[CategoryName] | M17: Response Gap Score, M16: Distribution % | Sort by gap score descending |
| Themes Table | Table | FactPromptDaily | DimPromptCategory | M11, M15, M14, M17 | Sortable; click row -> drill-through |
| Complexity Dist | Stacked bar | FactPromptDaily | — | M18: Simple/Multi-Step/Creative % | Responds to dept + date filters |

### 8.3 Color Palette

Extends the D11 Power BI theme with ToyotaGPT-specific category colors:

| Element | Color | Hex |
|---------|-------|-----|
| Technical Support | Blue | `#118DFF` |
| Policy Lookup | Dark Blue | `#12239E` |
| Process Guidance | Orange | `#E66C37` |
| Data & Reporting | Green | `#4CAF50` |
| Training & Development | Yellow | `#FFC107` |
| Product & Engineering | Purple | `#9C27B0` |
| Customer & Dealer | Teal | `#00BCD4` |
| General Knowledge | Gray | `#6B6B6B` |
| Satisfaction Positive | Green | `#4CAF50` |
| Satisfaction Negative | Red | `#F44336` |
| Gap Warning | Orange | `#E66C37` |
| Gap Critical | Red | `#D13438` |

### 8.4 Filter Bar

| Filter | Type | Default | Scope |
|--------|------|---------|-------|
| Date Range | Date picker (start/end) | Last 30 days | Global (all 4 views) |
| Department | Multi-select dropdown | All departments | View 4 only (+ cross-filter to V1/V2 via MappedBUKey) |
| Prompt Category | Multi-select dropdown | All categories | View 4 only |
| Complexity | Single-select dropdown | All | View 4 only |
| Intent Type | Single-select dropdown | All | View 4 only |

### 8.5 Drill-Through Design

| Source Visual | Action | Target | Filter Passed |
|---------------|--------|--------|---------------|
| Theme Donut (click segment) | Cross-filter | All View 4 visuals | DimPromptCategory[CategoryKey] |
| Dept Heatmap (click cell) | Drill-through | New detail page | CategoryKey + DeptKey |
| Themes Table (click row) | Drill-through | Category detail page | CategoryKey |
| View 1 BU bar (click) | Navigate | View 2 (existing D11) | DimBusinessUnit[BUKey] |
| View 4 Dept filter | Cross-filter | View 1/2 via MappedBUKey | DimBusinessUnit[BUKey] |

### 8.6 Drill-Through Detail Page: Category Deep-Dive

When a user clicks through from the Themes Table or Heatmap:

```
┌─────────────────────────────────────────────────────────────┐
│  ← Back to Prompt Intelligence                              │
│                                                             │
│  Category: Technical Support                                │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐              │
│  │ Volume     │ │ Satisfaction│ │ Gap Score  │              │
│  │ 40,420     │ │ +0.72      │ │ 0.28       │              │
│  └────────────┘ └────────────┘ └────────────┘              │
│                                                             │
│  ┌──────────────────────────┐ ┌──────────────────────────┐ │
│  │ VOLUME TREND (this cat)  │ │ TOP DEPARTMENTS           │ │
│  │ (line chart, 12 months)  │ │ (horizontal bar)          │ │
│  └──────────────────────────┘ └──────────────────────────┘ │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ ANONYMIZED EXAMPLE PROMPTS (aggregated themes)        │  │
│  │                                                        │  │
│  │  Theme Cluster       Example Pattern        Count     │  │
│  │  VPN / Network       "How to reset VPN..."   4,200    │  │
│  │  Password Reset      "Can't log in to..."    3,800    │  │
│  │  Software Install    "Steps to install..."   2,100    │  │
│  │  Error Resolution    "Error code XXXX..."    1,900    │  │
│  │                                                        │  │
│  │  NOTE: Prompts shown as aggregated theme clusters,     │  │
│  │  NOT verbatim user text. No PII displayed.             │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

> **Privacy note:** The "Example Prompts" section displays **aggregated theme clusters** derived from keyword extraction, not actual user prompts. This ensures compliance with the anonymization requirement.

---

## 9. Cross-Platform Integration Design

### 9.1 Bridge Relationship

The cross-platform bridge between ToyotaGPT (D12) and Enterprise AI (D11) is established through:

```
DimToyotaDept.MappedBUKey  ──── M:1 ────  DimBusinessUnit.BUKey
```

This inactive relationship is activated via `TREATAS` in cross-platform DAX measures, avoiding ambiguity with the primary D11 relationship chain.

### 9.2 Department-to-BU Mapping Table

| Toyota Department | Toyota Division | Mapped Acme BU | Mapping Rationale |
|-------------------|----------------|----------------|-------------------|
| Vehicle Engineering | R&D | Research & Development | Direct functional equivalent |
| Software Engineering | R&D | Information Technology | Technical function alignment |
| Manufacturing Ops | Production | OEM Assembly Plants | Production function |
| Supply Chain | Production | Logistics | Logistics function |
| Parts Operations | After-Sales | Parts & Service | Direct equivalent |
| Dealer Relations | Sales | Dealer Network | Dealer function |
| Financial Products | Finance | Financial Services | Financial function |
| Connected Vehicle | Technology | Connected Services | Technology function |
| Corporate Finance | Corporate | Finance | Direct equivalent |
| HR & Admin | Corporate | Human Resources | Direct equivalent |
| Legal & Compliance | Corporate | Legal | Direct equivalent |
| Marketing & Comms | Corporate | Marketing | Direct equivalent |
| Sales Operations | Commercial | Sales | Direct equivalent |

### 9.3 View 1 Enhancement: ToyotaGPT Summary Card

Add a new KPI card to the Executive Summary (View 1):

```
┌─────────────────────┐
│  ToyotaGPT Activity │
│  142,830 prompts    │
│  ▲ 12.3% MoM       │
│  3,247 users        │
└─────────────────────┘
```

**DAX:**
```dax
ToyotaGPT Summary Prompts =
CALCULATE(
    [Total Prompt Volume],
    ALL(DimPromptCategory),
    ALL(DimToyotaDept)
)
```

This card links to View 4 via drill-through.

### 9.4 Global Filter Synchronization

| Filter | View 1 | View 2 | View 3 | View 4 |
|--------|--------|--------|--------|--------|
| Date Range | DimDate | DimDate | DimDate | DimDate |
| Business Unit | DimBusinessUnit | DimBusinessUnit | (inherited) | DimToyotaDept via MappedBUKey |
| Department | — | — | — | DimToyotaDept (primary) |
| Task Type | DimTaskType | DimTaskType | DimTaskType | — |
| Prompt Category | — | — | — | DimPromptCategory |

---

## 10. Gap Analysis Engine

### 10.1 Gap Score Calculation

The Response Gap Score identifies categories where ToyotaGPT falls short of user needs:

```
Gap Score = Normalized Demand × (1 - Satisfaction)

Where:
  Normalized Demand = Category Volume / Total Volume
  Satisfaction = (ThumbsUp - ThumbsDown) / (ThumbsUp + ThumbsDown)   range: [-1, +1]
```

| Scenario | Demand | Satisfaction | Gap Score | Interpretation |
|----------|--------|-------------|-----------|----------------|
| High traffic, low satisfaction | 0.30 | -0.20 | 0.36 | Critical gap — many users, poor experience |
| High traffic, high satisfaction | 0.30 | +0.80 | 0.06 | Well-served — no action needed |
| Low traffic, low satisfaction | 0.05 | -0.40 | 0.07 | Niche gap — monitor |
| Low traffic, high satisfaction | 0.05 | +0.90 | 0.005 | Well-served niche |

### 10.2 Top 10 Unmet Needs Ranking

```dax
Top 10 Unmet Needs =
TOPN(
    10,
    ADDCOLUMNS(
        SUMMARIZE(FactPromptDaily, DimPromptCategory[CategoryName]),
        "GapScore", [Response Gap Score],
        "Volume", [Total Prompt Volume],
        "Satisfaction", [Avg Response Satisfaction]
    ),
    [GapScore], DESC
)
```

### 10.3 Gap Trend Tracking

Track whether previously identified gaps are improving:

```dax
Gap Score Prior Month =
CALCULATE(
    [Response Gap Score],
    DATEADD(DimDate[Date], -1, MONTH)
)

Gap Trend =
VAR Current = [Response Gap Score]
VAR Prior = [Gap Score Prior Month]
RETURN
    SWITCH(
        TRUE(),
        Current < Prior * 0.9, "Improving",
        Current > Prior * 1.1, "Worsening",
        "Stable"
    )
```

### 10.4 Recommendation Generation Rules

| Gap Condition | Recommendation Template |
|---------------|----------------------|
| Gap Score > 0.30 AND Satisfaction < 0 | "CRITICAL: {Category} has high demand ({Volume} prompts/month) with negative satisfaction ({Satisfaction}). Immediate knowledge base expansion recommended." |
| Gap Score > 0.20 AND Satisfaction < 0.3 | "HIGH: {Category} shows significant unmet need. Review ToyotaGPT knowledge base coverage for {Category} topics." |
| Gap Score > 0.10 AND Trend = "Worsening" | "WATCH: {Category} gap is increasing. Investigate recent changes in user behavior or knowledge base gaps." |
| Regenerated% > 15% for category | "QUALITY: {Category} has high regeneration rate ({Regenerated%}%). Response quality may need improvement." |

---

## 11. Security & Privacy Design

### 11.1 PII Anonymization Flow

```
┌──────────────┐     ┌──────────────────┐     ┌──────────────────┐
│ Raw Data     │     │ Anonymization    │     │ Analytics Layer  │
│              │     │ Layer            │     │ (Power BI)       │
│ user_id      │────▶│ SHA-256(user_id  │────▶│ anonymized_hash  │
│              │     │   + daily_salt)  │     │                  │
│ prompt_text  │────▶│ CLASSIFY → drop  │────▶│ category_key     │
│              │     │ (text NOT stored)│     │ intent_type      │
│              │     │                  │     │ complexity_level  │
│ department_id│────▶│ lookup dept_key  │────▶│ dept_key (FK)    │
└──────────────┘     └──────────────────┘     └──────────────────┘
```

### 11.2 Data That Is NEVER Stored in Analytics

| Data Element | Reason | Alternative Stored |
|-------------|--------|-------------------|
| Raw prompt text | PII risk, confidential content | Category classification only |
| User name | PII | Anonymized hash |
| Email address | PII | Not stored at all |
| Employee ID (raw) | PII | SHA-256 hash |
| Response text | Confidential content | Satisfaction score, token count only |

### 11.3 PII Detection Validation

Post-ETL validation scan using regex patterns:

| Pattern | Regex | Action |
|---------|-------|--------|
| Email | `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` | Quarantine row |
| Phone (US) | `\b\d{3}[-.]?\d{3}[-.]?\d{4}\b` | Quarantine row |
| SSN | `\b\d{3}-\d{2}-\d{4}\b` | Quarantine row, alert |
| Toyota employee ID | `\bT\d{6,8}\b` | Hash if unhashed, alert |

### 11.4 RLS Extension for D12

| Role | D11 Access | D12 Access |
|------|-----------|-----------|
| Admin | All BUs, all data | All departments, all prompt data |
| BU Leader | Own BU only | Mapped Toyota department(s) only |
| Viewer | Read-only, all BUs | Read-only, all departments |
| Toyota Dept Manager (NEW) | No D11 access | Own department only |

**RLS Filter Expression (Toyota Dept Manager):**
```dax
[DeptKey] = LOOKUPVALUE(
    DimToyotaDept[DeptKey],
    DimToyotaDept[DeptID],
    USERPRINCIPALNAME()
)
```

> **Note:** The exact implementation depends on how Toyota department assignments are managed in Azure AD. If Toyota users are provisioned via Azure AD groups, the RLS filter uses `USERNAME()` mapped through a security table.

---

## 12. Performance Design

### 12.1 Performance Budget

| View | Target Load | Target Refresh | Strategy |
|------|-------------|---------------|----------|
| View 1 (Executive) | <3s | <2s | FactDailyAdoption aggregation |
| View 2 (BU) | <4s | <2s | Pre-filtered by RLS |
| View 3 (Use Case) | <4s | <2s | Heatmap uses FactDailyAdoption |
| View 4 (Prompt) | <5s | <3s | FactPromptDaily aggregation; limit heatmap cells |

### 12.2 Optimization Strategies

| Strategy | Target Table | Description |
|----------|-------------|-------------|
| Pre-aggregation | FactPromptDaily | All View 4 visuals use daily rollup, not row-level FactPrompt |
| Partition pruning | FactPrompt | Monthly partitions; queries only scan relevant months |
| Star join optimization | All facts | All relationships are M:1 to small dimensions; enables Vertipaq optimization |
| Avoid DISTINCTCOUNT on large tables | FactPrompt | Use pre-computed UniqueUsers from FactPromptDaily instead |
| Limit heatmap cardinality | View 4 heatmap | Max 8 categories x 25 departments = 200 cells |
| Conditional formatting via measures | Gap Analysis | Use measure-based conditional formatting, not row-level rules |

### 12.3 Data Volume Projections

| Table | Year 1 Rows | Year 2 Rows | Row Size (est.) | Year 1 Size |
|-------|------------|------------|-----------------|-------------|
| FactPrompt | 1,500,000 | 3,000,000 | ~120 bytes | ~180 MB |
| FactPromptDaily | 73,000 | 146,000 | ~80 bytes | ~6 MB |
| DimPromptCategory | 14 | 14 | ~200 bytes | <1 KB |
| DimToyotaDept | ~30 | ~35 | ~150 bytes | <5 KB |

> **Vertipaq compression:** Actual in-memory size will be significantly smaller due to Vertipaq's columnar compression. Estimated model size increase from D12: ~30-50 MB.

---

## 13. Testing Strategy

### 13.1 Test Levels

| Level | Scope | Owner | Sprint |
|-------|-------|-------|--------|
| Unit Testing | Individual DAX measures against known data | PBI Lead | Sprint 6 |
| Pipeline Testing | ETL end-to-end with test data | DE | Sprint 6 |
| Classification Testing | Accuracy of keyword + LLM classifier | DE | Sprint 6 |
| Integration Testing | View 4 visuals with live data, cross-filtering | QA | Sprint 8 |
| Security Testing | RLS, PII validation, anonymization | QA | Sprint 8 |
| Performance Testing | Load times, refresh times, concurrent users | QA/PBI | Sprint 7-8 |
| UAT | Use-case-based acceptance (UC-01 through UC-07) | PM | Sprint 8 |

### 13.2 Classification Test Plan

| Test Case | Input | Expected Output | Pass Criteria |
|-----------|-------|-----------------|---------------|
| CL-01: Clear keyword match | "How do I reset my VPN password?" | Category: Technical Support, Intent: Transactional, Complexity: Simple | Exact match |
| CL-02: Policy query | "What is our PTO policy for 2026?" | Category: Policy Lookup, Intent: Informational, Complexity: Simple | Exact match |
| CL-03: Ambiguous prompt | "Help me with the new system" | Routed to LLM Stage 2 | Category assigned (any valid) |
| CL-04: Vehicle spec | "Towing capacity for 2026 Tacoma TRD Pro" | Category: Product & Engineering | Exact match |
| CL-05: Multi-intent | "Draft an email about the new travel policy" | Category: General Knowledge OR Policy Lookup | Either accepted |
| CL-06: PII in prompt | "John Smith's SSN is 123-45-6789" | PII detected → quarantine | Row quarantined, alert triggered |
| CL-07: Batch accuracy | 100 random production prompts | Manually labeled vs auto-classified | >85% agreement |

### 13.3 DAX Measure Test Cases

| Test Case | Measure | Test Data Setup | Expected Result |
|-----------|---------|----------------|-----------------|
| DX-01 | Total Prompt Volume | 100 rows in FactPromptDaily, PromptCount = 10 each | 1,000 |
| DX-02 | Avg Response Satisfaction | ThumbsUp=80, ThumbsDown=20 | +0.60 |
| DX-03 | Response Gap Score | Demand=30%, Satisfaction=-0.20 | 0.36 |
| DX-04 | MoM Growth | Current month=500, Prior=400 | +25% |
| DX-05 | Cross-Platform Active Rate | Mapped BU has 100 licensed, 60 active | 60% |

---

## 14. Deployment Design

### 14.1 Deployment Sequence

```
1. Deploy DimPromptCategory (seed data)     ← Sprint 6
2. Deploy DimToyotaDept (initial load)       ← Sprint 6
3. Deploy FactPrompt table (empty)           ← Sprint 6
4. Deploy FactPromptDaily table (empty)      ← Sprint 6
5. Enable ETL pipeline (data begins flowing) ← Sprint 6
6. Deploy DAX measures                       ← Sprint 6
7. Deploy View 4 page + visuals              ← Sprint 7
8. Deploy cross-platform integration         ← Sprint 7
9. Deploy View 1 ToyotaGPT summary card      ← Sprint 7
10. Deploy updated RLS rules                 ← Sprint 8
11. Production smoke test                    ← Sprint 8
12. UAT sign-off                             ← Sprint 8
13. Final production deployment              ← Sprint 8
```

### 14.2 Rollback Plan

| Component | Rollback Action | Impact |
|-----------|----------------|--------|
| View 4 tab | Remove tab from navigation; hide page | Views 1-3 unaffected |
| Cross-platform card on View 1 | Remove card visual | View 1 returns to D11 layout |
| New DAX measures | Delete measures | No impact on D11 measures |
| New tables | Remove from model | No impact on D11 tables |
| ETL pipeline | Disable scheduled refresh for ToyotaGPT sources | D11 refresh continues |
| RLS rules | Revert to D11 role definitions | Toyota users lose access |

### 14.3 Feature Flags

| Flag | Purpose | Default |
|------|---------|---------|
| `ENABLE_VIEW4` | Show/hide View 4 tab in navigation | `false` until Sprint 7 complete |
| `ENABLE_CROSS_PLATFORM` | Show/hide ToyotaGPT summary on View 1 | `false` until Sprint 7 complete |
| `ENABLE_TOYOTA_RLS` | Activate Toyota Dept Manager RLS role | `false` until Sprint 8 UAT |

---

## 15. Appendices

### Appendix A: Glossary

| Term | Definition |
|------|-----------|
| ToyotaGPT | A custom GPT deployment at Toyota built on OpenAI's GPT platform, used internally by Toyota employees for information retrieval and task assistance |
| Prompt | A user's text input to ToyotaGPT |
| Taxonomy | The 8-category classification system for organizing prompt themes |
| Gap Score | A computed metric indicating where user demand exceeds ToyotaGPT's ability to provide satisfactory answers |
| PII | Personally Identifiable Information — data that can identify an individual |
| RLS | Row-Level Security — Power BI feature restricting data visibility by user role |
| Cross-platform correlation | The ability to link ToyotaGPT usage patterns with Enterprise AI adoption metrics via the DimToyotaDept-to-DimBusinessUnit bridge |

### Appendix B: Document Cross-References

| Document | Path | Relationship |
|----------|------|-------------|
| D12 Sprint Plan | `docs/D12-sprint-plan.md` | Sprint schedule, tasks, milestones |
| D11 Sprint Plan | `docs/D11-sprint-plan.md` | MVP baseline reference |
| Requirements | `docs/requirements.md` | Functional and non-functional requirements |
| Sprint Backlog | `docs/sprint-backlog.md` | User stories US-042 through US-047 |
| Project Backlog | `docs/project-backlog.md` | Epics and full task breakdown |
| Data Dictionary | `docs/data-dictionary.md` | Field-level data definitions |
| Prototype Design | `docs/plans/2026-01-22-prototype-design.md` | View layouts, data structures, color palette |
| Sprint Plan Summary | `docs/sprint-plan-summary.html` | Interactive HTML summary of all sprints |

### Appendix C: Open Questions

| # | Question | Owner | Status |
|---|----------|-------|--------|
| 1 | What is the exact API endpoint / export mechanism for ToyotaGPT prompt logs? | Toyota AI Platform Team | Pending — Sprint 5 |
| 2 | Does Toyota have an existing logging layer, or do we need to instrument one? | Toyota AI Platform Team | Pending — Sprint 5 |
| 3 | What is the Toyota organizational hierarchy depth (dept / division / group)? | Toyota HR | Pending — Sprint 5 |
| 4 | Are there existing Toyota department-to-Acme BU mappings, or do we define them? | PM | Pending — Sprint 5 |
| 5 | What is the Toyota data retention policy for prompt logs? | Toyota Legal | Pending — Sprint 5 |
| 6 | Can we use the OpenAI API for batch classification, or do we need an Azure-hosted model? | DE | Pending — Sprint 6 |
| 7 | What Azure AD groups will Toyota Dept Managers be provisioned under for RLS? | Toyota IT / Identity | Pending — Sprint 7 |

---

*Document Version: 1.0*
*Created: February 12, 2026*
*Last Updated: February 12, 2026*
*Next Review: Sprint 5 kickoff (March 16, 2026)*
