"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  MessageSquarePlus,
  Users,
  BarChart3,
  UserCircle,
  LogOut,
  Menu,
  X,
  ChevronRight,
  Sparkles,
  Bell,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { NotificationDropdown } from "@/components/dashboard/NotificationDropdown";
import { GlobalSearch } from "@/components/dashboard/GlobalSearch";


const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard, section: "main" },
  { name: "AI Generator", href: "/dashboard/generator", icon: Sparkles, section: "main" },
  { name: "Recruiter CRM", href: "/dashboard/crm", icon: Users, section: "main" },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3, section: "main" },
  { name: "Profile", href: "/dashboard/profile", icon: UserCircle, section: "account" },
];

const mainLinks = sidebarLinks.filter((l) => l.section === "main");
const accountLinks = sidebarLinks.filter((l) => l.section === "account");

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!session) return null;

  const initials = (session?.user?.name || "U")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const currentPage = sidebarLinks.find((l) => l.href === pathname)?.name || "Dashboard";

  function NavLink({ link }: { link: (typeof sidebarLinks)[0] }) {
    const isActive = pathname === link.href || (link.href !== "/dashboard" && pathname.startsWith(link.href));
    const Icon = link.icon;
    return (
      <Link
        href={link.href}
        onClick={() => setIsMobileOpen(false)}
        className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150 relative
          ${isActive
            ? "bg-primary/10 text-primary"
            : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          }`}
      >
        {isActive && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-4 w-0.5 bg-primary rounded-r-full" />
        )}
        <Icon className={`h-4 w-4 shrink-0 transition-colors ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`} />
        <span className="flex-1">{link.name}</span>
        {isActive && <ChevronRight className="h-3 w-3 text-primary/50" />}
      </Link>
    );
  }

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex h-14 items-center justify-between border-b border-white/5 px-4">
        <Link href="/dashboard" className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-lg tracking-tight">ConnectIQ</span>
        </Link>
        <button
          className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setIsMobileOpen(false)}
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        {/* Main Links */}
        <div className="space-y-0.5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">
            Workspace
          </p>
          {mainLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </div>

        {/* Account */}
        <div className="space-y-0.5">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50 mb-1">
            Account
          </p>
          {accountLinks.map((link) => (
            <NavLink key={link.href} link={link} />
          ))}
        </div>
      </div>

      {/* User Footer */}
      <div className="border-t border-white/5 p-3">
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors">
          <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-purple-400 flex items-center justify-center text-xs font-bold text-white shrink-0">
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{session?.user?.name || "User"}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.user?.email || ""}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="text-muted-foreground hover:text-foreground transition-colors"
            title="Sign Out"
          >
            <LogOut className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-60 bg-surface border-r border-white/5 transform transition-transform duration-200 ease-out lg:static lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 max-w-full">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/5 bg-background/80 backdrop-blur-xl px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setIsMobileOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </button>
            {/* Breadcrumb */}
            <div className="hidden sm:flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">ConnectIQ</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
              <span className="font-medium text-foreground">{currentPage}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <GlobalSearch />
            <div className="hidden md:block h-4 w-px bg-border mx-1" />
            <ThemeToggle />
            <div className="h-4 w-px bg-border" />
            <NotificationDropdown />
            <div className="h-4 w-px bg-border" />
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-primary to-violet-400 flex items-center justify-center text-xs font-bold text-white cursor-pointer" title={session?.user?.name || "User"}>
              {initials}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-5 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
