import Lenis from "lenis";
import { useEffect } from "react";

/**
 * Smooth scroll via Lenis. Disabled when `enabled` is false (e.g. prefers-reduced-motion).
 */
export function useSmoothScroll(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis();

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [enabled]);
}
