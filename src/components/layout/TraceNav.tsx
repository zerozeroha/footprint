"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/src/lib/gsap";

// 데스크톱/모바일 네비가 공통으로 사용하는 메뉴 데이터
const navItems = [
  // 섹션 라벨과 TRACE 글자를 매핑
  { letter: "T", label: "Work", href: "#work" },
  { letter: "R", label: "about", href: "#about" },
  { letter: "A", label: "Featured", href: "#featured" },
  { letter: "C", label: "Contact", href: "#contact" },
  { letter: "E", label: "Experiments", href: "#experiments" },
];

export default function TraceNav() {
  // 데스크톱 왼쪽 네비 전체 래퍼다.
  const desktopNavRef = useRef<HTMLDivElement | null>(null);
  // 모바일 상단 네비 전체 래퍼다.
  const mobileNavRef = useRef<HTMLDivElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("work");

  useEffect(() => {
    const desktopNav = desktopNavRef.current;
    const mobileNav = mobileNavRef.current;
    if (!desktopNav || !mobileNav) return;
    const desktopBrand =
      desktopNav.querySelector<HTMLElement>("[data-trace-brand]");
    const desktopLabels = Array.from(
      desktopNav.querySelectorAll<HTMLElement>("[data-trace-nav-item]"),
    );

    // 데스크톱 네비는 히어로 동안 완전히 숨기고, 모바일은 기존처럼 유지한다.
    gsap.set(desktopNav, { opacity: 0, clearProps: "transform" });
    gsap.set(desktopBrand, { opacity: 0, y: 10 });
    gsap.set(desktopLabels, { opacity: 0, y: 12 });
    gsap.set(mobileNav, { opacity: 1, y: 0, clearProps: "transform" });

    return () => {
      gsap.killTweensOf([desktopNav, desktopBrand, mobileNav, desktopLabels]);
    };
  }, []);

  useEffect(() => {
    // 현재 화면에서 가장 잘 보이는 section을 기준으로 active 메뉴를 바꾼다.
    const sectionIds = ["work", "featured", "about", "contact", "experiments"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section != null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.id) {
          setActiveSection(visible.target.id);
        }
      },
      {
        rootMargin: "-22% 0px -52% 0px",
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* 데스크톱 세로 TRACE 네비게이션이 전체 페이지에 고정됨. */}
      <div
        ref={desktopNavRef}
        id="trace-desktop-nav"
        className="pointer-events-none fixed left-[clamp(3.5rem,5vw,4.75rem)] top-[8.4rem] z-[70] hidden w-[10rem] opacity-0 lg:block"
      >
        <div
          data-trace-brand
          className="mb-6 text-[0.76rem] font-medium tracking-[0.18em] text-zinc-100"
        >
          traces
        </div>
        <nav className="flex flex-col gap-4">
          {navItems.map((item) => (
            <a
              key={item.letter}
              data-trace-nav-item
              href={item.href}
              className="group flex items-center gap-3"
            >
              {/* 왼쪽 작은 이니셜은 TRACE 리듬을 유지하는 보조 마커다. */}
              <span
                className={`min-w-[1.1rem] text-[0.68rem] font-medium uppercase tracking-[0.32em] transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-white"
                    : "text-zinc-500 group-hover:text-zinc-200"
                }`}
              >
                {item.letter}
              </span>
              {/* 실제 메뉴 라벨이다. */}
              <span
                className={`pointer-events-none relative text-[0.68rem] uppercase tracking-[0.28em] transition-all duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-zinc-100"
                    : "text-zinc-400 group-hover:text-zinc-100"
                }`}
              >
                <span
                  className={`absolute inset-x-0 -bottom-2 h-px bg-gradient-to-r from-[#e9ff3f]/0 via-white/45 to-[#e9ff3f]/0 transition-transform duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </div>

      {/* 모바일 상단 네비게이션이 단순 메뉴로 표시됨. */}
      <div
        ref={mobileNavRef}
        className="fixed inset-x-0 top-0 z-40 border-b border-white/8 bg-[rgba(8,8,9,0.88)] backdrop-blur-xl lg:hidden"
      >
        <div className="trace-container flex h-[var(--nav-height)] items-center justify-between">
          <a
            href="#top"
            className="text-[0.72rem] font-medium uppercase tracking-[0.34em] text-zinc-200"
          >
            TRACE
          </a>
          <button
            type="button"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="trace-glass flex h-10 w-10 items-center justify-center rounded-full text-zinc-300"
            onClick={() => setMobileMenuOpen((value) => !value)}
          >
            <span className="relative block h-3.5 w-4">
              <span
                className={`absolute left-0 top-0 h-px w-4 bg-current transition-transform duration-300 ${mobileMenuOpen ? "translate-y-[6px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[6px] h-px w-4 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`}
              />
              <span
                className={`absolute left-0 top-3 h-px w-4 bg-current transition-transform duration-300 ${mobileMenuOpen ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
        <div
          className={`overflow-hidden border-t border-white/6 bg-[rgba(8,8,9,0.94)] transition-[max-height,opacity] duration-300 ${mobileMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
        >
          {/* 모바일에서는 펼침형 세로 메뉴로 단순하게 처리한다. */}
          <nav className="trace-container flex flex-col gap-5 py-5">
            {navItems.map((item) => (
              <a
                key={item.letter}
                href={item.href}
                className="text-[0.72rem] uppercase tracking-[0.26em] text-zinc-400 hover:text-zinc-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}
