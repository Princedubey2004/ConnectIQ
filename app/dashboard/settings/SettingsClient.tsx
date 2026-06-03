"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Palette, Bell, Shield, Lock, Save, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useTheme } from "next-themes";

type Tab = "account" | "appearance" | "notifications" | "security";

export function SettingsClient({ user }: { user: { name: string; email: string } }) {
  const [activeTab, setActiveTab] = useState<Tab>("account");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const { theme, setTheme } = useTheme();

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 800);
  };

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "account", label: "Account", icon: <User className="h-4 w-4" /> },
    { id: "appearance", label: "Appearance", icon: <Palette className="h-4 w-4" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> },
    { id: "security", label: "Security", icon: <Shield className="h-4 w-4" /> },
  ];

  return (
    <div className="flex flex-col md:flex-row gap-6 mt-8">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors relative ${
              activeTab === tab.id
                ? "text-foreground bg-surface-hover"
                : "text-muted-foreground hover:text-foreground hover:bg-surface-hover/50"
            }`}
          >
            {tab.icon}
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-md"
                initial={false}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "account" && (
              <Card className="glass-panel border-border bg-surface">
                <CardHeader>
                  <CardTitle>Account Details</CardTitle>
                  <CardDescription>Manage your personal information.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Full Name</label>
                    <Input defaultValue={user.name} className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Email Address</label>
                    <Input defaultValue={user.email} disabled className="bg-background/50 border-border opacity-70" />
                    <p className="text-xs text-muted-foreground mt-1">Your email address cannot be changed right now.</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "appearance" && (
              <Card className="glass-panel border-border bg-surface">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how ConnectIQ looks on your device.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium text-foreground">Theme Preference</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button 
                        onClick={() => setTheme("dark")}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'dark' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'}`}
                      >
                        <div className="w-full h-24 rounded-md bg-[#050505] border border-white/10 flex flex-col p-2 gap-2 overflow-hidden shadow-inner">
                          <div className="w-1/3 h-2 bg-white/10 rounded-full" />
                          <div className="w-2/3 h-4 bg-[#0F0F14] border border-white/5 rounded-sm" />
                          <div className="w-1/2 h-4 bg-[#6D5DF6]/20 border border-[#6D5DF6]/30 rounded-sm" />
                        </div>
                        <span className="text-sm font-medium">Dark Mode</span>
                      </button>
                      <button 
                        onClick={() => setTheme("light")}
                        className={`flex flex-col items-center justify-center gap-3 p-4 rounded-xl border-2 transition-all ${theme === 'light' ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'}`}
                      >
                        <div className="w-full h-24 rounded-md bg-[#FFFFFF] border border-black/10 flex flex-col p-2 gap-2 overflow-hidden shadow-inner">
                          <div className="w-1/3 h-2 bg-black/10 rounded-full" />
                          <div className="w-2/3 h-4 bg-[#F8FAFC] border border-black/5 rounded-sm" />
                          <div className="w-1/2 h-4 bg-[#6D5DF6]/10 border border-[#6D5DF6]/20 rounded-sm" />
                        </div>
                        <span className="text-sm font-medium">Light Mode</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "notifications" && (
              <Card className="glass-panel border-border bg-surface">
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Choose what you want to be notified about.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">Email Notifications</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Receive a daily digest of your follow-ups.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">In-App Alerts</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Show notifications in the dashboard bell.</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-9 h-5 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "security" && (
              <Card className="glass-panel border-border bg-surface">
                <CardHeader>
                  <CardTitle>Security</CardTitle>
                  <CardDescription>Keep your account secure.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Current Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-background border-border" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">New Password</label>
                    <Input type="password" placeholder="••••••••" className="bg-background border-border" />
                  </div>
                  <div className="pt-2 flex justify-between items-center border-t border-border mt-6">
                    <div>
                      <p className="text-sm font-medium text-red-500">Danger Zone</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Permanently delete your account and all data.</p>
                    </div>
                    <Button variant="outline" className="text-red-500 border-red-500/50 hover:bg-red-500/10" size="sm">Delete Account</Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex justify-end">
          <Button 
            className="bg-primary hover:bg-primary/90 text-primary-foreground min-w-[120px]" 
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {saved ? "Saved!" : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
