import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../styles/globals.css";
import TopLoader from "@/common/Loaders/TopLoader";
import {
  appDescription,
  appSeoKeywords,
  appTitle,
  webBaseUrl,
} from "@/api/constants";
import getPageTitle from "@/helpers/getPageTitle";
import { logoUrl, NAV_CONSTANT } from "@/constants/appConstants";
import Script from "next/script";
import getScriptJson from "@/helpers/getScriptJson";
import { Suspense } from "react";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL(webBaseUrl),
  title: getPageTitle(),
  description: appDescription,
  keywords: appSeoKeywords,
  creator: "Sportygalaxy",
  openGraph: {
    title: appTitle,
    description: appDescription,
    images: [logoUrl],
    url: webBaseUrl,
    type: "website",
    siteName: appTitle,
  },
  twitter: {
    card: "summary",
    title: appTitle,
    description: appDescription,
    images: [logoUrl],
    creator: "",
    site: "",
  },
};

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className}`}>
        <ReactQueryProvider>
          <Script
            src="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js"
          />
          <link
            href="https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css"
            rel="stylesheet"
          />
          <Script
            id="schema-organization"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: getScriptJson({
                "@context": "https://schema.org",
                "@type": "Organization", // Use 'Organization' or 'LocalBusiness' depending on your needs
                name: appTitle,
                alternateName: "Sporty Galaxy",
                url: webBaseUrl,
                logo: logoUrl,
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: NAV_CONSTANT.PHONE_NUMBER,
                  contactType: "customer service",
                  availableLanguage: "en",
                },
                sameAs: [],
              }),
            }}
          />
          <TopLoader />
          <Suspense
            fallback={
              <div className="w-screen h-screen">
                <SportygalaxyLoadingIndicator />
              </div>
            }
          >
            {children}
            <Toaster position="top-right" richColors />
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
