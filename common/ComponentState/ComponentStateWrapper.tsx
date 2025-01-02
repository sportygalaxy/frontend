import React, { ReactNode } from "react";
import SportygalaxyLoadingIndicator from "@/common/Loaders/SportygalaxyLoadingIndicator";
import { Refresh2 } from "iconsax-react";

interface ComponentStateWrapperProps {
  isLoading: boolean;
  error?: any;
  data?: any;
  emptyMessage?: string;
  children: ReactNode;
  refetch: () => void; // Function to trigger a refresh
  CustomLoadingComponentProps?: ReactNode;
  CustomErrorComponentProps?: ReactNode;
  CustomEmptyComponentProps?: ReactNode;
}

const ComponentStateWrapper: React.FC<ComponentStateWrapperProps> = ({
  isLoading,
  error,
  data,
  emptyMessage = "No data available.",
  children,
  refetch,
  CustomLoadingComponentProps,
  CustomErrorComponentProps,
  CustomEmptyComponentProps,
}) => {
  const handleRefresh = () => {
    refetch();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center">
        {CustomLoadingComponentProps || <SportygalaxyLoadingIndicator />}
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div className="flex flex-col items-center text-center">
        {CustomErrorComponentProps || (
          <p className="text-red-500">
            {error?.message || "Something went wrong."}
          </p>
        )}
        <Refresh2
          onClick={handleRefresh}
          className="my-2 cursor-pointer"
          color="#18dd81"
          size="24"
        />
      </div>
    );
  }

  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <div className="flex flex-col items-center text-center">
        {CustomEmptyComponentProps || (
          <p className="text-gray-500">{emptyMessage}</p>
        )}
        <Refresh2
          onClick={handleRefresh}
          className="my-2 cursor-pointer"
          color="#18dd81"
          size="24"
        />
        {/* <button
          onClick={handleRefresh}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Refresh
        </button> */}
      </div>
    );
  }

  return <>{children}</>;
};

export default ComponentStateWrapper;
