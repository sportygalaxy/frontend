"use client";

import { FC, useMemo } from "react";
import { Formik, Form, Field, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { createSpinner } from "@/lib/apiSpinner";

interface FormValues {}

/** --- Types --- */
export interface CreateSpinnerPayload {}

export interface SpinnerFormProps {
  onClose?: () => void; // called when submit succeeds
  submitLabel?: string; // default: "Submit spinner"
}

/** --- Validation --- */
const validationSchema = Yup.object({});

/** --- Main form --- */
const SpinnerForm: FC<SpinnerFormProps> = ({
  onClose,
  submitLabel = "Submit spinner",
}) => {
  const initialValues = useMemo(() => ({}), []);

  const {
    mutate: createSpinnerMutate,
    isPending,
    isSuccess,
    error,
    data,
  } = useMutation<any, Error, CreateSpinnerPayload>({
    mutationFn: (spinnerData: CreateSpinnerPayload) =>
      createSpinner(spinnerData),
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
    const spinnerData: CreateSpinnerPayload = {};

    createSpinnerMutate(spinnerData);
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
            <div className="flex items-center justify-end gap-3">
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

export default SpinnerForm;
