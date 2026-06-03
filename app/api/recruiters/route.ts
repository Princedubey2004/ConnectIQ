import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import { Recruiter } from "@/models/Recruiter";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const recruiters = await Recruiter.find({ userId: session.user.id }).sort({ updatedAt: -1 });
    
    return NextResponse.json(recruiters);
  } catch (error) {
    console.error("Error fetching recruiters:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    if (!data.name || !data.company || !data.role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await dbConnect();
    
    const recruiter = await Recruiter.create({
      ...data,
      userId: session.user.id,
      status: data.status || "To Contact",
    });

    return NextResponse.json(recruiter, { status: 201 });
  } catch (error) {
    console.error("Error creating recruiter:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
