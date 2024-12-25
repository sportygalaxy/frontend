import React, { ReactNode } from "react";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";

interface ComponentStateWrapperProps {
  isLoading: boolean;
  error?: any;
  data?: any;
  emptyMessage?: string;
  children: ReactNode;
}

const ComponentStateWrapper: React.FC<ComponentStateWrapperProps> = ({
  isLoading,
  error,
  data,
  emptyMessage = "No data available.",
  children,
}) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <SportygalaxyLoadingIndicator />
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <p className="text-center text-red-500">
        {error?.message || "Something went wrong."}
      </p>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return <p className="text-center text-gray-500">{emptyMessage}</p>;
  }

  return <>{children}</>;
};

export default ComponentStateWrapper;
