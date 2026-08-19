import type { Metadata } from "next";
import "./individual.css";

export const metadata: Metadata = {
  title: "Cluzy for Individuals and Employees | Personal Data Wellness",
  description:
    "Understand where your personal data is exposed, choose what to cleanse, and build practical habits that keep you in control of your digital life.",
  alternates: { canonical: "/individual" },
};

const research = {
  whitepaper: "/research?view=whitepaper",
  calculator: "/research?view=calculator",
};

const waitlistHref = "/contact?intent=waitlist";

const stats = [
  {
    value: "4,000+",
    label: "data brokers operating in the United States",
    compact: true,
  },
  {
    value: "300M+",
    label: "U.S. consumers in one broker's data ecosystem—virtually every adult in the U.S.",
    compact: true,
  },
  {
    value: "73%",
    label: "of broker data is inaccurate or outdated",
  },
  {
    value: "300+",
    label: "top data broker and people-finder sites covered by the included removal service",
  },
];

const foundations = [
  {
    number: "01",
    title: "See what is exposed.",
    text: "Understand where personal details appear across accounts, permissions, public records, data brokers, and people-finder services.",
    signal: "Clarity before action",
  },
  {
    number: "02",
    title: "Reduce unwanted exposure.",
    text: "Choose practical cleanup and removal actions that reduce unwanted exposure while keeping every decision in your hands.",
    signal: "Practical control",
  },
  {
    number: "03",
    title: "Build lasting habits.",
    text: "Revisit accounts, permissions, and exposure as your digital life changes so healthier data practices become repeatable.",
    signal: "Healthier over time",
  },
];

export default function IndividualLandingPage() {
  return (
    <div className="individual-landing">
      <div className="individual-hero-backdrop" aria-hidden="true" />

      <header className="individual-header">
        <a className="individual-brand" href="/individual" aria-label="Cluzy individual and employee landing page">
          <span>
            <img src="/brand/cluzy/wordmark-white-yellow.svg" alt="Cluzy" />
            <small>Employee Data Wellness</small>
          </span>
        </a>
        <nav aria-label="Individual landing page navigation">
          <a href={research.whitepaper}>Whitepaper</a>
          <a className="individual-nav-cta" href="#data-wellness">
            Explore data wellness <span aria-hidden="true">↘</span>
          </a>
        </nav>
      </header>

      <main>
        <section className="individual-hero" aria-labelledby="individual-hero-title">
          <img
            className="individual-brand-icon"
            src="/brand/cluzy/neutral-yellow.svg"
            alt=""
            aria-hidden="true"
          />
          <div className="individual-hero-copy">
            <p className="individual-eyebrow individual-eyebrow--bright">
              Practical data wellness for individuals and employees
            </p>
            <h1 id="individual-hero-title">
              Control your digital life.
              <span>Keep your data in your hands.</span>
            </h1>
            <p className="individual-hero-deck">
              Cluzy helps you understand where your personal data is exposed, choose what to cleanse, and build healthier habits that keep you in control—without needing to be technical.
            </p>
            <div className="individual-actions">
              <a className="individual-button individual-button--signal" href="#data-wellness">
                Explore data wellness <span aria-hidden="true">↓</span>
              </a>
              <a className="individual-text-link" href={research.whitepaper}>
                Read the whitepaper <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <div className="individual-stats" aria-label="Personal data wellness outcomes">
            {stats.map((stat, index) => (
              <article key={stat.value}>
                <span className="individual-stat-index">0{index + 1}</span>
                <strong className={stat.compact ? "individual-stat--compact" : undefined}>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="individual-thesis">
          <div className="individual-section-index">PERSONAL AGENCY / 2026</div>
          <div className="individual-thesis-copy">
            <p className="individual-eyebrow">Personal agency</p>
            <h2>Your information should not become someone else&apos;s guess.</h2>
            <div className="individual-thesis-lower">
              <p>
                Browsing activity, device behavior, location patterns, purchased lists and people finder services can be used to make assumptions you never knowingly provided. You deserve clarity about how your information is used—and a meaningful role in deciding what happens next.
              </p>
              <div className="individual-thesis-proof">
                <span>WHAT DATA WELLNESS GIVES YOU</span>
                <strong>CONTROL</strong>
                <p>Understand what is exposed, choose what to address, and keep your data in your hands.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="individual-foundations" id="data-wellness">
          <div className="individual-section-heading">
            <p className="individual-eyebrow individual-eyebrow--bright">Three foundations of data wellness</p>
            <h2>Turn personal-data exposure into practical action.</h2>
          </div>
          <div className="individual-foundation-grid">
            {foundations.map((foundation) => (
              <article className="individual-foundation-card" key={foundation.number}>
                <span className="individual-foundation-number">{foundation.number}</span>
                <h3>{foundation.title}</h3>
                <p>{foundation.text}</p>
                <span className="individual-foundation-signal">{foundation.signal}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="individual-closing">
          <div>
            <p className="individual-eyebrow individual-eyebrow--bright">Your data. Your decisions.</p>
            <h2>Build data wellness <span>into your digital life.</span></h2>
            <p className="individual-closing-deck">
              Join the Cluzy waitlist and we&apos;ll also send you simple instructions for requesting the service from your employer.
            </p>
          </div>
          <a className="individual-button individual-button--signal" href={waitlistHref}>
            Join the waitlist <span aria-hidden="true">↗</span>
          </a>
        </section>
      </main>

      <footer className="individual-footer">
        <div className="individual-footer-primary">
          <img src="/brand/cluzy/wordmark-white-yellow.svg" alt="Cluzy" />
          <p>Personal data wellness for everyday digital life.</p>
        </div>
        <div className="individual-footer-legal">
          <span><a href="/"><strong>A Dāginty Product</strong></a> © 2026 Dāginty Inc.</span>
        </div>
      </footer>
    </div>
  );
}
