import { DesktopTitle, MobileTitle } from "@/common/Title";
import Divider from "@/common/Divider";

import Hero from "./_components/Hero";
import Introduction from "./_components/Introduction";
import NewsLetter from "./_components/NewsLetter";

import Products from "@/components/product/Products";
import Featured from "@/components/featured/Featured";
import Categories from "@/components/category/Categories";
import SeeAll from "./_components/SeeAll";

export default function LandingPage() {
  return (
    <>
      {/* Development */}
      <div className="desktop-tablet-view wrapper mt-5 sm:mt-0">
        <Products />
      </div>

      {/* Desktop contents */}
      {/* <>
        <div className="relative">
          <Hero />
        </div>
        <div className="wrapper mt-9 sm:mt-0">
          <DesktopTitle title="NEW ARRIVAL." />
        </div>
        <div className="desktop-tablet-view wrapper mt-5 sm:mt-0">
          <Products />
        </div>
        <SeeAll
          text="See All"
          path="/"
          className="desktop-tablet-view wrapper mt-20"
        />
        <div className="desktop-tablet-view wrapper mt-8 xl:mt-10">
          <Divider />
        </div>

        <div className="desktop-tablet-view wrapper mt-24">
          <Introduction
            title="Our Varied Collections"
            subtitle="Enhance your training sessions with our cutting-edge sports equipment. From ergonomic weights to resistance bands and smart fitness trackers, our collection includes everything you need to optimize your performance and track your progress."
          />
        </div>

        <div className="desktop-tablet-view wrapper mt-28">
          <Featured />
        </div>

        <div className="desktop-tablet-view wrapper mt-32">
          <Introduction
            title="Introducing our Exclusive coming soon"
            subtitle="Get ready to take your game to the next level with our highly
        anticipated upcoming sports collection! Designed for athletes of all
        levels, our new range combines cutting-edge technology, premium
        materials, and stylish designs to help you perform at your best. "
            caption="collection."
          />
        </div>

        <div className="desktop-tablet-view wrapper mt-28">
          <Categories />
        </div>
        <SeeAll
          text="See All"
          path="/"
          className="desktop-tablet-view wrapper mt-28"
        />

        <div className="desktop-tablet-view mt-24 w-full">
          <NewsLetter />
        </div>
      </> */}

      {/* Mobile contents */}
      {/* <>
        <div className="wrapper mt-9 sm:mt-0">
          <MobileTitle title="Best selling" path="" />
        </div>
        <div className="mobile-desktop-tablet-view wrapper mt-5 sm:mt-0">
          <Products isMobile />
        </div>

        <div className="wrapper mt-10 sm:mt-0">
          <MobileTitle title="Recently viewed" path="" />
        </div>
        <div className="mobile-desktop-tablet-view wrapper mt-5 sm:mt-0">
          <Products isMobile isHorizontalScroll />
        </div>
      </> */}
    </>
  );
}
