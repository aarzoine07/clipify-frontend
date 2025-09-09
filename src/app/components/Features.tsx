"use client";
import { motion } from "framer-motion";
import {
  Film,
  Scissors,
  Captions,
  CalendarDays,
  Waves,
  Rocket,
} from "lucide-react";

const items = [
  {
    icon: Scissors,
    title: "Smart Highlights",
    desc: "Detects high-energy moments using transcript & audio cues.",
  },
  {
    icon: Film,
    title: "9:16 Auto-Frame",
    desc: "Face/object tracking keeps the subject centered.",
  },
  {
    icon: Captions,
    title: "Styled Subtitles",
    desc: "Readable karaoke captions with stroke and shadows.",
  },
  {
    icon: Waves,
    title: "Loudness Normalization",
    desc: "Balanced audio for consistent quality.",
  },
  {
    icon: CalendarDays,
    title: "Post & Schedule",
    desc: "Queue to TikTok with time-zone aware scheduling.",
  },
  {
    icon: Rocket,
    title: "Fast Rendering",
    desc: "GPU presets for 1080×1920 MP4 exports.",
  },
];

export function Features() {
  return (
    <section className="py-6 md:py-10">
      <h2 className="text-xl font-medium text-zinc-200 md:text-2xl">
        Everything you need
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.35, delay: i * 0.05 }}
            whileHover={{
              y: -3,
              boxShadow: "0 8px 30px rgba(168,85,247,0.15)",
            }}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-white/10 bg-purple-500/10 p-2">
                <Icon className="h-5 w-5 text-purple-400" />
              </div>
              <div className="text-base font-semibold">{title}</div>
            </div>
            <p className="mt-3 text-sm text-zinc-300">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
