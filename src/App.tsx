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
    note: "Confidential",
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
          <a href="#expertise">Expertise</a>
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
              <p className="kicker">Lagos, Nigeria · Product engineer</p>
              <h1 id="hero-title">Production-grade systems across backend, applied AI, and product interfaces.</h1>
              <p className="lede">
                I design and deliver software intended for live environments: APIs and services, data-intensive
                workflows, and interfaces that operators and customers use every day. Engagements emphasise clarity,
                maintainability, and measurable outcomes. Long term, I am building toward founding a product-led company;
                until then, I work with organisations that share a similar standard of execution.
              </p>
              <div className="hero-actions">
                <a className="btn btn--primary" href="mailto:gabrieloyetunji25@gmail.com">
                  Get in touch
                </a>
                <a className="btn btn--ghost" href="https://github.com/GabrielOyetunji" target="_blank" rel="noopener noreferrer">
                  GitHub profile
                </a>
                <a className="btn btn--ghost" href="/resume/Gabriel_Oyetunji_Resume.pdf">
                  Résumé (PDF)
                </a>
              </div>
            </div>
            <div className="hero-visual">
              <div className="hero-visual__glow" aria-hidden="true" />
              <figure className="hero-photo">
                <picture>
                  <source srcSet="/images/profile.avif" type="image/avif" />
                  <img
                    src="/images/profile.jpg"
                    width={640}
                    height={640}
                    alt="Portrait of Gabriel Oyetunji"
                    decoding="async"
                    fetchPriority="high"
                  />
                </picture>
              </figure>
            </div>
          </div>
        </section>

        <Reveal as="section" className="band" id="expertise">
          <div className="band-inner">
            <h2 className="section-title">Areas of expertise</h2>
            <ul className="pillars">
              <li>
                <h3>Backend architecture and APIs</h3>
                <p>
                  Domain-aligned services, authentication and authorisation, data modelling, and performance
                  characteristics suitable for sustained production traffic.
                </p>
              </li>
              <li>
                <h3>Applied machine learning</h3>
                <p>
                  Retrieval, classification, and workflow automation integrated into product requirements—not
                  experimental features disconnected from user or business value.
                </p>
              </li>
              <li>
                <h3>Product-facing interfaces</h3>
                <p>
                  Dashboards, internal tools, and customer-facing web applications designed for clarity, accessibility,
                  and day-to-day operational use.
                </p>
              </li>
            </ul>
          </div>
        </Reveal>

        <Reveal as="section" className="band band--tight" id="work">
          <div className="band-inner">
            <h2 className="section-title">Representative work</h2>
            <p className="section-lead">
              Public repositories and live systems shown below. Additional engagements are subject to confidentiality;
              scope and outcomes can be discussed directly where appropriate.
            </p>
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
            <h2 className="section-title">Contact</h2>
            <p className="cta-copy">
              For product organisations, technology leadership, or founders seeking additional engineering capacity,
              please send a concise description of the initiative, timeline, and how you would like support. I review
              consulting and employment opportunities on a selective basis.
            </p>
            <a className="btn btn--primary btn--large" href="mailto:gabrieloyetunji25@gmail.com">
              gabrieloyetunji25@gmail.com
            </a>
            <p className="cta-alt">
              <a href="https://linkedin.com/in/gabriel-oyetunji-a7aa9513b" target="_blank" rel="noopener noreferrer">
                LinkedIn profile
              </a>
            </p>
          </div>
        </Reveal>
      </main>

      <footer className="foot">
        <p>© {new Date().getFullYear()} Gabriel Oyetunji. Product engineering and software architecture.</p>
        <p className="foot-note">Consulting engagements and relevant full-time roles considered by introduction.</p>
      </footer>
    </>
  );
}
