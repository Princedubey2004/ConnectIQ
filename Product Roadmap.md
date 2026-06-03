# 12-Month Product Roadmap

## ConnectIQ — Student Outreach Assistant

This document outlines the quarterly product development roadmap for **ConnectIQ**, detailing strategic objectives, deliverables, risk mitigations, and performance targets over a 12-month timeline.

---

## 1. Executive Summary
The roadmap details a logical transition from **validation to scalability**:
* **Q1 (MVP):** Validates the core CRM and AI generation value loops.
* **Q2 (Optimization):** Enriches the user experience through discovery engines and analytics.
* **Q3 (Integrations):** Drives efficiency through external calendar hooks and AI reply assistants.
* **Q4 (Growth):** Drives low-cost user acquisition via viral referral loops and browser scrapers.

```
       Q1: VALIDATION                 Q2: OPTIMIZATION
       - Profile Context Setup        - Pre-populated Search Directory
       - AI Outreach Generator        - Recruiter Notes Timeline
       - Kanban Outreach Tracker      - Performance Analytics
       - Overdue Follow-up Alert      - Message Tone Selectors
                    |                       |
                    +-----------+-----------+
                                |
       Q3: INTEGRATIONS                 Q4: SCALE & VIRALITY
       - Google Calendar Sync         - Chrome Scraper Extension
       - AI Reply Nudge Assistant     - Viral Referral K-Loops
       - Custom Kanban Columns        - CSV Import/Export
```

---

## 2. Quarterly Roadmap Details

### 2.1. Q1: MVP Launch & Core Value Validation
* **Strategic Objective:** Validate the core customer loop (AI message drafting + visual pipeline tracking) and confirm baseline user engagement.
* **Features Delivered:**
  * User Profile Context Loader (Resume/Goal configuration).
  * AI Outreach Generator (Supports LinkedIn and email templates).
  * Kanban Board Tracker (5 columns: Wishlist, Contacted, Discussing, Interview, Closed).
  * Native Follow-up Reminders (Badges indicating overdue tasks).
  * Copy-to-Clipboard Action.
* **User Problems Solved:** Alleviates writing blocks, prevents conversation decay, and replaces unorganized spreadsheet logs.
* **Dependencies:** LLM API integration, browser LocalStorage availability.
* **Risks:** The lack of automated LinkedIn messaging introduces friction, which could lead to copy-to-contact drop-offs.
* **Success Metrics:** Profile completion rate `>85%`, Copy click-through `>70%`, Day 14 cohort retention `>45%`.
* **North Star Metric Impact:** Establish a baseline of **1.5 successful recruiter conversations per active user per month**.

---

### 2.2. Q2: Workflow Optimization & Discovery Enrichment
* **Strategic Objective:** Decrease recruiter logging friction and improve target discovery pipelines.
* **Features Delivered:**
  * Pre-loaded Recruiter Search Directory (Fuzzy filtering by industry/location).
  * Rich Recruiter Card Notes (History logging inside modals).
  * Tone Selector toggles (Formal, Conversational, Direct).
  * Analytics dashboard (Outreach volume graphs and conversion donut charts).
* **User Problems Solved:** Solves the recruiter discovery gap and enables students to log interaction details.
* **Dependencies:** Pre-seeded local directory database.
* **Risks:** The pre-populated recruiter directory requires maintenance, as records can go stale.
* **Success Metrics:** Weekly active board edits `>12.0 per user`, Search-to-pipeline track rate `>30%`.
* **North Star Metric Impact:** Elevate conversations to **2.2 successful recruiter conversations per active user per month**.

---

### 2.3. Q3: Third-Party Integration & Conversation Automation
* **Strategic Objective:** Automate conversation follow-up schedules and interview calendar syncing.
* **Features Delivered:**
  * AI Reply Assistant (Reads recruiter response and suggests custom replies to secure interviews).
  * Google Calendar Sync (Autosets follow-up check-ins and interviews to external calendars).
  * Customizable board columns.
* **User Problems Solved:** Helps students who are unsure how to reply to recruiter questions, and coordinates scheduling.
* **Dependencies:** Google Calendar API OAuth approval, migration scripts for custom database structures.
* **Risks:** Third-party OAuth setups can increase friction, leading to drop-offs in integration setup rates.
* **Success Metrics:** Google Calendar sync rate `>40%`, AI Reply assistant usage `>50% of active discussions`.
* **North Star Metric Impact:** Elevate conversations to **3.0 successful recruiter conversations per active user per month**.

---

### 2.4. Q4: Growth, Extension, & Retention Virality
* **Strategic Objective:** Scale user acquisition and accelerate viral growth loops.
* **Features Delivered:**
  * Chrome Scraper Extension (Scrapes recruiter name and title directly from LinkedIn profiles, syncs to ConnectIQ web app).
  * Viral Referral Program (K-factor invitation engine built on free premium months).
  * CSV data import/export.
* **User Problems Solved:** Eliminates manual data entry when researching recruiters on LinkedIn.
* **Dependencies:** Chrome Web Store developer approval.
* **Risks:** LinkedIn UI changes can break DOM scrapers, requiring frequent extension code maintenance.
* **Success Metrics:** Viral K-Factor `>1.15`, Monthly active user growth `>25%` month-over-month.
* **North Star Metric Impact:** Maintain **3.5 successful recruiter conversations per active user per month**, while scaling monthly active users by 3x.
