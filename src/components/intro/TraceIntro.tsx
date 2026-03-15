"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/src/lib/gsap";

// SVG 선 한 개를 표현하는 좌표 타입이다.
// 각 선은 시작점(x1, y1)과 끝점(x2, y2)로 구성된다.
type TraceSegment = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

// 인트로가 시작될 때 모든 선이 납작하게 겹쳐져 있는 기본 라인 세트다.
// TRACE가 나타나기 전, 바닥 위 신호선 같은 느낌을 만드는 출발 좌표다.
const flatLines = [
  { x1: 132, x2: 688, y: 74 },
  { x1: 154, x2: 666, y: 94 },
  { x1: 118, x2: 702, y: 114 },
  { x1: 160, x2: 660, y: 134 },
  { x1: 134, x2: 686, y: 154 },
  { x1: 176, x2: 644, y: 174 },
];

// 납작한 선들이 차례대로 변형되어 TRACE 글자를 만드는 최종 좌표다.
// 배열 순서는 실제 <line> 엘리먼트 순서와 1:1로 연결된다.
const traceSegments: TraceSegment[] = [
  // T
  { x1: 32, y1: 34, x2: 128, y2: 34 },
  { x1: 80, y1: 34, x2: 80, y2: 164 },
  // R
  { x1: 190, y1: 34, x2: 190, y2: 164 },
  { x1: 190, y1: 34, x2: 286, y2: 34 },
  { x1: 286, y1: 34, x2: 286, y2: 98 },
  { x1: 190, y1: 98, x2: 282, y2: 98 },
  { x1: 248, y1: 98, x2: 292, y2: 164 },
  // A
  { x1: 352, y1: 164, x2: 352, y2: 34 },
  { x1: 444, y1: 164, x2: 444, y2: 34 },
  { x1: 352, y1: 34, x2: 444, y2: 34 },
  { x1: 352, y1: 98, x2: 444, y2: 98 },
  // C
  { x1: 522, y1: 34, x2: 614, y2: 34 },
  { x1: 522, y1: 34, x2: 522, y2: 164 },
  { x1: 522, y1: 164, x2: 614, y2: 164 },
  // E
  { x1: 692, y1: 34, x2: 692, y2: 164 },
  { x1: 692, y1: 34, x2: 786, y2: 34 },
  { x1: 692, y1: 98, x2: 774, y2: 98 },
  { x1: 692, y1: 164, x2: 786, y2: 164 },
];

// 같은 선들을 다시 재배열해서 와이어프레임 큐브를 만들 때 쓰는 좌표다.
// 앞면, 뒷면, 연결선, 내부 보조선을 포함해 홀로그램 큐브처럼 보이게 만든다.
const cubeSegments: TraceSegment[] = [
  // 앞면
  { x1: 356, y1: 56, x2: 468, y2: 56 },
  { x1: 468, y1: 56, x2: 468, y2: 168 },
  { x1: 468, y1: 168, x2: 356, y2: 168 },
  { x1: 356, y1: 168, x2: 356, y2: 56 },
  // 뒷면
  { x1: 396, y1: 28, x2: 508, y2: 28 },
  { x1: 508, y1: 28, x2: 508, y2: 140 },
  { x1: 508, y1: 140, x2: 396, y2: 140 },
  { x1: 396, y1: 140, x2: 396, y2: 28 },
  // 앞뒤를 연결하는 모서리
  { x1: 356, y1: 56, x2: 396, y2: 28 },
  { x1: 468, y1: 56, x2: 508, y2: 28 },
  { x1: 468, y1: 168, x2: 508, y2: 140 },
  { x1: 356, y1: 168, x2: 396, y2: 140 },
  // 내부 보조선
  { x1: 412, y1: 56, x2: 412, y2: 168 },
  { x1: 452, y1: 28, x2: 452, y2: 140 },
  { x1: 356, y1: 112, x2: 468, y2: 112 },
  { x1: 396, y1: 84, x2: 508, y2: 84 },
  { x1: 412, y1: 56, x2: 452, y2: 28 },
  { x1: 412, y1: 168, x2: 452, y2: 140 },
];

