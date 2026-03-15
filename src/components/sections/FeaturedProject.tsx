import Image from "next/image";
import Reveal from "@/src/components/common/Reveal";

// 메인 작업 하나를 크게 강조해 보여주는 섹션이다.
export default function FeaturedProject() {
  return (
    <section
      id="featured"
      className="relative overflow-hidden border-t border-zinc-900 text-zinc-100"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "linear-gradient(180deg, rgba(3,3,3,0.64) 0%, rgba(5,5,5,0.54) 100%), url('/images/featured-project-bg.svg')",
        }}
      />
      {/* 기본 배경 위에 아주 약한 빛을 더해 평면적이지 않게 만든다. */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_26%),radial-gradient(circle_at_14%_18%,rgba(233,255,63,0.06),transparent_18%)]" />

      <div className="trace-section relative">
        <div className="trace-container max-w-[82rem]">
          <Reveal
            delay={0.08}
            yOffset={36}
            className="trace-frame trace-sheen p-3 sm:p-5 lg:p-6"
          >
            {/* 텍스트 설명과 대표 이미지를 2열로 배치한다. */}
            <div className="grid gap-8 rounded-[calc(var(--radius-frame)-0.45rem)] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04)_0%,rgba(255,255,255,0.01)_100%)] p-5 sm:p-7 md:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-14 lg:p-12 xl:p-14">
              <div className="space-y-5 md:space-y-6">
                <p className="text-[0.68rem] uppercase tracking-[0.32em] text-zinc-500">
                  Featured Trace
                </p>
                <h2 className="text-balance max-w-md text-3xl font-semibold tracking-tight text-zinc-50 sm:text-[2.15rem] lg:text-[2.7rem]">
                  Premium Product Showcase
                </h2>
                <div className="space-y-2 text-sm text-zinc-400 sm:text-base">
                  <p>Launch Experience / Frontend / Motion Direction</p>
                  <p className="text-zinc-500">2026</p>
                </div>
                <p className="max-w-lg text-sm leading-7 text-zinc-300/90 sm:text-base sm:leading-8">
                  A cinematic commerce presentation built around material detail, measured motion,
                  and a luxury-grade browsing rhythm for a flagship product launch.
                </p>
                <a
                  href="#work"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/14 bg-white/[0.03] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.26em] text-zinc-200 hover:border-[#e9ff3f]/30 hover:bg-white/[0.05] hover:text-white"
                >
                  View project
                  <span className="h-px w-5 bg-[#e9ff3f]/55" />
                </a>
              </div>

              <div className="relative lg:pl-4">
                <div className="pointer-events-none absolute inset-x-8 bottom-0 h-16 rounded-full bg-black/75 blur-2xl sm:inset-x-10 sm:h-20" />
                <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/12 bg-black/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <Image
                    src="/images/featured-project-preview.svg"
                    alt="Premium product showcase preview"
                    width={900}
                    height={700}
                    className="h-full w-full object-cover"
                  />
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
