import { cn } from "@/lib/utils";

type props = {
  className?: string;
  title: string;
  subtitle: string;
  caption?: string;
};

const Introduction: React.FC<props> = ({
  title,
  subtitle,
  caption,
  className,
}) => {
  return (
    <div
      className={cn(
        "tablet-view wrapper flex items-center justify-between gap-28 md:gap-64",
        className
      )}
    >
      <p className="text-mobile-5xl xl:text-5xl font-bold md:max-w-md">
        {title}
        {caption ? <span className="font-normal italic"> {caption}</span> : null}
      </p>
      <p className="font-normal text-mobile-2xl xl:text-2xl text-secondary max-w-lg md:max-w-3xl">
        {subtitle}
      </p>
    </div>
  );
};

export default Introduction;
