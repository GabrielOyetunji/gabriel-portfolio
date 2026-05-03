import gsap from "gsap";
import { useCallback, useEffect, useRef, useState } from "react";
import type { PointerEvent } from "react";
import { IntroLoader } from "./components/IntroLoader";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
import { useSmoothScroll } from "./hooks/useSmoothScroll";
import { useTheme } from "./hooks/useTheme";

type Filter = "all" | "backend" | "ai" | "private";

function tagMatches(filter: Filter, tags: string): boolean {
  if (filter === "all") return true;
  const parts = tags.split(/\s+/);
  return parts.includes(filter);
}

export default function App() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { isDark, toggle } = useTheme();
  const [introDone, setIntroDone] = useState(prefersReducedMotion);
  const [filter, setFilter] = useState<Filter>("all");
  const heroFrameRef = useRef<HTMLDivElement>(null);

  const handleIntroDone = useCallback(() => setIntroDone(true), []);

  useSmoothScroll(introDone && !prefersReducedMotion);

  useEffect(() => {
    if (!introDone || prefersReducedMotion) return;
    const frame = heroFrameRef.current;
    if (!frame) return;
    const targets = frame.querySelectorAll(".hero-location, .hero-role, .hero-portrait, .hero-copy");
    const ctx = gsap.context(() => {
      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.85,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "all",
      });
    }, frame);
    return () => ctx.revert();
  }, [introDone, prefersReducedMotion]);

  return (
    <>
      <IntroLoader skip={prefersReducedMotion} onDone={handleIntroDone} />

      <a className="skip-link" href="#main">
        Skip to main content
      </a>

      <header className="site-header">
        <nav className="nav" aria-label="Main navigation">
          <a className="brand" href="#top" aria-label="Gabriel Oyetunji home">
            Gabriel O.
          </a>
          <ul className="nav-links">
            <li>
              <a href="#work">Work</a>
            </li>
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
          <button className="theme-toggle" type="button" aria-pressed={isDark} onClick={toggle}>
            <span className="theme-dot" aria-hidden="true" />
            <span className="sr-only">Theme: </span>
            <span className="theme-label">{isDark ? "Dark" : "Light"}</span>
          </button>
        </nav>
      </header>

      <main id="main">
        <section id="top" className="hero" aria-label="Gabriel Oyetunji portfolio introduction">
          <div className="grain" aria-hidden="true" />
          <div className="hero-frame" ref={heroFrameRef}>
            <div className="hero-location">
              <span>Based in</span>
              <strong>Lagos, Nigeria</strong>
              <span className="orb" aria-hidden="true">
                <span />
              </span>
            </div>

            <div className="hero-role">
              <span aria-hidden="true">↘</span>
              <p>
                Product Engineer
                <br />
                Backend, AI & Interfaces
              </p>
            </div>

            <picture className="hero-portrait">
              <source srcSet="/images/profile.avif" type="image/avif" />
              <img
                src="/images/profile.jpg"
                width={800}
                height={800}
                alt="Portrait of Gabriel Oyetunji"
                fetchPriority="high"
              />
            </picture>

            <div className="hero-copy">
              <h1>Gabriel Oyetunji</h1>
            </div>
          </div>
        </section>

        <section className="intro-section" aria-labelledby="intro-title">
          <div className="intro-mark" aria-hidden="true">
            ↓
          </div>
          <div>
            <p className="eyebrow">Profile</p>
            <h2 id="intro-title">I build systems that have to work, and interfaces people can actually use.</h2>
          </div>
          <p>
            My work sits between backend architecture, applied AI, data-heavy workflows, and product UI. Some projects
            are public. Some are private while they mature. The important thing is the pattern: taking messy ideas and
            turning them into shipped, usable software.
          </p>
        </section>

        <WorkSection filter={filter} onFilterChange={setFilter} reducedMotion={prefersReducedMotion} />

        <section className="featured-section" aria-label="Featured project details">
          <article
            className={`case-study primary-case${tagMatches(filter, "backend public") ? "" : " is-hidden"}`}
            data-tags="backend public"
          >
            <div className="case-media">
              <img
                src="/images/api-homepage.png"
                width={1280}
                height={800}
                alt="Flight Booking API documentation interface"
                loading="lazy"
              />
            </div>
            <div className="case-copy">
              <span className="case-pill">Backend system</span>
              <h3>Flight Booking API</h3>
              <p>
                A Nigerian domestic flight reservation API with flight search, seat availability, multi-passenger
                bookings, JWT authentication, payment flow, and generated docs.
              </p>
              <div className="case-stats">
                <span>
                  <strong>20+</strong> endpoints
                </span>
                <span>
                  <strong>2000+</strong> seeded flights
                </span>
                <span>
                  <strong>10</strong> airports
                </span>
              </div>
            </div>
          </article>

          <div className="case-grid">
            <article className={`case-study${tagMatches(filter, "ai public") ? "" : " is-hidden"}`} data-tags="ai public">
              <img
                src="/images/breast-cancer-demo.png"
                width={1906}
                height={923}
                alt="Breast cancer classifier interface"
                loading="lazy"
              />
              <div>
                <span className="case-pill">AI interface</span>
                <h3>Breast Cancer Classifier</h3>
                <p>CNN classifier with confidence output, threshold controls, and Grad-CAM explainability.</p>
              </div>
            </article>

            <article className={`case-study${tagMatches(filter, "data public") ? "" : " is-hidden"}`} data-tags="data public">
              <img src="/images/uv.app.avif" width={1359} height={723} alt="UV-Vis processor app interface" loading="lazy" />
              <div>
                <span className="case-pill">Data workflow</span>
                <h3>UV-Vis Processor</h3>
                <p>Streamlit app for cleaning CARY 50 CSV exports, previewing spectra, and exporting clean datasets.</p>
              </div>
            </article>
          </div>
        </section>

        <section id="about" className="about-section" aria-labelledby="about-title">
          <div className="about-heading">
            <p className="eyebrow">About</p>
            <h2 id="about-title">Backend depth, product taste, and a growing interface practice.</h2>
          </div>

          <div className="about-grid">
            <p>
              I am building a portfolio around the work I actually want more of: systems with clear domain logic, AI
              features that serve the product, dashboards that make data easier to act on, and websites that feel
              considered and personal.
            </p>
            <div className="capability-list" aria-label="Capabilities">
              <span>FastAPI</span>
              <span>Django REST</span>
              <span>PostgreSQL</span>
              <span>Redis</span>
              <span>React</span>
              <span>Streamlit</span>
              <span>PyTorch</span>
              <span>TensorFlow</span>
              <span>Docker</span>
              <span>Vercel</span>
            </div>
          </div>
        </section>

        <section id="contact" className="contact-section" aria-labelledby="contact-title">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 id="contact-title">Have something worth building?</h2>
          </div>
          <div className="contact-actions">
            <a className="circle-link primary" href="mailto:gabrieloyetunji25@gmail.com">
              Email
            </a>
            <a className="circle-link" href="https://github.com/GabrielOyetunji" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            <a
              className="circle-link"
              href="https://linkedin.com/in/gabriel-oyetunji-a7aa9513b"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </a>
            <a className="circle-link" href="/resume/Gabriel_Oyetunji_Resume.pdf">
              Resume
            </a>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <p>Gabriel Oyetunji · Product Engineer · Backend / AI / Interfaces</p>
      </footer>
    </>
  );
}

