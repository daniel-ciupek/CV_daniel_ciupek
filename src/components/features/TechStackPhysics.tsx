"use client";

import { useEffect, useRef, useState, useLayoutEffect } from "react";
import Matter from "matter-js";
import { motion } from "framer-motion";
import { flatSkills, CATEGORY_COLOR } from "./tech-stack/flatSkills";
import type { TechTag } from "./tech-stack/types";

const PHYSICS = {
  GRAVITY_Y:        0,
  GRAVITY_X:        0,
  FRICTION_AIR:     0.02,
  RESTITUTION:      0.85,
  FRICTION:         0.001,
  DENSITY:          0.0015,
  INITIAL_VELOCITY: 1.2,
  REPULSOR_RADIUS:  140,
  REPULSOR_FORCE:   0.00025,
  WALL_THICKNESS:   80,
  WAKE_INTERVAL_MS: 6000,
  WAKE_BOOST:       0.0005,
};

const TAG_HEIGHT = 40;

function TagVisual({ tag, interactive = false }: { tag: TechTag; interactive?: boolean }) {
  const { Icon, name, categoryColor } = tag;
  return (
    <div
      className="flex h-10 items-center gap-2 rounded-full px-[18px] font-medium select-none"
      style={{
        fontSize: 14,
        background: "rgba(15, 15, 15, 0.72)",
        backdropFilter: "blur(10px)",
        border: `1px solid ${categoryColor}`,
        color: "var(--text)",
        boxShadow: `0 0 0 1px rgba(0,0,0,0.3) inset, 0 4px 12px rgba(0,0,0,0.4)`,
        cursor: interactive ? "grab" : "default",
        whiteSpace: "nowrap",
      }}
    >
      {Icon && <Icon size={16} style={{ color: "var(--accent)", flexShrink: 0 }} />}
      {name}
    </div>
  );
}

function CategoryLegend() {
  return (
    <div className="mb-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs">
      {Object.entries(CATEGORY_COLOR).map(([cat, color]) => (
        <span key={cat} className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full" style={{ background: color }} />
          <span style={{ color: "var(--text-muted)" }}>{cat}</span>
        </span>
      ))}
    </div>
  );
}

