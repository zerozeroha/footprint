// 프로젝트 강조색
export type TraceAccent = "silver" | "yellow";

// 카드 미리보기 종류
export type TracePreviewKind =
  | "sketch"
  | "slice"
  | "signal"
  | "ripple"
  | "search"
  | "lab";

// 프로젝트 데이터 타입
export type TraceProject = {
  slug: string;
  title: string;
  category: string;
  year: string;
  accent: TraceAccent;
  preview: TracePreviewKind;
  summary: string;
  concept: string;
  demoTitle: string;
  demoSummary: string;
  skills: string[];
};

// 프로젝트 목록
export const traceProjects: TraceProject[] = [
  {
    slug: "ai-real-estate-platform",
    title: "AI Real Estate Platform",
    category: "Frontend / Interaction",
    year: "2026",
    accent: "silver",
    preview: "sketch",
    summary:
      "Loose pointer sketches become structured space cards and plan-like layouts.",
    concept:
      "Unstructured input becomes a readable product surface. The interaction starts rough, then resolves into confident UI blocks.",
    demoTitle: "Sketch To Space",
    demoSummary:
      "A loose drawing area that resolves into structured layout modules, room blocks, and property signals.",
    skills: ["Pointer input", "State transitions", "UI structuring"],
  },
  {
    slug: "trace-motion-study",
    title: "TRACE Motion Study",
    category: "Interface Experiment",
    year: "2026",
    accent: "yellow",
    preview: "slice",
    summary:
      "Cursor gestures slice linear motion paths into new fragments and rhythms.",
    concept:
      "The pointer acts like an editing tool. Motion is not just decorative here, it is the material being manipulated.",
    demoTitle: "Cutting Motion Paths",
    demoSummary:
      "A gesture-based stage where lines split, offset, and reorganize into new motion sequences.",
    skills: ["Gesture logic", "GSAP timelines", "Motion systems"],
  },
  {
    slug: "interface-signal-system",
    title: "Interface Signal System",
    category: "Design System / Motion",
    year: "2026",
    accent: "silver",
    preview: "signal",
    summary:
      "Color signals fall through the scene and lock into modules, frames, and containers.",
    concept:
      "Visual noise becomes a system. The page demonstrates how dynamic input can be organized into a consistent interface language.",
    demoTitle: "Signal Fill",
    demoSummary:
      "Falling signal particles settle into framed UI containers and reveal a controlled system underneath.",
    skills: ["Particles", "Masking", "Visual systems"],
  },
  {
    slug: "premium-product-showcase",
    title: "Premium Product Showcase",
    category: "Launch Experience",
    year: "2024",
    accent: "silver",
    preview: "ripple",
    summary:
      "A premium surface reacts with ripple and glass-like light shifts when touched.",
    concept:
      "Stillness and material response lead the experience. The interaction is subtle, tactile, and product-led.",
    demoTitle: "Surface Ripple",
    demoSummary:
      "A calm product stage where clicks trigger controlled ripples, specular shifts, and premium reflections.",
    skills: ["Micro-interactions", "Material feel", "Brand motion"],
  },
  {
    slug: "search-experience-redesign",
    title: "Search Experience Redesign",
    category: "Product UX / Frontend",
    year: "2026",
    accent: "yellow",
    preview: "search",
    summary:
      "Filters, sorting, and relevance states rearrange results with clear animated feedback.",
    concept:
      "This is the most product-facing trace. It shows how motion can support comprehension when interface state changes quickly.",
    demoTitle: "Search Reflow",
    demoSummary:
      "Filter chips and result cards reorganize with clear hierarchy, reduced friction, and visual relevance cues.",
    skills: ["Filtering", "Layout transitions", "Product clarity"],
  },
  {
    slug: "interaction-prototype-lab",
    title: "Interaction Prototype Lab",
    category: "Concept / Prototype",
    year: "2026",
    accent: "silver",
    preview: "lab",
    summary:
      "A prototype playground for drag, snap, connect, and reactive UI behaviors.",
    concept:
      "A flexible environment for testing interaction rules quickly. The focus is behavior design, not fixed storytelling.",
    demoTitle: "Reactive Playground",
    demoSummary:
      "A sandbox stage for connection logic, object response, and lightweight prototype behaviors.",
    skills: ["Prototyping", "Drag logic", "Interaction rules"],
  },
];

// slug 조회
export const getTraceProject = (slug: string) =>
  traceProjects.find((project) => project.slug === slug);
