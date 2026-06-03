import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import dbConnect from "@/lib/db";
import { Profile } from "@/models/Profile";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();
    const profile = await Profile.findOne({ userId: session.user.id });

    if (!profile) {
      return NextResponse.json({
        fullName: session.user.name || "",
        college: "",
        degree: "",
        graduationYear: "",
        skills: [],
        targetRoles: [],
        targetCompanies: [],
        resumeUrl: "",
        linkedinUrl: "",
        portfolioUrl: "",
        githubUrl: "",
      });
    }

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
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
    await dbConnect();

    const profile = await Profile.findOneAndUpdate(
      { userId: session.user.id },
      { $set: { ...data, userId: session.user.id } },
      { new: true, upsert: true }
    );

    return NextResponse.json(profile);
  } catch (error) {
    console.error("Error saving profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
