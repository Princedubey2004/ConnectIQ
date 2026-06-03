# ConnectIQ 🚀

**ConnectIQ** is an AI-powered Networking CRM designed specifically for students and fresh graduates. It transforms the chaotic process of cold outreach into a streamlined, data-driven pipeline, helping early-career professionals secure internships and full-time roles with higher conversion rates.

---

## 🎯 Project Overview
Applying through traditional job portals yields an extremely low success rate (often <2%). Referrals and direct networking increase those odds by up to 12x. However, students struggle with knowing what to say, organizing their outreach, and remembering to follow up. ConnectIQ solves this by providing intelligent message generation, pipeline management, and follow-up tracking in a single, unified interface.

## ✨ Core Features
*   **AI Message Generator**: Generates highly personalized outreach messages tailored to specific goals (Internship, Full-time, Referral) using OpenAI. Adapts tone and length dynamically.
*   **Kanban Recruiter CRM**: A drag-and-drop pipeline interface to track recruiters across stages: *To Contact*, *Contacted*, *Follow Up*, *Interviewing*, *Offer*, and *Rejected*.
*   **Resume Extraction (Simulated)**: Drag-and-drop resume uploading to automatically extract key skills and experiences.
*   **Interactive Analytics Dashboard**: Visualizes pipeline health, response rates, and weekly outreach volume with dynamic charting and CSV export capabilities.
*   **Automated Follow-ups**: Reminders logic integrated directly into the CRM to ensure no opportunity falls through the cracks.

## 🛠 Tech Stack & Project Architecture
*   **Frontend**: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion v12, shadcn/ui.
*   **Backend**: Next.js Server Actions & API Routes, NextAuth.js (Credentials).
*   **Database**: MongoDB (Mongoose ODMs).
*   **AI Integration**: OpenAI API (simulated/integrated via custom routes).
*   **Deployment**: Vercel.

## 🚀 Installation & Setup Guide

### 1. Prerequisites
Ensure you have Node.js (v18+) and npm installed. You will also need a MongoDB Atlas Cluster and a Gemini/OpenAI API Key.

### 2. Clone the Repository
```bash
git clone https://github.com/Princedubey2004/ConnectIQ.git
cd ConnectIQ
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_super_secret_string
NEXTAUTH_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_or_openai_api_key
```

### 5. Run the Development Server
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the application.

## 🔮 Future Roadmap
*   **LinkedIn Chrome Extension Integration**: One-click import of recruiter profiles directly from LinkedIn.
*   **Email Sequencing**: Automated email follow-up dispatching.
*   **Advanced AI**: Training the model on successful past outreach to optimize response rates dynamically.

## 📸 Demo
*(Include screenshots or GIFs of your dashboard, CRM, and AI generator here)*

---
**Designed for scale. Built for students. 🚀**
