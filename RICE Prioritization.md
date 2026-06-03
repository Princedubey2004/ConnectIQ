# RICE Prioritization Framework

## ConnectIQ — Student Outreach Assistant

This document outlines the product prioritization model for **ConnectIQ**, utilizing the **RICE (Reach, Impact, Confidence, Effort)** framework to evaluate and rank features for Phase 1 and subsequent releases.

---

## 1. Executive Summary
To optimize engineering resources and maximize student value, we evaluated 10 prospective features. The scoring weights are structured to align directly with our primary customer pain point: **alleviating writing anxiety and establishing systematic outreach habits.** 

By evaluating features on user reach, value impact, team confidence, and developer time-effort, we established a clear release roadmap. The core AI message composer and native visual trackers represent the highest immediate yield (V1), whereas complex integrations (Google Calendar) and high-friction installs (Chrome Extensions) are deferred to later releases.

---

## 2. RICE Prioritization Matrix

* **Reach:** Number of active users interacting with the feature per quarter (Scale: 100 - 1000).
* **Impact:** Product impact score (3 = Massive, 2 = High, 1.5 = Medium-High, 1 = Medium, 0.5 = Low).
* **Confidence:** Probability of scoring accuracy based on user research (Percentage scale: 50% - 100%).
* **Effort:** Team-months of engineering effort (Scale: 0.1 - 5.0).
* **Formula:** `RICE Score = (Reach * Impact * Confidence) / Effort`

| Rank | Feature | Reach | Impact | Confidence | Effort (M) | RICE Score | Priority |
| :--- | :--- | :---: | :---: | :---: | :---: | :---: | :---: |
| **1** | **AI Outreach Generator** | 1000 | 3.0 | 100% | 0.8 | **3750** | 🟢 P0 (V1) |
| **2** | **Follow-up Reminder System**| 900 | 2.0 | 90% | 0.6 | **2700** | 🟢 P0 (V1) |
| **3** | **Kanban Outreach Tracker** | 1000 | 2.0 | 90% | 1.2 | **1500** | 🟢 P0 (V1) |
| **4** | **Recruiter Search Directory**| 800 | 1.5 | 80% | 1.0 | **960** | 🟡 P1 (V1.5) |
| **5** | **Analytics Dashboard** | 600 | 1.0 | 70% | 1.0 | **420** | 🟡 P1 (V1.5) |
| **6** | **AI Reply Assistant** | 400 | 2.0 | 70% | 1.5 | **373** | 🔵 P2 (V2) |
| **7** | **CSV Export** | 200 | 0.5 | 90% | 0.4 | **225** | 🔵 P2 (V2) |
| **8** | **Chrome Extension** | 500 | 2.0 | 50% | 4.0 | **125** | 🔴 Deferred |
| **9** | **Google Calendar Sync** | 300 | 1.0 | 60% | 2.0 | **90** | 🔴 Deferred |
| **10**| **Custom Kanban Columns** | 300 | 0.5 | 80% | 1.5 | **80** | 🔴 Deferred |

---

## 3. Prioritization Strategy & Decisions

### 3.1. Why AI Outreach Generator is the Highest Priority Feature
The **AI Outreach Generator** scored the highest RICE index (**3750**) by a significant margin. This feature targets the core user pain point: **writing anxiety**. 
* **Reach is maxed (1000):** Every single user onboarded will interact with the message writer.
* **Impact is massive (3.0):** It directly eliminates blank screen blocks, decreasing messaging drafting time from 30 minutes to seconds.
* **Confidence is absolute (100%):** Our survey data proved writing anxiety is the primary block preventing students from beginning outreach.
* **Effort is low (0.8 person-months):** Using modern LLM APIs combined with client-side prompt styling keeps frontend implementation costs minimal.

---

### 3.2. Why Follow-up Reminders Precede Google Calendar Sync
Although both features help students track check-in cadences, the **Follow-up Reminder System** ranked 2nd (Score: **2700**), whereas **Google Calendar Sync** ranked 9th (Score: **90**):
* **Friction and Access:** Google Calendar Sync requires OAuth setups and permissions, which introduces user friction. A native, in-app alert system has direct reach (900) without configuration blocks.
* **Engineering Cost-Effort:** Building native date checks and rendering alert badges takes minimal effort (**0.6 months**). In contrast, Google Calendar API integrations, token management, and syncing states require significant effort (**2.0 months**), offering a lower return on investment.

---

### 3.3. Features Postponed (Deferred to Phase 2/3)

1. **Chrome Extension (Rank 8, Score 125):** 
   * *Why Postponed:* Although a browser extension has high impact (scraping directly on LinkedIn), building and maintaining it across browsers is highly complex (**4.0 effort**). We need to validate core CRM usage inside the web dashboard first.
2. **Google Calendar Sync (Rank 9, Score 90):**
   * *Why Postponed:* Niche user reach and high API integration overhead make it low yield for an MVP.
3. **Custom Kanban Columns (Rank 10, Score 80):**
   * *Why Postponed:* Predefined pipelines (Wishlist, Contacted, In Discussion, Interviewing, Closed) cover 95% of student use cases. Letting users dynamically edit column metadata adds database structure complexity for minimal initial impact.
