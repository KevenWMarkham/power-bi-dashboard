# Deployment Runbook

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## Pre-Deployment Checklist

### 1 Week Before Go-Live
- [ ] UAT sign-off obtained
- [ ] All critical/high defects resolved
- [ ] Final PBIX file reviewed and approved
- [ ] Access matrix finalized
- [ ] User training scheduled
- [ ] Communication plan ready
- [ ] Rollback plan documented

### 1 Day Before Go-Live
- [ ] Production workspace access verified
- [ ] Gateway connectivity tested
- [ ] Data source credentials validated
- [ ] Scheduled refresh configured (but disabled)
- [ ] RLS roles tested with production users
- [ ] User guide finalized

### Day of Go-Live
- [ ] Final data refresh completed
- [ ] Dashboard published to production workspace
- [ ] User access granted
- [ ] Scheduled refresh enabled
- [ ] Go-live communication sent
- [ ] Support team briefed

---

## Deployment Steps

### Step 1: Prepare Production Workspace
**Owner:** Power BI Admin / PM
**Estimated Time:** 15 minutes

1. Navigate to Power BI Service: [URL]
2. Verify workspace exists: **[WORKSPACE_NAME]**
3. Confirm workspace capacity assignment (Premium/PPU if applicable)
4. Verify admin access to workspace

### Step 2: Publish Dashboard
**Owner:** Power BI Lead
**Estimated Time:** 10 minutes

1. Open final PBIX file: `[FILENAME].pbix`
2. Verify data model is connected (not local file)
3. Click **Publish** → Select **[WORKSPACE_NAME]**
4. Wait for publish confirmation
5. Navigate to workspace to verify report appears

### Step 3: Configure Data Source Credentials
**Owner:** Power BI Lead
**Estimated Time:** 15 minutes

1. Go to **Workspace** → **Settings** → **Datasets** → **[DATASET_NAME]**
2. Click **Data source credentials**
3. For each data source:
   - Select authentication method
   - Enter credentials
   - Test connection
4. Document any credential issues

### Step 4: Configure Scheduled Refresh
**Owner:** Power BI Lead
**Estimated Time:** 10 minutes

1. Go to **Dataset settings** → **Scheduled refresh**
2. Configure:
   - Time zone: [TIMEZONE]
   - Refresh frequency: Daily
   - Time: [TIME - recommend off-peak hours]
   - Failure notifications: [EMAIL]
3. **Do not enable until go-live confirmation**

### Step 5: Configure Row-Level Security
**Owner:** Power BI Lead
**Estimated Time:** 20 minutes

1. Go to **Dataset** → **Security**
2. For each RLS role:
   - Add AD group or individual users
   - Document assignments per access matrix
3. Test each role using **"Test as role"**

### Step 6: Grant User Access
**Owner:** PM / Power BI Admin
**Estimated Time:** 15 minutes

1. Go to **Workspace** → **Access**
2. Add users/groups per access matrix:
   - Viewers: [AD_GROUP_VIEWERS]
   - Contributors: [AD_GROUP_CONTRIBUTORS]
   - Members: [AD_GROUP_MEMBERS]
3. For app workspace, publish app and configure audience

### Step 7: Enable Scheduled Refresh
**Owner:** Power BI Lead
**Estimated Time:** 5 minutes

1. Return to **Dataset settings** → **Scheduled refresh**
2. Toggle **Keep your data up to date** to ON
3. Click **Apply**
4. Verify next refresh time displayed

### Step 8: Send Go-Live Communication
**Owner:** PM
**Estimated Time:** 5 minutes

1. Send pre-drafted email to stakeholder list
2. Include:
   - Dashboard URL
   - User guide link
   - Support contact info
   - Training session details

---

## Rollback Plan

### Triggers for Rollback
- Critical data accuracy issues discovered post-go-live
- Widespread access/permission failures
- Performance issues impacting business operations
- Request from Business Owner

### Rollback Steps
**Estimated Time:** 15 minutes

1. **Disable Dashboard Access**
   - Remove viewer permissions from workspace
   - Or unpublish app

2. **Disable Scheduled Refresh**
   - Turn off scheduled refresh to prevent further data updates

3. **Notify Stakeholders**
   - Send communication about temporary unavailability
   - Provide estimated resolution time

4. **Restore Previous Version (if applicable)**
   - Re-publish previous PBIX version from `/dashboard/` backup folder

5. **Document Issues**
   - Log all issues encountered
   - Create action plan for resolution

---

## Post-Deployment Verification

### Immediate (Within 1 Hour)
- [ ] Dashboard accessible to test users
- [ ] Data displays correctly
- [ ] Filters and interactions working
- [ ] No error messages

### Next Business Day
- [ ] Scheduled refresh completed successfully
- [ ] Data updated as expected
- [ ] No user-reported issues
- [ ] Performance acceptable

### First Week
- [ ] Collect user feedback
- [ ] Monitor refresh success rate
- [ ] Address any minor issues
- [ ] Schedule follow-up with Business Owner

---

## Support Information

### Escalation Path
| Level | Contact | Response Time |
|-------|---------|---------------|
| L1 - User Questions | [Help Desk] | 4 hours |
| L2 - Technical Issues | [Power BI Admin] | 8 hours |
| L3 - Data Issues | [Data Engineer] | 24 hours |
| L4 - Critical | [PM] | Immediate |

### Key Contacts
| Role | Name | Email | Phone |
|------|------|-------|-------|
| Project Manager | [Name] | [Email] | [Phone] |
| Power BI Lead | [Name] | [Email] | [Phone] |
| Business Owner | [Name] | [Email] | [Phone] |
| IT Support | [Name] | [Email] | [Phone] |

---

## Appendix: Deployment Checklist Sign-off

| Step | Completed By | Date/Time | Notes |
|------|--------------|-----------|-------|
| Pre-deployment checklist | | | |
| Publish dashboard | | | |
| Configure credentials | | | |
| Configure refresh | | | |
| Configure RLS | | | |
| Grant access | | | |
| Enable refresh | | | |
| Send communication | | | |
| Post-deployment verification | | | |

**Deployment Approved By:**

| Name | Role | Signature | Date |
|------|------|-----------|------|
| [Name] | PM | | |
| [Name] | Business Owner | | |
