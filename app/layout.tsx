import {
  appDescription,
  appSeoKeywords,
  appTitle,
  webBaseUrl,
} from "@/api/constants";
import LenisScroll from "@/common/LenisScroll";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import TopLoader from "@/common/Loaders/TopLoader";
import { logoUrl, NAV_CONSTANT } from "@/constants/appConstants";
import getPageTitle from "@/helpers/getPageTitle";
import getScriptJson from "@/helpers/getScriptJson";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Jost } from "next/font/google";
import Script from "next/script";
import { Suspense } from "react";
import { Toaster } from "sonner";
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
const tiktokPixelIds = [
  "D4OP2IBC77UA1JCQ6M1G",
  "D4OVECBC77U4IAHDU1L0",
].filter(Boolean);
const tiktokLoadCalls = tiktokPixelIds
  .map((id) => `ttq.load('${id}');`)
  .join("\n");

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className}`}>
        <ReactQueryProvider>
          {/* TikTok Pixels */}
          <Script
            id="tiktok-pixels"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                  !function (w, d, t) {
                    w.TiktokAnalyticsObject = t;
                    var ttq = (w[t] = w[t] || []);
                    ttq.methods = ["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"];
                    ttq.setAndDefer = function (obj, method) {
                      obj[method] = function () {
                        obj.push([method].concat(Array.prototype.slice.call(arguments, 0)));
                      };
                    };
                    for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
                    ttq.instance = function (id) {
                      for (var inst = ttq._i[id] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(inst, ttq.methods[n]);
                      return inst;
                    };
                    ttq.load = function (pixelId, config) {
                      var url = "https://analytics.tiktok.com/i18n/pixel/events.js";
                      ttq._i = ttq._i || {};
                      ttq._i[pixelId] = [];
                      ttq._i[pixelId]._u = url;
                      ttq._t = ttq._t || {};
                      ttq._t[pixelId] = +new Date();
                      ttq._o = ttq._o || {};
                      ttq._o[pixelId] = config || {};
                      config = d.createElement("script");
                      config.type = "text/javascript";
                      config.async = true;
                      config.src = url + "?sdkid=" + pixelId + "&lib=" + t;
                      pixelId = d.getElementsByTagName("script")[0];
                      pixelId.parentNode.insertBefore(config, pixelId);
                    };
                    ${tiktokLoadCalls}
                    ttq.page();
                  }(window, document, 'ttq');
                `,
            }}
          />

          {/* Meta Pixel */}
          <Script
            id="meta-pixel"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document, 'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '2158765044666889');
      fbq('track', 'PageView');
    `,
            }}
          />

          <noscript
            dangerouslySetInnerHTML={{
              __html: `
      <img
        height="1"
        width="1"
        style="display:none"
        src="https://www.facebook.com/tr?id=2158765044666889&ev=PageView&noscript=1"
        alt="facebook-pixel"
      />
    `,
            }}
          />

          {/* Google Tag */}
          <Script
            strategy="afterInteractive"
            src="https://www.googletagmanager.com/gtag/js?id=G-Y0F6H3CQZL"
          ></Script>
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-Y0F6H3CQZL');
    `,
            }}
          />
          <Script
            id="google-purchase-conversion"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
      window.addEventListener('sg:purchase', function (event) {
        window.dataLayer = window.dataLayer || [];
        window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
        var detail = (event && event.detail) || {};
        window.gtag('event', 'conversion_event_purchase_2', detail);
      });
    `,
            }}
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
          <LenisScroll />
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

      <script src="https://js.paystack.co/v2/inline.js" async></script>
    </html>
  );
}
