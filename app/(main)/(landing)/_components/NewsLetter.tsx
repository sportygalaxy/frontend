import NewsletterBg from "@/assets/images/newsletter.png";
import { Button } from "@/components/ui/button";

const NewsLetter = () => {
  return (
    <div
      className="relative isolate flex w-full items-start justify-center bg-fixed bg-cover bg-center bg-no-repeat py-20"
      style={{ backgroundImage: `url(${NewsletterBg.src})` }}
    >
      {/* <div className="absolute inset-0 bg-black/55" /> */}

      <div className="relative z-10 flex max-w-4xl flex-col items-center justify-center gap-24 rounded-3xl bg-primary py-20 px-6 sm:px-12 lg:px-36">
        <div className="flex flex-col items-center justify-center">
          <p className="text-mobile-3xl md:text-3xl font-normal font-jost text-secondary">
            Our Newsletter
          </p>
          <p className="text-mobile-5xl md:text-5xl font-bold text-primary-foreground font-jost">
            Get the latest updates
          </p>
        </div>

        <div className="flex items-center justify-center gap-2 w-full">
          <div className="border border-dark border-t-0 border-x-0 w-full">
            <input
              className="border-none bg-transparent text-primary-foreground focus:outline-none focus:ring-0 focus:border-none ml-8 placeholder:text-mobile-xl md:placeholder:text-xl placeholder:text-secondary text-mobile-xl md:text-xl py-2 w-full"
              type="text"
              placeholder="Your Email..."
            />
          </div>
          <Button variant="outline" size="lg" className="py-4 px-14">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
