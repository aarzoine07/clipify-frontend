"use client";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const FadeIn = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.28, delay }}
  >
    {children}
  </motion.div>
);

export const Stagger = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-80px" }}
    variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
  >
    {children}
  </motion.div>
);

export const Item = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
  >
    {children}
  </motion.div>
);

export const LiftHover = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    whileHover={{ y: -3, scale: 1.02 }}
    transition={{ duration: 0.18 }}
  >
    {children}
  </motion.div>
);

// simple in-view counter
export function Counter({
  to = 0,
  duration = 0.9,
  className = "",
}: {
  to?: number;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [once, setOnce] = useState(false);
  useEffect(() => {
    if (!ref.current || once) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setOnce(true);
          const start = performance.now();
          const from = 0;
          const animate = (t: number) => {
            const p = Math.min(1, (t - start) / (duration * 1000));
            el.textContent = Math.round(from + (to - from) * p).toString();
            if (p < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
          io.disconnect();
        }
      },
      { rootMargin: "-40% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration, once]);
  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}

export const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`relative overflow-hidden rounded-xl bg-white/5 ${className}`}
  >
    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.6s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    <style jsx global>{`
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  </div>
);
