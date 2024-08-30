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

      <main className="col-span-12 auto-rows-auto w-full min-h-full-minus-80 mb-24 sm:h-full overflow-auto sm:overflow-hidden">
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
    </div>
  );
}
