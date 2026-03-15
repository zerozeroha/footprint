import Lenis, { LenisOptions } from "lenis";

export type LenisInstance = Lenis;

// initLenis가 돌려주는 객체 형태다.
export interface InitLenisReturn {
  lenis: LenisInstance;
  destroy: () => void;
}

/**
 * Initialize a Lenis smooth scroll instance on the client.
 * Returns the Lenis instance alongside a destroy helper
 * to be called during cleanup (e.g. in useEffect teardown).
 */
export function initLenis(options?: LenisOptions): InitLenisReturn | null {
  if (typeof window === "undefined") return null;

  // Lenis 인스턴스를 만들고 requestAnimationFrame에 연결한다.
  const lenis = new Lenis(options);
  let frameId: number;

  const raf = (time: number) => {
    lenis.raf(time);
    frameId = window.requestAnimationFrame(raf);
  };

  frameId = window.requestAnimationFrame(raf);

  // 정리 함수는 rAF와 Lenis 인스턴스를 함께 종료한다.
  const destroy = () => {
    window.cancelAnimationFrame(frameId);
    lenis.destroy();
  };

  return { lenis, destroy };
}
