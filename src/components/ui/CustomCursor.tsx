"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);

  const ringX = useSpring(dotX, { stiffness: 150, damping: 18 });
  const ringY = useSpring(dotY, { stiffness: 150, damping: 18 });

  const isHoveringRef = useRef(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);
    };

    const handleMouseEnter = () => {
      isHoveringRef.current = true;
      ringRef.current?.classList.add("cursor-hover");
      dotRef.current?.classList.add("cursor-hover");
    };

    const handleMouseLeave = () => {
      isHoveringRef.current = false;
      ringRef.current?.classList.remove("cursor-hover");
      dotRef.current?.classList.remove("cursor-hover");
    };

    window.addEventListener("mousemove", moveCursor);

    const interactives = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, label, [data-cursor='hover']"
    );
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [dotX, dotY]);

  return (
    <>
      {/* Ring — follows with spring delay */}
      <motion.div
        ref={ringRef}
        className="cursor-ring"
        style={{ x: ringX, y: ringY }}
      />
      {/* Dot — follows instantly */}
      <motion.div
        ref={dotRef}
        className="cursor-dot"
        style={{ x: dotX, y: dotY }}
      />
    </>
  );
}
