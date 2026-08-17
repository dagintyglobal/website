import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";
import { contact } from "../site-data";

export const metadata = {
  title: "Advisory Services | Dāginty",
  description: "Behavioral research, motivation mapping, psychographic segmentation, activation strategy, and performance measurement.",
};

const services = [
  {
    number: "01",
    title: "AgileBrain research",
    text: "Deploy a field-validated, under-three-minute instrument that captures implicit emotional responses beyond what customers say in surveys or focus groups.",
  },
  {
    number: "02",
    title: "Motivation mapping",
    text: "Interpret responses across self, material, social, and spiritual domains to reveal the emotional needs driving customer decisions.",
  },
  {
    number: "03",
    title: "Psychographic segmentation",
    text: "Group audiences by shared motivations—not demographics or declared intent—to identify distinct decision drivers and messaging needs.",
  },
  {
    number: "04",
    title: "Activation and optimization",
    text: "Translate motivation maps into messaging, creative, and channel strategy, then measure engagement lift, conversion, and return on marketing spend.",
  },
];

const process = [
  "Define emotional targets",
  "Deploy AgileBrain research",
  "Map psychographic segments",
  "Activate across channels",
  "Measure and optimize",
];

const outcomes = [
  {
    number: "01",
    title: "Motivation intelligence map",
    text: "A clear view of the emotional needs driving what customers buy, why they stay, and what may be getting in the way.",
  },
  {
    number: "02",
    title: "Actionable audience profiles",
    text: "Distinct psychographic segments showing how motivations, message preferences, and decision drivers differ within the same market.",
  },
  {
    number: "03",
    title: "Messaging and creative direction",
    text: "An activation strategy that connects each motivational profile to relevant language, creative choices, and channel execution.",
  },
  {
    number: "04",
    title: "Performance learning system",
    text: "A plan to track emotional engagement, conversion response, and marketing return so the work improves over time.",
  },
];

export default function ServicesPage() {
  return <PageShell variant="interior">
    <main className="interior-main content-interior services-interior">
      <InteriorHero
        eyebrow="Behavioral science for B2B marketing"
        title="Know why customers buy—not just what they click."
        deck="Dāginty uses AgileBrain behavioral research to uncover the motivations behind customer decisions, build psychographic audience profiles, and turn those insights into measurable marketing action."
        primary={{ label: "See what’s included", href: "#advisory-services" }}
      />

      <InteriorSection
        id="advisory-services"
        className="interior-page-entry"
        eyebrow="What the service is"
        title="Behavioral research translated into marketing action."
        text="We field AgileBrain research, interpret the motivational signal, build psychographic segments, and apply the findings to messaging, creative, channel strategy, and measurement."
      >
        <InteriorCardGrid columns={2}>
          {services.map((service) => <InteriorCard key={service.number} {...service} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="Five steps to conversion clarity"
        title="From emotional signal to measurable performance."
        text="The engagement follows a repeatable research-to-activation framework designed to make customer motivation useful across the marketing system."
        dark
      >
        <div className="interior-process-grid">
          {process.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>
      </InteriorSection>

      <InteriorSection
        eyebrow="What you leave with"
        title="Motivation intelligence your team can use."
        text="The output is a practical system for understanding customers, choosing messages, activating campaigns, and learning what improves conversion."
      >
        <InteriorCardGrid columns={2}>
          {outcomes.map((outcome) => <InteriorCard key={outcome.number} {...outcome} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorCta
        eyebrow="Start with the customer question"
        title="Find out what is really driving the decision."
        text="A strategy call identifies the audience, business question, available customer access, and the right starting scope for behavioral research."
        action={{ label: "Book a Strategy Call", href: contact.strategy }}
      />
    </main>
  </PageShell>;
}
