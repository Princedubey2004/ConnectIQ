# MVP Definition: ConnectIQ

## Product Management Artifact — Minimum Viable Product (MVP) Specifications

---

## 1. MVP Vision & Strategy
The vision of **ConnectIQ** is to turn the intimidating, unorganized chore of cold recruitment networking into a structured, highly successful daily habit. The MVP aims to validate a key hypothesis: **students can secure more interviews by shifting their focus from cold job portals to structured, AI-personalized relationship tracking.**

---

## 2. Target User Segment & Problem
* **Primary Target Segment:** College juniors, seniors, and recent graduates actively hunting for technology and business internships or entry-level roles.
* **Core Problem Solved:** 
  1. **Writing Friction:** Students waste hours drafting cold messages on LinkedIn due to writing anxiety, resulting in generic templates that recruiters ignore.
  2. **Disorganization:** Students forget to follow up with recruiters who accept their connection requests, letting warm leads expire.
  3. **Tracking Fragmentation:** Managing networking contacts on notepad files or spreadsheets creates high manual friction and lack of visual focus.

---

## 3. Core User Journey
1. **Onboarding:** User logs in and inputs their target roles and resume highlights.
2. **Targeting:** User logs recruiter profiles (name, company, location) into their target list.
3. **Outreach Compiling:** User selects a goal (Cold outreach, Coffee chat query) and tone, generating an AI message draft.
4. **Execution:** User copies the message, clicks the external profile link, and pastes the message on LinkedIn.
5. **Funnel Tracking:** User drags the recruiter card from "Wishlist" to "Contacted" (automatically triggering a 5-day follow-up reminder).
6. **Habit Loop:** The dashboard alerts the user when follow-ups are due; the user performs the nudge and drags cards forward.

---

## 4. MVP Feature Set & V1 Selection Rationale

| Feature | Classification | Rationale for V1 Selection |
| :--- | :--- | :--- |
| **Resume & Goal Profile** | **MUST HAVE** | **Selected:** Context engine. The AI cannot write personalized messages without knowing the user's major, target roles, and highlights. |
| **AI Message Generator** | **MUST HAVE** | **Selected:** Core value hook. Directly solves the "writing anxiety" pain point by converting raw text inputs into high-converting notes. |
| **Outreach Kanban Board** | **MUST HAVE** | **Selected:** Central organization. Replaces spreadsheets with a visual pipeline tracker to prevent contact disorganization. |
| **Follow-up Reminders** | **MUST HAVE** | **Selected:** Solves conversation decay. Auto-triggers alerts when contacts are due for check-ins, creating the habit loop. |
| **Copy-to-Clipboard Action** | **MUST HAVE** | **Selected:** Direct execution connector. Essential since direct sending is automated-restricted. |
| **Recruiter Directory Search** | **SHOULD HAVE** | **Selected:** Discovery facilitation. Preloads sample contacts to let users experience the tracker immediately without manual entry barriers. |
| **Message Tone Toggles** | **SHOULD HAVE** | **Selected:** Personalization check. Adapts messages to suit corporate banks (Formal) vs. tech startups (Conversational). |
| **Weekly Analytics Stats** | **SHOULD HAVE** | **Selected:** Gamification. Visualizing sent volumes and reply rates keeps discouraged job seekers motivated. |

---

## 5. Explicitly Excluded Features (Out of Scope for MVP)
* **Automated LinkedIn DM Sending:** **Excluded** due to strict LinkedIn terms. Sending automated messages risks user account suspension. Copy-pasting is compliant and safe.
* **Resume PDF Parser:** **Excluded** because parsing files introduces technical scope overhead. Copy-pasting raw text into a text box is a reliable MVP alternative.
* **Chrome Scraper Extension:** **Excluded** to avoid platform fragmentation. A web dashboard is sufficient to validate core CRM usage hypotheses.
* **Double-Sided Recruiter Portal:** **Excluded** to maintain focus. ConnectIQ is a student productivity tool, not a talent marketplace.

---

## 6. Product Assumptions
1. **Friction Acceptance:** Students are willing to copy-paste messages from ConnectIQ into LinkedIn, and do not find the lack of direct automation a blocker.
2. **Data Availability:** Students can easily find recruiter names, roles, and company details on LinkedIn to log into the tracker.
3. **Core Metric Validity:** Recruiter responses are the highest leverage milestone in a student's search, directly leading to interview bookings.

---

## 7. Technical Scope & Architecture
* **Frontend:** Single-Page Web Application built on HTML, Vanilla CSS, and client-side JavaScript.
* **Data Layer:** Local storage state persistence to maintain user profiles, tracked recruiters, pipeline notes, and reminder dates locally.
* **Chart Logic:** Custom inline SVGs generated dynamically via JavaScript coordinates to show weekly activity bars and pipeline donut charts.

---

## 8. Success Metrics & Launch Criteria

### 8.1. Success Metrics
* **Core North Star:** Total Successful Recruiter Conversations (Target: `2.5 per active user per month`).
* **Adherence:** `>70%` of follow-up reminder alerts are marked complete by users.
* **Viral growth:** Referral K-factor of `>1.0` through organic word-of-mouth loops.

### 8.2. MVP Launch Criteria
* **UI Responsiveness:** 100% functional layouts on mobile and desktop viewports.
* **AI Speed:** Outreach compilation resolves and renders in `<2.0` seconds.
* **Critical Bug Index:** Zero P0 lints or JavaScript console errors during pipeline dragging and notes saving.

---

## 9. Risks and Tradeoffs

### 9.1. Automation vs. Compliance
* **Risk:** The lack of direct LinkedIn sending integration introduces user friction, which could lead to onboarding drop-offs.
* **Tradeoff:** Direct automation risks getting user accounts banned by LinkedIn's safety filters. We trade automation convenience for user account safety and long-term compliance.

### 9.2. Manual Data Entry vs. Scraper Extension
* **Risk:** Forcing students to manually type recruiter details into the tracker increases data logging friction.
* **Tradeoff:** Developing a browser scraper increases engineering cycles by 2x. Pre-populating a directory of mock recruiters and allowing simple manual entry keeps development cycles low to validate the core CRM value first.
