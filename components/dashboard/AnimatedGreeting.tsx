"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function AnimatedGreeting({ userName }: { userName: string }) {
  const [mounted, setMounted] = useState(false);
  const [timeState, setTimeState] = useState<{ greeting: string; subtext: string } | null>(null);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) {
      setTimeState({
        greeting: `Good Morning, ${userName} 👋`,
        subtext: "Start your day by reaching out to new recruiters.",
      });
    } else if (hour >= 12 && hour < 17) {
      setTimeState({
        greeting: `Good Afternoon, ${userName} ☀️`,
        subtext: "You've got time to send a few more applications.",
      });
    } else {
      setTimeState({
        greeting: `Good Evening, ${userName} 🌆`,
        subtext: "Perfect time to follow up with recruiters and review today's outreach progress.",
      });
    }
    setMounted(true);
  }, [userName]);

  if (!mounted || !timeState) {
    return (
      <div className="invisible">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Greeting</h1>
        <p className="text-sm mt-1">Subtext placeholder</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
        {timeState.greeting}
      </h1>
      <p className="text-muted-foreground text-sm mt-1">
        {timeState.subtext}
      </p>
    </motion.div>
  );
}
