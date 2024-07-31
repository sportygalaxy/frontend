import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/common/Navbar";
import Footer from "@/common/Footer";
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
      <body
        className={`${jost.className} relative grid grid-cols-12 gap-0 auto-rows-max`}
      >
        <ReactQueryProvider>
          <Navbar />

          <main className="col-span-12 auto-rows-auto w-full h-full-minus-80 sm:h-full overflow-auto sm:overflow-hidden">
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
            </Suspense>
          </main>

          <footer className="col-span-12 mx-auto w-full flex justify-center items-center">
            <Footer />
          </footer>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
