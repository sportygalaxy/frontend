import TopNavbarMobile from "./TopNavbarMobile";
import TopNavbarDesktop from "./TopNavbarDesktop";

export default function Navbar() {
  return (
    <>
      <section className="hidden sm:flex w-full items-center justify-center">
        <TopNavbarDesktop />
      </section>

      <section className="flex sm:hidden w-full mt-14">
        <TopNavbarMobile />
      </section>
    </>
  );
}
