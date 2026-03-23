import type { TraceAccent, TracePreviewKind } from "@/src/content/traces";

type TraceCardPreviewProps = {
  accent: TraceAccent;
  preview: TracePreviewKind;
};

const diamondMaskStyle = {
  WebkitMaskImage: "url('/assets/diamond.svg')",
  maskImage: "url('/assets/diamond.svg')",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
} as const;

type PreviewVariant = {
  frameClass: string;
  hoverFrameClass: string;
  baseTone: string;
  hoverTone: string;
  glowGradient: string;
  blurGlowClass: string;
  ambient: Array<{ className: string }>;
};

function getPreviewVariant(preview: TracePreviewKind): PreviewVariant {
  switch (preview) {
    case "sketch":
      return {
        frameClass: "h-[76%] w-[76%] -translate-x-[3%] translate-y-[2%] rotate-[-12deg] scale-[0.84]",
        hoverFrameClass: "group-hover:scale-[0.88] group-hover:rotate-[-8deg]",
        baseTone: "bg-[#656f7b]",
        hoverTone: "group-hover:bg-[#9edcff]",
        glowGradient:
          "bg-[conic-gradient(from_210deg_at_50%_50%,rgba(89,180,255,0.98)_0deg,rgba(163,230,255,0.88)_86deg,rgba(255,255,255,0.92)_144deg,rgba(59,130,246,0.9)_252deg,rgba(89,180,255,0.98)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(89,180,255,0.28))_drop-shadow(0_0_34px_rgba(125,211,252,0.24))]",
        ambient: [
          { className: "absolute left-[18%] top-[22%] h-16 w-16 rounded-full bg-[#86efff]/[0.12] blur-2xl" },
          { className: "absolute right-[22%] bottom-[18%] h-20 w-20 rounded-full bg-[#59b4ff]/[0.16] blur-3xl" },
        ],
      };
    case "slice":
      return {
        frameClass: "h-[68%] w-[68%] translate-x-[12%] -translate-y-[2%] rotate-[22deg] scale-[0.78]",
        hoverFrameClass: "group-hover:scale-[0.84] group-hover:rotate-[18deg]",
        baseTone: "bg-[#6f676f]",
        hoverTone: "group-hover:bg-[#ffb6d0]",
        glowGradient:
          "bg-[conic-gradient(from_180deg_at_50%_50%,rgba(255,94,156,0.95)_0deg,rgba(255,179,71,0.82)_80deg,rgba(255,255,255,0.9)_146deg,rgba(255,94,156,0.74)_232deg,rgba(255,122,89,0.92)_312deg,rgba(255,94,156,0.95)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(255,94,156,0.26))_drop-shadow(0_0_32px_rgba(255,122,89,0.2))]",
        ambient: [
          { className: "absolute right-[16%] top-[24%] h-16 w-16 rounded-full bg-[#ff5e9c]/[0.13] blur-2xl" },
          { className: "absolute left-[28%] bottom-[20%] h-20 w-20 rounded-full bg-[#ff7a59]/[0.12] blur-3xl" },
        ],
      };
    case "signal":
      return {
        frameClass: "h-[74%] w-[74%] translate-x-[4%] -translate-y-[5%] rotate-[10deg] scale-[0.8]",
        hoverFrameClass: "group-hover:scale-[0.86] group-hover:rotate-[6deg]",
        baseTone: "bg-[#68727f]",
        hoverTone: "group-hover:bg-[#9de4ff]",
        glowGradient:
          "bg-[conic-gradient(from_200deg_at_50%_50%,rgba(90,255,214,0.92)_0deg,rgba(89,180,255,0.92)_88deg,rgba(255,255,255,0.9)_148deg,rgba(57,255,20,0.8)_244deg,rgba(90,255,214,0.92)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(90,255,214,0.24))_drop-shadow(0_0_32px_rgba(89,180,255,0.22))]",
        ambient: [
          { className: "absolute left-[18%] top-[30%] h-16 w-16 rounded-full bg-[#5affd6]/[0.12] blur-2xl" },
          { className: "absolute right-[18%] top-[22%] h-16 w-16 rounded-full bg-[#59b4ff]/[0.12] blur-2xl" },
          { className: "absolute bottom-[18%] left-[42%] h-20 w-20 rounded-full bg-[#39ff14]/[0.1] blur-3xl" },
        ],
      };
    case "ripple":
      return {
        frameClass: "h-[80%] w-[80%] -translate-x-[8%] translate-y-[5%] rotate-[-20deg] scale-[0.82]",
        hoverFrameClass: "group-hover:scale-[0.88] group-hover:rotate-[-16deg]",
        baseTone: "bg-[#6f737c]",
        hoverTone: "group-hover:bg-[#d6c5ff]",
        glowGradient:
          "bg-[conic-gradient(from_210deg_at_50%_50%,rgba(139,92,246,0.92)_0deg,rgba(196,181,253,0.86)_82deg,rgba(255,255,255,0.9)_146deg,rgba(89,180,255,0.78)_240deg,rgba(139,92,246,0.92)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(139,92,246,0.24))_drop-shadow(0_0_30px_rgba(196,181,253,0.2))]",
        ambient: [
          { className: "absolute left-[20%] top-[22%] h-16 w-16 rounded-full bg-[#8b5cf6]/[0.12] blur-2xl" },
          { className: "absolute right-[20%] bottom-[18%] h-20 w-20 rounded-full bg-[#c4b5fd]/[0.14] blur-3xl" },
        ],
      };
    case "search":
      return {
        frameClass: "h-[66%] w-[66%] translate-x-[14%] translate-y-[8%] rotate-[14deg] scale-[0.76]",
        hoverFrameClass: "group-hover:scale-[0.82] group-hover:rotate-[10deg]",
        baseTone: "bg-[#727067]",
        hoverTone: "group-hover:bg-[#ffe08f]",
        glowGradient:
          "bg-[conic-gradient(from_220deg_at_50%_50%,rgba(255,214,94,0.94)_0deg,rgba(255,255,255,0.9)_78deg,rgba(255,177,66,0.88)_146deg,rgba(89,180,255,0.76)_250deg,rgba(255,214,94,0.94)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(255,214,94,0.24))_drop-shadow(0_0_30px_rgba(255,177,66,0.18))]",
        ambient: [
          { className: "absolute right-[16%] top-[24%] h-16 w-16 rounded-full bg-[#ffd65e]/[0.12] blur-2xl" },
          { className: "absolute left-[24%] bottom-[18%] h-20 w-20 rounded-full bg-[#ffb142]/[0.12] blur-3xl" },
        ],
      };
    case "lab":
      return {
        frameClass: "h-[78%] w-[78%] -translate-x-[2%] translate-y-[1%] rotate-[32deg] scale-[0.8]",
        hoverFrameClass: "group-hover:scale-[0.86] group-hover:rotate-[28deg]",
        baseTone: "bg-[#6a6f79]",
        hoverTone: "group-hover:bg-[#aafcc8]",
        glowGradient:
          "bg-[conic-gradient(from_220deg_at_50%_50%,rgba(52,211,153,0.92)_0deg,rgba(170,252,200,0.84)_74deg,rgba(255,255,255,0.9)_138deg,rgba(89,180,255,0.76)_248deg,rgba(52,211,153,0.92)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(52,211,153,0.24))_drop-shadow(0_0_30px_rgba(170,252,200,0.18))]",
        ambient: [
          { className: "absolute left-[18%] top-[24%] h-16 w-16 rounded-full bg-[#34d399]/[0.12] blur-2xl" },
          { className: "absolute right-[18%] bottom-[18%] h-20 w-20 rounded-full bg-[#aafcc8]/[0.12] blur-3xl" },
        ],
      };
    default:
      return {
        frameClass: "h-[72%] w-[72%] scale-[0.8]",
        hoverFrameClass: "group-hover:scale-[0.84]",
        baseTone: "bg-[#646d78]",
        hoverTone: "group-hover:bg-[#b7e6ff]",
        glowGradient:
          "bg-[conic-gradient(from_220deg_at_50%_50%,rgba(89,180,255,0.94)_0deg,rgba(134,239,255,0.82)_78deg,rgba(255,255,255,0.88)_142deg,rgba(196,181,253,0.78)_226deg,rgba(67,97,238,0.86)_304deg,rgba(89,180,255,0.94)_360deg)]",
        blurGlowClass:
          "[filter:drop-shadow(0_0_18px_rgba(89,180,255,0.28))_drop-shadow(0_0_28px_rgba(139,92,246,0.18))]",
        ambient: [],
      };
  }
}

