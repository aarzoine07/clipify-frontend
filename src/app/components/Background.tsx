"use client";
import { motion } from "framer-motion";

/**
 * Black -> Purple animated background with soft moving glows,
 * a slow rotating conic highlight, and a subtle drifting grid.
 */
export function Background() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      {/* base vertical gradient (black -> deep purple) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#000_0%,#0b0015_35%,#190032_100%)]" />

      {/* slow rotating conic highlight */}
      <motion.div
        className="absolute -inset-[20%] rounded-[50%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(168,85,247,0.08)_90deg,transparent_180deg,rgba(147,51,234,0.08)_270deg,transparent_360deg)]"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 45, ease: "linear", repeat: Infinity }}
      />

      {/* primary glow (top center) */}
      <motion.div
        className="pointer-events-none absolute -top-24 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-purple-500/25 blur-[120px]"
        animate={{ opacity: [0.28, 0.45, 0.28], scale: [1, 1.06, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* secondary glow (bottom right) */}
      <motion.div
        className="pointer-events-none absolute bottom-[-12rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-fuchsia-500/15 blur-[110px]"
        animate={{ opacity: [0.2, 0.35, 0.2], scale: [1, 1.07, 1] }}
        transition={{ duration: 10, repeat: Infinity, delay: 1.2 }}
      />

      {/* gently drifting grid texture */}
      <motion.div
        className="absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'><path d='M48 0H0v48' fill='none' stroke='white' stroke-opacity='.06'/></svg>\")",
          backgroundSize: "48px 48px",
        }}
        animate={{
          backgroundPositionX: ["0%", "100%"],
          backgroundPositionY: ["0%", "100%"],
        }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      />
    </div>
  );
}
