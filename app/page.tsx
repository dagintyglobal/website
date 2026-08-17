import Link from "next/link";
import { Eyebrow, Mechanism, SectionIntro } from "./components/Blocks";
import { PageShell } from "./components/SiteChrome";
import { CalculatorChartPreview } from "./research/ResearchExperience";

const roles = [
  { number: "01", title: "Individual / Employee", text: "See where your personal data lives, reduce unwanted exposure, and build healthier digital habits without technical expertise.", href: "/data-wellness", action: "Explore data wellness" },
  { number: "02", title: "Executive / Employer", text: "Connect employee data wellness to measurable threat reduction, expected-loss modeling, and governance-ready reporting.", href: "/products", action: "Explore products" },
  { number: "03", title: "MSP", text: "Turn employee data wellness into a recurring security service with measurable threat-reduction reporting.", href: "/partners/msps", action: "Explore MSP delivery" },
  { number: "04", title: "Benefit broker", text: "Add a consent-forward data wellness benefit that strengthens employee habits and reduces personal-data exposure.", href: "/partners/benefits-brokers", action: "Explore broker delivery" },
  { number: "05", title: "Transformation Leader", text: "Translate complex data and consent challenges into clear positioning, adoption strategy, and measurable action.", href: "/services", action: "Explore services" },
  { number: "06", title: "Journalist / Researcher", text: "Examine the whitepaper, cited sources, and assumptions behind the data wellness risk model.", href: "/research?view=whitepaper", action: "Explore research" },
];

export default function Home() {
  return <PageShell headerDark className="home-shell">
    <main>
      <section className="home-hero">
        <div className="home-hero-copy">
          <Eyebrow light>Personal data control for the AI economy</Eyebrow>
          <h1><span className="hero-line hero-line--solid">Maximize personal data wellness.</span><span className="hero-line hero-line--accent">Reduce human-driven risk.</span></h1>
          <p className="home-hero-deck">Dāginty gives people meaningful control over their personal data while helping organizations reduce risk, strengthen accountability, and build trusted data for the AI economy.</p>
          <div className="hero-actions"><Link className="button button--yellow" href="/data-wellness" prefetch={false}>Explore data wellness →</Link><Link className="text-link text-link--light" href="/ecosystem" prefetch={false}>Explore the ecosystem →</Link></div>
        </div>
        <div className="home-hero-stats" aria-label="Dāginty platform overview">
          <article className="home-hero-stat--platform"><span>01</span><strong>Platform</strong><p>Personal data ownership</p></article>
          <article><span>02</span><strong>Wellness</strong><p>Review, cleanse, and track data</p></article>
          <article><span>03</span><strong>Partners</strong><p>MSPs and benefits brokers</p></article>
          <article className="home-hero-stat--receipts"><span>04</span><strong>Provenance</strong><p>Every data point has a receipt</p></article>
        </div>
      </section>

      <section className="role-section">
        <div className="role-section-index">WHERE DO YOU FIT?</div>
        <div className="role-section-copy">
          <Eyebrow>Better data for everyone</Eyebrow>
          <h2>More control for people. Less risk for organizations.</h2>
          <p className="role-section-deck">Dāginty helps individuals protect their digital lives, leaders reduce human-driven risk, and partners deliver measurable value.</p>
          <div className="role-grid">{roles.map(role => <Link href={role.href} className="role-card" key={role.number} prefetch={false}><span>{role.number}</span><h3>{role.title}</h3><p>{role.text}</p><b>{role.action} →</b></Link>)}</div>
        </div>
      </section>

      <Mechanism />

      <section className="now-next-section">
        <SectionIntro eyebrow="The Ecosystem" title="A connected approach to better data." />
        <div className="now-next-grid">
          <article className="now-card"><span>01</span><h3>Data wellness</h3><p>Build practical habits that help people understand, protect, and take control of their personal data.</p><Link href="/data-wellness" prefetch={false}>Explore wellness →</Link></article>
          <article className="now-card"><span>02</span><h3>Threat reduction</h3><p>Use personal data wellness to give employers and their trusted partners a measurable way to lower human-driven risk.</p><Link href="/products" prefetch={false}>Explore products →</Link></article>
          <article className="platform-card"><span>03</span><h3>Data infrastructure</h3><p>Give data buyers trusted personal data backed by consent, provenance, accountability, and a receipt for every data point.</p><Link href="/ecosystem" prefetch={false}>Explore model →</Link></article>
        </div>
      </section>

      <section className="roi-teaser">
        <div className="roi-whitepaper"><Eyebrow>Research Lab</Eyebrow><h2>Employee data wellness as cybersecurity.</h2><div className="roi-whitepaper-thesis"><strong>Attackers do not need to breach your firewall if they can breach your people.</strong><p>Data brokers package the personal details that make phishing credible: family relationships, addresses, phone numbers, work history, purchases, and habits. Traditional annual training asks employees to resist the result. Cluzy reduces the raw material.</p></div><p>Read the evidence and risk-reduction framework behind Dāginty. The whitepaper explains how personal-data exposure makes social engineering work, how data wellness reduces that exposure, and how progress can be measured.</p><div className="roi-half-action"><Link className="button button--dark" href="/research?view=whitepaper" prefetch={false}>Read the whitepaper →</Link></div></div>
        <div className="roi-calculator"><CalculatorChartPreview/><div className="roi-half-action"><Link className="button button--dark" href="/research?view=calculator" prefetch={false}>Open the calculator →</Link></div></div>
      </section>
    </main>
  </PageShell>;
}
