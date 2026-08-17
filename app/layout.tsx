import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter=Inter({variable:"--font-sans",subsets:["latin"]});
const geist=Geist({variable:"--font-interior-sans",subsets:["latin"]});
const geistMono=Geist_Mono({variable:"--font-interior-mono",subsets:["latin"]});

export async function generateMetadata():Promise<Metadata>{
  const requestHeaders=await headers();
  const host=requestHeaders.get("x-forwarded-host")??requestHeaders.get("host")??"staging.cluzydatawellness.com";
  const protocol=requestHeaders.get("x-forwarded-proto")??(host.startsWith("localhost")?"http":"https");
  const socialImage=`${protocol}://${host}/og.png`;
  const description="Dāginty provides personal data control for the AI economy, connecting people, organizations, and trusted partners through consent, provenance, and measurable data wellness.";
  return {
    title:{default:"Dāginty | Personal Data Control for the AI Economy",template:"%s"},
    description,
    robots:{index:false,follow:false},
    icons:{icon:"/favicon.svg",shortcut:"/favicon.svg"},
    openGraph:{title:"Personal data control for the AI economy",description,type:"website",images:[{url:socialImage,width:1200,height:630,alt:"Dāginty — Personal data control for the AI economy"}]},
    twitter:{card:"summary_large_image",title:"Personal data control for the AI economy",description,images:[socialImage]},
  };
}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${inter.variable} ${geist.variable} ${geistMono.variable}`}>{children}</body></html>}
