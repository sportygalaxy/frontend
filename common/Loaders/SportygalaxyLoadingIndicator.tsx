import { FC } from "react";
import LogoMobileIcon from "@/assets/icons/pack/LogoMobile";
import SpinnerIcon from "@/assets/icons/pack/Spinner";

export type SportygalaxyLoadingIndicatorProps = {
  className?: string;
};

const SportygalaxyLoadingIndicator: FC<SportygalaxyLoadingIndicatorProps> = ({ className = "" }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-3">
      <LogoMobileIcon />
      <SpinnerIcon width="20" height="20" color="grey" />
    </div>
  );
};

export default SportygalaxyLoadingIndicator;
