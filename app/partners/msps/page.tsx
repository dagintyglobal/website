import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../../components/Interior";
import { PageShell } from "../../components/SiteChrome";
import { contact } from "../../site-data";

export const metadata = {
  title: "MSP Partners | Dāginty",
  description: "Package, deliver, measure, and renew a recurring employee data-wellness service for SMB security clients.",
};

const benefits = [
  { number: "01", title: "Existing controls protect systems", text: "Firewalls, EDR, MFA, email security, and identity tools protect infrastructure and access." },
  { number: "02", title: "Data wellness reduces exposed personal data", text: "Help employees address the identity, contact, relationship, and behavioral information attackers use to make social engineering credible." },
  { number: "03", title: "Aggregate evidence supports client reviews", text: "Show participation, completed actions, modeled threat reduction, and financial value without exposing employee-level records." },
  { number: "04", title: "Recurring managed value", text: "Turn personal-data risk reduction into an ongoing client service rather than a one-time training event." },
];

const rollout = [
  "Experience the program internally",
  "Package the offer with Dāginty enablement",
  "Select an SMB client and launch a 90-day pilot",
  "Review aggregate results and modeled ROI",
  "Convert to annual delivery and expand",
];

const ownership = [
  { number: "01", title: "MSP", text: "See only aggregate participation, completed actions, deletion activity, modeled threat reduction, and ROI for client reporting—never individual employee records." },
  { number: "02", title: "Employee", text: "Privately review, cleanse, and track their own exposure while controlling their personal information and actions." },
  { number: "03", title: "Dāginty", text: "Provide the platform, onboarding, employee journey, partner enablement, and aggregate reporting while preserving the privacy boundary." },
];

export default function MspPage() {
  return <PageShell variant="interior">
    <main className="interior-main partner-interior">
      <InteriorHero
        eyebrow={<>For managed service providers (<span className="preserve-case">MSPs</span>)</>}
        title="Add a measurable human layer to the security services you already deliver."
        deck="Add a billable employee data-wellness service to your managed security stack—one you can package, deploy, measure, and renew across SMB accounts."
        primary={{ label: "Become a partner", href: "#msp-program" }}
      />

      <InteriorSection
        id="msp-program"
        className="partner-program"
        eyebrow="Built for MSP delivery"
        title="Protect systems. Reduce the personal-data attack surface."
        text="Your existing stack protects infrastructure and access. Data wellness addresses the exposed personal information attackers use to make social engineering more credible."
      >
        <InteriorCardGrid columns={2}>
          {benefits.map((benefit) => <InteriorCard key={benefit.number} {...benefit} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="How you get started"
        title="From internal experience to recurring client delivery."
        text="Dāginty provides the playbook, sales materials, campaign templates, onboarding, and ongoing support you need to package the offer, prove it with a focused pilot, and expand it across your portfolio."
        dark
      >
        <div className="interior-process-grid">
          {rollout.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>
      </InteriorSection>

      <InteriorSection
        eyebrow="What each party sees"
        title="Personal control. Aggregate evidence."
        text="Employees privately manage their own exposure. MSPs and employers receive aggregate program results—not individual exposure records, personal information, or employee decisions."
      >
        <InteriorCardGrid columns={3}>
          {ownership.map((owner) => <InteriorCard key={owner.number} {...owner} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorCta
        eyebrow="Integrate Data Wellness"
        title="Make personal-data risk reduction part of your managed offer."
        text="Tell us about your client base and security services, and we’ll explore where a first internal or client program fits."
        action={{ label: "Talk to an Expert", href: contact.expert }}
      />
    </main>
  </PageShell>;
}
