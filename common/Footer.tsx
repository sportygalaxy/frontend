import BottomNavbarDesktop from "./BottomNavbarDesktop";
import BottomNavbarMobile from "./BottomNavbarMobile";

export default function Footer() {
  return (
    <>
      <section className="bg-primary hidden sm:flex w-full items-center justify-center">
        <BottomNavbarDesktop />
      </section>

      <section className="fixed bottom-0 h-20 flex sm:hidden w-full z-10">
        <BottomNavbarMobile />
      </section>
    </>
  );
}