export default function TechStackPhysics() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const tagElsRef = useRef<(HTMLDivElement | null)[]>([]);
  const measureRef = useRef<HTMLDivElement>(null);
  const mouseBodyRef = useRef({ x: -9999, y: -9999, active: false });
  const rafRef = useRef(0);

  const [sizes, setSizes] = useState<{ w: number; h: number }[] | null>(null);

  useLayoutEffect(() => {
    if (!measureRef.current) return;
    const spans = Array.from(measureRef.current.children) as HTMLElement[];
    const measured = spans.map((el) => ({ w: el.offsetWidth, h: TAG_HEIGHT }));
    setSizes(measured);
  }, []);

  useEffect(() => {
    if (!sizes || !sceneRef.current) return;
    const scene = sceneRef.current;
    const width = scene.clientWidth;
    const height = scene.clientHeight;
    const T = PHYSICS.WALL_THICKNESS;

    const engine = Matter.Engine.create({
      gravity: { x: PHYSICS.GRAVITY_X, y: PHYSICS.GRAVITY_Y },
    });

    const walls = [
      Matter.Bodies.rectangle(width / 2, -T / 2, width + T * 2, T, { isStatic: true }),
      Matter.Bodies.rectangle(width / 2, height + T / 2, width + T * 2, T, { isStatic: true }),
      Matter.Bodies.rectangle(-T / 2, height / 2, T, height + T * 2, { isStatic: true }),
      Matter.Bodies.rectangle(width + T / 2, height / 2, T, height + T * 2, { isStatic: true }),
    ];

    const tagBodies = sizes.map((s, i) => {
      const margin = 80;
      const x = margin + Math.random() * (width - margin * 2);
      const y = margin + Math.random() * (height - margin * 2);
      const body = Matter.Bodies.rectangle(x, y, s.w, s.h, {
        chamfer: { radius: s.h / 2 },
        restitution: PHYSICS.RESTITUTION,
        friction: PHYSICS.FRICTION,
        frictionAir: PHYSICS.FRICTION_AIR,
        density: PHYSICS.DENSITY,
        label: `tag-${i}`,
      });
      Matter.Body.setVelocity(body, {
        x: (Math.random() - 0.5) * PHYSICS.INITIAL_VELOCITY,
        y: (Math.random() - 0.5) * PHYSICS.INITIAL_VELOCITY,
      });
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.03);
      return body;
    });

    Matter.World.add(engine.world, [...walls, ...tagBodies]);

    const runner = Matter.Runner.create();
    Matter.Runner.run(runner, engine);

    // Mouse constraint (grab & throw)
    const mouse = Matter.Mouse.create(scene);
    const mouseConstraint = Matter.MouseConstraint.create(engine, {
      mouse,
      constraint: { stiffness: 0.08, damping: 0.1, render: { visible: false } },
    });
    // Remove wheel listener to avoid conflicting with Lenis
    const mouseEl = (mouse as unknown as { element: HTMLElement }).element;
    if (mouseEl) {
      const wheelHandler = (mouse as unknown as { _wheelHandler?: EventListener })._wheelHandler;
      if (wheelHandler) mouseEl.removeEventListener("wheel", wheelHandler);
    }
    Matter.World.add(engine.world, mouseConstraint);

    // Repulsor
    const onMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      mouseBodyRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    const onLeave = () => { mouseBodyRef.current.active = false; };
    scene.addEventListener("mousemove", onMove);
    scene.addEventListener("mouseleave", onLeave);

    const applyRepulsor = () => {
      if (!mouseBodyRef.current.active) return;
      const { x: mx, y: my } = mouseBodyRef.current;
      tagBodies.forEach((body) => {
        const dx = body.position.x - mx;
        const dy = body.position.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < PHYSICS.REPULSOR_RADIUS && dist > 0.1) {
          const falloff = 1 - dist / PHYSICS.REPULSOR_RADIUS;
          const strength = PHYSICS.REPULSOR_FORCE * falloff * body.mass;
          Matter.Body.applyForce(body, body.position, {
            x: (dx / dist) * strength,
            y: (dy / dist) * strength,
          });
        }
      });
    };
    Matter.Events.on(engine, "beforeUpdate", applyRepulsor);

    // Wake boost
    const wakeInterval = window.setInterval(() => {
      const avgSpeed = tagBodies.reduce((s, b) => s + Matter.Vector.magnitude(b.velocity), 0) / tagBodies.length;
      if (avgSpeed < 0.3) {
        tagBodies.forEach((body) => {
          Matter.Body.applyForce(body, body.position, {
            x: (Math.random() - 0.5) * PHYSICS.WAKE_BOOST,
            y: (Math.random() - 0.5) * PHYSICS.WAKE_BOOST,
          });
        });
      }
    }, PHYSICS.WAKE_INTERVAL_MS);

    // DOM sync loop
    const syncDOM = () => {
      tagBodies.forEach((body, i) => {
        const el = tagElsRef.current[i];
        if (!el) return;
        const tx = body.position.x - sizes[i].w / 2;
        const ty = body.position.y - sizes[i].h / 2;
        const rot = (body.angle * 180) / Math.PI;
        el.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${rot}deg)`;
      });
      rafRef.current = requestAnimationFrame(syncDOM);
    };
    rafRef.current = requestAnimationFrame(syncDOM);

    // Resize
    let resizeRaf = 0;
    const onResize = () => {
      cancelAnimationFrame(resizeRaf);
      resizeRaf = requestAnimationFrame(() => {
        const nw = scene.clientWidth;
        const nh = scene.clientHeight;
        Matter.Body.setPosition(walls[0], { x: nw / 2, y: -T / 2 });
        Matter.Body.setPosition(walls[1], { x: nw / 2, y: nh + T / 2 });
        Matter.Body.setPosition(walls[2], { x: -T / 2, y: nh / 2 });
        Matter.Body.setPosition(walls[3], { x: nw + T / 2, y: nh / 2 });
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      cancelAnimationFrame(resizeRaf);
      window.clearInterval(wakeInterval);
      window.removeEventListener("resize", onResize);
      scene.removeEventListener("mousemove", onMove);
      scene.removeEventListener("mouseleave", onLeave);
      Matter.Events.off(engine, "beforeUpdate", applyRepulsor);
      Matter.Runner.stop(runner);
      Matter.World.clear(engine.world, false);
      Matter.Engine.clear(engine);
    };
  }, [sizes]);

  return (
    <>
      <CategoryLegend />

      {/* Hidden measurement */}
      <div
        ref={measureRef}
        aria-hidden
        style={{ position: "absolute", visibility: "hidden", pointerEvents: "none", top: -9999 }}
      >
        {flatSkills.map((tag) => (
          <TagVisual key={`m-${tag.name}`} tag={tag} />
        ))}
      </div>

      {/* Physics scene */}
      <motion.div
        ref={sceneRef}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="relative w-full overflow-hidden rounded-2xl"
        aria-label="Interaktywna chmura technologii. Użyj myszy by odpychać lub chwytać tagi."
        style={{
          height: "clamp(460px, 60vh, 620px)",
          background: "radial-gradient(ellipse at 50% 50%, rgba(0,212,255,0.04) 0%, rgba(15,15,15,0.4) 70%)",
          border: "1px solid var(--border)",
          backdropFilter: "blur(12px)",
          cursor: "grab",
        }}
      >
        {/* Subtle grid */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,212,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.5) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Hint */}
        <div
          className="pointer-events-none absolute bottom-3 left-4 font-mono text-[11px]"
          style={{ color: "var(--text-subtle)" }}
        >
          {"// move · grab · release"}
        </div>

        {/* Tags */}
        {sizes &&
          flatSkills.map((tag, i) => (
            <div
              key={tag.name}
              ref={(el) => { tagElsRef.current[i] = el; }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: sizes[i].w,
                height: sizes[i].h,
                willChange: "transform",
              }}
            >
              <TagVisual tag={tag} interactive />
            </div>
          ))}
      </motion.div>
    </>
  );
}
