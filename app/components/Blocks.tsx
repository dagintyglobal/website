import Link from "next/link";
import { mechanism } from "../site-data";

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={`eyebrow ${light ? "eyebrow--light" : ""}`}>{children}</p>;
}

export function Mechanism({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`mechanism ${compact ? "mechanism--compact" : ""}`} aria-labelledby={compact ? undefined : "mechanism-title"}>
      {!compact && <div className="mechanism-heading"><Eyebrow light>One simple loop</Eyebrow><h2 id="mechanism-title">From exposure to measurable improvement.</h2></div>}
      <div className="mechanism-grid">
        {!compact && <div className="mechanism-loop-track" aria-hidden="true">{mechanism.map((step) => <span key={step.number} />)}</div>}
        {mechanism.map((step) => <article key={step.title}><span>{step.number}</span><h3>{step.title}</h3><p>{step.text}</p></article>)}
      </div>
      {!compact && <div className="mechanism-loop-return" aria-hidden="true" />}
      {!compact && <div className="mechanism-action"><Link className="button button--yellow" href="/data-wellness" prefetch={false}>Explore data wellness →</Link></div>}
    </section>
  );
}

export function CtaBand({ eyebrow, title, text, href, label }: { eyebrow: string; title: string; text: string; href: string; label: string }) {
  const link = href.startsWith("mailto:") ? <a className="button button--yellow" href={href}>{label} ↗</a> : <Link className="button button--yellow" href={href} prefetch={false}>{label} →</Link>;
  return <section className="cta-band"><div><Eyebrow light>{eyebrow}</Eyebrow><h2>{title}</h2><p>{text}</p></div>{link}</section>;
}

export function PageHero({ eyebrow, title, deck, primary, secondary }: {
  eyebrow: string; title: string; deck: string; primary: { label: string; href: string }; secondary?: { label: string; href: string };
}) {
  const link = (action: { label: string; href: string }, className: string) => action.href.startsWith("mailto:") ? <a className={className} href={action.href}>{action.label} ↗</a> : <Link className={className} href={action.href} prefetch={false}>{action.label} →</Link>;
  return <section className="page-hero"><div className="page-hero-copy"><Eyebrow light>{eyebrow}</Eyebrow><h1>{title}</h1><p>{deck}</p><div className="hero-actions">{link(primary,"button button--yellow")}{secondary && link(secondary,"text-link text-link--light")}</div></div></section>;
}

export function SectionIntro({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-intro ${light ? "section-intro--light" : ""}`}><Eyebrow light={light}>{eyebrow}</Eyebrow><h2>{title}</h2>{text && <p>{text}</p>}</div>;
}
