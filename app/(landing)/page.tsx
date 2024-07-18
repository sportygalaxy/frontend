import Title from "@/common/Title";
import Hero from "./_components/Hero";
import Products from "./_components/Products";

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <Hero />
      </div>

      <div className="wrapper mt-5 sm:mt-0">
        <Title />
      </div>

      <div className="wrapper mt-5 sm:mt-0">
        <Products />
      </div>
    </>
  );
}