// 카드 미리보기 렌더러
export default function TraceCardPreview({
  accent: _accent,
  preview,
}: TraceCardPreviewProps) {
  const variant = getPreviewVariant(preview);

  return (
    <div className="trace-panel-slot rounded-[0.95rem] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/8 to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-x-[18%] top-4 h-12 rounded-full bg-white/[0.04] blur-2xl transition-all duration-500 group-hover:bg-[#59b4ff]/[0.08]" />
      <div className="pointer-events-none absolute inset-x-[12%] bottom-4 h-10 rounded-full bg-[rgba(8,10,14,0.9)] blur-2xl transition-all duration-500 group-hover:bg-[rgba(14,22,34,0.96)] group-hover:shadow-[0_0_32px_rgba(89,180,255,0.18)]" />

      <div className="trace-panel-well relative aspect-[4/4.8] rounded-[0.8rem] overflow-hidden bg-[linear-gradient(180deg,#1a2027_0%,#11161d_100%)] transition-all duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-x-[18%] top-[14%] h-8 rounded-full bg-white/[0.05] blur-2xl transition-all duration-500 group-hover:bg-[#a8dbff]/[0.14]" />
        <div className="pointer-events-none absolute left-1/2 top-[54%] h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#59b4ff]/[0.03] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {variant.ambient.map((ambient, index) => (
            <div key={`${preview}-ambient-${index}`} className={ambient.className} />
          ))}
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`relative ${variant.frameClass} transition-transform duration-500 ${variant.hoverFrameClass}`}>
            <div
              aria-hidden="true"
              className={`absolute inset-0 opacity-0 transition-all duration-500 group-hover:opacity-100 ${variant.glowGradient}`}
              style={diamondMaskStyle}
            />

            <div
              aria-hidden="true"
              className={`absolute inset-0 opacity-0 blur-[14px] transition-all duration-500 group-hover:opacity-100 ${variant.glowGradient} ${variant.blurGlowClass}`}
              style={diamondMaskStyle}
            />

            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-70 transition-all duration-500 group-hover:opacity-100"
              style={diamondMaskStyle}
            >
              <div className="h-full w-full bg-gradient-to-b from-white/[0.12] via-transparent to-transparent" />
            </div>

            <div
              aria-hidden="true"
              className={`absolute inset-0 transition-all duration-500 ${variant.baseTone} ${variant.hoverTone} bg-[linear-gradient(180deg,rgba(112,122,136,0.95)_0%,rgba(64,71,82,0.97)_46%,rgba(34,39,48,1)_100%)] [filter:drop-shadow(0_18px_30px_rgba(0,0,0,0.45))] group-hover:[filter:drop-shadow(0_20px_34px_rgba(0,0,0,0.42))]`}
              style={diamondMaskStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
