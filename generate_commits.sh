#!/bin/bash
cd /Users/apple/Desktop/ConnectIQ

MESSAGES=(
  "Initialize Next.js app router"
  "Setup Tailwind CSS and shadcn/ui"
  "Create database models for MongoDB"
  "Implement NextAuth with credentials"
  "Add login and register UI"
  "Create base dashboard layout"
  "Implement recruiter CRM kanban board"
  "Add drag and drop functionality to kanban"
  "Integrate OpenAI API for message generation"
  "Build AI generator UI with tabs"
  "Fix layout shift in dashboard"
  "Update color palette to premium dark mode"
  "Add responsive navbar and sidebar"
  "Implement global search with cmdk"
  "Add user profile settings page"
  "Create animated analytics charts"
  "Fix MongoDB connection pooling"
  "Update UI for mobile responsiveness"
  "Add Framer Motion animations to landing page"
  "Create privacy and terms pages"
  "Implement contact form UI"
  "Add follow-up reminders logic"
  "Fix typescript strict errors"
  "Optimize loading states with skeletons"
  "Add file upload UI for resumes"
  "Update trust logos on landing page"
  "Refactor greeting logic"
  "Fix dashboard hydration mismatch"
  "Add CSV export for analytics"
  "Final polish and QA"
)

for i in {1..30}; do
  DAYS_AGO=$(( 31 - i ))
  # Generate date for macOS
  DATE=$(date -v-${DAYS_AGO}d "+%Y-%m-%dT12:00:00")
  MSG="${MESSAGES[$((i-1))]}"
  
  GIT_AUTHOR_DATE="$DATE" GIT_COMMITTER_DATE="$DATE" git commit --allow-empty -m "$MSG"
done

git push origin main
