export default function Home() {
  return (
    <main className="placeholder-shell">
      <div className="placeholder-grid" aria-hidden="true" />
      <section className="placeholder-card" aria-labelledby="placeholder-title">
        <img
          className="placeholder-logo"
          src="/brand/daginty/wordmark-white-yellow.svg"
          alt="Dāginty"
        />
        <p className="placeholder-eyebrow">STAGING ENVIRONMENT</p>
        <h1 id="placeholder-title">The Dāginty ecosystem site is taking shape.</h1>
        <p className="placeholder-copy">
          This address is connected and reserved for the new Dāginty website.
          The complete experience will be reviewed locally before it replaces
          this placeholder.
        </p>
        <div className="placeholder-rule" />
        <ul className="placeholder-pillars" aria-label="Dāginty ecosystem layers">
          <li>Services &amp; advisory</li>
          <li>Partner delivery</li>
          <li>Research &amp; proof</li>
        </ul>
      </section>
    </main>
  );
}
