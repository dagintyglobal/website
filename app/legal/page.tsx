import { InteriorComingSoon } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Legal | Dāginty",
  description: "Dāginty Terms of Service and Privacy Policy are coming soon.",
};

export default function LegalPage() {
  return <PageShell variant="interior">
    <InteriorComingSoon
      eyebrow="Legal"
      title="Terms and privacy are coming soon."
      text="This is where Dāginty’s Terms of Service and Privacy Policy will live. We’re preparing clear language that explains how the website may be used and how personal information is handled."
      action={{ label: "Return home", href: "/" }}
    />
  </PageShell>;
}
