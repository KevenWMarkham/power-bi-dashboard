# DAX Measures Documentation

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## Table of Contents
1. [Naming Conventions](#naming-conventions)
2. [Core Measures](#core-measures)
3. [Time Intelligence Measures](#time-intelligence-measures)
4. [KPI Measures](#kpi-measures)
5. [Calculated Columns](#calculated-columns)
6. [Measure Dependencies](#measure-dependencies)

---

## Naming Conventions

| Prefix | Usage | Example |
|--------|-------|---------|
| (none) | Base measures | `Total Sales` |
| % | Percentage measures | `% Growth YoY` |
| # | Count measures | `# Customers` |
| Avg | Average measures | `Avg Order Value` |
| _ | Helper/hidden measures | `_FilteredSales` |

---

## Core Measures

### Total Sales
```dax
Total Sales =
SUM(FactSales[Amount])
```
| Property | Value |
|----------|-------|
| **Display Folder** | Sales |
| **Format String** | $#,##0.00 |
| **Description** | Sum of all sales amounts excluding tax |
| **Source Table** | FactSales |
| **Dependencies** | None |
| **Used In** | View 1, View 2 |

---

### Total Quantity
```dax
Total Quantity =
SUM(FactSales[Quantity])
```
| Property | Value |
|----------|-------|
| **Display Folder** | Sales |
| **Format String** | #,##0 |
| **Description** | Sum of all units sold |
| **Source Table** | FactSales |
| **Dependencies** | None |
| **Used In** | View 1 |

---

### # Transactions
```dax
# Transactions =
COUNTROWS(FactSales)
```
| Property | Value |
|----------|-------|
| **Display Folder** | Sales |
| **Format String** | #,##0 |
| **Description** | Count of sales transactions |
| **Source Table** | FactSales |
| **Dependencies** | None |
| **Used In** | View 2, View 3 |

---

### # Customers
```dax
# Customers =
DISTINCTCOUNT(FactSales[CustomerKey])
```
| Property | Value |
|----------|-------|
| **Display Folder** | Customers |
| **Format String** | #,##0 |
| **Description** | Count of unique customers |
| **Source Table** | FactSales |
| **Dependencies** | None |
| **Used In** | View 1, View 3 |

---

### Avg Order Value
```dax
Avg Order Value =
DIVIDE([Total Sales], [# Transactions], 0)
```
| Property | Value |
|----------|-------|
| **Display Folder** | Sales |
| **Format String** | $#,##0.00 |
| **Description** | Average sales amount per transaction |
| **Source Table** | N/A (calculated) |
| **Dependencies** | [Total Sales], [# Transactions] |
| **Used In** | View 2 |

---

## Time Intelligence Measures

### Sales YTD
```dax
Sales YTD =
TOTALYTD([Total Sales], DimDate[Date])
```
| Property | Value |
|----------|-------|
| **Display Folder** | Time Intelligence |
| **Format String** | $#,##0.00 |
| **Description** | Year-to-date sales total |
| **Dependencies** | [Total Sales], DimDate |
| **Used In** | View 1 |

---

### Sales PY (Prior Year)
```dax
Sales PY =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR(DimDate[Date])
)
```
| Property | Value |
|----------|-------|
| **Display Folder** | Time Intelligence |
| **Format String** | $#,##0.00 |
| **Description** | Sales for same period in prior year |
| **Dependencies** | [Total Sales], DimDate |
| **Used In** | View 1, View 2 |

---

### % Growth YoY
```dax
% Growth YoY =
VAR CurrentSales = [Total Sales]
VAR PriorSales = [Sales PY]
RETURN
DIVIDE(CurrentSales - PriorSales, PriorSales, BLANK())
```
| Property | Value |
|----------|-------|
| **Display Folder** | Time Intelligence |
| **Format String** | 0.0%;-0.0%;0.0% |
| **Description** | Year-over-year growth percentage |
| **Dependencies** | [Total Sales], [Sales PY] |
| **Used In** | View 1 |

---

### Sales MTD
```dax
Sales MTD =
TOTALMTD([Total Sales], DimDate[Date])
```
| Property | Value |
|----------|-------|
| **Display Folder** | Time Intelligence |
| **Format String** | $#,##0.00 |
| **Description** | Month-to-date sales total |
| **Dependencies** | [Total Sales], DimDate |
| **Used In** | View 2 |

---

### Sales Rolling 12M
```dax
Sales Rolling 12M =
CALCULATE(
    [Total Sales],
    DATESINPERIOD(
        DimDate[Date],
        MAX(DimDate[Date]),
        -12,
        MONTH
    )
)
```
| Property | Value |
|----------|-------|
| **Display Folder** | Time Intelligence |
| **Format String** | $#,##0.00 |
| **Description** | Rolling 12-month sales total |
| **Dependencies** | [Total Sales], DimDate |
| **Used In** | View 3 |

---

## KPI Measures

### Sales vs Target
```dax
Sales vs Target =
[Total Sales] - [Sales Target]
```
| Property | Value |
|----------|-------|
| **Display Folder** | KPIs |
| **Format String** | $#,##0.00 |
| **Description** | Variance from sales target |
| **Dependencies** | [Total Sales], [Sales Target] |
| **Used In** | View 1 |

---

### % Target Achievement
```dax
% Target Achievement =
DIVIDE([Total Sales], [Sales Target], BLANK())
```
| Property | Value |
|----------|-------|
| **Display Folder** | KPIs |
| **Format String** | 0.0% |
| **Description** | Percentage of target achieved |
| **Dependencies** | [Total Sales], [Sales Target] |
| **Used In** | View 1 |

---

### KPI Status
```dax
KPI Status =
SWITCH(
    TRUE(),
    [% Target Achievement] >= 1, "Green",
    [% Target Achievement] >= 0.9, "Yellow",
    "Red"
)
```
| Property | Value |
|----------|-------|
| **Display Folder** | KPIs |
| **Format String** | Text |
| **Description** | RAG status based on target achievement |
| **Dependencies** | [% Target Achievement] |
| **Used In** | View 1 (conditional formatting) |

---

## Calculated Columns

### DimDate[YearMonth]
```dax
YearMonth = FORMAT([Date], "YYYY-MM")
```
| Property | Value |
|----------|-------|
| **Table** | DimDate |
| **Data Type** | Text |
| **Description** | Year-month string for sorting/grouping |

---

### DimDate[IsCurrentMonth]
```dax
IsCurrentMonth =
IF(
    YEAR([Date]) = YEAR(TODAY()) && MONTH([Date]) = MONTH(TODAY()),
    TRUE,
    FALSE
)
```
| Property | Value |
|----------|-------|
| **Table** | DimDate |
| **Data Type** | Boolean |
| **Description** | Flag for current month filtering |

---

## Measure Dependencies

```
Total Sales
├── Sales YTD
├── Sales PY
│   └── % Growth YoY
├── Sales MTD
├── Sales Rolling 12M
├── Avg Order Value (+ # Transactions)
├── Sales vs Target (+ Sales Target)
└── % Target Achievement (+ Sales Target)
    └── KPI Status
```

---

## Measure Template

Use this template when adding new measures:

```markdown
### [Measure Name]
```dax
[Measure Name] =
[DAX Expression]
```
| Property | Value |
|----------|-------|
| **Display Folder** | [Folder] |
| **Format String** | [Format] |
| **Description** | [Description] |
| **Source Table** | [Table or N/A] |
| **Dependencies** | [List measures] |
| **Used In** | [List views] |
```

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [Name] | Initial measures |
