import { ResearchExperience } from "./ResearchExperience";
import { PageShell } from "../components/SiteChrome";

export const metadata={title:"Dāginty Research Lab | Whitepaper & ROI Calculator",description:"Read the Employee Data Wellness as Cybersecurity whitepaper and explore the interactive expected-loss reduction model."};

export default async function ResearchPage({searchParams}:{searchParams:Promise<{view?:string}>}){
  const params=await searchParams;
  const initialView=params.view==="calculator"?"calculator":"whitepaper";
  return <PageShell variant="interior" className="research-site-shell" headerStickThreshold={0}><div className="research-shell"><ResearchExperience initialView={initialView} homeHref="/"/></div></PageShell>;
}
