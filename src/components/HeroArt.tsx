/**
 * Decorative hero panel (no photo). Keeps motion subtle; static when reduced-motion is on.
 */
export function HeroArt() {
  return (
    <div className="hero-art" aria-hidden="true">
      <div className="hero-art__mesh" />
      <div className="hero-art__grid" />
      <div className="hero-art__ring" />
      <div className="hero-art__glow" />
    </div>
  );
}
