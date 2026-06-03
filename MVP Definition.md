# Minimum Viable Product (MVP) Definition
**Product:** ConnectIQ  
**Phase:** Version 1.0 (MVP)  

---

## 1. MVP Goal
To validate the core hypothesis: *If students are provided with AI-generated outreach messages and a visual CRM, they will consistently reach out to more recruiters and track their networking progress.*

The MVP must be fully functional, deliver immediate value (saving time on drafting messages), and look highly professional to establish trust.

## 2. Core Value Proposition
"Write perfect recruiter outreach messages in 5 seconds and track your networking pipeline in one place."

## 3. Feature Prioritization (MoSCoW Method)

### 🔴 Must Have (Critical for MVP launch)
- **User Authentication:** Secure email/password registration and login.
- **AI Generator (Core Workflow):** Ability to input recruiter name/company and generate a LinkedIn connection message or cold email using OpenAI/Gemini.
- **Recruiter CRM (Kanban):** Visual drag-and-drop board to track recruiters through standard stages (To Contact, Contacted, Follow Up, Interviewing).
- **Profile Setup:** Ability for users to save their basic target role and upload resume text so the AI has context.
- **Responsive UI:** A clean, modern dark-mode aesthetic.

### 🟡 Should Have (Important but not blockers)
- **Analytics Dashboard:** Basic charts showing messages sent over time and pipeline distribution.
- **Quick Actions:** Ability to easily copy the generated message to the clipboard or open LinkedIn directly from the CRM.
- **Follow-up Variants:** Ability to tell the AI to "generate a follow-up message" specifically.

### 🔵 Could Have (Nice to have, defer if timeline tight)
- **CSV Export:** Allow users to export their CRM data for their own records.
- **Dark/Light Mode Toggle:** Full theming support (MVP can just default to Dark mode).
- **Automated Deadline Tracking:** The system calculating exactly 5 days from contact to flag a follow-up.

### ⚪ Won't Have (Explicitly out of scope for MVP)
- **Direct LinkedIn API Integration:** Auto-sending messages via LinkedIn (against TOS, high engineering effort).
- **Email Client Integration:** Sending emails directly from the ConnectIQ dashboard via IMAP/SMTP.
- **Team/School Workspaces:** B2B features for universities to track their student body's networking efforts.
- **Mobile App:** A native iOS/Android application (web responsive is sufficient for MVP).

## 4. MVP Scope Definition
The MVP focuses purely on a **single-player web experience**. The user is responsible for copying the generated message and pasting it into their own LinkedIn/Email client. The primary engineering focus should be on the AI prompt engineering (to ensure high-quality outputs) and the UI/UX friction (ensuring the Kanban board feels smooth and satisfying to use).
