"use client";

import { FC, useMemo } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import StarRating from "@/common/StarRating";
import { cn } from "@/lib/utils";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import useUserStore from "@/store/userStore";
import { createReview } from "@/lib/apiReview";

interface FormValues {
  userId: string;
  productId: string;
  rating: number; // 1...5
  comment: string; // optional
}
/** --- Types --- */
export interface CreateReviewPayload {
  userId: string;
  productId: string;
  rating: number; // 1..5
  comment?: string; // optional
}

export interface ReviewFormProps {
  productId: string;
  onClose?: () => void; // called when submit succeeds
  initialRating?: number; // for edit use-cases
  initialComment?: string; // for edit use-cases
  submitLabel?: string; // default: "Submit review"
}

/** --- Validation --- */
const validationSchema = Yup.object({
  rating: Yup.number()
    .min(1, "Please select a rating")
    .max(5, "Invalid rating")
    .required("Rating is required"),
  comment: Yup.string().max(1000, "Keep it under 1000 characters").nullable(),
});

/** --- Rating field wrapped for Formik --- */
const RatingField: FC<{
  name: string;
  disabled?: boolean;
}> = ({ name, disabled }) => (
  <Field name={name}>
    {({ field, form, meta }: any) => (
      <div className="space-y-2">
        <StarRating
          totalStars={5}
          defaultValue={field.value ?? 0}
          readonly={!!disabled}
          onChange={(val) => form.setFieldValue(name, val)}
        />
        {meta.touched && meta.error ? (
          <p className="text-sm text-destructive">{meta.error}</p>
        ) : null}
      </div>
    )}
  </Field>
);

/** --- Comment field --- */
const CommentField: FC<{ name: string; disabled?: boolean }> = ({
  name,
  disabled,
}) => (
  <Field name={name}>
    {({ field, meta }: any) => (
      <div className="space-y-2">
        <textarea
          {...field}
          disabled={disabled}
          rows={4}
          maxLength={1000}
          placeholder="Share a few details about your experience (optional)"
          className={cn(
            "w-full rounded-xl border border-secondary px-4 py-3",
            "placeholder-[#808080] placeholder:font-light",
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
            disabled && "opacity-60 cursor-not-allowed"
          )}
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{meta.touched && meta.error ? meta.error : " "}</span>
          <span>{`${field.value?.length ?? 0}/1000`}</span>
        </div>
      </div>
    )}
  </Field>
);

/** --- Main form --- */
const ReviewForm: FC<ReviewFormProps> = ({
  productId,
  onClose,
  initialRating = 0,
  initialComment = "",
  submitLabel = "Submit review",
}) => {
  const { user } = useUserStore();
  const userId = user?.id as string;

  const initialValues = useMemo(
    () => ({
      rating: initialRating,
      comment: initialComment,
      productId,
      userId,
    }),
    [initialRating, initialComment, productId, userId]
  );

  const {
    mutate: createReviewMutate,
    isPending,
    isSuccess,
    error,
    data,
  } = useMutation<any, Error, CreateReviewPayload>({
    mutationFn: (reviewData: CreateReviewPayload) => createReview(reviewData),
    onMutate: async () => {},
    onSuccess: (data) => {
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const reviewData: CreateReviewPayload = {
      userId,
      productId,
      rating: values.rating,
      comment: values.comment?.trim() || undefined,
    };

    createReviewMutate(reviewData);
    setSubmitting(false);
  };

  if (isSuccess || error) {
    if (onClose) onClose();
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ isSubmitting, isValid, dirty }) => {
        const disabled = isSubmitting || isPending;
        const canSubmit = isValid && dirty && !disabled;

        return (
          <Form className="space-y-6">
            <div className="space-y-1">
              <p className="font-jost text-lg font-semibold text-primary">
                Your rating
              </p>
              <RatingField name="rating" disabled={disabled} />
            </div>

            <div className="space-y-1">
              <p className="font-jost text-lg font-semibold text-primary">
                Comment
              </p>
              <CommentField name="comment" disabled={disabled} />
            </div>

            <div className="flex items-center justify-end gap-3">
              <Button
                type="button"
                variant="ghost"
                className="ring-0 ring-offset-0"
                onClick={onClose}
                disabled={disabled}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="default"
                size="lg"
                className="ring-0 ring-offset-0"
                disabled={!canSubmit}
              >
                {isPending ? "Submitting..." : submitLabel}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ReviewForm;
