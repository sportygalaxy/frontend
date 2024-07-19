import { FC } from "react";
import SportygalaxyLoadingIndicator from "./SportygalaxyLoadingIndicator";

export type AppLoaderProps = {
  className?: string;
};

const AppLoader: FC<AppLoaderProps> = ({ className = "" }) => {
  return (
    <div
      aria-busy="true"
      aria-label="loading"
      className={`flex-1 w-full h-full flex items-center justify-center bg-background ${className}`}
    >
      <SportygalaxyLoadingIndicator />
    </div>
  );
};

export default AppLoader;
