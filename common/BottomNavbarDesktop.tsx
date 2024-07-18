import FacebookIcon from "@/assets/icons/pack/Facebook";
import Logo from "./Logo";
import InstagramIcon from "@/assets/icons/pack/Instagram";

const BottomNavbarDesktop = () => {
  const navLinks = {
    Categories: ["All products", "Gym equipments", "Sport equipments"],
    "Customer Care": ["FAQ", "Shipping"],
    Company: ["Privacy Policy", "Guides"],
  };

  const contactNavLinks = {
    "Lets Talk": ["hello@academiq.com", "Address", "Number"],
  };
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
              <p className="font-semibold text-primary-foreground text-mobile-2xl sm:text-2xl">
                {section}
              </p>
              <ul className="space-y-3 flex flex-col items-center justify-start">
                {links.map((link, index) => (
                  <li key={index} className="cursor-pointer">
                    <a className="text-primary-foreground font-normal text-xl">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-8 md:flex">
          <div className="cursor-pointer">
            <FacebookIcon />
          </div>
          <div className="cursor-pointer">
            <InstagramIcon />
          </div>
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
