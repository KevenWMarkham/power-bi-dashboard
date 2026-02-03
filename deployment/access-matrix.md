# Access Matrix

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## Power BI Workspace Access

### Workspace: [WORKSPACE_NAME]

| Access Level | Permissions | AD Group / Users |
|--------------|-------------|------------------|
| Admin | Full control, manage permissions, delete workspace | [AD_GROUP_ADMINS] |
| Member | Create/edit/delete content, manage permissions | [AD_GROUP_MEMBERS] |
| Contributor | Create/edit/delete content | [AD_GROUP_CONTRIBUTORS] |
| Viewer | View content only | [AD_GROUP_VIEWERS] |

---

## Row-Level Security Roles

| RLS Role | Data Access | AD Group / Users | Notes |
|----------|-------------|------------------|-------|
| Region - North | North region data only | [AD_GROUP_NORTH] | |
| Region - South | South region data only | [AD_GROUP_SOUTH] | |
| Region - East | East region data only | [AD_GROUP_EAST] | |
| Region - West | West region data only | [AD_GROUP_WEST] | |
| All Regions | All data | [AD_GROUP_EXECUTIVES] | Leadership team |

---

## User Access List

### Viewers

| Name | Email | Department | RLS Role | Access Granted | Granted By |
|------|-------|------------|----------|----------------|------------|
| [Name] | [Email] | [Dept] | [Role] | [Date] | [Admin] |
| [Name] | [Email] | [Dept] | [Role] | [Date] | [Admin] |
| [Name] | [Email] | [Dept] | [Role] | [Date] | [Admin] |

### Contributors

| Name | Email | Department | Access Granted | Granted By |
|------|-------|------------|----------------|------------|
| [Name] | [Email] | [Dept] | [Date] | [Admin] |

### Admins

| Name | Email | Department | Access Granted | Granted By |
|------|-------|------------|----------------|------------|
| [Name] | [Email] | [Dept] | [Date] | [Admin] |

---

## Data Source Access

| Data Source | Type | Service Account | Access Managed By |
|-------------|------|-----------------|-------------------|
| [Source 1] | SQL Server | svc_powerbi_prod | [DBA Team] |
| [Source 2] | SharePoint | svc_powerbi_sp | [SharePoint Admin] |
| [Source 3] | [Type] | [Account] | [Owner] |

---

## License Requirements

| License Type | Count Needed | Current | Gap |
|--------------|--------------|---------|-----|
| Power BI Pro | [X] | [X] | [X] |
| Premium Per User (PPU) | [X] | [X] | [X] |
| Premium Capacity | N/A | N/A | N/A |

---

## Access Request Process

### New User Request
1. User submits request via [TICKETING_SYSTEM]
2. Manager approval required
3. Request routed to Power BI Admin
4. Access granted within [X] business days
5. User notified via email

### Access Removal
1. Triggered by HR termination notice or manager request
2. Power BI Admin removes within [X] business days
3. Documented in access log

---

## Access Review Schedule

| Review Type | Frequency | Owner | Next Review |
|-------------|-----------|-------|-------------|
| User access audit | Quarterly | [PM/Admin] | [DATE] |
| RLS role review | Semi-annually | [Business Owner] | [DATE] |
| Service account review | Annually | [IT Security] | [DATE] |

---

## Audit Log

| Date | User | Action | Performed By | Notes |
|------|------|--------|--------------|-------|
| [Date] | [User] | Access Granted | [Admin] | Initial go-live |
| [Date] | [User] | Access Removed | [Admin] | [Reason] |
| [Date] | [User] | RLS Role Changed | [Admin] | [From → To] |

---

## Emergency Access Procedure

In case of urgent access needs outside business hours:

1. Contact [ON-CALL ADMIN] at [PHONE]
2. Provide business justification
3. Temporary access granted for [X] hours
4. Formal request must be submitted next business day

---

## Sign-off

| Name | Role | Signature | Date |
|------|------|-----------|------|
| [Name] | Business Owner | | |
| [Name] | IT Security | | |
| [Name] | Power BI Admin | | |
