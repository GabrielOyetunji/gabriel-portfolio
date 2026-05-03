import { createElement, useEffect, useRef, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Adds `is-visible` when the block enters the viewport (CSS handles motion).
 */
export function Reveal({ children, className = "", as: Tag = "div", id }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-visible");
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return createElement(Tag, { ref, id, className: `reveal ${className}`.trim() }, children);
}
