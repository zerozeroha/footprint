"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import { gsap, ScrollTrigger } from "@/src/lib/gsap";

// 공용 reveal hook에서 사용하는 옵션 타입이다.
export interface ScrollRevealOptions {
  delay?: number;
  yOffset?: number;
  duration?: number;
  once?: boolean;
  start?: string;
}

// 전달받지 않은 값은 이 기본 옵션으로 채운다.
const DEFAULT_REVEAL_OPTIONS: Required<ScrollRevealOptions> = {
  delay: 0,
  yOffset: 40,
  duration: 0.9,
  once: true,
  start: "top 80%",
};

// 특정 요소가 화면에 들어오면 아래에서 위로 나타나게 만드는 hook이다.
export function useScrollReveal(
  targetRef: RefObject<HTMLElement | null>,
  options: ScrollRevealOptions = {},
): void {
  const { delay, duration, once, start, yOffset } = options;

  useEffect(() => {
    const element = targetRef.current;
    if (!element) return;

    const merged: Required<ScrollRevealOptions> = {
      delay: delay ?? DEFAULT_REVEAL_OPTIONS.delay,
      duration: duration ?? DEFAULT_REVEAL_OPTIONS.duration,
      once: once ?? DEFAULT_REVEAL_OPTIONS.once,
      start: start ?? DEFAULT_REVEAL_OPTIONS.start,
      yOffset: yOffset ?? DEFAULT_REVEAL_OPTIONS.yOffset,
    };

    // 시작 상태는 보이지 않는 상태로 맞춰 둔다.
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
        // once가 아니면 위에서 다시 들어올 때도 애니메이션을 재생한다.
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
  }, [delay, duration, once, start, targetRef, yOffset]);
}
