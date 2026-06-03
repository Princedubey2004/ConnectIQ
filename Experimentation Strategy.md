# ConnectIQ: Experimentation & A/B Testing Strategy

**Role:** Senior Product Manager, Airbnb  
**Document Purpose:** Define the experimentation framework to validate hypotheses, optimize the core user loop, and scale ConnectIQ.

---

## 1. Executive Summary

At Airbnb, we believe in rigorous, data-informed product development. This document outlines the initial experimentation strategy for ConnectIQ. The goal of these experiments is to iteratively optimize our activation funnels, increase the quality of our AI outputs, and maximize long-term retention. 

We will prioritize experiments based on their potential impact on our North Star Metric: **Successful recruiter conversations per active user per month**.

---

## 2. Core Experimentation Framework (10 A/B Tests)

### Category 1: AI Message Generation Quality

#### Experiment 1: Tone Selection Impact on Output Adoption
*   **Problem Statement:** Users may find the default AI-generated outreach too formal or robotic, resulting in high manual editing times or abandonment.
*   **Hypothesis:** Introducing a "Tone Selector" (e.g., Casual, Direct, Professional) before generation will make users feel more confident in the output, increasing the copy-to-clipboard rate.
*   **Control Group:** Default single-prompt generation button.
*   **Variant Group:** A drop-down menu to select Tone before generation.
*   **Primary Metric:** Copy-to-clipboard rate (%).
*   **Secondary Metrics:** Average time spent editing post-generation, total generations per session.
*   **Success Criteria:** >10% relative increase in copy-to-clipboard rate with no significant drop in overall generations.
*   **Risks:** Added friction before generation could lead to drop-offs.
*   **Expected Learning:** Determine if customization outweighs the friction of an extra step.

#### Experiment 2: Character Limit Constraints
*   **Problem Statement:** Overly long initial outreach messages often result in low recruiter response rates.
*   **Hypothesis:** Hard-capping the AI outreach generator to 300 characters will force concise messaging, leading to higher actual response rates from recruiters.
*   **Control Group:** AI prompt unconstrained (typically 500-800 characters).
*   **Variant Group:** AI prompt hard-capped to 300 characters.
*   **Primary Metric:** Self-reported recruiter response rate (measured by cards moved to "Discussing").
*   **Secondary Metrics:** Copy-to-clipboard rate.
*   **Success Criteria:** >15% increase in cards moving from "Contacted" to "Discussing".
*   **Risks:** Students might feel the short messages lack personalization and refuse to copy them.
*   **Expected Learning:** Find the optimal message length for cold student-to-recruiter outreach.

### Category 2: Follow-up Reminders

#### Experiment 3: Active vs. Passive Reminders
*   **Problem Statement:** Users are ignoring the passive "red badge" indicators on the dashboard for overdue follow-ups.
*   **Hypothesis:** Sending an active daily "Follow-up Digest" email will pull users back into the app and increase task completion.
*   **Control Group:** Passive red badges on the Kanban board only.
*   **Variant Group:** Passive badges + a daily 9:00 AM email digest listing overdue follow-ups.
*   **Primary Metric:** Follow-up task completion rate (%).
*   **Secondary Metrics:** Daily Active Users (DAU), email open rate.
*   **Success Criteria:** >20% increase in follow-up completion.
*   **Risks:** Email fatigue could lead to unsubscribes or users marking emails as spam.
*   **Expected Learning:** Gauge the elasticity of user re-engagement via external triggers.

#### Experiment 4: Urgency Copywriting
*   **Problem Statement:** The current label "Overdue" doesn't create enough emotional urgency to prompt immediate action.
*   **Hypothesis:** Changing the copy from "Overdue" to "Expiring Opportunity" will leverage loss aversion, increasing click-through rates.
*   **Control Group:** Red text reading "Overdue".
*   **Variant Group:** Red text reading "Expiring Opportunity".
*   **Primary Metric:** Time-to-action (hours) after a task becomes overdue.
*   **Secondary Metrics:** Overall follow-up completion rate.
*   **Success Criteria:** >10% reduction in average time-to-action.
*   **Risks:** Might create undue anxiety, leading to a negative brand perception.
*   **Expected Learning:** Understand how framing impacts student motivation.

### Category 3: Recruiter Discovery

#### Experiment 5: Empty State Priming
*   **Problem Statement:** When faced with a blank search bar in the Recruiter Directory, users suffer from "blank canvas paralysis" and don't execute searches.
*   **Hypothesis:** Providing "Trending Companies" suggestion pills beneath the empty search bar will give users an immediate starting point and increase search volume.
*   **Control Group:** Blank search bar.
*   **Variant Group:** Search bar with 5 clickable "Trending Companies" pills (e.g., Google, Meta, Stripe).
*   **Primary Metric:** Search execution rate (%).
*   **Secondary Metrics:** Cards added to pipeline from search.
*   **Success Criteria:** >25% increase in users executing at least one search.
*   **Risks:** Users might only target trending, highly competitive companies, lowering their overall success rate.
*   **Expected Learning:** Determine if cognitive load is the primary barrier to recruiter discovery.

### Category 4: User Onboarding

