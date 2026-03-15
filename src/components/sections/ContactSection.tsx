import Reveal from "@/src/components/common/Reveal";

// 마지막 CTA 역할을 하는 연락 섹션이다.
export default function ContactSection() {
  return (
    <section id="contact" className="trace-section border-t border-zinc-800 bg-black text-zinc-100">
      <div className="trace-container max-w-5xl">
        <div className="space-y-5">
          <Reveal
            as="p"
            className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500"
          >
            Contact
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            className="max-w-xl text-3xl font-semibold tracking-tight text-zinc-50 sm:text-4xl"
          >
            Let&apos;s build something that leaves a signal.
          </Reveal>

          <Reveal
            as="p"
            delay={0.12}
            className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base"
          >
            Available for selective collaborations across product interface design, frontend craft,
            and motion-led digital experiences.
          </Reveal>

          <Reveal
            delay={0.18}
            yOffset={24}
            className="pt-3"
          >
            {/* 메일 주소 자체를 CTA 버튼처럼 보이게 만든다. */}
            <a
              href="mailto:hello@trace.studio"
              className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/14 bg-white/[0.03] px-5 py-2.5 text-[0.72rem] uppercase tracking-[0.26em] text-zinc-200 hover:border-[#e9ff3f]/30 hover:bg-white/[0.05] hover:text-white"
            >
              hello@trace.studio
              <span className="h-px w-5 bg-[#e9ff3f]/55" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
