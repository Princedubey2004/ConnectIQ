# Product Metrics Framework
**Product:** ConnectIQ  

To ensure ConnectIQ is delivering on its core value proposition, we must track user behavior and outreach success through a rigorous metrics framework.

---

## 🌟 North Star Metric
**Recruiter Response Rate (%)**
*   **Definition:** The percentage of contacted recruiters who reply to a user's outreach.
*   **Why it matters:** This is the ultimate indicator of value. If users are generating messages but not getting replies, the AI is failing to produce high-quality output. Increasing this rate directly correlates with more interviews and job offers.

## 📊 Supporting Metrics (KPIs)

### Engagement & Usage Metrics
1.  **Messages Generated (Count)**
    *   *Definition:* Total number of AI messages generated per user per week.
    *   *Target:* > 10 messages per active user per week.
2.  **Messages Copied / Used (Rate)**
    *   *Definition:* Percentage of generated messages that are copied to the clipboard.
    *   *Target:* > 80% (Indicates high satisfaction with the AI output).
3.  **Recruiters Added (Count)**
    *   *Definition:* Number of new recruiter cards added to the CRM pipeline.
    *   *Target:* > 15 recruiters per user per week.
4.  **Follow-ups Sent (Count)**
    *   *Definition:* Number of times a user moves a recruiter to the "Follow Up" stage and triggers a follow-up generation.
    *   *Target:* > 5 follow-ups per week.

### Conversion & Success Metrics
1.  **Interview Conversion Rate (%)**
    *   *Definition:* Percentage of contacted recruiters that move to the "Interviewing" stage.
    *   *Target:* > 5% (Industry average for cold outreach is ~1-2%).

### Activation & Retention Metrics
1.  **Profile Completion Rate (%)**
    *   *Definition:* Percentage of signed-up users who complete their profile (upload resume, set target role).
    *   *Target:* > 70%.
2.  **Retention Rate (W1 to W4)**
    *   *Definition:* Percentage of users who return to use the app 4 weeks after signing up.
    *   *Target:* > 40% (Job hunts typically last 3-6 months, so medium-term retention is critical).

## 📈 Tracking Implementation
- **Frontend Tracking:** We will use PostHog/Mixpanel to track generic click events (e.g., `button_clicked: generate_message`, `button_clicked: copy_clipboard`).
- **Backend Tracking:** CRM stage movements will be tracked in MongoDB to accurately measure pipeline conversion rates over time.
