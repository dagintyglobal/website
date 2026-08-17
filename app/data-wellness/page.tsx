import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Personal Data Wellness | Dāginty",
  description: "Practical personal data wellness for accounts, permissions, exposure, privacy, and consent.",
};

const foundations = [
  { number: "01", title: "Digital control", text: "Understand where your data lives, who has access, and what is being shared." },
  { number: "02", title: "Privacy & consent", text: "Set choices and boundaries that are understandable, revocable, and respected over time." },
  { number: "03", title: "Reduced exposure", text: "Build habits that reduce exposure to scams, account takeovers, phishing, and unwanted sharing." },
  { number: "04", title: "Practical action", text: "Use repeatable steps around accounts, permissions, and cleanup—not abstract policy language." },
];

const loop = [
  { number: "01", title: "Scan", text: "Find the everyday data exposure that creates avoidable risk." },
  { number: "02", title: "Review", text: "Turn what you find into clear choices you understand and control." },
  { number: "03", title: "Cleanse", text: "Take thoughtful cleanup steps and build healthier data habits." },
  { number: "04", title: "Track", text: "Follow your progress and repeat the actions that make a difference." },
];

export default function DataWellnessPage() {
  return <PageShell variant="interior">
    <main className="interior-main data-wellness-interior">
      <InteriorHero
        eyebrow="Practical control for everyday digital life"
        title="Your information should not become someone else’s guess about you."
        deck="Your data is part of your life. Dāginty helps make it easier to understand, protect, and control through practical steps that fit everyday digital life."
        primary={{ label: "Explore data wellness", href: "#foundations" }}
      />

      <InteriorSection
        className="data-wellness-thesis"
        eyebrow={<><span>Personal</span><span>Agency</span></>}
        title="You are more than a profile."
        text="Browsing activity, device behavior, location patterns, purchased lists and people finder services can be used to make assumptions you never knowingly provided. You deserve clarity about how your information is used—and a meaningful role in deciding what happens next."
      >
        <div className="interior-thesis-grid">
          <article><span>WHAT HAPPENS TODAY</span><h3>Signals become assumptions.</h3><p>Everyday digital activity can be combined into categories, predictions, and targeting that do not represent you as a person.</p></article>
          <article className="interior-thesis-card--accent"><span>WHAT DATA WELLNESS CHANGES</span><h3>Clarity becomes control.</h3><p>Understand what is exposed, choose what to address, and build practical habits that keep your data in your hands.</p></article>
        </div>
      </InteriorSection>

      <InteriorSection
        className="data-wellness-foundations"
        id="foundations"
        eyebrow="What data wellness means"
        title="Practical control for everyday digital life."
        text="Data wellness turns a complicated privacy problem into understandable choices and repeatable actions."
        dark
      >
        <InteriorCardGrid columns={2}>
          {foundations.map((item) => <InteriorCard key={item.number} {...item} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        className="data-wellness-loop"
        eyebrow={<><span>One</span><span>practical</span><span>loop</span></>}
        title="Small actions become healthier data habits."
        text="Review, cleanse, and track what matters—then repeat the loop as your digital life changes."
      >
        <InteriorCardGrid columns={4}>
          {loop.map((item) => <InteriorCard key={item.number} {...item} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="A healthier relationship with data"
        title="Control should be understandable—not technical."
        text="Data wellness is not about hiding from digital life. It is about seeing what is happening, making informed choices, and reducing unnecessary exposure without fear or blame."
        dark
      />

      <InteriorCta
        eyebrow="Research Lab"
        title="See the evidence behind personal data wellness."
        text="Read how personal-data exposure makes social engineering more credible and how practical data wellness can reduce that exposure."
        action={{ label: "Read the whitepaper", href: "/research?view=whitepaper" }}
      />
    </main>
  </PageShell>;
}
