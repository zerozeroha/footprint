import Reveal from "@/src/components/common/Reveal";

// 포트폴리오 제작자 관점과 작업 철학을 설명하는 섹션이다.
const About = () => {
  return (
    <section id="about" className="trace-section border-t border-zinc-800 bg-black text-zinc-100">
      <div className="trace-container flex max-w-5xl flex-col gap-12 md:flex-row md:items-start md:justify-between">
        {/* 왼쪽에는 짧은 타이틀, 오른쪽에는 설명 문단을 둔다. */}
        <div className="space-y-4 md:max-w-xs">
          <Reveal
            as="p"
            className="text-xs font-medium tracking-[0.25em] text-zinc-500"
            once
          >
            ABOUT
          </Reveal>

          <Reveal
            as="h2"
            delay={0.06}
            className="text-2xl font-semibold tracking-tight text-zinc-50 sm:text-3xl md:text-4xl"
          >
            I build interfaces that leave a lasting impression.
          </Reveal>
        </div>

        <div className="space-y-6 md:max-w-xl md:text-sm lg:text-base">
          <Reveal
            as="p"
            delay={0.1}
            className="text-zinc-400"
          >
            I design and engineer interfaces that feel as considered as the stories they tell. Every
            scroll, hover, and transition is an opportunity to leave a subtle trace in how people
            experience a product.
          </Reveal>

          <Reveal
            as="p"
            delay={0.18}
            className="text-zinc-400"
          >
            My work lives where interaction, motion, and visual systems meet. I focus on precise
            frontend craft, expressive yet restrained animation, and details that make an interface
            feel calm, intentional, and alive.
          </Reveal>

          <Reveal
            as="p"
            delay={0.26}
            className="text-zinc-500"
          >
            FOOTPRINT is a space to explore those traces — how micro-interactions, rhythm, and
            motion can quietly guide attention and leave a memorable impression without shouting
            for it.
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
