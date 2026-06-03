"use client";

import { useEffect, useState, forwardRef } from "react";
import { Command } from "cmdk";
import { Search, FileText, User, Building2, Settings, MessageSquarePlus, Activity } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function GlobalSearch() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 text-sm text-muted-foreground bg-surface-hover/50 hover:bg-surface-hover border border-border rounded-lg transition-colors w-64 group"
      >
        <Search className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
        <span className="flex-1 text-left group-hover:text-foreground transition-colors">Search anything...</span>
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-surface px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>

      {/* Mobile search icon */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
      >
        <Search className="h-4 w-4" />
      </button>

      <AnimatePresence>
        {open && (
          <Command.Dialog
            open={open}
            onOpenChange={setOpen}
            label="Global Command Menu"
            className="fixed inset-0 z-50 flex justify-center items-start pt-[10vh] bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="w-full max-w-2xl bg-surface border border-border rounded-xl shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="flex items-center border-b border-border px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
                <Command.Input 
                  placeholder="Search recruiters, companies, or quick actions..." 
                  className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus:ring-0 text-foreground"
                />
                <kbd className="ml-2 hidden sm:inline-flex h-5 items-center gap-1 rounded border border-border bg-surface-hover px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                  ESC
                </kbd>
              </div>

              <Command.List className="max-h-[60vh] overflow-y-auto overflow-x-hidden custom-scrollbar p-2">
                <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>
                
                <Command.Group heading="Quick Actions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/generator"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground"
                  >
                    <MessageSquarePlus className="mr-2 h-4 w-4" />
                    <span>Generate AI Message</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/crm"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-foreground"
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Add New Recruiter</span>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Recent Recruiters (Mocked)" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/crm"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground text-foreground"
                  >
                    <User className="mr-2 h-4 w-4 text-primary" />
                    <div className="flex flex-col">
                      <span>Sarah Jenkins</span>
                      <span className="text-xs text-muted-foreground">Google • University Recruiter</span>
                    </div>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/crm"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground text-foreground"
                  >
                    <User className="mr-2 h-4 w-4 text-blue-400" />
                    <div className="flex flex-col">
                      <span>Michael Chen</span>
                      <span className="text-xs text-muted-foreground">Stripe • Technical Recruiter</span>
                    </div>
                  </Command.Item>
                </Command.Group>

                <Command.Group heading="Pages" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground text-foreground"
                  >
                    <Activity className="mr-2 h-4 w-4" />
                    <span>Dashboard Overview</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/settings"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground text-foreground"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings & Preferences</span>
                  </Command.Item>
                  <Command.Item 
                    onSelect={() => runCommand(() => router.push("/dashboard/profile"))}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2.5 text-sm outline-none aria-selected:bg-surface-hover aria-selected:text-foreground text-foreground"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <span>Profile & Resume</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>
            </motion.div>
          </Command.Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
