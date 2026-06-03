import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Message } from "@/models/Message";
import dbConnect from "@/lib/db";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json({ error: "Gemini API key not configured" }, { status: 500 });
    }

    const { recruiterName, company, role, goal, resumeSummary, additionalContext } = await req.json();

    if (!recruiterName || !company || !role || !goal) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const prompt = `
      You are an expert career coach and networking strategist.
      Write personalized outreach messages for a student to send to a recruiter.

      Context:
      - Recruiter Name: ${recruiterName}
      - Company: ${company}
      - Recruiter Role: ${role}
      - Goal: ${goal}
      - Student Background/Resume Summary: ${resumeSummary || "A highly motivated student seeking opportunities."}
      - Additional Context: ${additionalContext || "None"}

      You must return EXACTLY 4 messages in a strict JSON format with the following keys:
      {
        "linkedin": "A short, punchy LinkedIn connection request under 300 characters.",
        "followUp": "A polite follow-up message if they haven't replied in a week.",
        "referral": "A message asking for a referral or a quick chat to learn about their team.",
        "coldEmail": "A longer, professional cold email introducing the student and their background."
      }

      Do NOT return any markdown formatting outside of the JSON object. Only return the raw JSON object.
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" });
    
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Clean up potential markdown formatting from Gemini response
    const cleanedText = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanedText);
    } catch (e) {
      console.error("Failed to parse Gemini JSON output:", cleanedText);
      return NextResponse.json({ error: "Failed to generate valid output" }, { status: 500 });
    }

    return NextResponse.json(parsedContent);
  } catch (error) {
    console.error("Error generating message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
