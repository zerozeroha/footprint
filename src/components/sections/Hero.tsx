\"use client\";

import { useEffect, useRef } from "react";
import { gsap } from "../../lib/gsap";
import FootprintTrail from "../footprint/FootprintTrail";

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
          },
        );
      }

      if (subtitleRef.current) {
        gsap.fromTo(
          subtitleRef.current,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: 0.4,
            ease: "power2.out",
          },
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-black px-6 text-zinc-100"
    >
      <FootprintTrail />

      <main className="relative z-10 flex max-w-4xl flex-col items-center gap-4 text-center">
        <h1
          ref={titleRef}
          className="text-5xl font-semibold tracking-[0.35em] text-zinc-50 sm:text-6xl md:text-7xl"
        >
          FOOTPRINT
        </h1>
        <p
          ref={subtitleRef}
          className="text-sm font-medium uppercase tracking-[0.3em] text-zinc-400 sm:text-base"
        >
          Interfaces leave traces.
        </p>
      </main>
    </section>
  );
}

export default Hero;

