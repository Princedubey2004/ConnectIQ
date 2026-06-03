# Product Requirements Document (PRD)

## ConnectIQ — Student Outreach Assistant

---

## 1. Executive Summary
ConnectIQ is an AI-powered networking platform and outreach assistant designed specifically for college students and fresh graduates. The platform bridges the gap between young job seekers and industry professionals/recruiters by streamlining the discovery of recruiters, generating highly personalized cold outreach messages, scheduling intelligent follow-ups, and providing a centralized tracking pipeline. By turning networking from a daunting, unorganized chore into a structured, data-driven workflow, ConnectIQ aims to boost response rates and accelerate the path to landing internships and entry-level jobs.

---

## 2. Problem Statement
Securing internships and entry-level jobs has become highly competitive, and traditional job applications (resumes sent into online portals) often yield extremely low response rates. Networking directly with recruiters and hiring managers on LinkedIn is the most effective alternative, yet students struggle with the following:
* **Recruiter Discovery Gap:** Students do not know who the right recruiters are for their specific target roles, industries, or companies.
* **Generic, Low-Response Outreach:** Standard cold templates are ignored. Students lack the confidence, professional context, or writing skills to customize outreach based on mutual interests, shared backgrounds, or job posts.
* **Lack of Follow-up Discipline:** Networking requires multiple touchpoints. Students frequently forget to follow up, letting warm leads go cold.
* **No Centralized System:** Students track their networking efforts using scattered spreadsheets, notes apps, or mental notes, leading to disorganization, missed opportunities, and difficulty in understanding what works.

---

## 3. Target Users
* **Active Job Seekers:** College seniors and recent graduates actively looking for full-time entry-level roles.
* **Passive/Early Networkers:** College sophomores and juniors looking to secure internships, find mentors, or build long-term industry connections.
* **Career Switchers/Bootcamp Graduates:** Individuals transitioning into new industries (e.g., tech, finance) who lack existing professional networks.

---

## 4. User Personas

### Persona A: Sarah Chen (The Anxious Job-Hunting Senior)
* **Demographics:** 21 years old, Senior majoring in Computer Science at a state university.
* **Context:** Looking for an entry-level Software Engineer role. She has applied to 100+ roles online with minimal response.
* **Needs:** A quick way to find tech recruiters, get personalized templates tailored to the companies she wants to work for, and track application responses.
* **Pain Points:** Finds cold emailing/messaging stressful. Spends hours drafting a single LinkedIn message, only to get ignored. Forgets who she messaged and when to follow up.

### Persona B: Marcus Johnson (The Proactive Sophomore)
* **Demographics:** 19 years old, Sophomore majoring in Finance at a mid-tier college.
* **Context:** Wants to secure a summer internship in investment banking for next year.
* **Needs:** To identify recruiters and alumni in finance early, schedule informational interviews, and build relationships over a 6–12 month period.
* **Pain Points:** Hard to keep track of conversations over months. Struggling to write professional, non-transactional messages that interest busy professionals.

---

## 5. User Pain Points
1. **Writing Anxiety:** "I don't know what to write to a recruiter without sounding desperate or unprofessional."
2. **Efficiency Loss:** Spending 30–45 minutes crafting a single message, making manual outreach unscalable.
3. **Disorganization:** Forgetting to follow up with a recruiter who expressed mild interest or said "ping me next month."
4. **Information Asymmetry:** Not knowing if a recruiter hires for tech, business, or design, or if they are in the right region.
5. **Discouragement:** No visibility into success rates, leading to burnout and stopping outreach efforts prematurely.

---

## 6. Product Goals
* **Increase Response Rates:** Help students generate highly engaging, tailored outreach messages that recruiters actually answer.
* **Reduce Friction & Time-to-Send:** Shorten the time it takes to draft and send a high-quality outreach message from 30 minutes to under 2 minutes.
* **Build Systematic Habits:** Provide a simple, intuitive dashboard that encourages structured daily/weekly outreach and follow-up activities.
* **Empower with Insights:** Give students clear data on which messaging styles, templates, or companies are yielding the highest response rates.

---

## 7. User Stories

### Discovery & Search
* *As a student,* I want to search for recruiters by industry, company, and location so that I can reach out to the most relevant professionals.
* *As a student,* I want to see details about recruiters (e.g., target university focus, company, hiring domain) so that I can personalize my message.

### AI Outreach Generation
* *As a student,* I want to input a recruiter's details, my resume highlights, and the job description so that the AI can generate a personalized outreach message.
* *As a student,* I want to choose the tone of the message (e.g., formal, conversational, curious) so that it matches my personality.
* *As a student,* I want to quickly copy the generated message to my clipboard so that I can send it on LinkedIn or email.

### Outreach Tracker & Pipeline
* *As a student,* I want to add recruiters to a pipeline (e.g., Wishlist, Contacted, In Discussion, Interviewing, Closed) so that I can visually track my progress.
* *As a student,* I want to set a follow-up date for each recruiter so that I don't lose track of active conversations.

