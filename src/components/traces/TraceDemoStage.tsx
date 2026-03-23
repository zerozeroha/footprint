import type { TracePreviewKind } from "@/src/content/traces";

type TraceDemoStageProps = {
  preview: TracePreviewKind;
};

// 상세 데모 영역
export default function TraceDemoStage({ preview }: TraceDemoStageProps) {
  return (
    <div className="trace-panel-card rounded-[1.8rem] p-[1px]">
      <div className="trace-panel-edge rounded-[1.8rem]" />
      <div className="relative overflow-hidden rounded-[calc(1.8rem-1px)] p-6 sm:p-8">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.09),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(255,255,255,0.06),transparent_14%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_36%)]" />
        <div className="trace-panel-well relative flex min-h-[24rem] items-center justify-center rounded-[1.4rem]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[24%] bg-gradient-to-b from-white/[0.07] to-transparent" />
          <div className="pointer-events-none absolute inset-x-[12%] top-4 h-16 rounded-full bg-white/10 blur-3xl" />
          <DemoScene preview={preview} />
        </div>
      </div>
    </div>
  );
}

// 데모 스위처
function DemoScene({ preview }: TraceDemoStageProps) {
  if (preview === "sketch") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-[14%] grid gap-5 md:grid-cols-[1.05fr_0.95fr]">
          <div className="trace-panel-slot rounded-[1.4rem] p-6">
            <div className="absolute left-6 right-6 top-5 h-px bg-white/12" />
            <div className="absolute left-[18%] top-[34%] h-px w-36 rotate-[14deg] bg-white/45" />
            <div className="absolute left-[22%] top-[46%] h-px w-24 -rotate-[16deg] bg-white/58" />
            <div className="absolute left-[18%] top-[58%] h-px w-32 rotate-[8deg] bg-white/24" />
          </div>
          <div className="trace-panel-slot rounded-[1.4rem] p-5">
            <div className="space-y-3">
              <div className="trace-panel-pill w-24 rounded-full px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-zinc-300">
                Layout
              </div>
              <div className="rounded-[1rem] border border-white/10 bg-white/[0.03] p-4">
                <div className="h-2 w-16 rounded-full bg-white/16" />
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="h-16 rounded-[0.9rem] border border-white/8 bg-white/[0.03]" />
                  <div className="h-16 rounded-[0.9rem] border border-white/8 bg-white/[0.03]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (preview === "slice") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-[16%] trace-panel-slot rounded-[1.5rem]">
          <div className="absolute left-[14%] top-[34%] h-px w-[36%] rotate-[11deg] bg-white/44" />
          <div className="absolute right-[16%] top-[34%] h-px w-[28%] -rotate-[18deg] bg-white/22" />
          <div className="absolute left-[24%] bottom-[32%] h-px w-[22%] rotate-[8deg] bg-white/28" />
          <div className="absolute left-1/2 top-[18%] h-[64%] w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-white/70 to-transparent" />
          <div className="absolute left-[24%] top-[24%] h-24 w-24 rounded-[1.2rem] border border-white/10 bg-white/[0.03]" />
          <div className="absolute right-[22%] bottom-[24%] h-20 w-20 rounded-[1.1rem] border border-white/10 bg-white/[0.02]" />
        </div>
      </div>
    );
  }

  if (preview === "signal") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-[15%]">
          <div className="absolute inset-x-[8%] top-0 flex justify-between">
            <div className="h-40 w-[2px] bg-gradient-to-b from-transparent via-[#7dd3fc]/92 to-transparent" />
            <div className="h-48 w-[2px] bg-gradient-to-b from-transparent via-[#e9ff3f]/92 to-transparent" />
            <div className="h-44 w-[2px] bg-gradient-to-b from-transparent via-[#c4b5fd]/88 to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 grid grid-cols-3 gap-4">
            <div className="trace-panel-slot h-28 rounded-[1.25rem]" />
            <div className="trace-panel-slot h-36 rounded-[1.25rem]" />
            <div className="trace-panel-slot h-24 rounded-[1.25rem]" />
          </div>
        </div>
      </div>
    );
  }

  if (preview === "ripple") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-[14%] trace-panel-slot rounded-[1.7rem]">
          <div className="absolute inset-[10%] rounded-[1.45rem] bg-[radial-gradient(circle_at_34%_24%,rgba(255,255,255,0.14),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.015))]" />
          <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/6 blur-xl" />
          <div className="absolute inset-x-[22%] top-[20%] h-12 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute inset-x-[26%] bottom-[16%] h-8 rounded-full bg-white/8 blur-2xl" />
        </div>
      </div>
    );
  }

  if (preview === "search") {
    return (
      <div className="relative h-full w-full">
        <div className="absolute inset-[14%] trace-panel-slot rounded-[1.5rem] p-5">
          <div className="flex gap-3">
            <div className="trace-panel-pill rounded-full px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-300">
              Price
            </div>
            <div className="trace-panel-pill rounded-full border-[#e9ff3f]/20 bg-[#e9ff3f]/10 px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-[#f4f7d1]">
              Recent
            </div>
            <div className="trace-panel-pill rounded-full px-4 py-2 text-[0.7rem] uppercase tracking-[0.24em] text-zinc-300">
              Nearby
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.04] p-4">
              <div className="h-2 w-24 rounded-full bg-white/18" />
              <div className="mt-4 h-12 rounded-[0.9rem] border border-white/8 bg-white/[0.03]" />
            </div>
            <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.025] p-4">
              <div className="h-2 w-20 rounded-full bg-white/14" />
              <div className="mt-4 h-10 rounded-[0.9rem] border border-white/8 bg-white/[0.02]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-[15%] trace-panel-slot rounded-[1.5rem]">
        <div className="absolute left-[18%] top-[24%] h-16 w-16 rounded-[1.1rem] border border-white/12 bg-white/[0.03]" />
        <div className="absolute right-[18%] top-[26%] h-20 w-20 rounded-[1.2rem] border border-white/12 bg-white/[0.04]" />
        <div className="absolute bottom-[18%] left-[40%] h-16 w-16 rounded-full border border-[#e9ff3f]/20 bg-[#e9ff3f]/10" />
        <div className="absolute left-[28%] top-[34%] h-px w-[28%] rotate-[10deg] bg-white/20" />
        <div className="absolute left-[46%] top-[56%] h-px w-[20%] -rotate-[24deg] bg-white/18" />
      </div>
    </div>
  );
}
