import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import TraceDemoStage from "@/src/components/traces/TraceDemoStage";
import { getTraceProject, traceProjects } from "@/src/content/traces";

type TracePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

// 정적 라우트 목록
export function generateStaticParams() {
  return traceProjects.map((project) => ({
    slug: project.slug,
  }));
}

// 메타 생성
export async function generateMetadata({
  params,
}: TracePageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getTraceProject(slug);

  if (!project) {
    return {
      title: "TRACE",
    };
  }

  return {
    title: `${project.title} | TRACE`,
    description: project.summary,
  };
}

// 상세 페이지
export default async function TraceDetailPage({ params }: TracePageProps) {
  const { slug } = await params;
  const project = getTraceProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#050505] text-zinc-100">
      <div className="trace-container max-w-[78rem] py-32">
        <div className="mb-12">
          <Link
            href="/#work"
            className="inline-flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.28em] text-zinc-500 transition-colors hover:text-zinc-200"
          >
            <span className="h-px w-8 bg-white/18" />
            Back to traces
          </Link>
        </div>

        <section className="grid gap-10 border-t border-white/8 pt-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-5">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-zinc-500">
              {project.category}
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-zinc-50 sm:text-5xl">
              {project.title}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-zinc-300">
              {project.summary}
            </p>
          </div>

          <div className="trace-panel-card rounded-[1.5rem] p-[1px]">
            <div className="trace-panel-edge rounded-[1.5rem]" />
            <div className="relative rounded-[calc(1.5rem-1px)] px-6 py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
                Year
              </p>
              <p className="mt-3 text-2xl font-medium text-zinc-100">
                {project.year}
              </p>
              <p className="mt-6 text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
                Focus
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <span
                    key={skill}
                    className="trace-panel-pill rounded-full px-3 py-1 text-xs text-zinc-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16 space-y-6">
          <div className="space-y-3">
            <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
              Demo Stage
            </p>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              {project.demoTitle}
            </h2>
            <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
              {project.demoSummary}
            </p>
          </div>

          <TraceDemoStage preview={project.preview} />
        </section>

        <section className="mt-16 grid gap-6 lg:grid-cols-2">
          <div className="trace-panel-card rounded-[1.5rem] p-[1px]">
            <div className="trace-panel-edge rounded-[1.5rem]" />
            <div className="relative rounded-[calc(1.5rem-1px)] px-6 py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
                Concept
              </p>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                {project.concept}
              </p>
            </div>
          </div>

          <div className="trace-panel-card rounded-[1.5rem] p-[1px]">
            <div className="trace-panel-edge rounded-[1.5rem]" />
            <div className="relative rounded-[calc(1.5rem-1px)] px-6 py-7">
              <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
                Build Notes
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300 sm:text-base">
                {project.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
