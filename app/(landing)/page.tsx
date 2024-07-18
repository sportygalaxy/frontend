import Title from "@/common/Title";
import Hero from "./_components/Hero";
import Products from "./_components/Products";
import { Button } from "@/components/ui/button";
import DownSharpArrowIcon from "@/assets/icons/pack/DownSharpArrow";
import Divider from "@/common/Divider";
import Introduction from "./_components/Introduction";
import Featured from "./_components/Featured";
import Categories from "./_components/Categories";

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <Hero />
      </div>

      <div className="wrapper mt-9 sm:mt-0">
        <Title />
      </div>

      <>
        <div className="wrapper mt-5 sm:mt-0">
          <Products />
        </div>

        <div className="tablet-view wrapper mt-20 flex items-center justify-center">
          <Button
            className="font-medium text-mobile-xl md:text-xl py-4 px-14"
            variant="outline"
            size="lg"
          >
            Sell All <DownSharpArrowIcon className="ml-2" />
          </Button>
        </div>
      </>

      <div className="tablet-view wrapper mt-8 xl:mt-10">
        <Divider />
      </div>

      <div className="mt-24">
        <Introduction
          title="Our Varied Collections"
          subtitle="Enhance your training sessions with our cutting-edge sports equipment. From ergonomic weights to resistance bands and smart fitness trackers, our collection includes everything you need to optimize your performance and track your progress."
        />
      </div>

      <div className="tablet-view wrapper mt-28">
        <Featured />
      </div>

      <div className="mt-32">
        <Introduction
          title="Introducing our Exclusive coming soon"
          subtitle="Get ready to take your game to the next level with our highly
        anticipated upcoming sports collection! Designed for athletes of all
        levels, our new range combines cutting-edge technology, premium
        materials, and stylish designs to help you perform at your best. "
          caption="collection."
        />
      </div>

      <>
        <div className="tablet-view wrapper mt-28">
          <Categories />
        </div>

        <div className="tablet-view wrapper mt-28 flex items-center justify-center">
          <Button
            className="font-medium text-mobile-xl md:text-xl py-4 px-14"
            variant="outline"
            size="lg"
          >
            Sell All <DownSharpArrowIcon className="ml-2" />
          </Button>
        </div>
      </>

      
    </>
  );
}
