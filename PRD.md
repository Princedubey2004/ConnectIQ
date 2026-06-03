# Product Requirements Document (PRD)
**Product:** ConnectIQ  
**Document Status:** Approved  
**Last Updated:** June 2026  

---

## 1. Problem Statement
The current entry-level job market is highly saturated. Students and fresh graduates rely heavily on traditional job portals (LinkedIn Jobs, Greenhouse, Workday) where applications fall into "black holes," yielding an average response rate of less than 2%. Direct networking and referrals increase interview odds by 12x, but students lack the tools to execute this effectively at scale.

## 2. User Problem
1. **Anxiety & Writer's Block:** Students do not know how to write professional, concise, and engaging outreach messages to recruiters.
2. **Disorganization:** Tracking dozens of LinkedIn connections, email threads, and follow-up dates in Excel sheets or Notion becomes messy and leads to missed opportunities.
3. **Lack of Insights:** Users do not have data on which messages or approaches yield the highest response rates.

## 3. Product Vision
To be the ultimate "Networking Operating System" for early-career professionals—empowering them to treat their job hunt like a high-functioning sales pipeline, ultimately maximizing their interview conversion rates.

## 4. Goals & Non-Goals

### Goals
- Provide an intuitive, low-friction tool to generate highly personalized AI outreach messages.
- Centralize recruiter tracking in a visual CRM (Kanban board).
- Increase user response rates from cold outreach by ensuring timely follow-ups.

### Non-Goals (Out of Scope for MVP)
- We are *not* building an applicant tracking system (ATS) for employers.
- We are *not* replacing LinkedIn or email (messages are copied and sent externally, not sent directly through our platform yet).
- We are *not* an automated job application bot.

## 5. Functional Requirements
| Epic | Requirement | Priority |
| :--- | :--- | :--- |
| **Authentication** | Users must be able to securely sign up, log in, and manage their credentials. | High |
| **AI Generator** | System must take user context (resume) and recruiter context (role, company) to generate messages via OpenAI/Gemini. | High |
| **Recruiter CRM** | Users must be able to add recruiters, update their status via drag-and-drop Kanban, and add private notes. | High |
| **Profile & Context** | Users must be able to upload their resume text to provide context to the AI model. | Medium |
| **Analytics** | Dashboard must display metrics (Messages Sent, Response Rate, Pipeline distribution). | Medium |
| **Follow-ups** | System must calculate and flag when a recruiter needs a follow-up message. | Low |

## 6. User Stories
- **As a user**, I want to input a recruiter's LinkedIn profile and get a customized connection request message so that I save time drafting.
- **As a user**, I want to drag a recruiter's card from "Contacted" to "Interviewing" so I can visually see my pipeline progress.
- **As a user**, I want to see my weekly outreach volume on a chart so I stay motivated to hit my weekly networking goals.
- **As a user**, I want the AI to generate a polite follow-up message if a recruiter hasn't responded in 5 days.

## 7. Success Metrics (KPIs)
- **Primary:** Recruiter Response Rate (Target: >15%).
- **Secondary:** Number of Outreach Messages Generated per Session (Target: >3).
- **Secondary:** Retention Rate (W1 to W4 retention > 40%).

## 8. Risks and Assumptions
- **Assumption:** Users will be willing to manually copy-paste messages to LinkedIn/Email.
- **Assumption:** OpenAI/Gemini APIs will remain cost-effective for generating messages at scale.
- **Risk:** API rate limits or latency could degrade the UX during message generation. *Mitigation:* Implement optimistic UI and robust loading skeletons.
- **Risk:** Users might spam recruiters. *Mitigation:* Ensure the AI generates highly specific, non-spammy, quality-focused messages.
