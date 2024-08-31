import "@/styles/globals.css";
import Navbar from "@/common/Navbar";
import Footer from "@/common/Footer";
import { Suspense } from "react";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`relative grid grid-cols-12 gap-0 auto-rows-max`}>
      <Navbar isAuth={false} />

      <main className="w-full col-span-12 mb-24 overflow-auto auto-rows-auto min-h-full-minus-80 sm:h-full sm:overflow-hidden">
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

      <footer className="flex items-center justify-center w-full col-span-12 mx-auto">
        <Footer />
      </footer>
    </div>
  );
}
