"use client";

import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import SpinnerIcon from "@/assets/icons/pack/Spinner";
import { sendContactMessage } from "@/lib/apiContact";
import { IContactUsPayload, IContactUsResponse } from "@/types/contact";

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  message: Yup.string().required("Message is required"),
});

const ContactUsForm: React.FC = () => {
  const { mutate: sendMessage, isPending } = useMutation<
    IContactUsResponse,
    Error,
    IContactUsPayload
  >({
    mutationFn: (contactData) => sendContactMessage(contactData),
    onSuccess: (data) => {
      NotifySuccess(data?.message || "Message sent successfully!");
    },
    onError: (error) => {
      NotifyError(
        error?.message || "An error occurred while sending your message."
      );
    },
  });

  const handleSubmit = async (
    values: IContactUsPayload,
    { setSubmitting, resetForm }: FormikHelpers<IContactUsPayload>
  ) => {
    sendMessage(values);
    setSubmitting(false);
    resetForm();
  };

  const focusClassName =
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const placeholderClassName =
    "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";

  return (
    <Formik
      initialValues={{
        fullName: "",
        email: "",
        message: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => {
        const disableBtn =
          !values.fullName || !values.email || !values.message || isPending;

        return (
          <Form className="flex flex-col items-center justify-start w-full bg-background">
            <div className="flex flex-col items-center justify-start w-full">
              <div className="w-full mx-auto md:max-w-screen-sm space-y-10">
                {/* Full Name */}
                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="fullName"
                  >
                    * Full Name
                  </label>
                  <Field
                    className={cn(
                      "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8",
                      placeholderClassName,
                      focusClassName
                    )}
                    name="fullName"
                    type="text"
                    placeholder="John Doe"
                  />
                  {errors.fullName && touched.fullName ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.fullName}
                    </div>
                  ) : null}
                </div>

                {/* Email */}
                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="email"
                  >
                    * Email
                  </label>
                  <Field
                    className={cn(
                      "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8",
                      placeholderClassName,
                      focusClassName
                    )}
                    name="email"
                    type="email"
                    placeholder="eg name@domain.com"
                  />
                  {errors.email && touched.email ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.email}
                    </div>
                  ) : null}
                </div>

                {/* Message */}
                <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                  <label
                    className="flex justify-start flex-1 w-full xs:justify-end"
                    htmlFor="message"
                  >
                    * Message
                  </label>
                  <Field
                    as="textarea"
                    rows={4}
                    className={cn(
                      "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8",
                      placeholderClassName,
                      focusClassName
                    )}
                    name="message"
                    placeholder="Write your message here..."
                  />
                  {errors.message && touched.message ? (
                    <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                      {errors.message}
                    </div>
                  ) : null}
                </div>

                {/* Submit Button */}
                <div className="w-full mt-8">
                  <button
                    className="w-full flex items-center justify-center text-white bg-black p-3 xs:p-5 rounded-md border-1 border-[#808080] disabled:bg-secondary disabled:text-secondary-foreground"
                    type="submit"
                    disabled={disableBtn}
                  >
                    {isPending && (
                      <div className="mr-3">
                        <SpinnerIcon width="15" height="15" color="white" />
                      </div>
                    )}
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ContactUsForm;
