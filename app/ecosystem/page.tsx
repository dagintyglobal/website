import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";
import { contact, mechanism } from "../site-data";

export const metadata = {
  title: "Ecosystem | Dāginty",
  description: "How Dāginty connects personal data wellness, partner delivery, and accountable data infrastructure.",
};

const layers = [
  {
    number: "01",
    title: "Data wellness",
    text: "Build practical habits that help people understand, protect, and take control of their personal data.",
  },
  {
    number: "02",
    title: "Threat reduction",
    text: "Use personal data wellness to give employers and their trusted partners a measurable way to lower human-driven risk.",
  },
  {
    number: "03",
    title: "Data infrastructure",
    text: "Give data buyers trusted personal data backed by consent, provenance, accountability, and a receipt for every data point.",
  },
];

const outcomes = [
  {
    number: "01",
    title: "Individuals",
    text: "Gain clearer choices, practical protection, and a healthier relationship with personal data and digital life.",
  },
  {
    number: "02",
    title: "Employees",
    text: "Reduce personal exposure and strengthen everyday digital habits without surrendering personal records or decisions.",
  },
  {
    number: "03",
    title: "Organizations",
    text: "Reduce human-driven risk and make aggregate improvement visible through measurable program signals.",
  },
  {
    number: "04",
    title: "Data Consumers",
    text: "Work from information connected to ownership, consent, and provenance instead of assumptions people never confirmed.",
  },
];

export default function EcosystemPage() {
  return <PageShell variant="interior">
    <main className="interior-main content-interior ecosystem-interior">
      <InteriorHero
        eyebrow="From personal agency to accountable data"
        title="Connect personal data wellness, partner delivery, and accountable infrastructure."
        deck="Dāginty gives people meaningful control over personal data while helping partners and organizations reduce exposure, measure progress, and build data with receipts."
        primary={{ label: "Explore the ecosystem", href: "#ecosystem-layers" }}
      />

      <InteriorSection
        id="ecosystem-layers"
        className="interior-page-entry"
        eyebrow="Three connected layers"
        title="One model from personal agency to accountable data."
        text="Each layer creates value on its own. Together, they connect healthier data habits, trusted client delivery, and infrastructure that can show where information came from."
      >
        <InteriorCardGrid columns={3}>
          {layers.map((layer) => <InteriorCard key={layer.number} {...layer} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="The data-wellness mechanism"
        title="A simple loop people can repeat as their digital lives change."
        text="The same understandable sequence connects personal action to aggregate improvement across the ecosystem."
        dark
      >
        <InteriorCardGrid columns={4}>
          {mechanism.map((step) => <InteriorCard key={step.number} {...step} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="Shared value"
        title="Better personal data creates better outcomes across the system."
        text="Ownership, healthier habits, measurable progress, and provenance improve the relationship between people and the organizations that depend on data."
      >
        <InteriorCardGrid columns={2}>
          {outcomes.map((outcome) => <InteriorCard key={outcome.number} {...outcome} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorCta
        eyebrow="Explore the model"
        title="Find the clearest entry point into the ecosystem."
        text="Start with personal data wellness, partner delivery, or accountable data infrastructure based on the problem you need to solve."
        action={{ label: "Talk to an Expert", href: contact.expert }}
      />
    </main>
  </PageShell>;
}