type WorkSectionProps = {
  filter: Filter;
  onFilterChange: (f: Filter) => void;
  reducedMotion: boolean;
};

function WorkSection({ filter, onFilterChange, reducedMotion }: WorkSectionProps) {
  const previewRef = useRef<HTMLDivElement>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);

  const onRowEnter = (src: string) => {
    if (reducedMotion) return;
    const wrap = previewRef.current;
    const img = previewImageRef.current;
    if (!wrap || !img) return;
    img.src = src;
    wrap.classList.add("is-visible");
  };

  const onRowMove = (clientX: number, clientY: number) => {
    if (reducedMotion) return;
    const wrap = previewRef.current;
    if (!wrap) return;
    wrap.style.setProperty("--preview-x", `${clientX + 24}px`);
    wrap.style.setProperty("--preview-y", `${clientY - 18}px`);
  };

  const onRowLeave = () => {
    if (reducedMotion) return;
    previewRef.current?.classList.remove("is-visible");
  };

  const rowProps = (preview: string) =>
    reducedMotion
      ? {}
      : {
          onPointerEnter: () => onRowEnter(preview),
          onPointerMove: (e: PointerEvent) => onRowMove(e.clientX, e.clientY),
          onPointerLeave: onRowLeave,
        };

  return (
    <section id="work" className="work-section" aria-labelledby="work-title">
      <div className="work-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2 id="work-title">Creating useful systems with real product shape.</h2>
        </div>
        <div className="work-controls" aria-label="Project filters">
          {(["all", "backend", "ai", "private"] as const).map((key) => (
            <button
              key={key}
              type="button"
              className={`filter-button${filter === key ? " active" : ""}`}
              onClick={() => onFilterChange(key)}
            >
              {key === "all" ? "All" : key === "ai" ? "AI" : key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="project-preview" aria-hidden="true" ref={previewRef}>
        <img ref={previewImageRef} src="/images/api-homepage.png" width={640} height={400} alt="" />
      </div>

      <div className="project-table" aria-label="Project index">
        <div className="project-row table-head" aria-hidden="true">
          <span>Project</span>
          <span>Focus</span>
          <span>Stack</span>
          <span>Status</span>
        </div>

        <a
          className={`project-row${tagMatches(filter, "backend public") ? "" : " is-hidden"}`}
          href="https://github.com/GabrielOyetunji/flight-booking-api"
          target="_blank"
          rel="noopener noreferrer"
          data-tags="backend public"
          data-preview="/images/api-homepage.png"
          {...rowProps("/images/api-homepage.png")}
        >
          <span className="project-name">Flight Booking API</span>
          <span>Reservation backend</span>
          <span>FastAPI, PostgreSQL, JWT</span>
          <span>Public</span>
        </a>

        <article
          className={`project-row${tagMatches(filter, "backend private") ? "" : " is-hidden"}`}
          data-tags="backend private"
          data-preview="/images/profile.jpg"
          tabIndex={0}
          {...rowProps("/images/profile.jpg")}
        >
          <span className="project-name">MandateCheck</span>
          <span>Civic accountability platform</span>
          <span>Django, React, Redis</span>
          <span>Private build</span>
        </article>

        <a
          className={`project-row${tagMatches(filter, "ai backend public") ? "" : " is-hidden"}`}
          href="https://github.com/GabrielOyetunji/ds_task_1ab"
          target="_blank"
          rel="noopener noreferrer"
          data-tags="ai backend public"
          data-preview="/images/profile.jpg"
          {...rowProps("/images/profile.jpg")}
        >
          <span className="project-name">E-commerce AI Recommendation</span>
          <span>Semantic product search</span>
          <span>Flask, OCR, vectors</span>
          <span>Public</span>
        </a>

        <a
          className={`project-row${tagMatches(filter, "data public") ? "" : " is-hidden"}`}
          href="https://uvvis-app-nsglt4gukbq3vntcwwpknb.streamlit.app/"
          target="_blank"
          rel="noopener noreferrer"
          data-tags="data public"
          data-preview="/images/uv.app.avif"
          {...rowProps("/images/uv.app.avif")}
        >
          <span className="project-name">UV-Vis Processor</span>
          <span>Scientific data workflow</span>
          <span>Streamlit, pandas</span>
          <span>Live</span>
        </a>

        <a
          className={`project-row${tagMatches(filter, "ai public") ? "" : " is-hidden"}`}
          href="https://github.com/GabrielOyetunji/breast-cancer-classifier"
          target="_blank"
          rel="noopener noreferrer"
          data-tags="ai public"
          data-preview="/images/breast-cancer-demo.png"
          {...rowProps("/images/breast-cancer-demo.png")}
        >
          <span className="project-name">Histopathology Classifier</span>
          <span>Model-backed interface</span>
          <span>CNN, Grad-CAM</span>
          <span>Public</span>
        </a>

        <a
          className={`project-row${tagMatches(filter, "ai data public") ? "" : " is-hidden"}`}
          href="https://github.com/GabrielOyetunji/spatio-temporal-interaction-recognition"
          target="_blank"
          rel="noopener noreferrer"
          data-tags="ai data public"
          data-preview="/images/stgcn-confusion-matrices.png"
          {...rowProps("/images/stgcn-confusion-matrices.png")}
        >
          <span className="project-name">ST-GCN Interaction Recognition</span>
          <span>Skeleton action recognition</span>
          <span>PyTorch, graphs</span>
          <span>Public</span>
        </a>

        <article
          className={`project-row${tagMatches(filter, "private") ? "" : " is-hidden"}`}
          data-tags="private"
          data-preview="/images/profile.jpg"
          tabIndex={0}
          {...rowProps("/images/profile.jpg")}
        >
          <span className="project-name">Private Website Builds</span>
          <span>Product pages and interfaces</span>
          <span>React, design systems</span>
          <span>In progress</span>
        </article>
      </div>
    </section>
  );
}
