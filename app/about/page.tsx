import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";
import { contact, team } from "../site-data";

export const metadata = {
  title: "About Dāginty",
  description: "Dāginty is building a healthier, more accountable relationship between people, organizations, and personal data.",
};

export default function AboutPage() {
  return <PageShell variant="interior">
    <main className="interior-main content-interior about-interior">
      <InteriorHero
        eyebrow="About Dāginty"
        title="Building a healthier relationship between people, organizations, and data."
        deck="Dāginty gives people meaningful control over personal data, helps organizations reduce human-driven risk, and creates trusted data infrastructure for the AI economy."
        primary={{ label: "Meet the founders", href: "#founders" }}
      />

      <InteriorSection
        id="founders"
        className="interior-page-entry"
        eyebrow="Founding team"
        title="Different disciplines. One shared conviction."
        text="Dāginty was founded by leaders across strategy, product, systems, marketing, operations, and partnerships who believe people should have a meaningful role in how their data is understood and used."
      >
        <div className="interior-team-grid">
          {team.map((member) => <article key={member.name}>
            <img src={member.image} alt={member.name} />
            <div>
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </div>
          </article>)}
        </div>
      </InteriorSection>

      <InteriorSection
        eyebrow="Why we created Dāginty"
        title="Personal data should create agency—not assumptions."
        text="Too much of the data economy is built on information people never knowingly provided, choices they cannot clearly see, and profiles that do not represent them. Dāginty exists to replace that imbalance with personal data wellness, meaningful ownership, and accountable data use."
        dark
      >
        <InteriorCardGrid columns={3}>
          <InteriorCard
            number="01"
            title="Mission"
            text="Make personal data wellness practical—giving people clearer control while helping organizations reduce human-driven risk."
          />
          <InteriorCard
            number="02"
            title="Vision"
            text="An AI economy where people have meaningful ownership and trusted data carries consent, provenance, and accountability."
          />
          <InteriorCard
            number="03"
            title="Values"
            text="Human agency first. Clarity over complexity. Behavior change over blame. Measurable progress that creates value for everyone."
          />
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorCta
        eyebrow="Connect with Dāginty"
        title="Help shape a more accountable data economy."
        text="Whether you want to improve personal data wellness, reduce organizational risk, deliver a differentiated partner offering, or advance trusted data, we’d like to hear what you are working toward."
        action={{ label: "Connect with us", href: contact.expert }}
      />
    </main>
  </PageShell>;
}
