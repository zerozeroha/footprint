"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/src/lib/gsap";

export interface ScrollRevealOptions {
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
  start?: string;
}

const DEFAULT_REVEAL_OPTIONS: Required<ScrollRevealOptions> = {
  delay: 0,
  yOffset: 40,
  duration: 0.9,
  once: true,
  start: "top 80%",
};

export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
): void {
  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const merged: Required<ScrollRevealOptions> = {
      ...DEFAULT_REVEAL_OPTIONS,
      ...options,
    };

    // Ensure initial hidden state
    gsap.set(element, { opacity: 0, y: merged.yOffset });

    const ctx = gsap.context(() => {
      const tween = gsap.to(element, {
        opacity: 1,
        y: 0,
        duration: merged.duration,
        delay: merged.delay,
        ease: "power3.out",
        paused: true,
      });

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: merged.start,
        once: merged.once,
        onEnter: () => {
          tween.play();
        },
        // If not once, play again when re-entering from above
        onEnterBack: () => {
          if (!merged.once) {
            tween.play();
          }
        },
      });

      return () => {
        trigger.kill();
        tween.kill();
      };
    }, targetRef);

    return () => {
      ctx.revert();
    };
  }, [targetRef, options.delay, options.duration, options.once, options.start, options.yOffset]);
}

