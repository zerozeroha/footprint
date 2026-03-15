// 단순한 레이어 조합만으로 유리 큐브 같은 오브젝트를 만든다.
export default function CubeObject() {
  return (
    <div className="relative h-[clamp(18rem,34vw,28rem)] w-[clamp(18rem,34vw,28rem)]">
      {/* 뒤쪽에 퍼지는 기본 glow다. */}
      <div className="absolute inset-[10%] rounded-[2rem] bg-[radial-gradient(circle,rgba(235,239,244,0.18),rgba(235,239,244,0.03)_48%,transparent_76%)] blur-3xl" />

      <div
        className="absolute inset-[18%] rounded-[2rem] border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.14),rgba(255,255,255,0.02)_32%,rgba(8,8,9,0.18)_100%)] shadow-[0_28px_72px_rgba(0,0,0,0.6),0_0_36px_rgba(200,200,210,0.08)]"
        style={{ animation: "trace-float 11s ease-in-out infinite" }}
      >
        {/* 앞면 하이라이트와 내부 반사 레이어다. */}
        <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_26%_20%,rgba(255,255,255,0.28),transparent_28%),radial-gradient(circle_at_72%_30%,rgba(233,255,63,0.08),transparent_18%),linear-gradient(160deg,rgba(255,255,255,0.06),transparent_42%,rgba(0,0,0,0.18)_100%)]" />
        <div
          className="absolute inset-x-[18%] top-[12%] h-[1px] bg-gradient-to-r from-transparent via-white/70 to-transparent"
          style={{ animation: "trace-shimmer 8s ease-in-out infinite" }}
        />
        <div className="absolute inset-y-[18%] right-[14%] w-[1px] bg-gradient-to-b from-transparent via-white/50 to-transparent" />
      </div>

      <div
        className="absolute inset-[24%] translate-x-[12%] -translate-y-[10%] rounded-[1.75rem] border border-white/10 bg-[linear-gradient(160deg,rgba(255,255,255,0.05),rgba(255,255,255,0.01)_36%,rgba(6,6,7,0.24)_100%)] opacity-85"
        style={{ animation: "trace-float 11s ease-in-out infinite reverse" }}
      />

      {/* 뒤에 겹쳐 보이는 면을 추가해 입체감을 만든다. */}
      <div className="absolute inset-[26%] -translate-x-[10%] translate-y-[12%] rounded-[1.75rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.005))]" />

      {/* 가장 바깥 프레임과 바닥 그림자다. */}
      <div className="absolute inset-[12%] rounded-[2.2rem] border border-white/8" />
      <div className="absolute bottom-[16%] left-1/2 h-20 w-[60%] -translate-x-1/2 rounded-full bg-black/70 blur-2xl" />
    </div>
  );
}