#### Experiment 6: Deferred Resume Upload
*   **Problem Statement:** A significant portion of users abandon the onboarding flow when asked to upload their resume.
*   **Hypothesis:** Allowing users to "Skip for Now" on the resume upload step will increase Day 1 activation, as they can test the UI before committing data.
*   **Control Group:** Forced resume upload to complete onboarding.
*   **Variant Group:** "Skip for Now" button available (re-prompting them later).
*   **Primary Metric:** Onboarding completion rate (%).
*   **Secondary Metrics:** Day 1 Retention, Day 7 Resume Upload Rate.
*   **Success Criteria:** >15% increase in onboarding completion without a terminal drop in long-term resume uploads.
*   **Risks:** The AI generator will perform poorly without resume context, potentially causing immediate churn after onboarding.
*   **Expected Learning:** Identify the balance between onboarding friction and feature performance requirements.

### Category 5: Retention

#### Experiment 7: Gamified Outreach Streaks
*   **Problem Statement:** Users log in sporadically, leading to inconsistent outreach and poor long-term results.
*   **Hypothesis:** Implementing a visual "Outreach Streak" counter (tracking consecutive days of sending messages) will habituate daily usage.
*   **Control Group:** Standard dashboard.
*   **Variant Group:** Header includes a "Fire" icon with a consecutive daily streak counter.
*   **Primary Metric:** Day 7 and Day 14 Retention.
*   **Secondary Metrics:** Average sessions per week per user.
*   **Success Criteria:** >10% relative increase in Day 14 Retention.
*   **Risks:** Users breaking a long streak might experience a "what the hell" effect and abandon the app entirely.
*   **Expected Learning:** Validate if gamification is effective for professional networking tasks.

### Category 6: Premium Conversion

#### Experiment 8: Paywall Feature Positioning
*   **Problem Statement:** We need to maximize conversion to the Premium tier, but we are unsure which feature is the strongest value driver.
*   **Hypothesis:** Hard-paywalling the "Custom Kanban Columns" feature will drive higher conversion than paywalling the "AI Reply Assistant", as advanced users rely heavily on workflow customization.
*   **Control Group:** AI Reply Assistant paywalled; Custom Columns free.
*   **Variant Group:** Custom Columns paywalled; AI Reply Assistant free.
*   **Primary Metric:** Free-to-Paid Conversion Rate (%).
*   **Secondary Metrics:** Feature usage rates for the non-paywalled feature.
*   **Success Criteria:** Identify a statistically significant winner (p < 0.05) in conversion rate.
*   **Risks:** Paywalling core workflow features (columns) might anger power users and cause churn.
*   **Expected Learning:** Isolate the perceived value of workflow customization vs. intelligence features.

#### Experiment 9: Trial Length Elasticity
*   **Problem Statement:** We don't know the optimal time window to prove value before asking for payment.
*   **Hypothesis:** A 7-day trial creates more urgency and higher conversion than a 14-day trial, as the recruiting cycle is highly episodic.
*   **Control Group:** 14-day free trial.
*   **Variant Group:** 7-day free trial.
*   **Primary Metric:** Trial-to-Paid Conversion Rate (%).
*   **Secondary Metrics:** Total revenue per user (LTV indicator).
*   **Success Criteria:** 7-day trial yields equal or greater overall revenue compared to 14-day.
*   **Risks:** 7 days might not be enough time for a user to secure a recruiter response, meaning they hit the paywall before experiencing the "Aha!" moment.
*   **Expected Learning:** Discover the time-to-value velocity of the product.

### Category 7: Analytics Dashboard Engagement

#### Experiment 10: Embedded Mini-Charts
*   **Problem Statement:** Only 15% of Daily Active Users click into the "Analytics" tab, meaning they miss motivating progress visualizations.
*   **Hypothesis:** Embedding a mini "Weekly Progress Ring" directly on the main Kanban dashboard will increase awareness and motivate more outreach.
*   **Control Group:** Analytics data solely housed in a separate side-nav tab.
*   **Variant Group:** A small circular progress ring (e.g., "3/10 outreach sent this week") embedded in the top right of the Kanban view.
*   **Primary Metric:** Weekly active board edits (cards moved/created).
*   **Secondary Metrics:** Click-through rate to the full Analytics tab.
*   **Success Criteria:** >10% increase in weekly board edits.
*   **Risks:** Cluttering the main UI might distract from the core task of tracking.
*   **Expected Learning:** Determine if ambient data visualization impacts behavioral output.

---

## 3. Launch Recommendations

### The First 3 Experiments to Launch Immediately Post-MVP

1.  **Experiment 6: Deferred Resume Upload (Onboarding)**
    *   **Why:** Onboarding is the top of the funnel. If users churn during sign-up because they don't have a resume handy, no other features matter. We must optimize activation immediately to ensure we have a sufficient sample size for subsequent tests.

2.  **Experiment 5: Empty State Priming (Recruiter Discovery)**
    *   **Why:** The "blank canvas paralysis" is a known killer of early-stage products. If users don't know who to search for, they can't populate their Kanban board. Priming the search state is a low-effort, high-impact UI change that directly feeds the core value loop.

3.  **Experiment 1: Tone Selection Impact (AI Quality)**
    *   **Why:** The AI Generator is the primary differentiator of ConnectIQ. If the default output is poor and users aren't copying it to their clipboards, the product fails. Testing tone controls early will calibrate our LLM prompts and secure the "Aha!" moment of effortless drafting.
