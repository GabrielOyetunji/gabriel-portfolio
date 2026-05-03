import { Reveal } from "./components/Reveal";
import { useTheme } from "./hooks/useTheme";

const WORK = [
  {
    name: "Flight Booking API",
    detail: "FastAPI · PostgreSQL · JWT",
    href: "https://github.com/GabrielOyetunji/flight-booking-api",
  },
  {
    name: "MandateCheck",
    detail: "Civic platform · Django · React",
    href: null,
    note: "Private",
  },
  {
    name: "E-commerce AI recommendations",
    detail: "Flask · vectors · OCR",
    href: "https://github.com/GabrielOyetunji/ds_task_1ab",
  },
  {
    name: "Histopathology classifier",
    detail: "CNN · Grad-CAM · UI",
    href: "https://github.com/GabrielOyetunji/breast-cancer-classifier",
  },
] as const;

export default function App() {
  const { isDark, toggle } = useTheme();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <div className="page-bg" aria-hidden="true" />

      <header className="top">
        <a className="mark" href="#main">
          Gabriel Oyetunji
        </a>
        <nav className="top-nav" aria-label="Primary">
          <a href="#focus">Focus</a>
          <a href="#work">Work</a>
          <a href="#contact">Contact</a>
        </nav>
        <button className="theme-btn" type="button" onClick={toggle} aria-pressed={isDark}>
          <span className="theme-btn__knob" aria-hidden="true" />
          <span className="sr-only">Toggle light and dark theme</span>
          <span aria-hidden="true">{isDark ? "Dark" : "Light"}</span>
        </button>
      </header>

      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="kicker">Lagos · Product engineer</p>
              <h1 id="hero-title">Software that holds up in the real world.</h1>
              <p className="lede">
                I work where backends, applied AI, and interfaces meet—shipping systems people rely on, not demos that
                fall apart under load. Building toward running my own company; this site is the through-line for serious
                collaborators.
              </p>
              <div className="hero-actions">
                <a className="btn btn--primary" href="mailto:gabrieloyetunji25@gmail.com">
                  Email me
                </a>
                <a className="btn btn--ghost" href="https://github.com/GabrielOyetunji" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
                <a className="btn btn--ghost" href="/resume/Gabriel_Oyetunji_Resume.pdf">
                  Résumé
                </a>
              </div>
            </div>
            <figure className="hero-photo">
              <picture>
                <source srcSet="/images/profile.avif" type="image/avif" />
                <img src="/images/profile.jpg" width={560} height={560} alt="" decoding="async" fetchPriority="high" />
              </picture>
              <figcaption className="sr-only">Portrait of Gabriel Oyetunji</figcaption>
            </figure>
          </div>
        </section>

        <Reveal as="section" className="band" id="focus">
          <div className="band-inner">
            <h2 className="section-title">What I focus on</h2>
            <ul className="pillars">
              <li>
                <h3>Backend &amp; APIs</h3>
                <p>Domain-shaped services, clear contracts, auth, data modelling, and performance you can reason about.</p>
              </li>
              <li>
                <h3>AI in the product</h3>
                <p>Features that earn their place: retrieval, classification, and workflows—not bolt-on hype.</p>
              </li>
              <li>
                <h3>Interfaces people use</h3>
                <p>Dashboards and web surfaces that respect operators, analysts, and everyday users.</p>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className="band band--tight" id="work">
          <div className="band-inner">
            <h2 className="section-title">Selected work</h2>
            <p className="section-lead">A few things I can talk about publicly. Happy to go deeper on a call.</p>
            <ul className="work-list">
              {WORK.map((item) => (
                <li key={item.name}>
                  {item.href ? (
                    <a className="work-row" href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="work-row__name">{item.name}</span>
                      <span className="work-row__meta">{item.detail}</span>
                      <span className="work-row__arrow" aria-hidden="true">
                        ↗
                      </span>
                    </a>
                  ) : (
                    <div className="work-row work-row--static">
                      <span className="work-row__name">{item.name}</span>
                      <span className="work-row__meta">{item.detail}</span>
                      <span className="work-row__tag">{item.note}</span>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className="band band--cta" id="contact">
          <div className="band-inner band-inner--cta">
            <h2 className="section-title">If you are building something that needs to last</h2>
            <p className="cta-copy">
              Whether it is a product org, a startup, or your own company down the road—good engineering decisions
              compound. Reach out if you want that kind of partner in the room.
            </p>
            <a className="btn btn--primary btn--large" href="mailto:gabrieloyetunji25@gmail.com">
              gabrieloyetunji25@gmail.com
            </a>
            <p className="cta-alt">
              <a href="https://linkedin.com/in/gabriel-oyetunji-a7aa9513b" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
            </p>
          </div>
        </Reveal>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Gabriel Oyetunji · Product engineer</p>
        <p className="foot-note">Open to selective collaborations and serious product work.</p>
      </footer>
    </>
  );
}
