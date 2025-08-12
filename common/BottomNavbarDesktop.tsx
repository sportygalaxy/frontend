"use client";
import FacebookIcon from "@/assets/icons/pack/Facebook";
import Logo from "./Logo";
import InstagramIcon from "@/assets/icons/pack/Instagram";
import XIcon from "@/assets/icons/pack/X";
import TiktokIcon from "@/assets/icons/pack/Tiktok";
import WhatsappIcon from "@/assets/icons/pack/Whatsapp";
import Link from "next/link";
import { NAV_CONSTANT } from "@/constants/appConstants";

const BottomNavbarDesktop = () => {
  const navLinks = {
    Categories: [
      { name: "All products", href: "/products" },
      {
        name: "Gym equipments",
        href: "/products?category=123e4567-e89b-12d3-a456-426614174029",
      },
      {
        name: "Sport equipments",
        href: "/products?category=123e4567-e89b-12d3-a456-426614174042",
      },
    ],
    "Customer Care": [
      { name: "+2347072215324", href: "https://wa.me/2347072215324" },
      { name: "+2349027338732", href: "tel:+2349027338732" },
      { name: "+2348116370946", href: "tel:+2348116370946" },
    ],
    Company: [
      {
        name: "Copyright and Trademark Disclaimer",
        href: "/copyright-and-trademark-disclaimer-policy",
      },
      {
        name: "Warranty and Return Policy",
        href: "/warranty-and-return-policy",
      },
      {
        name: "Customer Protection and Customer Rights Policy",
        href: "/customer-protection-and-customer-right-policy",
      },
    ],
  };
  const contactNavLinks = {
    "Lets Talk": ["hello@academiq.com", "Address", "Number"],
  };

  const socialMediaLinks = [
    {
      name: "Facebook",
      url: NAV_CONSTANT.FACEBOOK_URL,
      icon: <FacebookIcon color="white" />,
    },
    {
      name: "Instagram",
      url: NAV_CONSTANT.INSTAGRAM_URL,
      icon: <InstagramIcon color="white" />,
    },
    {
      name: "X",
      url: NAV_CONSTANT.X_URL,
      icon: <XIcon color="white" />,
    },
    {
      name: "Tiktok",
      url: NAV_CONSTANT.TIKTOK_URL,
      icon: <TiktokIcon color="white" />,
    },
    {
      name: "Whatsapp",
      url: NAV_CONSTANT.WHATSAPP_LINK,
      icon: <WhatsappIcon color="white" />,
    },
  ];
  return (
    <div className="wrapper bg-primary pt-16 pb-24 flex flex-col w-full gap-32">
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between w-full h-full gap-32 lg:gap-0">
        <div>
          <Logo color="white" isFooter />
        </div>

        <div className="grid grid-cols-2 gap-6 md:gap-12 md:flex md:space-x-12">
          {Object.entries(navLinks).map(([section, links]) => (
            <div
              key={section}
              className="space-y-5 flex flex-col items-center justify-start"
            >
              <p className="font-semibold text-center text-primary-foreground text-mobile-2xl sm:text-2xl">
                {section}
              </p>
              <ul className="space-y-3 flex flex-col items-center justify-start">
                {links.map((link, index) => (
                  <li key={index} className="cursor-pointer">
                    <Link
                      href={link.href}
                      className="text-primary-foreground font-normal text-xl hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 md:flex md:flex-wrap md:items-center md:justify-center lg:max-w-44 xl:max-w-80">
          {socialMediaLinks.map(({ name, url, icon }) => (
            <div
              key={name}
              className="cursor-pointer"
              onClick={() => window.open(url, "_blank")}
              aria-label={`Visit us on ${name}`}
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center w-full">
        <p className="font-normal text-2xl text-primary-foreground">
          Sporty Galaxy, all rights reserved
        </p>
      </div>
    </div>
  );
};

export default BottomNavbarDesktop;
