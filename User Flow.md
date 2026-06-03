# User Flow
**Product:** ConnectIQ  

The core user flow maps out the "Happy Path" from a user first discovering the application to successfully securing an interview.

---

## The Complete Networking Loop

**1. Discovery & Onboarding**
*   **Landing Page:** User reads the value proposition ("Turn cold outreach into interviews") and clicks "Get Started for Free".
*   **Sign Up:** User creates an account via email and password.
*   **Profile Setup:** User uploads their resume text and specifies their target role (e.g., "Software Engineering Intern"). This data is saved to provide context for future AI generation.

**2. The Outreach Process**
*   **Add Recruiter:** User finds a recruiter on LinkedIn, copies their name and company, and clicks "Add Recruiter" on the ConnectIQ CRM Kanban board.
*   **Generate Message:** User navigates to the AI Generator, inputs the recruiter's details, selects the Message Type (LinkedIn/Email), Tone (Professional/Casual), and Length.
*   **Copy Message:** The AI generates a highly personalized message using the user's resume and recruiter's data. User clicks "Copy to Clipboard".
*   **Contact Recruiter:** User leaves ConnectIQ, goes to LinkedIn or Gmail, pastes the message, and hits send.

**3. Pipeline Management**
*   **Track in CRM:** User returns to ConnectIQ and drags the recruiter card from the "To Contact" column to the "Contacted" column.
*   **Schedule Follow-up:** The system logs the contact date. If the recruiter doesn't respond within 5 days, the user receives a dashboard notification to follow up. User generates a "Follow-up" variant message and sends it.

**4. Conversion**
*   **Receive Response:** The recruiter replies positively on LinkedIn.
*   **Interview:** User drags the recruiter card into the "Interviewing" column. This action updates the global Analytics Dashboard, increasing the user's "Conversion Rate" metric and providing positive reinforcement to continue the cycle.
