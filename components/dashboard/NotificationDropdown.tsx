"use client";

import { useState } from "react";
import { Bell, Check, CheckCircle2, MessageSquare, Calendar, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: "reply" | "followup" | "interview" | "ai";
}

const initialNotifications: Notification[] = [
  {
    id: "1",
    title: "Recruiter Replied",
    description: "Sarah Jenkins from Google replied to your email.",
    time: "10m ago",
    read: false,
    type: "reply",
  },
  {
    id: "2",
    title: "Follow-up Due Tomorrow",
    description: "You need to follow up with Michael Chen.",
    time: "2h ago",
    read: false,
    type: "followup",
  },
  {
    id: "3",
    title: "Interview Scheduled",
    description: "Your interview at Notion is confirmed for Friday.",
    time: "1d ago",
    read: true,
    type: "interview",
  },
  {
    id: "4",
    title: "New AI Message",
    description: "Draft generated for Stripe referral request.",
    time: "2d ago",
    read: true,
    type: "ai",
  },
];

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getIcon = (type: string) => {
    switch (type) {
      case "reply":
        return <MessageSquare className="h-4 w-4 text-blue-400" />;
      case "followup":
        return <Calendar className="h-4 w-4 text-yellow-400" />;
      case "interview":
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case "ai":
        return <Sparkles className="h-4 w-4 text-primary" />;
      default:
        return <Bell className="h-4 w-4" />;
    }
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <div className="relative">
      <button
        className="relative h-8 w-8 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-surface-hover transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl border border-border bg-surface/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-sm">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 text-xs px-2 text-muted-foreground hover:text-foreground"
                    onClick={markAllAsRead}
                  >
                    Mark all read
                  </Button>
                )}
              </div>

              <div className="max-h-[350px] overflow-y-auto custom-scrollbar">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center px-4">
                    <Bell className="h-8 w-8 text-muted-foreground/30 mb-3" />
                    <p className="text-sm font-medium">No notifications yet</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      We'll let you know when recruiters reply or when follow-ups are due.
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`flex gap-3 p-4 hover:bg-white/[0.02] transition-colors border-b border-border/50 last:border-0 relative ${
                          !notification.read ? "bg-primary/[0.02]" : ""
                        }`}
                        onClick={() => markAsRead(notification.id)}
                      >
                        {!notification.read && (
                          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
                        )}
                        <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          {getIcon(notification.type)}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="flex justify-between items-start gap-2">
                            <p className={`text-sm ${!notification.read ? "font-semibold text-foreground" : "font-medium text-foreground/80"}`}>
                              {notification.title}
                            </p>
                            <span className="text-[10px] text-muted-foreground whitespace-nowrap mt-0.5">
                              {notification.time}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {notification.description}
                          </p>
                        </div>
                        {!notification.read && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity absolute right-4 top-4"
                            onClick={(e) => {
                              e.stopPropagation();
                              markAsRead(notification.id);
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="p-2 border-t border-border bg-surface-hover/50">
                <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground hover:text-foreground">
                  View all notifications
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
