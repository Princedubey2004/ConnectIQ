# ConnectIQ 🚀

ConnectIQ is an AI-powered networking CRM built specifically for students and fresh graduates to help them secure internships and full-time roles. Turn cold outreach into interviews with personalized AI-generated messages, a robust Kanban pipeline to track recruiter conversations, and automated follow-up reminders.

![ConnectIQ Dashboard](public/globe.svg)

## ✨ Key Features
- **AI Outreach Generator:** Craft highly personalized cold outreach messages for LinkedIn, Email, or follow-ups based on the recruiter's background and your target role.
- **Networking CRM:** A complete Kanban-style pipeline to track recruiters through stages (To Contact -> Contacted -> Follow Up -> Interviewing -> Offer).
- **Analytics Dashboard:** Visualize your outreach volume, response rates, and pipeline health over time.
- **Premium UI/UX:** A stunning, highly responsive dark mode interface powered by Tailwind CSS v4 and Framer Motion.

## 🛠 Tech Stack
- **Framework:** [Next.js 16](https://nextjs.org/) (App Router)
- **Database:** [MongoDB](https://www.mongodb.com/) via Mongoose
- **Authentication:** [NextAuth.js](https://next-auth.js.org/) (Credentials)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)

## 🚀 Getting Started Locally

### Prerequisites
Make sure you have Node.js and npm installed. You will also need a MongoDB Atlas cluster URI.

### 1. Clone the repository
```bash
git clone https://github.com/Princedubey2004/ConnectIQ.git
cd ConnectIQ
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory and add the following keys:
```env
# MongoDB Connection String
MONGODB_URI=your_mongodb_connection_string

# NextAuth Configuration
NEXTAUTH_SECRET=your_super_secret_key
NEXTAUTH_URL=http://localhost:3000

# OpenAI API Key (For message generation)
OPENAI_API_KEY=your_openai_api_key
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🌐 Deployment
This project is fully optimized for deployment on **Vercel**. Simply import the repository to Vercel, inject your environment variables, and hit Deploy!

## 📄 License
This project is licensed under the MIT License.
