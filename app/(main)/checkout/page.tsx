"use client";

import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import Select, { SingleValue } from "react-select";
import countryList from "react-select-country-list";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import {
  formatPhoneToCountry,
  getCountryFlag,
  getDialingCodeByValue,
} from "@/utils/countyUtils";
import { useMutation } from "@tanstack/react-query";
import SpinnerIcon from "@/assets/icons/pack/Spinner";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import {
  ICreateOrderPayload,
  ICreateOrderResponse,
  OrderItem,
} from "@/types/order";
import { createOrderData } from "@/lib/apiOrder";
import { selectFieldStyles } from "@/app/(auth)/register/components/RegisterationCountrySelectInputStyle";
import useCartStore from "@/store/cartStore";
import { transformCartArray } from "@/utils/productUtils";

type FormValues = {
  userId: string;
  items: OrderItem[];
  email: string;
  address: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  country: string;
  countryCode: string;
};

const validationSchema = Yup.object({
  userId: Yup.string().required("Required"),
  items: Yup.array()
    .of(
      Yup.object().shape({
        productId: Yup.string().required("Product ID is required"),
        quantity: Yup.number().positive().required("Quantity is required"),
        size: Yup.string().optional(),
        color: Yup.string().optional(),
      })
    )
    .required("Items are required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  address: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  firstName: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
  country: Yup.string().required("Required"),
  countryCode: Yup.string().required("Required"),
});

const Checkout = () => {
  const { addToCart, removeFromCart, cart, clearCart } = useCartStore();
  const { user } = useUserStore();
  const [countryOptions] = useState<[]>(countryList().getData());
  const router = useRouter();

  const {
    mutate: orderProduct,
    isPending,
    error,
    data,
  } = useMutation<ICreateOrderResponse, Error, ICreateOrderPayload>({
    mutationFn: (registerData: ICreateOrderPayload) =>
      createOrderData(registerData),
    onMutate: async () => {},
    onSuccess: (data) => {
      if (data?.data) {
        NotifySuccess(data?.message as string);
        clearCart();
        router.push(RoutesEnum.LANDING_PAGE);
      }
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const payloadToSubmit = transformCartArray(String(user?.id), cart);
    orderProduct(payloadToSubmit);
    setSubmitting(false);
  };

  const initialValues: FormValues = {
    userId: String(user?.id) || "",
    items: [],
    email: user?.email || "",
    address: user?.address || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phoneNumber: user?.phone || "",
    country: formatPhoneToCountry(user?.phone ?? "")?.country || "",
    countryCode: formatPhoneToCountry(user?.phone ?? "")?.countryCode || "",
  };

  return (
    <section className="wrapper mt-10 bg-white">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => {
          const disableBtn = !(
            Object.keys(errors).length > 0 ||
            !values.country ||
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.address ||
            !values.phoneNumber ||
            !values.countryCode ||
            isPending
          );

          const focusClassName =
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
          const placeholderClassName =
            "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";

          return (
            <Form className="flex flex-col items-center justify-start w-full h-screen my-20 bg-background">
              <div className="flex flex-col items-center justify-start w-full">
                <div className="w-full mx-auto md:max-w-screen-sm space-y-11">
                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="country"
                    >
                      * Country / Region
                    </label>
                    <Select
                      className="flex justify-start flex-[3] w-full p-0 m-0 rounded-xl"
                      options={countryOptions}
                      name="country"
                      placeholder="Search.."
                      styles={selectFieldStyles}
                      onChange={(option: SingleValue<any>) => {
                        if (option) {
                          setFieldValue("country", option.label);
                          setFieldValue("countryCode", option.value);
                        }
                      }}
                      formatOptionLabel={(option: any) => (
                        <div className="flex items-center">
                          {values.countryCode && getCountryFlag(option.value)}
                          <span className="ml-3">{option.label}</span>
                        </div>
                      )}
                    />
                    {errors.country && touched.country ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.country}
                      </div>
                    ) : null}
                  </div>

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="firstName"
                    >
                      * First Name
                    </label>
                    <Field
                      className={cn(
                        "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0",
                        placeholderClassName,
                        focusClassName
                      )}
                      name="firstName"
                      type="text"
                      placeholder="Please enter your first name"
                    />
                    {errors.firstName && touched.firstName ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.firstName}
                      </div>
                    ) : null}
                  </div>

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="lastName"
                    >
                      * Last Name
                    </label>
                    <Field
                      className={cn(
                        "flex flex-[3] justify-start w-full border-1 lightDarkGrey rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0",
                        placeholderClassName,
                        focusClassName
                      )}
                      name="lastName"
                      type="text"
                      placeholder="Please enter your last name"
                    />
                    {errors.lastName && touched.lastName ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.lastName}
                      </div>
                    ) : null}
                  </div>

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="email"
                    >
                      * Email
                    </label>
                    <Field
                      className={cn(
                        "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0",
                        placeholderClassName,
                        focusClassName
                      )}
                      name="email"
                      type="email"
                      placeholder="Please set the email as the login name"
                    />
                    {errors.email && touched.email ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="address"
                    >
                      * Pick up location
                    </label>
                    <Field
                      className={cn(
                        "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0",
                        placeholderClassName,
                        focusClassName
                      )}
                      name="address"
                      type="text"
                      placeholder="Please enter your address"
                    />
                    {errors.address && touched.address ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.address}
                      </div>
                    ) : null}
                  </div>

                  <div className="flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="phoneNumber"
                    >
                      * Tel
                    </label>
                    <div className="flex flex-[3] justify-start w-full">
                      <div className="grid w-full grid-cols-4 gap-2 xs:gap-5 xs:grid-cols-8">
                        <div className="relative col-span-2 xs:col-span-2">
                          <Field
                            className={cn(
                              "px-4 py-3 m-0 w-fit xs:w-full border-1 lightDarkGrey rounded-xl xs:py-4 xs:px-8",
                              placeholderClassName,
                              focusClassName
                            )}
                            name="countryCode"
                            type="text"
                            disabled
                            placeholder={
                              getDialingCodeByValue(values.countryCode) ||
                              "Code"
                            }
                            value={getDialingCodeByValue(values.countryCode)}
                            readOnly
                          />
                          {errors.countryCode && touched.countryCode ? (
                            <div className="absolute text-sm bottoretext-destructive text-sm0 xs:right-0 -right-9 xs:top-16">
                              {errors.countryCode}
                            </div>
                          ) : null}
                        </div>
                        <div className="relative col-span-4 xs:col-span-6">
                          <Field
                            className={cn(
                              "w-full px-4 py-3 m-0 xs:w-full border-1 lightDarkGrey rounded-xl xs:py-4 xs:px-8",
                              placeholderClassName,
                              focusClassName
                            )}
                            name="phoneNumber"
                            type="number"
                            placeholder="Phone number"
                          />
                          {errors.phoneNumber && touched.phoneNumber ? (
                            <div className="absolute right-0 text-sm text-destructive top-14 xs:top-16">
                              {errors.phoneNumber}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <div className="flex justify-start flex-1 w-full xs:justify-end">
                      <Field name="agreeToTerms">
                        {({ field, form }: any) => (
                          <Checkbox
                            id="terms-and-condition"
                            className="rounded-full border-1 border-[#DEE2E6] p-3 flex items-center justify-center"
                            checked={field.value}
                            onCheckedChange={() =>
                              form.setFieldValue("agreeToTerms", !field.value)
                            }
                          />
                        )}
                      </Field>
                    </div>
                  </div>

                  <div className="w-full mt-8">
                    <button
                      className="w-full flex items-center justify-center text-white bg-black p-3 xs:p-5 rounded-md border-1 border-[#808080] disabled:bg-secondary disabled:text-secondary-foreground"
                      type="submit"
                      disabled={!disableBtn}
                    >
                      {isPending ? (
                        <div className="mr-3">
                          <SpinnerIcon width="15" height="15" color="white" />
                        </div>
                      ) : null}{" "}
                      Order Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center w-full py-6">
                <Link href={RoutesEnum.LANDING_PAGE}>
                  <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                    Continue shopping
                  </p>
                </Link>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Checkout;
