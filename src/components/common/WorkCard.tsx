import Link from "next/link";
import TraceCardPreview from "@/src/components/common/TraceCardPreview";
import type { TraceAccent, TracePreviewKind } from "@/src/content/traces";

// 카드 props
type WorkCardProps = {
  slug: string;
  title: string;
  category: string;
  year: string;
  accent?: TraceAccent;
  preview: TracePreviewKind;
};

// 카드 컴포넌트
export default function WorkCard({
  slug,
  title,
  category,
  year,
  accent = "silver",
  preview,
}: WorkCardProps) {
  return (
    <article className="work-card group relative min-w-[18.5rem] snap-start overflow-visible sm:min-w-[22rem] lg:min-w-[24rem]">
      {/* 하단 그림자 */}
      <div className="pointer-events-none absolute inset-x-8 bottom-2 h-16 rounded-full bg-black/72 blur-2xl transition-all duration-500 group-hover:bottom-1 group-hover:h-20 group-hover:bg-[rgba(14,18,24,0.92)] group-hover:shadow-[0_0_52px_rgba(89,180,255,0.22)]" />
      <div className="pointer-events-none absolute inset-x-4 inset-y-3 rounded-[2rem] bg-[radial-gradient(circle,rgba(89,180,255,0.08),transparent_68%)] opacity-60 blur-3xl transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.03]" />

      <Link
        href={`/traces/${slug}`}
        className="block overflow-visible rounded-[1.6rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
      >
        {/* 카드 프레임 */}
        <div className="trace-panel-card relative rounded-[1.45rem] p-[0.9rem] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_72px_rgba(0,0,0,0.52),0_0_34px_rgba(89,180,255,0.16),0_0_82px_rgba(89,180,255,0.18),inset_0_1px_0_rgba(255,255,255,0.24)]">
          <div className="pointer-events-none absolute inset-[2px] rounded-[calc(1.45rem-2px)] bg-[radial-gradient(circle_at_50%_-10%,rgba(168,219,255,0.14),transparent_30%),radial-gradient(circle_at_50%_120%,rgba(89,180,255,0.08),transparent_34%)] opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
          {/* 외곽 라인 */}
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-20 h-full w-full"
            preserveAspectRatio="none"
          >
            <rect
              x="1.2"
              y="1.2"
              width="97.6"
              height="97.6"
              rx="9"
              ry="9"
              fill="none"
              pathLength="100"
              className="work-card-signal-glow"
            />
            <rect
              x="1.2"
              y="1.2"
              width="97.6"
              height="97.6"
              rx="9"
              ry="9"
              fill="none"
              pathLength="100"
              className="work-card-signal-core"
            />
          </svg>

          {/* 카드 미리보기 내용 영역 */}
          <TraceCardPreview accent={accent} preview={preview} />
          {/* 카드 텍스트 영역 */}
          <div className="px-4 pb-4 pt-5 sm:px-5">
            <div className="trace-panel-pill inline-flex rounded-full px-3 py-1 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-zinc-300 transition-colors duration-300 group-hover:text-zinc-100">
              {year}
            </div>
            <h3 className="mt-4 text-lg font-semibold tracking-[0.01em] text-zinc-100 transition-colors duration-300 group-hover:text-white">
              {title}
            </h3>
            <p className="mt-2 text-sm text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
              {category}
            </p>
            <p className="mt-5 text-[0.68rem] uppercase tracking-[0.22em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-300">
              View trace
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
