import { DesktopTitle, MobileTitle } from "@/common/Title";
import DownSharpArrowIcon from "@/assets/icons/pack/DownSharpArrow";
import { Button } from "@/components/ui/button";
import Divider from "@/common/Divider";

import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";
import NewsLetter from "./_components/NewsLetter";

import Products from "@/components/product/Products";
import Featured from "@/components/featured/Featured";
import Categories from "@/components/category/Categories";

export default function LandingPage() {
  return (
    <>
      <div className="relative">
        <Hero />
      </div>
      <>
        <div className="wrapper mt-9 sm:mt-0">
          <DesktopTitle title="NEW ARRIVAL." />
        </div>
        <div className="tablet-view wrapper mt-5 sm:mt-0">
          <Products />
        </div>
      </>
      <>
        <div className="wrapper mt-9 sm:mt-0">
          <MobileTitle title="Best selling" path="" />
        </div>
        <div className="mobile-tablet-view wrapper mt-5 sm:mt-0">
          <Products isMobile />
        </div>

        <div className="wrapper mt-9 sm:mt-0">
          <MobileTitle title="Recently viewed" path="" />
        </div>
        <div className="mobile-tablet-view wrapper mt-5 sm:mt-0">
          <Products isMobile isHorizontalScroll />
        </div>
      </>
      <>
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
      <div className="mt-24">
        <NewsLetter />
      </div>
    </>
  );
}
