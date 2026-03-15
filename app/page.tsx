"use client";

import Hero from "@/src/components/sections/Hero";
import SelectedTracesSection from "@/src/components/sections/SelectedTracesSection";
import FeaturedProject from "@/src/components/sections/FeaturedProject";
import About from "@/src/components/sections/About";
import Skills from "@/src/components/sections/Skills";
import ContactSection from "@/src/components/sections/ContactSection";

// 메인 랜딩 페이지는 히어로 이후 섹션을 순차적으로 쌓는 단순 구조다.
export default function Home() {
  return (
    <div className="min-h-screen bg-black text-zinc-100">
      <main className="min-h-screen">
        {/* 첫 화면에서 브랜드 경험을 담당하는 히어로다. */}
        <Hero />
        {/* 실제 포트폴리오 콘텐츠는 히어로 아래에서 이어진다. */}
        <div id="portfolio-content">
          <SelectedTracesSection />
          <FeaturedProject />
          <About />
          <Skills />
          <ContactSection />
        </div>
      </main>
    </div>
  );
}
