import { InteriorCard, InteriorCardGrid, InteriorCta, InteriorHero, InteriorSection } from "../../components/Interior";
import { PageShell } from "../../components/SiteChrome";
import { contact } from "../../site-data";

export const metadata = {
  title: "Benefits Broker Partners | Dāginty",
  description: "A practical data wellness and behavior-change program for benefits brokers.",
};

const benefits = [
  { number: "01", title: "Employee value", text: "Help people reduce the personal information that makes scams, phishing, vishing, and account attacks more credible." },
  { number: "02", title: "Practical wellbeing", text: "Add guided data cleanup and healthier digital habits to the benefits employees already understand and use." },
  { number: "03", title: "Visible client value", text: "Show aggregate participation, completed actions, and modeled risk reduction without exposing individual employee records." },
  { number: "04", title: "A renewal story", text: "Give employer clients an ongoing program that connects employee agency with measurable human-risk reduction." },
];

const rollout = [
  "Identify employer-client fit",
  "Align benefits and security sponsors",
  "Frame the employee value",
  "Launch a 90-day program",
  "Share aggregate progress at renewal",
];

export default function BrokerPage() {
  return <PageShell variant="interior">
    <main className="interior-main partner-interior">
      <InteriorHero
        eyebrow="For benefits brokers"
        title="Give employer clients a data-wellness benefit employees can act on."
        deck="Add a practical program to your benefits offering that helps employees take control of personal-data exposure while giving employers an aggregate view of participation and progress."
        primary={{ label: "Become a partner", href: "#broker-program" }}
      />

      <InteriorSection
        id="broker-program"
        className="partner-program"
        eyebrow="Built for benefits conversations"
        title="Extend total rewards into everyday digital life."
        text="Offer employees practical support they can use personally while giving employer clients a differentiated benefit with a credible risk-reduction story."
      >
        <InteriorCardGrid columns={2}>
          {benefits.map((benefit) => <InteriorCard key={benefit.number} {...benefit} />)}
        </InteriorCardGrid>
      </InteriorSection>

      <InteriorSection
        eyebrow="How you get started"
        title="From employer fit to renewal-ready results."
        text="Identify the right employer clients, align internal sponsors, introduce the program through employee value, and use aggregate progress to support renewal conversations."
        dark
      >
        <div className="interior-process-grid">
          {rollout.map((step, index) => <div key={step}><span>0{index + 1}</span><strong>{step}</strong></div>)}
        </div>
        <blockquote className="interior-boundary">Employers and brokers receive aggregate program signals—not individual personal data, exposure records, or decisions.</blockquote>
      </InteriorSection>

      <InteriorCta
        eyebrow="Integrate Data Wellness"
        title="Add personal-data wellness to your benefits offering."
        text="Tell us about your employer clients, benefits strategy, and renewal calendar, and we’ll identify where a 90-day data-wellness program fits."
        action={{ label: "Talk to an Expert", href: contact.expert }}
      />
    </main>
  </PageShell>;
}
