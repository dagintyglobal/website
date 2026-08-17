"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { contact } from "../site-data";

const nav = [
  { href: "/products", label: "Products" },
  { href: "/partners", label: "Partners" },
  { href: "/services", label: "Services" },
  { href: "/research", label: "Research" },
];

export function SiteHeader({ dark = false, stickThreshold = 8 }: { dark?: boolean; stickThreshold?: number }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const updateHeader = () => setScrolled(window.scrollY > stickThreshold);
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    return () => window.removeEventListener("scroll", updateHeader);
  }, [stickThreshold]);

  useEffect(() => {
    const handleSamePageAnchor = (event: MouseEvent) => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const origin = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      const href = origin?.getAttribute("href");
      if (!href || href === "#") return;
      const destination = document.getElementById(decodeURIComponent(href.slice(1)));
      if (!destination) return;

      event.preventDefault();
      const behavior = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
      destination.scrollIntoView({ behavior, block: "start" });
      window.history.pushState(null, "", href);
    };

    document.addEventListener("click", handleSamePageAnchor, true);
    return () => document.removeEventListener("click", handleSamePageAnchor, true);
  }, []);

  return (
    <header className={`global-header ${dark ? "global-header--dark" : ""} ${scrolled ? "global-header--stuck" : ""}`}>
      <Link className="global-brand" href="/" aria-label="Dāginty home">
        <img src={dark ? "/brand/daginty/wordmark-white-yellow.svg" : "/brand/daginty/wordmark-full-color.svg"} alt="Dāginty" />
      </Link>
      <button className="menu-button" type="button" aria-expanded={open} aria-controls="primary-nav" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Menu"}
      </button>
      <nav id="primary-nav" className={open ? "is-open" : ""} aria-label="Primary navigation">
        {nav.map((item) => <Link href={item.href} key={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <a className="nav-button" href={contact.expert}>Talk to an expert <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="global-footer">
      <div className="footer-grid">
        <div><span>Explore</span><Link href="/products">Products</Link><Link href="/partners">Partners</Link><Link href="/services">Services</Link></div>
        <div><span>Learn</span><Link href="/data-wellness">Data Wellness</Link><Link href="/ecosystem">Ecosystem</Link><Link href="/research">Research Lab</Link></div>
        <div><span>Company</span><Link href="/about">About</Link><Link href="/legal">Legal</Link><Link href="/contact">Contact</Link></div>
      </div>
      <div className="footer-lead">
        <img src="/brand/daginty/wordmark-white-yellow.svg" alt="Dāginty" />
        <p>Personal data control for the AI economy</p>
      </div>
      <div className="footer-legal">
        <span>© 2026 Dāginty Inc.</span>
        <span aria-hidden="true">|</span>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/terms">Terms of use</Link>
      </div>
    </footer>
  );
}

export function PageShell({ children, className = "", headerDark = false, headerStickThreshold = 8, variant = "default" }: { children: React.ReactNode; className?: string; headerDark?: boolean; headerStickThreshold?: number; variant?: "default" | "interior" }) {
  const interior = variant === "interior";
  const darkHeader = headerDark || interior;
  return <div className={`site-shell ${interior ? "site-shell--interior" : ""} ${className}`.trim()}>
    {interior ? <div className="interior-backdrop" aria-hidden="true"/> : headerDark && <div className="hero-backdrop" aria-hidden="true"/>}
    <SiteHeader dark={darkHeader} stickThreshold={headerStickThreshold} />
    {children}
    <SiteFooter />
  </div>;
}
