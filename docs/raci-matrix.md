# RACI Matrix

## Project: [CLIENT_NAME] Power BI Dashboard
**Version:** 1.0
**Last Updated:** [DATE]

---

## Legend
- **R** = Responsible (does the work)
- **A** = Accountable (final decision maker, only one per row)
- **C** = Consulted (provides input before decision)
- **I** = Informed (notified after decision/completion)

---

## Team Members

| Abbreviation | Role | Name | Hours |
|--------------|------|------|-------|
| PM | Project Manager | [Name] | 80 |
| DE | Data Engineer | [Name] | 80 |
| PBI | Power BI Lead | [Name] | 180 |
| UX | UX Designer | [Name] | 30 |
| QA | QA Analyst | [Name] | 20 |
| BO | Business Owner | [Name] | - |
| TL | Technical Lead (Client) | [Name] | - |

---

## Phase 1: Discovery & Data Engineering

| Deliverable | PM | DE | PBI | UX | QA | BO | TL |
|-------------|----|----|-----|----|----|----|----|
| Project kickoff meeting | R/A | I | I | I | I | C | C |
| Project charter | R/A | C | C | I | I | A | C |
| Requirements document | R | C | C | I | I | A | C |
| Requirements sign-off | R | I | I | I | I | A | C |
| Data source inventory | I | R/A | C | I | I | C | C |
| Data profiling report | I | R/A | C | I | I | I | C |
| Data quality assessment | I | R/A | C | I | I | I | C |
| Data model schema (ERD) | C | R/A | C | I | I | I | C |
| ETL/Dataflow design | I | R/A | C | I | I | I | C |
| ETL/Dataflow implementation | I | R/A | C | I | I | I | I |
| Data dictionary | C | R/A | C | I | I | I | C |

---

## Phase 2: Design & Development

| Deliverable | PM | DE | PBI | UX | QA | BO | TL |
|-------------|----|----|-----|----|----|----|----|
| Dashboard wireframes | C | I | C | R/A | I | C | I |
| Visual design standards | I | I | C | R/A | I | C | I |
| Wireframe approval | R | I | C | C | I | A | I |
| Power BI data model | I | C | R/A | I | I | I | C |
| DAX measures - core | I | C | R/A | I | I | I | I |
| DAX measures - documentation | I | C | R/A | I | I | I | I |
| View 1 development | I | C | R/A | C | I | I | I |
| View 2 development | I | C | R/A | C | I | I | I |
| View 3 development | I | C | R/A | C | I | I | I |
| Visual formatting/polish | I | I | R | A | I | C | I |
| Initial dashboard review | R | I | C | C | I | A | C |
| Data refresh configuration | I | R | A | I | I | I | C |
| DE knowledge transfer | R | R | A | I | I | I | I |

---

## Phase 3: Refinement & Testing

| Deliverable | PM | DE | PBI | UX | QA | BO | TL |
|-------------|----|----|-----|----|----|----|----|
| Stakeholder feedback incorporation | R | I | A | C | I | C | I |
| Performance optimization | I | C | R/A | I | I | I | C |
| Row-level security implementation | I | C | R/A | I | I | I | C |
| RLS testing/validation | I | I | C | I | R | I | A |
| Test case development | R | I | C | I | A | C | I |
| Functional testing | I | I | C | I | R/A | I | I |
| Data validation testing | I | C | C | I | R/A | I | C |
| Defect logging | I | I | C | I | R/A | I | I |
| Defect triage | R/A | I | C | I | C | C | I |
| Defect resolution | I | C | R/A | I | C | I | I |

---

## Phase 4: UAT & Deployment

| Deliverable | PM | DE | PBI | UX | QA | BO | TL |
|-------------|----|----|-----|----|----|----|----|
| UAT plan | R/A | I | C | I | C | C | I |
| UAT test cases | R | I | C | I | A | C | I |
| UAT facilitation | R | I | C | I | A | C | I |
| UAT defect resolution | I | I | R/A | I | C | C | I |
| UAT sign-off | R | I | I | I | I | A | C |
| Deployment runbook | R/A | C | C | I | I | I | C |
| Access matrix | R/A | I | C | I | I | C | C |
| Production deployment | R/A | I | C | I | I | I | C |
| User training | R/A | I | C | I | I | C | I |
| User guide | R | I | A | C | I | C | I |
| Project documentation | R/A | C | C | I | I | I | I |
| Lessons learned | R/A | C | C | C | C | C | C |
| Project closeout | R/A | I | I | I | I | A | I |

---

## Ongoing Activities

| Activity | PM | DE | PBI | UX | QA | BO | TL |
|----------|----|----|-----|----|----|----|----|
| Weekly status reports | R/A | C | C | I | I | I | I |
| Status meetings | R/A | C | C | C | C | C | C |
| Risk management | R/A | C | C | I | I | C | C |
| Change control | R/A | C | C | I | I | A | C |
| Budget tracking | R/A | I | I | I | I | I | I |
| Timeline management | R/A | C | C | C | C | I | I |
| Stakeholder communication | R/A | I | C | I | I | C | C |
| Issue escalation | R/A | C | C | I | I | A | C |

---

## Approval Matrix

| Decision Type | Approver(s) |
|---------------|-------------|
| Requirements changes | Business Owner |
| Technical design changes | Technical Lead + Power BI Lead |
| Timeline changes | PM + Business Owner |
| Budget changes | Business Owner |
| Resource changes | PM |
| Go/No-go for deployment | Business Owner + Technical Lead |

---

## Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | [DATE] | [Name] | Initial version |
