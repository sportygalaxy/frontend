"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  BRAND_NAME,
  NAV_CONSTANT,
  BUSINESS_ADDRESS,
  EMAIL,
  COUNTRY_CODE,
  PHONE_NUMBER,
} from "@/constants/appConstants";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import FacebookIcon from "@/assets/icons/pack/Facebook";
import InstagramIcon from "@/assets/icons/pack/Instagram";
import XIcon from "@/assets/icons/pack/X";
import TiktokIcon from "@/assets/icons/pack/Tiktok";
import WhatsappIcon from "@/assets/icons/pack/Whatsapp";
import ContactUsForm from "../_components/ContactUsForm";

export default function ContactUs() {
  const [loading, setLoading] = useState(false);

  const socialLinks = [
    {
      name: "Facebook",
      icon: <FacebookIcon />,
      url: NAV_CONSTANT.FACEBOOK_URL,
    },
    {
      name: "Instagram",
      icon: <InstagramIcon />,
      url: NAV_CONSTANT.INSTAGRAM_URL,
    },
    { name: "X", icon: <XIcon />, url: NAV_CONSTANT.X_URL },
    { name: "Tiktok", icon: <TiktokIcon />, url: NAV_CONSTANT.TIKTOK_URL },
    {
      name: "Whatsapp",
      icon: <WhatsappIcon />,
      url: NAV_CONSTANT.WHATSAPP_LINK,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Thank you for contacting us. We’ll respond shortly!");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-primary flex flex-col items-center py-16 px-6 md:px-20">
      {/* Header */}
      <div className="text-center max-w-2xl mb-10">
        <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
        <p className="text-muted-foreground text-lg">
          Have questions, feedback, or need support? Get in touch, we’re happy
          to help.
        </p>
      </div>

      {/* Contact Card */}
      <Card className="w-full md:w-[70%] lg:w-[60%] border-none bg-card/50 backdrop-blur">
        <CardContent className="p-8 space-y-10">
          <ContactUsForm />

          <Separator />

          {/* Contact Info */}
          <div className="text-center space-y-4">
            <p>
              📍 <span className="font-semibold">Address:</span>{" "}
              {BUSINESS_ADDRESS}
            </p>
            <p>
              ✉️{" "}
              <Link href={`mailto:${EMAIL}`} className="hover:underline">
                {EMAIL}
              </Link>
            </p>
            <p>
              ☎️{" "}
              <Link
                href={`tel:${COUNTRY_CODE}${PHONE_NUMBER}`}
                className="hover:underline"
              >
                {COUNTRY_CODE} {PHONE_NUMBER}
              </Link>
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center gap-6 mt-6 flex-wrap">
            {socialLinks.map(({ name, icon, url }) => (
              <div
                key={name}
                onClick={() => window.open(url, "_blank")}
                className="cursor-pointer hover:scale-110 transition-transform"
                aria-label={name}
              >
                {icon}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
