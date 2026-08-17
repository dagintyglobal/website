import { InteriorComingSoon } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Privacy Policy | Dāginty",
  description: "The Dāginty Privacy Policy is coming soon.",
};

export default function PrivacyPage() {
  return <PageShell variant="interior">
    <InteriorComingSoon
      eyebrow="Privacy Policy"
      title="Our Privacy Policy is coming soon."
      text="We’re preparing clear information about how Dāginty handles personal information and respects the privacy of people who visit and use this website."
      action={{ label: "Return home", href: "/" }}
    />
  </PageShell>;
}
