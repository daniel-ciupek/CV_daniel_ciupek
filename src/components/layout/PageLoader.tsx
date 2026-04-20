"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

function TypeWriter({ text, speed = 22 }: { text: string; speed?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function PageLoader() {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (reduce) {
      setVisible(false);
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => setVisible(false), 1800);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{ backgroundColor: "var(--bg-base)", zIndex: 200 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 1.4 }}
        >
          <svg
            viewBox="0 0 160 80"
            className="h-16 sm:h-20"
            aria-hidden
          >
            {/* Letter D */}
            <motion.path
              d="M10 10 L10 70 L38 70 Q62 70 62 40 Q62 10 38 10 Z"
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 0.8, ease: [0.65, 0.05, 0.36, 1] },
                opacity: { duration: 0.1 },
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))",
              }}
            />
            {/* Letter C */}
            <motion.path
              d="M150 22 Q132 10 112 10 Q82 10 82 40 Q82 70 112 70 Q132 70 150 58"
              stroke="var(--accent)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: {
                  duration: 0.8,
                  delay: 0.4,
                  ease: [0.65, 0.05, 0.36, 1],
                },
                opacity: { duration: 0.1, delay: 0.4 },
              }}
              style={{
                filter: "drop-shadow(0 0 8px rgba(0,212,255,0.6))",
              }}
            />
          </svg>

          <motion.p
            className="mt-4 font-mono text-[11px] sm:text-[13px]"
            style={{ color: "var(--text-muted)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
          >
            <TypeWriter text="> portfolio.init()" speed={22} />
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
