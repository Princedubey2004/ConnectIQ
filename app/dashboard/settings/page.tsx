import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { SettingsClient } from "./SettingsClient";

export const metadata = {
  title: "Settings | ConnectIQ",
};

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account preferences, appearance, and security.
        </p>
      </div>

      <SettingsClient user={{ name: session.user.name || "", email: session.user.email || "" }} />
    </div>
  );
}
