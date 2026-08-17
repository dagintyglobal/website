import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";
import { contact } from "../site-data";

export const metadata = {
  title: "Partners | Dāginty",
  description: "Add personal data wellness to the security or benefits services you already provide clients.",
};

const partnerPaths = [
  {
    number: "01",
    title: "MSP",
    text: "Package a recurring employee data-wellness service that helps SMB clients reduce the personal-data exposure that enables credible social engineering—and brings aggregate progress into client reviews.",
    href: "/partners/msps",
    action: "Explore the MSP program",
  },
  {
    number: "02",
    title: "Benefits broker",
    text: "Give employer clients a practical benefit that supports employee agency, healthier digital habits, and human-risk reduction.",
    href: "/partners/benefits-brokers",
    action: "Explore the broker program",
  },
];

const enablement = [
  "Experience data wellness internally",
  "Select pilot-ready SMB clients",
  "Launch a 90-day program",
  "Report aggregate progress and modeled value",
  "Renew and expand across accounts",
];

export default function PartnersPage() {
  return <PageShell variant="interior">
    <main className="interior-main partner-interior">
      <InteriorHero
        eyebrow="For MSPs and benefits brokers"
        title="Give your clients a practical way to reduce human-driven risk."
        deck="Add personal data wellness to the services and relationships you already lead—helping clients support employees, reduce exposure, and see measurable progress."
        primary={{ label: "Talk to an Expert", href: "#partner-paths" }}
      />

      <InteriorSection
        id="partner-paths"
        eyebrow="Built for your business"
        title="Extend the value you already deliver."
        text="Whether you lead security or benefits conversations, Dāginty gives you a program designed to fit how you serve clients."
      >
        <InteriorCardGrid columns={2}>
          {partnerPaths.map((path) => <InteriorCard key={path.number} {...path} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="How you get started"
        title="From firsthand experience to a proven client program."
        text="Begin with your own team, then launch focused 90-day client programs. Track aggregate participation, completed actions, modeled risk reduction, and financial value before renewal and expansion."
        dark
      >
        <div className="interior-process-grid">
          {enablement.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>
      </InteriorSection>

      <InteriorCta
        eyebrow="Integrate Data Wellness"
        title="Give clients measurable value beyond the services they already expect."
        text="Tell us how you serve clients today, and we’ll explore where data wellness fits."
        action={{ label: "Talk to an Expert", href: contact.expert }}
      />
    </main>
  </PageShell>;
}