export default function TraceIntro() {
  // 이 섹션 안에서만 GSAP selector/context가 동작하도록 잡는 루트다.
  const rootRef = useRef<HTMLElement | null>(null);
  // TRACE와 큐브 전체를 하나의 3D 오브젝트처럼 회전시키는 스테이지다.
  const stageRef = useRef<HTMLDivElement | null>(null);
  // 모든 SVG 선 노드를 순서대로 보관해 모핑 애니메이션에 사용한다.
  const lineRefs = useRef<Array<SVGLineElement | null>>([]);
  // TRACE 아래 문장 전체를 감싸는 래퍼다.
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  // "Interfaces leave" 앞부분만 따로 제어한다.
  const subtitleLeadRef = useRef<HTMLSpanElement | null>(null);
  // "traces" 단어만 분리 이동시키기 위한 ref다.
  const subtitleTracesRef = useRef<HTMLSpanElement | null>(null);
  // "traces"가 떠난 자리를 이어받는 replacement 텍스트다.
  const subtitleFootprintRef = useRef<HTMLSpanElement | null>(null);
  // 원래 문장 밖으로 분리되어 이동하는 floating traces 텍스트다.
  const floatingTracesRef = useRef<HTMLSpanElement | null>(null);
  // 왼쪽에서 오른쪽으로 흐르는 광원 레이어다.
  const sweepRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // 히어로 재진입 시 이전 스크롤 위치를 복원하지 않도록 막는다.
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }

    // 루트가 없으면 이펙트를 안전하게 종료한다.
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      // 인트로 이후 실제 포트폴리오 카드들이 있는 콘텐츠 영역이다.
      const content = document.getElementById("portfolio-content");
      // 3D 회전 기준이 되는 DOM 노드다.
      const stage = stageRef.current;
      // 데스크톱 왼쪽 네비와 내부 요소다.
      const desktopNav = document.getElementById("trace-desktop-nav");
      const navBrand = desktopNav?.querySelector<HTMLElement>("[data-trace-brand]") ?? null;
      const navItems = desktopNav
        ? Array.from(desktopNav.querySelectorAll<HTMLElement>("[data-trace-nav-item]"))
        : [];
      // 서브카피의 앞부분과 "traces" 단어다.
      const subtitleLead = subtitleLeadRef.current;
      const subtitleTraces = subtitleTracesRef.current;
      const subtitleFootprint = subtitleFootprintRef.current;
      const floatingTraces = floatingTracesRef.current;
      // null이 아닌 실제 SVG 선만 추려서 애니메이션 대상으로 만든다.
      const lines = lineRefs.current.filter(
        (line): line is SVGLineElement => line != null,
      );

      if (
        !lines.length ||
        !stage ||
        !subtitleLead ||
        !subtitleTraces ||
        !subtitleFootprint ||
        !floatingTraces
      ) return;

      // 큐브가 완성된 뒤에는 오브젝트 자체 대신 빛만 아주 은은하게 움직인다.
      const cubeLightTl = gsap.timeline({
        paused: true,
        repeat: -1,
        yoyo: true,
      });

      cubeLightTl.to(sweepRef.current, {
        xPercent: 228,
        opacity: 0.2,
        scaleX: 1.02,
        duration: 2.6,
        ease: "sine.inOut",
      });

      cubeLightTl.to(
        stage,
        {
          scale: 1.008,
          duration: 2.6,
          ease: "sine.inOut",
        },
        0,
      );

      cubeLightTl.to(
        lines,
        {
          filter: "drop-shadow(0 0 14px rgba(89,180,255,0.42))",
          duration: 2.6,
          ease: "sine.inOut",
        },
        0,
      );

      // 각 선을 납작하고 흐린 시작 상태로 만든다.
      // 여기서 TRACE와 큐브가 모두 태어난다.
      lines.forEach((line, index) => {
        const flat = flatLines[index % flatLines.length];

        gsap.set(line, {
          attr: {
            x1: flat.x1,
            x2: flat.x2,
            y1: flat.y,
            y2: flat.y,
          },
          opacity: 0.22,
          scaleY: 0.22,
          rotateX: 84,
          transformOrigin: "center center",
          transformPerspective: 1200,
          filter: "blur(6px)",
        });
      });

      // 보조 카피는 약간 아래에서 흐리게 대기시킨다.
      gsap.set(subtitleRef.current, { opacity: 0, y: 18, filter: "blur(10px)" });
      gsap.set(subtitleLead, { opacity: 1 });
      gsap.set(subtitleTraces, {
        opacity: 0.9,
        color: "rgba(244,246,248,0.96)",
        display: "inline-block",
        textShadow: "0 0 0 rgba(255,255,255,0)",
      });
      gsap.set(subtitleFootprint, {
        opacity: 0,
        filter: "blur(8px)",
        y: 4,
      });
      gsap.set(floatingTraces, {
        opacity: 0,
        x: 0,
        y: 0,
        scale: 1,
        textShadow: "0 0 0 rgba(255,255,255,0)",
      });
      // sweep 광원은 화면 왼쪽 바깥에서 시작하게 둔다.
      gsap.set(sweepRef.current, { opacity: 0, xPercent: -220, scaleX: 0.92 });
      // stage는 정면 상태와 3D 변환 기준점을 미리 세팅해 둔다.
      gsap.set(stage, {
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        transformPerspective: 1600,
        transformOrigin: "50% 50%",
        transformStyle: "preserve-3d",
      });

      // 실제 콘텐츠는 인트로가 끝난 후 등장시키기 위해 숨겨둔다.
      if (content) {
        gsap.set(content, { opacity: 0, y: 56, filter: "blur(12px)" });
      }

      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      const tracesRect = subtitleTraces.getBoundingClientRect();
      const brandRect = navBrand?.getBoundingClientRect();
      const navDeltaX = brandRect ? brandRect.left - tracesRect.left : 0;
      const navDeltaY = brandRect ? brandRect.top - tracesRect.top : 0;

      // TRACE 생성 -> sweep -> 큐브 모핑 -> 회전까지 이어지는 메인 타임라인이다.
      const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 납작한 선들이 순차적으로 일어나며 TRACE 글자를 만든다.
      lines.forEach((line, index) => {
        introTl.to(
          line,
          {
            attr: traceSegments[index],
            scaleY: 1,
            rotateX: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.55,
            ease: "expo.inOut",
          },
          0.16 + index * 0.038,
        );
      });

      // TRACE가 형성된 뒤 광원이 끝까지 지나가고 중앙으로 다시 돌아온다.
      introTl
        .to(
          sweepRef.current,
          {
            opacity: 0.58,
            scaleX: 1.08,
            xPercent: 520,
            duration: 1.35,
            ease: "power2.inOut",
          },
          1.08,
        )
        .to(
          sweepRef.current,
          {
            xPercent: 178,
            opacity: 0.28,
            scaleX: 0.98,
            duration: 0.9,
            ease: "expo.out",
          },
          2.18,
        )
        .to(
          sweepRef.current,
          {
            opacity: 0.18,
            duration: 0.45,
            ease: "sine.out",
          },
          2.48,
        )
        .to(
          subtitleRef.current,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "expo.out",
          },
          1.76,
        );

      if (desktopNav && navBrand && navItems.length && isDesktop) {
        introTl
          .call(() => {
            // 이동용 traces를 원래 단어 위치에 고정 배치해 자동 전환을 준비한다.
            gsap.set(floatingTraces, {
              left: tracesRect.left,
              top: tracesRect.top,
              width: tracesRect.width,
              height: tracesRect.height,
              opacity: 1,
              x: 0,
              y: 0,
            });
          }, undefined, 5.32)
          .to(
            subtitleTraces,
            {
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.22,
              ease: "power2.out",
            },
            5.34,
          )
          .to(
            subtitleFootprint,
            {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            5.44,
          )
          .to(
            floatingTraces,
            {
              x: navDeltaX,
              y: navDeltaY - 6,
              scale: 0.96,
              color: "rgba(248,249,250,1)",
              textShadow: "0 0 18px rgba(232,236,241,0.22)",
              duration: 0.95,
              ease: "power2.inOut",
            },
            5.34,
          )
          .to(
            desktopNav,
            {
              opacity: 1,
              duration: 0.2,
              ease: "power1.out",
              onStart: () => {
                desktopNav.style.pointerEvents = "auto";
              },
            },
            6.08,
          )
          .to(
            navBrand,
            {
              opacity: 1,
              y: 0,
              duration: 0.26,
              ease: "power2.out",
            },
            6.1,
          )
          .to(
            navItems,
            {
              opacity: 1,
              y: 0,
              duration: 0.22,
              stagger: 0.04,
              ease: "power2.out",
            },
            6.16,
          )
          .to(
            floatingTraces,
            {
              opacity: 0,
              duration: 0.1,
              ease: "power1.out",
            },
            6.18,
          );
      } else {
        introTl
          .to(
            subtitleTraces,
            {
              opacity: 0,
              filter: "blur(6px)",
              duration: 0.22,
              ease: "power2.out",
            },
            5.34,
          )
          .to(
            subtitleFootprint,
            {
              opacity: 1,
              filter: "blur(0px)",
              y: 0,
              duration: 0.42,
              ease: "power2.out",
            },
            5.44,
          );
      }

      // TRACE를 이루던 같은 선들이 다시 재배열되며 와이어프레임 큐브가 된다.
      lines.forEach((line, index) => {
        introTl.to(
          line,
          {
            attr: cubeSegments[index],
            stroke: "rgba(118,197,255,0.95)",
            filter: "drop-shadow(0 0 10px rgba(89,180,255,0.55))",
            duration: 1.3,
            ease: "expo.inOut",
          },
          2.18 + index * 0.018,
        );
      });

      // 큐브가 형성된 뒤 살짝 기울어진 정면 자세로 안정적으로 안착시킨다.
      introTl
        .to(
          stage,
          {
            rotateX: -8,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.985,
            duration: 1.85,
            ease: "power2.inOut",
          },
          2.5,
        )
        .to(
          stage,
          {
            scale: 1,
            duration: 0.75,
            ease: "sine.out",
          },
          4.95,
        )
        .call(() => {
          // 큐브가 멈춘 뒤에는 빛과 반사만 천천히 살아 있도록 만든다.
          cubeLightTl.play(0);
        });

      // 포트폴리오 본문은 인트로가 거의 마무리된 뒤 등장한다.
      if (content) {
        introTl.to(
          content,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1.1,
            ease: "expo.out",
          },
          4.4,
        );
      }

      // 사용자가 아래로 스크롤하면 큐브/TRACE를 다시 납작한 라인으로 접는다.
      // scrub을 써서 스크롤 진행도와 애니메이션 진행도가 직접 연결되게 한다.
      const collapseTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#top",
          start: "top+=220 top",
          end: "+=340",
          scrub: 1,
        },
      });

      // 각 선을 다시 flat line 상태로 되돌린다.
      lines.forEach((line, index) => {
        const flat = flatLines[index % flatLines.length];

        collapseTl.to(
          line,
          {
            attr: {
              x1: flat.x1,
              x2: flat.x2,
              y1: flat.y,
              y2: flat.y,
            },
            scaleY: 0.2,
            rotateX: 84,
            opacity: 0.22,
            filter: "blur(6px)",
            stroke: "rgba(236,240,244,0.95)",
            duration: 1,
            ease: "none",
          },
          0,
        );
      });

      collapseTl
        .call(() => {
          // 스크롤 접힘이 시작되면 빛 호흡도 멈춰 조용한 상태로 접는다.
          cubeLightTl.pause(0);
        })
        .to(
          subtitleRef.current,
          {
            opacity: 0,
            y: -14,
            filter: "blur(10px)",
            duration: 0.55,
            ease: "none",
          },
          0.06,
        )
        .to(
          sweepRef.current,
          {
            opacity: 0,
            xPercent: 178,
            scaleX: 0.98,
            duration: 0.2,
            ease: "none",
          },
          0,
        )
        .to(
          stage,
          {
            // 다음 진입에서도 깨끗한 시작 자세를 유지하도록 stage를 정면으로 되돌린다.
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 1,
            duration: 1,
            ease: "none",
          },
          0,
        )
        .set(
          floatingTraces,
          {
            opacity: 0,
          },
          1,
        );

      return () => {
        // 수동으로 생성한 타임라인과 빛 타임라인을 모두 정리한다.
        introTl.kill();
        collapseTl.kill();
        cubeLightTl.kill();
      };
    }, rootRef);

    return () => {
      // context 내부에서 잡은 GSAP 인스턴스를 정리하고 레이아웃을 다시 계산한다.
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, []);

  return (
    <>
      <section
        id="top"
        ref={rootRef}
        className="relative isolate min-h-screen overflow-hidden bg-[#050505] text-stone-100"
      >
        {/* 무대 전체의 가장 어두운 바탕을 만드는 메인 배경이다. */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#030303_0%,#050505_52%,#070707_100%)]" />
        {/* 중앙 광량을 아주 약하게 깔아 TRACE와 큐브가 뜨는 느낌을 만든다. */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_44%,rgba(235,239,244,0.09),transparent_18%),radial-gradient(circle_at_50%_58%,rgba(255,255,255,0.04),transparent_30%)]" />
        {/* 아래쪽이 검게 잠기도록 바닥 그라디언트를 한 번 더 얹는다. */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#050505]" />

        {/* 인트로 콘텐츠 전체를 화면 중앙에 배치하는 컨테이너다. */}
        <div className="trace-container relative flex min-h-screen flex-col items-center justify-center gap-8 py-24 text-center">
          {/* TRACE 텍스트와 큐브 모핑이 실제로 보이는 중앙 그룹이다. */}
          <div className="relative flex w-full max-w-5xl flex-col items-center gap-6">
            {/* 뒤에서 번지는 아주 약한 glow다. */}
            <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_48%,rgba(232,236,241,0.08),transparent_36%)] blur-3xl" />

            <div
              ref={stageRef}
              className="relative aspect-[820/220] w-[min(92vw,52rem)] [perspective:1600px]"
            >
              {/* 글자와 큐브 위를 스쳐 지나가는 광원 레이어다. */}
              <div
                ref={sweepRef}
                className="pointer-events-none absolute inset-y-[10%] left-[18%] z-20 w-[14%] bg-[linear-gradient(110deg,transparent_0%,rgba(255,255,255,0.16)_12%,rgba(255,255,255,0.48)_50%,rgba(255,255,255,0.14)_88%,transparent_100%)] blur-lg"
              />

              <svg
                viewBox="0 0 820 220"
                className="h-full w-full overflow-visible drop-shadow-[0_0_24px_rgba(226,231,236,0.12)]"
                aria-hidden="true"
              >
                {/* 같은 line DOM들이 flat -> TRACE -> cube로 계속 변형된다. */}
                {traceSegments.map((_, index) => (
                  <line
                    key={index}
                    ref={(node) => {
                      // 각 line을 나중에 GSAP에서 개별 제어할 수 있게 저장한다.
                      lineRefs.current[index] = node;
                    }}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="0"
                    stroke="rgba(236,240,244,0.95)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={{
                      // SVG 선 변환 기준을 선 자체 경계 상자로 맞춘다.
                      transformBox: "fill-box",
                    }}
                  />
                ))}
              </svg>
            </div>

            {/* TRACE 아래 문장에서 traces는 떠나고, 그 자리에 footprint가 남는다. */}
            <p
              ref={subtitleRef}
              className="max-w-md text-[0.72rem] uppercase tracking-[0.34em] text-zinc-400"
            >
              <span ref={subtitleLeadRef}>Interfaces leave </span>
              <span className="relative inline-grid min-w-[11ch] text-left align-baseline">
                <span ref={subtitleTracesRef} className="[grid-area:1/1] text-zinc-100">
                  traces.
                </span>
                <span ref={subtitleFootprintRef} className="[grid-area:1/1] text-zinc-100">
                  footprint.
                </span>
              </span>
            </p>
          </div>
        </div>
        <span
          ref={floatingTracesRef}
          className="pointer-events-none fixed left-0 top-0 z-[85] text-[0.72rem] uppercase tracking-[0.34em] text-zinc-100"
        >
          traces
        </span>
      </section>
    </>
  );
}
