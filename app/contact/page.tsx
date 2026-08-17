import { InteriorComingSoon } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

type Intent = "expert" | "strategy" | "partner";

const states: Record<Intent, {
  eyebrow: string;
  title: string;
  text: string;
  action: { label: string; href: string };
}> = {
  expert: {
    eyebrow: "Talk to an expert",
    title: "Expert conversations are coming soon.",
    text: "This is where you’ll be able to connect with Dāginty about personal data wellness, human-driven cyber risk, consent, provenance, and accountable data.",
    action: { label: "Explore the ecosystem", href: "/ecosystem" },
  },
  strategy: {
    eyebrow: "Strategy call",
    title: "Strategy call scheduling is coming soon.",
    text: "This is where leaders will be able to start a conversation about program design, behavioral research, adoption, measurement, and the business case for data wellness.",
    action: { label: "Explore services", href: "/services" },
  },
  partner: {
    eyebrow: "Partner inquiry",
    title: "Partner inquiries are coming soon.",
    text: "This is where MSPs will be able to explore a recurring managed data-wellness service and benefits brokers a practical employee benefit—each supported by aggregate program evidence and a clear path from pilot to renewal.",
    action: { label: "Explore partners", href: "/partners" },
  },
};

export const metadata = {
  title: "Contact Dāginty",
  description: "Dāginty contact options are coming soon.",
};

function normalizeIntent(value?: string): Intent {
  return value === "strategy" || value === "partner" ? value : "expert";
}

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ intent?: string }> }) {
  const params = await searchParams;
  const state = states[normalizeIntent(params.intent)];

  return <PageShell variant="interior">
    <InteriorComingSoon {...state} />
  </PageShell>;
}
