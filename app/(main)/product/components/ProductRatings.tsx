import RightArrowIcon from "@/assets/icons/pack/RightArrow";
import UserIcon from "@/assets/icons/pack/User";
import AppLoader from "@/common/Loaders/AppLoader";
import StarRating from "@/common/StarRating";
import { DesktopTitle } from "@/common/Title";
import { usePagination } from "@/hooks/usePagination";
import { fetchReviewsData, fetchReviewsSummaryData } from "@/lib/apiReview";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/dateUtils";
import { useQuery } from "@tanstack/react-query";
import { FC } from "react";

interface ProductRatingsProps {
  productId: string;
  pageSize?: number;
}

const ProductRatings: FC<ProductRatingsProps> = ({
  productId,
  pageSize = 2,
}) => {
  const {
    data: reviews,
    isLoading,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
  } = usePagination({
    queryKey: ["reviews", productId],
    queryFn: ({ page, limit }) => fetchReviewsData({ productId, page, limit }),
    pageSize,
    enabled: !!productId,
  });

  const { data: reviewsSummary, isLoading: summaryLoading } = useQuery({
    queryKey: ["reviewsSummary", productId],
    queryFn: () => fetchReviewsSummaryData(productId),
    enabled: !!productId,
    staleTime: 5 * 60 * 1000,
  });

  const reviewsList = reviews?.data?.results || [];
  const reviewsSummaryResponse = reviewsSummary?.data;

  const handleRatingChange = (value: number) => console.log("Rated:", value);

  return (
    <section>
      <DesktopTitle general noLine title="Ratings & Reviews" />

      {(isLoading || summaryLoading) && <AppLoader />}

      <div className="flex items-center space-x-2">
        <div className="flex items-baseline mt-3">
          <p className="font-jost text-mobile-3xl md:text-3xl font-bold text-primary">
            {reviewsSummaryResponse?.averageRating?.toFixed(1) || 0}
          </p>
          <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
            /{reviewsSummaryResponse?.totalReviews || 0}
          </p>
        </div>
        <p className="font-jost text-mobile-xl md:text-xl font-normal text-primary">
          {reviewsSummaryResponse?.ratingComment}
        </p>
      </div>

      {reviewsList.map((review: any, idx: number) => (
        <div key={idx}>
          <div className="flex items-center gap-4 mt-8">
            <span className="flex w-fit p-2 md:p-4 border border-secondary rounded-full">
              <UserIcon color="grey" />
            </span>
            <div>
              <p className="font-jost text-mobile-xl md:text-xl font-semibold text-primary capitalize">
                {`${review.user.firstName} ${review.user.lastName}`}
              </p>
              <p className="font-jost text-base font-normal text-primary">
                {formatDate(review.createdAt)}
              </p>
            </div>
          </div>

          <div className="mt-7 space-y-4">
            <StarRating
              totalStars={5}
              defaultValue={review.rating || 0}
              onChange={handleRatingChange}
              readonly
            />
            <p className="font-jost text-base font-normal text-primary">
              &quot;{review.comment}&quot;
            </p>
          </div>
        </div>
      ))}

      {totalPages > 1 && (
        <div className="mt-16 flex items-center space-x-4">
          <button
            onClick={prevPage}
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
                "flex items-center w-fit p-2 md:p-4 rounded-full cursor-pointer hover:bg-secondary hover:text-primary",
                page === currentPage ? "border border-secondary" : "border-none"
              )}
            >
              <p className="flex items-center justify-center font-jost text-base font-normal text-primary w-8 h-8">
                {page}
              </p>
            </button>
          ))}

          <button
            onClick={nextPage}
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
