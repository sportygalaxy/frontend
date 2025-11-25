import CardGrid from "@/common/CardGrid";
import { cn } from "@/lib/utils";

type ProductListSkeletonProps = {
  isHorizontalScroll?: boolean;
  isMobile?: boolean;
};

const baseCardClasses =
  "h-[360px] sm:h-[510px] w-full max-w-[230px] sm:max-w-[320px] bg-white px-2 sm:px-6 py-2 sm:py-12 border border-gray-50 rounded-xl animate-pulse flex flex-col gap-4";

const ProductCardSkeleton = ({ className }: { className?: string }) => (
  <div className={cn(baseCardClasses, className)}>
    <div className="h-[65%] w-full rounded-lg bg-gray-200" />
    <div className="flex flex-col gap-3">
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      <div className="h-3 w-1/2 rounded bg-gray-200" />
      <div className="h-5 w-1/3 rounded bg-gray-200" />
    </div>
  </div>
);

const ProductListSkeleton = ({
  isHorizontalScroll = false,
  isMobile = false,
}: ProductListSkeletonProps) => {
  const count = isHorizontalScroll ? (isMobile ? 3 : 4) : isMobile ? 4 : 6;
  const items = Array.from({ length: count });

  if (isHorizontalScroll) {
    return (
      <>
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            height: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 4px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
        `}</style>
        <div className="custom-scrollbar w-full overflow-x-auto whitespace-nowrap py-6">
          <div className="inline-flex space-x-6">
            {items.map((_, index) => (
              <div
                key={`product-skeleton-horizontal-${index}`}
                className="relative flex h-[360px] w-[180px] flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white md:h-[510px] md:w-[270px]"
              >
                <ProductCardSkeleton className="h-full w-full max-w-none px-3 sm:px-4" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="w-full">
      <CardGrid>
        {items.map((_, index) => (
          <ProductCardSkeleton
            key={`product-skeleton-grid-${index}`}
            className="w-full"
          />
        ))}
      </CardGrid>
    </div>
  );
};

export default ProductListSkeleton;
