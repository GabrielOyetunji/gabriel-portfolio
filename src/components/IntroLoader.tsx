import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const GREETINGS = [
  "Hello",
  "Bonjour",
  "Bawo ni",
  "Ciao",
  "Olá",
  "Hallo",
] as const;

type Props = {
  /** When true, skip the loader entirely (e.g. prefers-reduced-motion). */
  skip: boolean;
  onDone: () => void;
};

export function IntroLoader({ skip, onDone }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const finishedRef = useRef(false);

  useEffect(() => {
    if (skip) {
      onDone();
      return;
    }

    let disposed = false;
    let current = 0;

    const finish = () => {
      if (finishedRef.current || disposed) return;
      finishedRef.current = true;
      const node = rootRef.current;
      if (!node) {
        onDone();
        return;
      }
      gsap.to(node, {
        opacity: 0,
        duration: 0.55,
        ease: "power2.inOut",
        pointerEvents: "none",
        onComplete: () => onDone(),
      });
    };

    const interval = window.setInterval(() => {
      if (disposed) return;
      current += 1;
      if (current < GREETINGS.length) {
        setIndex(current);
      } else {
        window.clearInterval(interval);
        finish();
      }
    }, 480);

    return () => {
      disposed = true;
      window.clearInterval(interval);
    };
  }, [skip, onDone]);

  if (skip) return null;

  return (
    <div ref={rootRef} className="intro-loader" aria-hidden="true">
      <div className="intro-loader__inner">
        <span className="intro-loader__dot" />
        <span>{GREETINGS[index]}</span>
      </div>
    </div>
  );
}
