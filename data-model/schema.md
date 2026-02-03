# Data Model Schema

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## Model Overview

```
┌─────────────────┐     ┌─────────────────┐
│    DimDate      │     │   DimCustomer   │
│  (Date Table)   │     │                 │
└────────┬────────┘     └────────┬────────┘
         │                       │
         │ 1:*               1:* │
         │                       │
         ▼                       ▼
┌─────────────────────────────────────────┐
│              FactSales                  │
│         (Transaction Fact)              │
└─────────────────────────────────────────┘
         │
         │ *:1
         ▼
┌─────────────────┐
│   DimProduct    │
│                 │
└─────────────────┘
```

---

## Tables

### Fact Tables

#### FactSales
**Grain:** One row per sales transaction line item
**Load Type:** Incremental
**Refresh:** Daily

| Column | Data Type | Key | Nullable | Description |
|--------|-----------|-----|----------|-------------|
| SalesKey | INT | PK | No | Surrogate key |
| DateKey | INT | FK | No | Link to DimDate |
| CustomerKey | INT | FK | Yes | Link to DimCustomer |
| ProductKey | INT | FK | Yes | Link to DimProduct |
| Amount | DECIMAL(18,2) | | No | Transaction amount |
| Quantity | INT | | No | Units sold |
| Cost | DECIMAL(18,2) | | Yes | Cost of goods |

### Dimension Tables

#### DimDate
**Type:** Role-playing dimension
**Load Type:** Full (generated)

| Column | Data Type | Key | Description |
|--------|-----------|-----|-------------|
| DateKey | INT | PK | YYYYMMDD format |
| Date | DATE | | Full date |
| Year | INT | | Calendar year |
| Quarter | INT | | Calendar quarter |
| Month | INT | | Month number |
| MonthName | VARCHAR(20) | | Month name |
| WeekOfYear | INT | | Week number |
| DayOfWeek | INT | | Day number |
| DayName | VARCHAR(20) | | Day name |
| IsWeekend | BIT | | Weekend flag |
| FiscalYear | INT | | Fiscal year |
| FiscalQuarter | INT | | Fiscal quarter |

#### DimCustomer
**Type:** Type 1 SCD
**Load Type:** Full

| Column | Data Type | Key | Description |
|--------|-----------|-----|-------------|
| CustomerKey | INT | PK | Surrogate key |
| CustomerID | VARCHAR(50) | BK | Business key |
| CustomerName | VARCHAR(100) | | Customer name |
| Segment | VARCHAR(50) | | Customer segment |
| Region | VARCHAR(50) | | Geographic region |
| Country | VARCHAR(50) | | Country |

#### DimProduct
**Type:** Type 2 SCD
**Load Type:** Incremental

| Column | Data Type | Key | Description |
|--------|-----------|-----|-------------|
| ProductKey | INT | PK | Surrogate key |
| ProductID | VARCHAR(50) | BK | Business key |
| ProductName | VARCHAR(100) | | Product name |
| Category | VARCHAR(50) | | Product category |
| SubCategory | VARCHAR(50) | | Product subcategory |
| ValidFrom | DATE | | SCD effective date |
| ValidTo | DATE | | SCD end date |
| IsCurrent | BIT | | Current record flag |

---

## Relationships

| From Table | From Column | To Table | To Column | Cardinality | Active | Cross-Filter |
|------------|-------------|----------|-----------|-------------|--------|--------------|
| FactSales | DateKey | DimDate | DateKey | *:1 | Yes | Single |
| FactSales | CustomerKey | DimCustomer | CustomerKey | *:1 | Yes | Single |
| FactSales | ProductKey | DimProduct | ProductKey | *:1 | Yes | Single |

---

## Row-Level Security

### Security Roles

| Role Name | Filter Table | DAX Filter Expression |
|-----------|--------------|----------------------|
| Region - North | DimCustomer | `[Region] = "North"` |
| Region - South | DimCustomer | `[Region] = "South"` |
| Region - All | (none) | (no filter) |

### Role Membership
| Role | AD Group / Users |
|------|------------------|
| Region - North | [AD_Group_North] |
| Region - South | [AD_Group_South] |
| Region - All | [AD_Group_Admins] |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [Name] | Initial schema |
