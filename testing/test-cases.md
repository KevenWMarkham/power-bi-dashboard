# Test Cases

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]
**QA Analyst:** [Name]

---

## Test Summary

| Category | Total | Passed | Failed | Blocked | Not Run |
|----------|-------|--------|--------|---------|---------|
| Functional | 15 | 0 | 0 | 0 | 15 |
| Data Validation | 10 | 0 | 0 | 0 | 10 |
| Performance | 5 | 0 | 0 | 0 | 5 |
| Security | 5 | 0 | 0 | 0 | 5 |
| **Total** | **35** | **0** | **0** | **0** | **35** |

---

## Functional Test Cases

### View 1: [VIEW_NAME]

| TC ID | Test Case | Steps | Expected Result | Status | Tester | Date |
|-------|-----------|-------|-----------------|--------|--------|------|
| TC-F-001 | Verify View 1 loads correctly | 1. Navigate to View 1 | All visuals load without error | Not Run | | |
| TC-F-002 | Verify date filter functionality | 1. Select date range<br>2. Observe visuals | All visuals filter to selected dates | Not Run | | |
| TC-F-003 | Verify cross-filter between visuals | 1. Click on chart element<br>2. Observe other visuals | Related visuals filter accordingly | Not Run | | |
| TC-F-004 | Verify tooltip displays | 1. Hover over data point | Tooltip shows expected metrics | Not Run | | |
| TC-F-005 | Verify drill-down functionality | 1. Click drill-down icon<br>2. Click data point | Drill-down to next level works | Not Run | | |

### View 2: [VIEW_NAME]

| TC ID | Test Case | Steps | Expected Result | Status | Tester | Date |
|-------|-----------|-------|-----------------|--------|--------|------|
| TC-F-006 | Verify View 2 loads correctly | 1. Navigate to View 2 | All visuals load without error | Not Run | | |
| TC-F-007 | Verify slicer selections persist | 1. Select slicer value<br>2. Navigate away<br>3. Return | Slicer selection maintained | Not Run | | |
| TC-F-008 | Verify KPI visual displays correctly | 1. View KPI visual | Shows correct value, target, status | Not Run | | |
| TC-F-009 | Verify export to Excel | 1. Click visual<br>2. Export data | Excel file downloads with correct data | Not Run | | |
| TC-F-010 | Verify bookmark navigation | 1. Click bookmark | View changes to bookmarked state | Not Run | | |

### View 3: [VIEW_NAME]

| TC ID | Test Case | Steps | Expected Result | Status | Tester | Date |
|-------|-----------|-------|-----------------|--------|--------|------|
| TC-F-011 | Verify View 3 loads correctly | 1. Navigate to View 3 | All visuals load without error | Not Run | | |
| TC-F-012 | Verify table sorting | 1. Click column header | Table sorts by column | Not Run | | |
| TC-F-013 | Verify conditional formatting | 1. View formatted cells | Colors match business rules | Not Run | | |
| TC-F-014 | Verify matrix expand/collapse | 1. Click +/- icons | Hierarchy expands/collapses | Not Run | | |
| TC-F-015 | Verify page navigation | 1. Click navigation buttons | Navigation works between views | Not Run | | |

---

## Data Validation Test Cases

| TC ID | Test Case | SQL Query / Source | Expected Result | Status | Tester | Date |
|-------|-----------|-------------------|-----------------|--------|--------|------|
| TC-D-001 | Validate Total Sales matches source | `SELECT SUM(Amount) FROM Sales` | Power BI = Source within 0.01% | Not Run | | |
| TC-D-002 | Validate customer count | `SELECT COUNT(DISTINCT CustomerID)` | Power BI = Source | Not Run | | |
| TC-D-003 | Validate transaction count | `SELECT COUNT(*) FROM Sales` | Power BI = Source | Not Run | | |
| TC-D-004 | Validate YTD calculation | Manual calculation | Power BI YTD correct | Not Run | | |
| TC-D-005 | Validate prior year calculation | `SELECT SUM(...) WHERE Year = @PY` | Power BI PY matches | Not Run | | |
| TC-D-006 | Validate % Growth calculation | `(CY - PY) / PY` | Manual calc matches visual | Not Run | | |
| TC-D-007 | Validate date range boundaries | Check first/last dates | Min/max dates correct | Not Run | | |
| TC-D-008 | Validate NULL handling | Check for NULLs in source | NULLs handled appropriately | Not Run | | |
| TC-D-009 | Validate data freshness | Check last refresh time | Data as of expected date | Not Run | | |
| TC-D-010 | Validate regional totals | Sum of regions = grand total | No orphan records | Not Run | | |

---

## Performance Test Cases

| TC ID | Test Case | Threshold | Actual | Status | Tester | Date |
|-------|-----------|-----------|--------|--------|--------|------|
| TC-P-001 | Initial dashboard load time | < 5 seconds | | Not Run | | |
| TC-P-002 | Filter selection response | < 3 seconds | | Not Run | | |
| TC-P-003 | Visual render after slicer change | < 3 seconds | | Not Run | | |
| TC-P-004 | Drill-down response time | < 3 seconds | | Not Run | | |
| TC-P-005 | Export to Excel performance | < 10 seconds | | Not Run | | |

---

## Security Test Cases

| TC ID | Test Case | Steps | Expected Result | Status | Tester | Date |
|-------|-----------|-------|-----------------|--------|--------|------|
| TC-S-001 | Verify RLS - Region North | 1. Login as North user<br>2. Check data | Only North data visible | Not Run | | |
| TC-S-002 | Verify RLS - Region South | 1. Login as South user<br>2. Check data | Only South data visible | Not Run | | |
| TC-S-003 | Verify RLS - Admin | 1. Login as Admin<br>2. Check data | All data visible | Not Run | | |
| TC-S-004 | Verify unauthorized access denied | 1. Attempt access without permissions | Access denied message | Not Run | | |
| TC-S-005 | Verify data export restrictions | 1. Attempt export as restricted user | Export blocked per policy | Not Run | | |

---

## Defect Log

| Defect ID | TC ID | Severity | Summary | Status | Assigned To | Resolution |
|-----------|-------|----------|---------|--------|-------------|------------|
| DEF-001 | | | | | | |

**Severity Levels:**
- Critical: Dashboard unusable, data incorrect
- High: Major feature broken, significant data issue
- Medium: Feature partially working, minor data variance
- Low: Cosmetic issue, enhancement

---

## Sign-off

| Role | Name | Signature | Date |
|------|------|-----------|------|
| QA Analyst | | | |
| Power BI Lead | | | |
| Business Owner | | | |
