import Lenis, { LenisOptions } from "lenis";

export type LenisInstance = Lenis;

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

  const lenis = new Lenis(options);
  let frameId: number;

  const raf = (time: number) => {
    lenis.raf(time);
    frameId = window.requestAnimationFrame(raf);
  };

  frameId = window.requestAnimationFrame(raf);

  const destroy = () => {
    window.cancelAnimationFrame(frameId);
    lenis.destroy();
  };

  return { lenis, destroy };
}

