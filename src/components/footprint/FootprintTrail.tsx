"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/src/lib/gsap";

type Footprint = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

const MAX_FOOTPRINTS = 40;
const MIN_DISTANCE = 24; // px between footprints

const FOOTPRINT_FADE_DURATION = 0.8; // seconds

let globalId = 0;

const FootprintTrail = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastAngleRef = useRef<number>(0);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingPosRef = useRef<{ x: number; y: number } | null>(null);

  // Map for DOM element refs to trigger GSAP animations
  const footprintElsRef = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // Mouse listener -> store latest position
  useEffect(() => {
    const handleMove = (event: MouseEvent) => {
      pendingPosRef.current = { x: event.clientX, y: event.clientY };
      if (rafRef.current == null) {
        rafRef.current = window.requestAnimationFrame(updateTrail);
      }
    };

    const updateTrail = () => {
      rafRef.current = null;
      const container = containerRef.current;
      const pos = pendingPosRef.current;
      if (!container || !pos) return;

      const rect = container.getBoundingClientRect();
      const x = pos.x - rect.left;
      const y = pos.y - rect.top;

      const last = lastPosRef.current;
      if (last) {
        const dx = x - last.x;
        const dy = y - last.y;
        const dist = Math.hypot(dx, dy);

        if (dist < MIN_DISTANCE) {
          return;
        }

        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        lastAngleRef.current = angle;
      }

      lastPosRef.current = { x, y };

      setFootprints((prev) => {
        const next: Footprint[] = [
          ...prev,
          {
            id: globalId++,
            x,
            y,
            rotation: lastAngleRef.current,
          },
        ];

        if (next.length > MAX_FOOTPRINTS) {
          next.splice(0, next.length - MAX_FOOTPRINTS);
        }

        return next;
      });
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // Trigger fade-out when new footprints appear
  useEffect(() => {
    footprints.forEach((footprint) => {
      const el = footprintElsRef.current.get(footprint.id);
      if (!el) return;

      // Start from visible state, then fade and scale out
      gsap.fromTo(
        el,
        { autoAlpha: 0.4, scale: 1 },
        {
          autoAlpha: 0,
          scale: 1.1,
          duration: FOOTPRINT_FADE_DURATION,
          ease: "power2.out",
          onComplete: () => {
            setFootprints((prev) => prev.filter((f) => f.id !== footprint.id));
          },
        },
      );
    });
  }, [footprints]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {footprints.map((fp) => (
        <div
          key={fp.id}
          ref={(el) => {
            footprintElsRef.current.set(fp.id, el);
          }}
          className="pointer-events-none absolute h-6 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/70 shadow-[0_0_18px_rgba(255,255,255,0.55)]"
          style={{
            left: fp.x,
            top: fp.y,
            transform: `translate(-50%, -50%) rotate(${fp.rotation}deg)`,
          }}
        >
          {/* Placeholder footprint shape; swap to an inline SVG if desired */}
          <div className="h-full w-full rounded-full bg-gradient-to-b from-white to-white/10" />
        </div>
      ))}
    </div>
  );
};

export default FootprintTrail;

