import Reveal from "@/src/components/common/Reveal";

// 기술 묶음을 UI/모션/워크플로우 관점으로 정리한 데이터다.
const skillGroups = [
  {
    heading: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Responsive UI"],
  },
  {
    heading: "Interaction",
    items: ["GSAP", "Lenis", "Micro-interactions", "Scroll-driven stories"],
  },
  {
    heading: "Visual",
    items: ["Design systems", "Layout rhythm", "Motion detail"],
  },
  {
    heading: "Workflow",
    items: ["Performance thinking", "Design collaboration", "Prototype-first"],
  },
];

// 사용 기술과 작업 성향을 카드형으로 보여주는 섹션이다.
const Skills = () => {
  return (
    <section id="experiments" className="trace-section border-t border-zinc-800 bg-black text-zinc-100">
      <div className="trace-container trace-section-box max-w-5xl rounded-[calc(var(--radius-frame)-0.1rem)] px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col gap-10">
          {/* 섹션 소개 영역이다. */}
          <div className="space-y-3">
            <Reveal
              as="p"
              className="text-xs font-medium tracking-[0.25em] text-zinc-500"
            >
              SKILLS
            </Reveal>

            <Reveal
              as="h2"
              delay={0.06}
              className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl"
            >
              A toolbox for expressive, reliable interfaces.
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="max-w-2xl text-sm text-zinc-400 md:text-base"
            >
              From production-ready frontend foundations to motion systems and scroll-driven
              narratives, these are the tools I lean on to shape how interfaces feel and respond.
            </Reveal>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal
                key={group.heading}
                delay={0.1 + index * 0.06}
                yOffset={32}
                className="trace-panel-card group relative h-full rounded-[1.5rem] px-5 py-5 transition-all duration-300 sm:px-6 sm:py-6"
              >
                {/* 카드 내부 glow와 heading + 태그 리스트 조합이다. */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-zinc-50/6 to-transparent" />
                <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.07),transparent_60%)] opacity-70" />

                <div className="relative flex h-full flex-col justify-between gap-6">
                  <h3 className="text-sm font-medium tracking-[0.16em] text-zinc-400">
                    {group.heading.toUpperCase()}
                  </h3>

                  <ul className="flex flex-wrap gap-2 text-xs text-zinc-200 sm:text-sm">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="trace-panel-pill rounded-full px-3 py-1 text-zinc-200 transition-all duration-300 group-hover:border-white/16 hover:border-white/18 hover:text-white"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
