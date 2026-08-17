import { InteriorComingSoon } from "../components/Interior";
import { PageShell } from "../components/SiteChrome";

export const metadata = {
  title: "Products | Dāginty",
  description: "Dāginty personal data ownership products are coming soon.",
};

export default function ProductsPage() {
  return <PageShell variant="interior">
    <InteriorComingSoon
      eyebrow="Products"
      title="Dāginty products are coming soon."
      text="This is where Dāginty’s personal data ownership products will be introduced—connecting data wellness, consent, provenance, and accountable data infrastructure."
      action={{ label: "Explore data wellness", href: "/data-wellness" }}
    />
  </PageShell>;
}
