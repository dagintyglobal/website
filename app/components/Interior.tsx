import Link from "next/link";
import { Eyebrow } from "./Blocks";

type Action = { label: string; href: string };

function InteriorAction({ action, secondary = false }: { action: Action; secondary?: boolean }) {
  const className = secondary ? "interior-text-link" : "interior-button";
  const content = <>{action.label} <span aria-hidden="true">{action.href.startsWith("mailto:") ? "↗" : "→"}</span></>;
  return action.href.startsWith("mailto:")
    ? <a className={className} href={action.href}>{content}</a>
    : <Link className={className} href={action.href}>{content}</Link>;
}

export function InteriorHero({ eyebrow, title, deck, primary, secondary, markers = [] }: {
  eyebrow: React.ReactNode;
  title: string;
  deck: string;
  primary?: Action;
  secondary?: Action;
  markers?: string[];
}) {
  return <section className="interior-hero">
    <div className="interior-hero-panel">
      <Eyebrow light>{eyebrow}</Eyebrow>
      <h1>{title}</h1>
      <p className="interior-hero-deck">{deck}</p>
      {(primary || secondary) && <div className="interior-actions">
        {primary && <InteriorAction action={primary} />}
        {secondary && <InteriorAction action={secondary} secondary />}
      </div>}
      {markers.length > 0 && <ul className="interior-markers" aria-label="Page highlights">
        {markers.map((marker) => <li key={marker}>{marker}</li>)}
      </ul>}
    </div>
  </section>;
}

export function InteriorSection({ eyebrow, title, text, children, id, dark = false, className = "" }: {
  eyebrow: React.ReactNode;
  title: string;
  text?: string;
  children?: React.ReactNode;
  id?: string;
  dark?: boolean;
  className?: string;
}) {
  return <section className={`interior-section ${dark ? "interior-section--dark" : ""} ${className}`} id={id}>
    <div className="interior-section-heading">
      <Eyebrow light={dark}>{eyebrow}</Eyebrow>
      <div><h2>{title}</h2>{text && <p>{text}</p>}</div>
    </div>
    {children}
  </section>;
}

export function InteriorCardGrid({ children, columns = 3 }: { children: React.ReactNode; columns?: 2 | 3 | 4 }) {
  return <div className={`interior-card-grid interior-card-grid--${columns}`}>{children}</div>;
}

export function InteriorCard({ number, title, text, href, action }: {
  number?: string;
  title: string;
  text: string;
  href?: string;
  action?: string;
}) {
  const content = <>
    {number && <span className="interior-card-number">{number}</span>}
    <h3>{title}</h3>
    <p>{text}</p>
    {action && <b>{action} <span aria-hidden="true">→</span></b>}
  </>;
  return href ? <Link className="interior-card" href={href}>{content}</Link> : <article className="interior-card">{content}</article>;
}

export function InteriorCta({ eyebrow, title, text, action }: {
  eyebrow: string;
  title: string;
  text: string;
  action: Action;
}) {
  return <section className="interior-cta">
    <div className="interior-cta-heading">
      <Eyebrow light>{eyebrow}</Eyebrow>
      <div><h2>{title}</h2><p>{text}</p></div>
    </div>
    <div className="interior-cta-action"><InteriorAction action={action} /></div>
  </section>;
}

export function InteriorComingSoon({ eyebrow, title, text, action }: {
  eyebrow: string;
  title: string;
  text: string;
  action: Action;
}) {
  return <main className="interior-main interior-coming-soon">
    <InteriorHero eyebrow={eyebrow} title={title} deck={text} primary={action} markers={["Part of the Dāginty ecosystem", "More details coming soon"]} />
  </main>;
}
