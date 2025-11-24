"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  BRAND_NAME,
  BUSINESS_ADDRESS,
  WEBSITE,
} from "@/constants/appConstants";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background text-primary flex flex-col items-center py-16 px-6 md:px-20">
      {/* Header Section */}
      <div className="text-center max-w-3xl mb-10">
        <h1 className="text-4xl font-bold mb-3">About Us</h1>
        <p className="text-secondary text-sm md:text-lg">
          Welcome to <strong className="text-black">{BRAND_NAME}</strong>, your trusted destination for
          premium-quality gym and sports equipment. We are passionate about
          helping athletes, fitness enthusiasts, and active individuals reach
          their peak performance by providing durable, affordable, and
          accessible fitness gear.
        </p>
      </div>

      {/* Brand Card */}
      <Card className="w-full md:w-[70%] lg:w-[60%] border-none bg-card/50 backdrop-blur">
        <Separator />
        <CardContent className="p-8 space-y-6">
          <h2 className="text-2xl font-semibold text-center">Our Mission</h2>
          <p className="text-center text-secondary text-sm md:text-lg leading-relaxed">
            To inspire an active lifestyle through high-quality sports and
            fitness products that empower everyone, from beginners to
            professionals, to stay healthy, strong, and motivated.
          </p>

          <Separator />

          <h2 className="text-2xl font-semibold text-center">Our Values</h2>
          <ul className="list-disc list-inside text-secondary text-sm md:text-lg leading-relaxed">
            <li>Integrity — We prioritize trust and transparency.</li>
            <li>Quality — We deliver durable, reliable fitness gear.</li>
            <li>
              Accessibility — We make quality sports equipment available to
              all.
            </li>
            <li>
              Innovation — We continually improve for your performance.
            </li>
          </ul>

          <Separator />

          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-2">Our Office</h2>
            <p className="text-secondary text-sm md:text-lg">{BUSINESS_ADDRESS}</p>
            <p>
              <a
                href={WEBSITE}
                target="_blank"
                className="text-primary font-semibold hover:underline"
              >
                {WEBSITE}
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
