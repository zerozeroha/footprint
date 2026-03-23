import type { ReactNode } from "react";
import type { TraceAccent, TracePreviewKind } from "@/src/content/traces";

type TraceCardPreviewProps = {
  accent: TraceAccent;
  preview: TracePreviewKind;
};

type WireScene = {
  glowClass: string;
  solidClass: string;
  content: ReactNode;
};

function buildWireScene(
  preview: TracePreviewKind,
  accent: TraceAccent,
): WireScene {
  const glowClass =
    accent === "yellow"
      ? "text-[#7ec8ff] group-hover:text-[#c7ebff]"
      : "text-[#6f7884] group-hover:text-[#9edcff]";
  const solidClass =
    accent === "yellow"
      ? "text-[#5f6670] group-hover:text-[#d9f1ff]"
      : "text-[#5b636e] group-hover:text-[#b8e5ff]";

  if (preview === "slice") {
    return {
      glowClass,
      solidClass,
      content: (
        <>
          <polygon
            points="50,22 68,32 68,54 50,64 32,54 32,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.55"
          />
          <polygon
            points="50,16 74,30 74,58 50,72 26,58 26,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
            opacity="0.7"
          />
          <line
            x1="26"
            y1="30"
            x2="32"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
          <line
            x1="74"
            y1="30"
            x2="68"
            y2="32"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
          <line
            x1="74"
            y1="58"
            x2="68"
            y2="54"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
          <line
            x1="26"
            y1="58"
            x2="32"
            y2="54"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
          <line
            x1="50"
            y1="16"
            x2="50"
            y2="22"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
          <line
            x1="50"
            y1="72"
            x2="50"
            y2="64"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.7"
          />
        </>
      ),
    };
  }

  if (preview === "signal") {
    return {
      glowClass,
      solidClass,
      content: (
        <>
          <polygon
            points="38,24 60,24 72,36 50,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="38,24 38,48 50,60 50,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="50,36 72,36 72,60 50,60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <line
            x1="60"
            y1="24"
            x2="60"
            y2="48"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.78"
          />
          <line
            x1="38"
            y1="48"
            x2="60"
            y2="48"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.74"
          />
          <line
            x1="60"
            y1="48"
            x2="72"
            y2="60"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.74"
          />
        </>
      ),
    };
  }

  if (preview === "ripple") {
    return {
      glowClass,
      solidClass,
      content: (
        <>
          <polygon
            points="50,18 74,32 74,60 50,74 26,60 26,32"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="50,26 66,35 66,57 50,66 34,57 34,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.72"
          />
          <line
            x1="26"
            y1="32"
            x2="34"
            y2="35"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="74"
            y1="32"
            x2="66"
            y2="35"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="74"
            y1="60"
            x2="66"
            y2="57"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="26"
            y1="60"
            x2="34"
            y2="57"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="50"
            y1="18"
            x2="50"
            y2="26"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="50"
            y1="74"
            x2="50"
            y2="66"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
        </>
      ),
    };
  }

  if (preview === "search") {
    return {
      glowClass,
      solidClass,
      content: (
        <>
          <polygon
            points="38,24 58,24 70,36 50,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="38,24 38,46 50,58 50,36"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="50,36 70,36 70,58 50,58"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <line
            x1="58"
            y1="24"
            x2="58"
            y2="46"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.76"
          />
          <line
            x1="38"
            y1="46"
            x2="58"
            y2="46"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.72"
          />
          <line
            x1="58"
            y1="46"
            x2="70"
            y2="58"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.72"
          />
          <line
            x1="34"
            y1="64"
            x2="66"
            y2="64"
            stroke="currentColor"
            strokeWidth="1.05"
            opacity="0.34"
          />
        </>
      ),
    };
  }

  if (preview === "lab") {
    return {
      glowClass,
      solidClass,
      content: (
        <>
          <polygon
            points="50,18 72,30 72,56 50,68 28,56 28,30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.45"
          />
          <polygon
            points="50,28 62,35 62,51 50,58 38,51 38,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.15"
            opacity="0.72"
          />
          <line
            x1="28"
            y1="30"
            x2="38"
            y2="35"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="72"
            y1="30"
            x2="62"
            y2="35"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="72"
            y1="56"
            x2="62"
            y2="51"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="28"
            y1="56"
            x2="38"
            y2="51"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
          <line
            x1="50"
            y1="18"
            x2="50"
            y2="28"
            stroke="currentColor"
            strokeWidth="1.1"
            opacity="0.74"
          />
        </>
      ),
    };
  }

  return {
    glowClass,
    solidClass,
    content: (
      <>
        <polygon
          points="38,26 60,26 72,38 50,38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <polygon
          points="38,26 38,50 50,62 50,38"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <polygon
          points="50,38 72,38 72,62 50,62"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.55"
        />
        <line
          x1="60"
          y1="26"
          x2="60"
          y2="50"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.76"
        />
        <line
          x1="38"
          y1="50"
          x2="60"
          y2="50"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.72"
        />
        <line
          x1="60"
          y1="50"
          x2="72"
          y2="62"
          stroke="currentColor"
          strokeWidth="1.2"
          opacity="0.72"
        />
      </>
    ),
  };
}

// 카드 미리보기 렌더러
export default function TraceCardPreview({
  accent,
  preview,
}: TraceCardPreviewProps) {
  const scene = buildWireScene(preview, accent);

  return (
    <div className="trace-panel-slot rounded-[0.95rem] p-5 sm:p-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/8 to-transparent opacity-80" />
      <div className="pointer-events-none absolute inset-x-[18%] top-4 h-12 rounded-full bg-white/[0.04] blur-2xl transition-all duration-500 group-hover:bg-[#59b4ff]/[0.08]" />
      <div className="pointer-events-none absolute inset-x-[12%] bottom-4 h-10 rounded-full bg-[rgba(8,10,14,0.9)] blur-2xl transition-all duration-500 group-hover:bg-[rgba(14,22,34,0.96)] group-hover:shadow-[0_0_32px_rgba(89,180,255,0.18)]" />

      <div className="trace-panel-well relative aspect-[4/4.8] rounded-[0.7rem] overflow-hidden bg-[linear-gradient(180deg,#1a2027_0%,#11161d_100%)] transition-all duration-500">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.08),transparent_22%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_32%)]" />
        <div className="pointer-events-none absolute inset-x-[18%] top-[14%] h-8 rounded-full bg-white/[0.05] blur-2xl transition-all duration-500 group-hover:bg-[#a8dbff]/[0.14]" />
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-36 w-36 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#59b4ff]/[0.03] opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

        <div className="absolute inset-[12%]">
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full ${scene.glowClass} opacity-0 blur-[7px] transition-all duration-500 group-hover:opacity-100 group-hover:scale-[1.02]`}
            fill="none"
          >
            {scene.content}
          </svg>

          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full ${scene.solidClass} transition-colors duration-500`}
            fill="none"
          >
            {scene.content}
          </svg>
        </div>
      </div>
    </div>
  );
}
