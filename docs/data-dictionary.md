# Data Dictionary

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## 1. Overview
This document defines all data elements used in the Power BI dashboard, including source mappings, transformations, and business definitions.

## 2. Data Sources

### Source 1: [SOURCE_NAME]
- **Connection Type:** [SQL Server / Excel / API / etc.]
- **Server/Path:** [Connection details]
- **Database:** [Database name]
- **Refresh Schedule:** [Daily / Weekly / etc.]

### Source 2: [SOURCE_NAME]
- **Connection Type:** [Type]
- **Server/Path:** [Connection details]
- **Refresh Schedule:** [Schedule]

---

## 3. Tables

### 3.1 Fact Tables

#### FactSales (Example)
| Column Name | Data Type | Source Field | Description | Business Rules |
|-------------|-----------|--------------|-------------|----------------|
| SalesID | INT | sales.id | Primary key | Auto-increment |
| DateKey | INT | sales.date | Foreign key to DimDate | YYYYMMDD format |
| CustomerKey | INT | sales.customer_id | Foreign key to DimCustomer | |
| Amount | DECIMAL(18,2) | sales.amount | Transaction amount | Excludes tax |
| Quantity | INT | sales.qty | Units sold | Must be > 0 |

### 3.2 Dimension Tables

#### DimDate
| Column Name | Data Type | Description | Sample Values |
|-------------|-----------|-------------|---------------|
| DateKey | INT | Primary key (YYYYMMDD) | 20260122 |
| Date | DATE | Full date | 2026-01-22 |
| Year | INT | Calendar year | 2026 |
| Quarter | INT | Calendar quarter | 1 |
| Month | INT | Calendar month | 1 |
| MonthName | VARCHAR(20) | Month name | January |
| WeekOfYear | INT | Week number | 4 |
| DayOfWeek | INT | Day number (1=Sun) | 5 |
| DayName | VARCHAR(20) | Day name | Thursday |
| IsWeekend | BIT | Weekend flag | 0 |
| FiscalYear | INT | Fiscal year | 2026 |
| FiscalQuarter | INT | Fiscal quarter | 3 |

#### DimCustomer (Example)
| Column Name | Data Type | Source Field | Description |
|-------------|-----------|--------------|-------------|
| CustomerKey | INT | customer.id | Primary key |
| CustomerName | VARCHAR(100) | customer.name | Full name |
| Segment | VARCHAR(50) | customer.segment | Customer segment |
| Region | VARCHAR(50) | customer.region | Geographic region |

---

## 4. Calculated Columns

| Table | Column Name | DAX Expression | Description |
|-------|-------------|----------------|-------------|
| DimDate | YearMonth | `FORMAT([Date], "YYYY-MM")` | Year-month string |
| [Table] | [Column] | `[Expression]` | [Description] |

---

## 5. Relationships

| From Table | From Column | To Table | To Column | Cardinality | Cross-Filter |
|------------|-------------|----------|-----------|-------------|--------------|
| FactSales | DateKey | DimDate | DateKey | Many-to-One | Single |
| FactSales | CustomerKey | DimCustomer | CustomerKey | Many-to-One | Single |

---

## 6. Data Transformations (Power Query)

### Transformation 1: [Name]
- **Source Table:** [Table]
- **Steps:**
  1. [Step description]
  2. [Step description]
- **Output:** [Description]

---

## 7. Data Quality Rules

| Rule ID | Table | Column | Rule | Action |
|---------|-------|--------|------|--------|
| DQ-001 | FactSales | Amount | Amount >= 0 | Reject row |
| DQ-002 | DimCustomer | CustomerName | Not null | Flag for review |

---

## 8. Change Log

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [Name] | Initial version |