### Analytics Dashboard
* *As a student,* I want to see a summary of my weekly outreach metrics (e.g., sent, response rate) so that I stay motivated and monitor my performance.

---

## 8. Functional Requirements

### 8.1. User Authentication & Profile
* **Sign Up / Login:** Email/password login or Google OAuth.
* **User Profile:** Storage of student's target role, target industries, LinkedIn URL, and raw text of their resume/bio.

### 8.2. Recruiter Database & Directory
* **Directory Search:** Users can filter recruiters by company name, industry, region, and job titles (e.g., "Tech Recruiter", "Campus Recruiter").
* **Recruiter Profile Cards:** Display key information (Name, Role, Company, LinkedIn Link, and Notes).
* **Manual Add:** Ability to add custom recruiters directly by inputting a name and LinkedIn URL.

### 8.3. AI Outreach Engine (powered by LLM)
* **Custom Inputs:**
  * Recruiter Name & Role
  * Company Name
  * Goal of Outreach (e.g., Job Inquiry, Informational Interview, Follow-up)
  * Personal Context (Resume highlights, shared connection, or alumni status)
  * Job URL or Description (Optional)
* **Generation Output:** A structured cold message (subject line for email, short 300-character note for LinkedIn connection request, or a full LinkedIn InMail).
* **Tone Control:** Toggle options between Formal, Friendly, and Direct.

### 8.4. Networking Kanban Board / Pipeline
* **Stages:**
  * **Wishlist / Not Contacted:** Recruiters identified but not yet messaged.
  * **Contacted:** Message sent; waiting for response.
  * **In Conversation:** Recruiter responded; ongoing dialogue.
  * **Interview Scheduled:** Scheduled call or formal interview.
  * **Offer / Closed:** Final outcome.
* **Interactions:** Drag-and-drop cards between stages, edit card notes, log dates of actions, and delete cards.

### 8.5. Follow-up & Reminder System
* **Set Follow-up:** Select a date/time for the next touchpoint on any recruiter card.
* **Notification Indicators:** Visual alerts (red badges, countdowns) on the dashboard and pipeline for recruiters requiring a follow-up today or overdue.

### 8.6. Performance Analytics
* **Total Outreach Count:** Number of messages sent.
* **Response Rate Tracker:** Automatically calculated based on how many recruiter statuses are moved from "Contacted" to "In Conversation".
* **Weekly Activity Chart:** Bar chart representing contacts made over the last 7 days.

---

## 9. Non-Functional Requirements
* **Usability:** A highly intuitive, distraction-free desktop/mobile-responsive UI with clear visual indicators.
* **Security:** Secure storage of passwords and user profile details. Prompt-level filtering to ensure user resumes or details are not leaked inappropriately.
* **Performance:** AI text generation must return a completed message in under 5 seconds.
* **Reliability:** Data on the Kanban board and recruiter details must persist locally or in a database without risk of loss.

---

## 10. MVP Scope

### In Scope (What We Are Building)
1. **User Auth:** Simple login/signup (or local storage session for local prototyping).
2. **Dashboard:** Summary metrics (total sent, response rates) and follow-up alerts.
3. **AI Outreach Form:** The generator UI supporting LinkedIn connection notes (<300 chars) and standard emails/InMails with editable tone.
4. **Interactive Kanban Pipeline:** Visual board for managing recruiters through outreach lifecycle stages.
5. **Manual Recruiter Entry + Basic Search:** Ability to log new recruiters, add descriptions, and filter them locally.
6. **Follow-up Reminders:** Core logic matching follow-up dates to the current date and displaying alerts.

### Out of Scope (Future Phases)
1. **Automated LinkedIn Message Sending:** Due to LinkedIn API restrictions, auto-sending is omitted. Users will copy-paste.
2. **Calendar Sync:** Integration with Google Calendar/Outlook for interview bookings.
3. **Browser Extension:** A Chrome extension to scrape LinkedIn profiles and generate outreach directly on LinkedIn's website.
4. **Resume Parser:** Automated PDF uploading and parsing into text (MVP will use manual text entry).

---

## 11. Success Metrics
* **Outreach Conversion Rate:** Target a 25%+ response rate from recruiters for students using ConnectIQ custom messages.
* **Weekly Active Users (WAU):** Number of students actively managing their pipeline weekly.
* **Time to Draft:** Reduction in user time spent drafting messages (target < 90 seconds).
* **NPS (Net Promoter Score):** Target score of 50+ indicating high student satisfaction and recommendations.

---

## 12. Future Roadmap
* **Phase 2 (Browser Extension & Auto-Parsing):** Develop a Chrome extension that embeds ConnectIQ directly into LinkedIn recruiter profiles, and enable PDF resume uploads.
* **Phase 3 (Community & Alumni Networking):** Introduce university-specific networks where alumni can register to be contacted directly.
* **Phase 4 (AI Conversation Agent):** Analyze recruiter responses and suggest the next best reply to secure a phone call.
