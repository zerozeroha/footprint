"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/src/lib/gsap";

// 화면에 남는 footprint 한 개의 데이터다.
type Footprint = {
  id: number;
  x: number;
  y: number;
  rotation: number;
};

// 발자국 효과 전체 동작을 조절하는 상수들이다.
const MAX_FOOTPRINTS = 40;
const MIN_DISTANCE = 24;
const FOOTPRINT_FADE_DURATION = 0.8;

let globalId = 0;

// 마우스 이동을 따라 짧게 사라지는 발자국 흔적을 만든다.
const FootprintTrail = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);
  const lastAngleRef = useRef<number>(0);
  const [footprints, setFootprints] = useState<Footprint[]>([]);
  const rafRef = useRef<number | null>(null);
  const pendingPosRef = useRef<{ x: number; y: number } | null>(null);

  // 각 footprint DOM에 접근해 GSAP fade-out을 걸기 위한 ref map이다.
  const footprintElsRef = useRef<Map<number, HTMLDivElement | null>>(new Map());

  // 마우스 좌표를 받아 일정 거리 이상 움직였을 때만 footprint를 추가한다.
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

        // 너무 촘촘하게 찍히지 않도록 최소 이동 거리를 둔다.
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

    // mousemove마다 바로 setState하지 않고 rAF로 묶어 부하를 줄인다.
    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  // 새 footprint가 생기면 바로 서서히 사라지는 애니메이션을 건다.
  useEffect(() => {
    footprints.forEach((footprint) => {
      const el = footprintElsRef.current.get(footprint.id);
      if (!el) return;

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
          {/* 필요하면 나중에 SVG 발자국으로 교체할 수 있는 단순 placeholder다. */}
          <div className="h-full w-full rounded-full bg-gradient-to-b from-white to-white/10" />
        </div>
      ))}
    </div>
  );
};

export default FootprintTrail;
