"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";

const MotionDiv = motion.div;

export function Hero() {
  return (
    <section className="relative py-8 md:py-16">
      {/* soft glow behind headline */}
      <motion.div
        className="pointer-events-none absolute -top-8 left-0 right-0 mx-auto h-40 w-2/3 rounded-full bg-purple-500/10 blur-3xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      />
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl"
      >
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs tracking-wide text-zinc-300">
          AI Clipping • TikTok Scheduler
        </span>

        <h1 className="mt-4 text-3xl font-semibold leading-tight md:text-5xl">
          Turn long videos into{" "}
          <span className="relative inline-block">
            {/* purple “neon” edge */}
            <span className="absolute -inset-1 rounded-md bg-purple-500/30 blur-md" />
            <span className="relative bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text text-transparent">
              viral-ready
            </span>
          </span>{" "}
          clips in minutes
        </h1>

        <p className="mt-4 text-zinc-300 md:text-lg">
          Upload once. We auto-detect highlights, reframe to 9:16 with
          subtitles, and queue your posts.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {/* animated primary button */}
          <MotionDiv
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="px-5 bg-purple-600 hover:bg-purple-700">
              New Project
              <motion.span
                className="ml-2 inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                <MoveRight className="h-4 w-4" />
              </motion.span>
            </Button>
          </MotionDiv>

          {/* animated secondary button */}
          <MotionDiv
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button variant="secondary" className="px-5">
              Watch 30s demo
            </Button>
          </MotionDiv>
        </div>
      </motion.div>
    </section>
  );
}
