import RightArrowIcon from "@/assets/icons/pack/RightArrow";
import UserIcon from "@/assets/icons/pack/User";
import StarRating from "@/common/StarRating";
import { DesktopTitle } from "@/common/Title";
import { fetchReviewsData, fetchReviewsSummaryData } from "@/lib/apiReview";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { FC, useState } from "react";

interface ProductRatingsProps {
  productId: string;
  pageSize?: number; // optional: default page size
}

const ProductRatings: FC<ProductRatingsProps> = ({
  productId,
  pageSize = 2,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const {
    data: reviews,
    error: reviewsError,
    isLoading: reviewsIsLoading,
  } = useQuery({
    queryKey: ["reviews", productId, currentPage],
    queryFn: () =>
      fetchReviewsData({ productId, page: currentPage, limit: pageSize }),
    enabled: !!productId, // Only enable fetching when `productId` is set
    keepPreviousData: true, // Smooth pagination without flickering
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to prevent unnecessary refetches
  });

  const {
    data: reviewsSummary,
    error: reviewsSummaryError,
    isLoading: reviewsSummaryIsLoading,
  } = useQuery({
    queryKey: ["reviewsSummary", productId, currentPage],
    queryFn: () => fetchReviewsSummaryData(productId as string),
    enabled: !!productId, // Only enable fetching when `productId` is set
    staleTime: 5 * 60 * 1000, // Cache data for 5 minutes to prevent unnecessary refetches
  });

  const reviewsList = reviews?.data?.results || [];
  const reviewsSummaryResponse = reviewsSummary?.data;

  const totalPages = reviews?.data?.pageCount || 1;

  const handleRatingChange = (value: number) => {
    console.log("Rated:", value);
  };

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <section>
      <DesktopTitle general noLine title="Ratings & Reviews" />

      <div className="flex items-center space-x-2">
        <div className="flex items-baseline mt-3">
          <p className="font-jost text-mobile-3xl md:text-3xl font-bold text-primary">
            {reviewsSummaryResponse?.averageRating.toFixed(1) || 0}
          </p>
          <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
            /{reviewsSummaryResponse?.totalReviews || 0}
          </p>
        </div>
        <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
          {reviewsSummaryResponse?.ratingComment}
        </p>
      </div>

      {reviewsList?.map((review: any, idx: number) => {
        return (
          <div key={idx} className="">
            <div className="flex items-center gap-4 mt-8">
              <span className="flex w-fit p-2 md:p-4 border border-secondary rounded-full">
                <UserIcon color="grey" />
              </span>

              <div>
                <p className="font-jost text-mobile-xl md:text-xl font-semibold text-primary">
                  {review.user.firstName[0]}***
                </p>
                <p className="font-jost text-base font-normal text-primary">
                  {formatDate(review?.createdAt)}
                </p>
              </div>
            </div>

            <div className="mt-7 space-y-4">
              <div>
                <StarRating
                  totalStars={5}
                  defaultValue={review?.rating || 0}
                  onChange={handleRatingChange}
                  readonly={true}
                />
              </div>
              <p className="font-jost text-base font-normal text-primary">
                &quot;{review?.comment}&quot;
              </p>
            </div>
          </div>
        );
      })}

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="mt-16 flex items-center space-x-4">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rotate-180 flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full disabled:opacity-50"
          >
            <RightArrowIcon />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => goToPage(page)}
              className={cn(
                "flex items-center w-fit p-2 md:p-4 rounded-full curse-pointer hover:bg-secondary hover:text-primary",
                page === currentPage
                  ? "border border-secondary "
                  : "border-none"
              )}
            >
              <p className="flex items-center justify-center font-jost text-base font-normal text-primary w-8 h-8">
                {page}
              </p>
            </button>
          ))}

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center w-fit p-2 md:p-4 border-none border-secondary rounded-full disabled:opacity-50"
          >
            <RightArrowIcon />
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductRatings;
