"use client";

import Image, { type StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import BannerOne from "@/assets/images/banner/banner1.png";
import BannerTwo from "@/assets/images/banner/banner2.png";
import BannerThree from "@/assets/images/banner/banner3.png";
import BannerFour from "@/assets/images/banner/banner4.png";
import BannerFive from "@/assets/images/banner/banner5.png";
import { Button } from "@/components/ui/button";
import { RoutesEnum } from "@/constants/routeEnums";

type Slide = {
  id: string;
  kicker?: string;
  title: string;
  description: string;
  image: StaticImageData;
  align?: "left" | "center" | "right";
};

const SLIDES: Slide[] = [
  {
    id: "december-sale",
    kicker: "Festive deals",
    title: "Explore our December sales",
    description: "Enjoy mouth watering discounts up to 60%",
    image: BannerOne,
    align: "left",
  },
  {
    id: "christmas-sale",
    kicker: "Christmas sale",
    title: "Explore our December sales",
    description: "Enjoy mouth watering discounts up to 20%",
    image: BannerTwo,
    align: "center",
  },
  {
    id: "holiday-apparels",
    kicker: "Holiday sales",
    title: "Holiday sales on apparels",
    description: "Gear up with festive discounts up to 40% off.",
    image: BannerThree,
    align: "center",
  },
  {
    id: "holiday-weights",
    kicker: "Seasonal picks",
    title: "Holiday sales",
    description: "Get up to 40% off select gym essentials.",
    image: BannerFour,
    align: "left",
  },
  {
    id: "gym-equipment",
    kicker: "Limited time",
    title: "The best discounts on every gym equipment this festive period",
    description: "Get up to 40% off across the collection.",
    image: BannerFive,
    align: "right",
  },
];

const alignmentClass = {
  left: "items-center justify-start text-left",
  center: "items-center justify-center text-center",
  right: "items-center justify-end text-right",
};

const textAlignmentClass = {
  left: "items-start text-left",
  center: "items-center text-center",
  right: "items-start text-left ml-auto",
};

const overlayGradients = {
  left: "bg-gradient-to-r from-black/75 via-black/45 to-black/10",
  center: "bg-gradient-to-r from-black/50 via-black/35 to-black/20",
  right: "bg-gradient-to-l from-black/75 via-black/45 to-black/10",
};

const HeroSlider = () => {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = SLIDES.length;

  const activeSlide = useMemo(() => SLIDES[current], [current]);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slideCount);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused, slideCount]);

  const goTo = (index: number) => {
    setCurrent(index);
  };

  const handleNext = () => goTo((current + 1) % slideCount);
  const handlePrev = () => goTo((current - 1 + slideCount) % slideCount);

  const alignment = alignmentClass[activeSlide.align ?? "left"];
  const textAlignment = textAlignmentClass[activeSlide.align ?? "left"];

  return (
    <div className="mt-7">
      <div
        className="relative w-full overflow-hidden bg-[#0b0b0b] shadow-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {SLIDES.map((slide, index) => (
            <div
              key={slide.id}
              className="relative min-w-full h-[280px] sm:h-[360px] lg:h-[500px]"
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="object-cover"
              />
              <div
                className={`pointer-events-none absolute inset-0 ${
                  overlayGradients[slide.align ?? "left"]
                }`}
              />
            </div>
          ))}
        </div>

        <div
          className={`absolute inset-0 flex py-6 wrapper sm:py-10 ${alignment}`}
        >
          <div
            className={`flex max-w-3xl flex-col space-y-4 text-white drop-shadow-[0_10px_35px_rgba(0,0,0,0.45)] lg:max-w-[720px] ${textAlignment}`}
          >
            {activeSlide.kicker ? (
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/75">
                {activeSlide.kicker}
              </p>
            ) : null}
            <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl uppercase">
              {activeSlide.title}
            </h1>
            <p className="max-w-xl text-sm font-medium text-white/80 sm:text-lg uppercase">
              {activeSlide.description}
            </p>
            <Button
              size="lg"
              className="w-fit rounded-full bg-white px-7 py-3 text-sm font-semibold text-black hover:bg-white/90 sm:text-base"
              onClick={() =>
                router.push(RoutesEnum.PRODUCTS, { scroll: false })
              }
            >
              Shop now
            </Button>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-3">
          {SLIDES.map((slide, index) => {
            const isActive = index === current;
            return (
              <button
                key={slide.id}
                onClick={() => goTo(index)}
                className="group flex items-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-7 bg-white shadow-[0_0_0_4px_rgba(255,255,255,0.25)]"
                      : "w-2.5 bg-white/60 group-hover:bg-white"
                  }`}
                />
              </button>
            );
          })}
        </div>

        <button
          aria-label="Previous banner"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 sm:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          aria-label="Next banner"
          onClick={handleNext}
          className="absolute right-4 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/35 text-white backdrop-blur-md transition hover:bg-black/55 sm:flex"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5"
          >
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default HeroSlider;
