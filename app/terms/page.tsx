import { InteriorComingSoon } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Terms of Use | Dāginty",
  description: "The Dāginty Terms of Use are coming soon.",
};

export default function TermsPage() {
  return <PageShell variant="interior">
    <InteriorComingSoon
      eyebrow="Terms of Use"
      title="Our Terms of Use are coming soon."
      text="We’re preparing clear terms that explain how this website and its materials may be accessed and used."
      action={{ label: "Return home", href: "/" }}
    />
  </PageShell>;
}
