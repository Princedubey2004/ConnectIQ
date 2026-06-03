# Product Metrics Framework

## ConnectIQ — Student Outreach Assistant

This document establishes the product telemetry model, core KPI formulas, growth targets, and a mock Product Management Performance Dashboard for **ConnectIQ**.

---

## 1. Metric Classifications

### 1.1. The North Star Metric (NSM)
* **Metric Name:** Total Successful Recruiter Conversations (weekly)
* **Definition:** The weekly count of tracked recruiter cards moved from the "Contacted" column into "In Discussion" or "Interviewing" on user pipelines.
* **Formula:** `SUM(Recruiter Cards transitioned to 'discussion' OR 'interview' column in week t)`
* **Why it Matters:** Directly measures value realization. Getting a recruiter response is the critical breakthrough that transforms cold job searches into real interview momentum.
* **Target Value:** `2.5 successful conversations per active student per month`

---

### 1.2. Input Metrics (Leading Indicators)
* **1. Profile Completeness Rate**
  * *Definition:* Percentage of signed-up users who load their resume and goals.
  * *Formula:* `(Users with complete resume text & target role fields / Total registered users) * 100`
  * *Why it Matters:* Necessary context for the AI message compiler to write highly personalized drafts.
  * *Target Value:* `85% within 24 hours of signup`
* **2. Clipboard Copy Rate**
  * *Definition:* Percentage of AI generated messages that users copy to their clipboard.
  * *Formula:* `(Total copy clicks / Total AI message generations) * 100`
  * *Why it Matters:* Reflects AI generation quality and user intent to execute the outreach.
  * *Target Value:* `75% copy-to-generation conversion`
* **3. Follow-up Adherence Rate**
  * *Definition:* Percentage of follow-up alerts completed by the user within 48 hours of their due date.
  * *Formula:* `(Follow-ups checked off within 48h / Total follow-up reminders due) * 100`
  * *Why it Matters:* Measures user discipline in executing vital secondary touchpoints.
  * *Target Value:* `70% adherence`

---

### 1.3. Output Metrics (Lagging Indicators)
* **1. Recruiter Response Rate**
  * *Definition:* The percentage of contacted recruiters who reply to student messages.
  * *Formula:* `(Recruiters moved past 'contacted' stage / Total recruiters moved into 'contacted' stage) * 100`
  * *Why it Matters:* Validates the quality of AI messaging copy and personalization.
  * *Target Value:* `25% average response rate (industry average is <10%)`
* **2. Interview Conversion Rate**
  * *Definition:* Percentage of contacted recruiters that result in a scheduled interview.
  * *Formula:* `(Recruiters transitioned to 'interview' / Total recruiters transitioned to 'contacted') * 100`
  * *Why it Matters:* The direct gateway to securing job offers.
  * *Target Value:* `12% of outreaches result in interview bookings`

---

### 1.4. User Engagement Metrics
* **1. DAU / MAU Ratio**
  * *Definition:* The ratio of daily active users to monthly active users (product stickiness index).
  * *Formula:* `(Unique active users in last 24h / Unique active users in last 30d)`
  * *Why it Matters:* Job seeking is a high-frequency activity. We want users checking reminders and tracking conversations daily.
  * *Target Value:* `45% DAU/MAU`
* **2. Average Weekly Board Edits**
  * *Definition:* Number of drag-and-drop actions, note logs, or follow-up edits per user.
  * *Formula:* `Total Kanban modifications / Total active board users`
  * *Why it Matters:* Confirms active use of the CRM rather than passive abandonment.
  * *Target Value:* `12.0 card edits per active user weekly`

---

### 1.5. Retention Metrics
* **1. Day 30 Cohort Retention**
  * *Definition:* Percentage of a weekly cohort that logs back into the app on Day 30.
  * *Formula:* `(Active cohort users on Day 30 / Total cohort users registered on Day 0) * 100`
  * *Why it Matters:* Job hunt cycles last 30-90 days. Users must persist on the platform to land offers.
  * *Target Value:* `40% Day 30 retention`
* **2. Churn Rate**
  * *Definition:* Percentage of active users who go inactive for more than 14 consecutive days.
  * *Formula:* `(Users active in month t-1 who had 0 actions in month t / Total active users in month t-1) * 100`
  * *Why it Matters:* Identifies where students get discouraged and stop their outreach efforts.
  * *Target Value:* `<15% monthly churn`

---

### 1.6. Business & Monetization Metrics
* **1. Free-to-Premium Conversion Rate**
  * *Definition:* Percentage of free tier students who upgrade to paid premium (unlimited AI messaging, custom board columns).
  * *Formula:* `(Free users upgraded to premium in month t / Total free active users in month t) * 100`
  * *Why it Matters:* Proves business model viability.
  * *Target Value:* `4.5% conversion`
* **2. Viral Coefficient (K-Factor)**
  * *Definition:* Number of new users referred by each active existing user.
  * *Formula:* `(Number of invitations sent * Acceptance conversion rate)`
  * *Why it Matters:* Critical for low-cost student acquisition. K-factor > 1.0 driving exponential organic growth.
  * *Target Value:* `K = 1.15`

---

### 1.7. Funnel Metrics
* **Onboarding Funnel:**
  * *Registration* -> *Target Roles Input* -> *Resume Paste* -> *Save Profile*
  * *Target:* `75% drop-in completion rate`
* **Outreach Conversion Funnel:**
  * *Recruiter Added* -> *AI Draft Generated* -> *Note Copied* -> *Dragged to Contacted*
  * *Target:* `60% final conversion from search card to tracked contact`

---

## 2. Product Management Dashboard

| Category | Key Metric | Formula / Source | Status | Current Value | Target | Trend |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Value** | **Conversations (NSM)** | `Discussion + Interview` | 🟢 On Track | **2.6 / user / mo** | 2.5 | 📈 +8% |
| **Input** | Profile Completeness | `Profile Complete / Signups` | 🟢 On Track | **87.2%** | 85.0% | 📈 +3% |
| **Input** | Clipboard Copy Rate | `Copy Clicks / AI Runs` | 🟡 Warning | **71.5%** | 75.0% | 📉 -2% |
| **Input** | Follow-up Adherence | `Reminders Cleared / Due` | 🟢 On Track | **72.1%** | 70.0% | 📈 +5% |
| **Output** | Recruiter Response | `Discussion / Contacted` | 🟢 On Track | **26.4%** | 25.0% | 📈 +1.2% |
| **Output** | Booked Interviews | `Interview / Contacted` | 🟡 Warning | **10.8%** | 12.0% | ➡️ Flat |
| **Engagement**| DAU / MAU | `DAU / MAU` | 🟢 On Track | **46.8%** | 45.0% | 📈 +2% |
| **Retention** | Day 30 Retention | `Active Day 30 / Cohort` | 🔴 Critical | **34.5%** | 40.0% | 📉 -4% |
| **Business** | Free-to-Premium | `Upgraded / Free Active` | 🟢 On Track | **4.8%** | 4.5% | 📈 +0.5% |
| **Business** | K-Factor (Virality) | `Invitations * Conversion` | 🟢 On Track | **1.22** | 1.15 | 📈 +0.10 |
