import clsx from "clsx";

// 카드에 필요한 최소 정보만 props로 받는다.
type WorkCardProps = {
  title: string;
  category: string;
  year: string;
  accent?: "silver" | "yellow";
};

// 작업 썸네일 느낌의 공용 카드다.
export default function WorkCard({
  title,
  category,
  year,
  accent = "silver",
}: WorkCardProps) {
  // 상단 라인 하이라이트 색만 accent에 따라 바뀐다.
  const accentClass =
    accent === "yellow"
      ? "from-[#e9ff3f]/18 via-[#f4f7d1]/10 to-transparent"
      : "from-white/14 via-zinc-200/8 to-transparent";

  return (
    <article className="work-card group relative min-w-[18.5rem] snap-start sm:min-w-[22rem] lg:min-w-[24rem]">
      {/* 카드 아래에 뜨는 그림자/광량 레이어다. */}
      <div className="pointer-events-none absolute inset-x-8 bottom-2 h-16 rounded-full bg-black/75 blur-2xl transition-all duration-300 group-hover:bottom-1 group-hover:h-18 group-hover:bg-black/80" />
      <div className="pointer-events-none absolute inset-x-6 inset-y-4 rounded-[1.8rem] bg-[radial-gradient(circle,rgba(200,200,210,0.05),transparent_70%)] opacity-70 blur-2xl transition-all duration-300 group-hover:opacity-90" />

      <div className="relative overflow-hidden rounded-[1.6rem] border border-[rgba(220,220,230,0.08)] bg-[linear-gradient(180deg,rgba(20,20,20,0.9),rgba(10,10,10,0.96))] p-3 shadow-[0_30px_80px_rgba(0,0,0,0.7),0_0_50px_rgba(200,200,210,0.05),inset_0_1px_0_rgba(255,255,255,0.05)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_36px_90px_rgba(0,0,0,0.76),0_0_56px_rgba(200,200,210,0.08),inset_0_1px_0_rgba(255,255,255,0.06)] group-hover:border-white/14">
        {/* 외곽 신호선처럼 보이는 SVG 라인이다. */}
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

        {/* 카드 내부 미리보기 영역이다. */}
        <div className="relative overflow-hidden rounded-[1.15rem] border border-white/8 bg-[radial-gradient(circle_at_22%_20%,rgba(255,255,255,0.18),transparent_30%),radial-gradient(circle_at_72%_28%,rgba(233,255,63,0.08),transparent_18%),linear-gradient(140deg,rgba(34,34,34,0.95)_0%,rgba(18,18,18,0.96)_36%,rgba(7,7,7,1)_100%)] p-5 sm:p-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent opacity-80" />
          <div
            className={clsx(
              "pointer-events-none absolute inset-x-8 top-10 h-px bg-gradient-to-r opacity-80",
              accentClass,
            )}
          />
          <div className="pointer-events-none absolute bottom-6 right-6 h-24 w-24 rounded-full border border-white/8 bg-white/[0.03] blur-2xl transition-all duration-500 group-hover:scale-110" />

          <div className="relative aspect-[4/4.8] rounded-[0.95rem] border border-white/8 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.18),transparent_18%),radial-gradient(circle_at_76%_34%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(150deg,rgba(26,26,26,0.95)_0%,rgba(10,10,10,0.96)_42%,rgba(3,3,3,1)_100%)] transition-all duration-500 group-hover:border-white/12">
            <div className="absolute inset-x-6 top-6 h-10 rounded-full border border-white/10 bg-white/[0.04] blur-md" />
            <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-white/18 to-transparent" />
            <div className="absolute left-8 top-10 h-28 w-28 rounded-full bg-white/[0.04] blur-2xl" />
            <div className="absolute bottom-7 right-7 h-20 w-20 rounded-full border border-white/10 bg-black/20" />
          </div>
        </div>

        {/* 카드 하단 텍스트 정보다. */}
        <div className="px-3 pb-3 pt-5 sm:px-4">
          <h3 className="text-lg font-medium tracking-[0.02em] text-zinc-100">
            {title}
          </h3>
          <p className="mt-2 text-sm text-zinc-400">
            {category}
          </p>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-500">
            {year}
          </p>
        </div>
      </div>
    </article>
  );
}
