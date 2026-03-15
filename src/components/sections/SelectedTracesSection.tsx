import Reveal from "@/src/components/common/Reveal";
import WorkCard from "@/src/components/common/WorkCard";

// 카드 리스트에 쓰는 샘플 프로젝트 데이터다.
const projects = [
  {
    title: "AI Real Estate Platform",
    category: "Frontend / Interaction",
    year: "2025",
    accent: "silver" as const,
  },
  {
    title: "TRACE Motion Study",
    category: "Interface Experiment",
    year: "2026",
    accent: "yellow" as const,
  },
  {
    title: "Interface Signal System",
    category: "Design System / Motion",
    year: "2025",
    accent: "silver" as const,
  },
  {
    title: "Premium Product Showcase",
    category: "Launch Experience",
    year: "2024",
    accent: "silver" as const,
  },
  {
    title: "Search Experience Redesign",
    category: "Product UX / Frontend",
    year: "2025",
    accent: "yellow" as const,
  },
  {
    title: "Interaction Prototype Lab",
    category: "Concept / Prototype",
    year: "2026",
    accent: "silver" as const,
  },
];

// 작업 목록을 가로 스크롤 카드로 보여주는 섹션이다.
export default function SelectedTracesSection() {
  return (
    <section id="work" className="trace-section border-t border-zinc-900 bg-[#050505] text-zinc-100">
      <div className="trace-container max-w-[90rem]">
        {/* 섹션 제목과 짧은 설명 영역이다. */}
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <Reveal
              as="p"
              className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500"
            >
              Portfolio
            </Reveal>

            <Reveal
              as="h2"
              delay={0.06}
              className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl"
            >
              Selected Traces
            </Reveal>

            <Reveal
              as="p"
              delay={0.12}
              className="max-w-xl text-sm text-zinc-400 md:text-base"
            >
              A curated selection of interface systems, motion studies, and product experiences.
            </Reveal>
          </div>

          <Reveal
            as="p"
            delay={0.18}
            className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-600"
          >
            Scroll to browse
          </Reveal>
        </div>

        <Reveal
          delay={0.2}
          yOffset={28}
          className="mt-14 overflow-hidden"
        >
          <div className="relative">
            {/* 좌우 그라디언트는 카드가 옆으로 더 이어진다는 느낌을 준다. */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-[#050505] to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-[#050505] to-transparent" />

            <div className="overflow-x-auto pb-6 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {/* 카드 자체는 가로 스크롤 + snap으로 정돈된 흐름을 만든다. */}
              <div className="flex snap-x snap-mandatory gap-5 pr-6 sm:gap-6 md:pr-10">
                {projects.map((project) => (
                  <WorkCard
                    key={project.title}
                    title={project.title}
                    category={project.category}
                    year={project.year}
                    accent={project.accent}
                  />
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
