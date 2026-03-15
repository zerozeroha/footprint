"use client";

import type { ReactNode } from "react";
import React, { useRef } from "react";
import { useScrollReveal, type ScrollRevealOptions } from "@/src/hooks/useScrollReveal";

// Reveal이 렌더링할 수 있는 태그만 제한해 둔다.
type RevealTag = "div" | "section" | "article" | "p" | "span" | "h1" | "h2" | "h3" | "ul" | "li";

// useScrollReveal 옵션에 렌더링용 props를 더한 타입이다.
export interface RevealProps extends ScrollRevealOptions {
  children: ReactNode;
  className?: string;
  as?: RevealTag;
}

// 반복되는 scroll reveal 패턴을 감싸는 작은 래퍼 컴포넌트다.
const Reveal: React.FC<RevealProps> = ({
  children,
  className,
  as: Tag = "div",
  delay,
  duration,
  once,
  start,
  yOffset,
}) => {
  // 실제 등장 애니메이션이 걸릴 바깥쪽 래퍼 ref다.
  const ref = useRef<HTMLDivElement | null>(null);

  useScrollReveal(ref, { delay, duration, once, start, yOffset });

  return (
    // 애니메이션은 바깥 래퍼에 걸고, 실제 태그는 안쪽에서 자유롭게 렌더링한다.
    <div ref={ref}>
      <Tag className={className}>
        {children}
      </Tag>
    </div>
  );
};

export default Reveal;
