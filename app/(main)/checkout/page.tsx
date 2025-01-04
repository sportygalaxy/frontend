"use client";

import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import countryList from "react-select-country-list";
import { cn } from "@/lib/utils";
import {
  formatPhoneToCountry,
  getDialingCodeByValue,
} from "@/utils/countyUtils";
import { useMutation } from "@tanstack/react-query";
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
import useCartStore from "@/store/cartStore";
import { transformCartArray } from "@/utils/productUtils";
import { Lock } from "iconsax-react";
import CartItem from "@/components/cart/CartItem";
import CartCheckoutItem from "@/components/cart/CartCheckoutItem";
import { TCart } from "@/types/cart";
import CartSummaryPrice from "@/components/cart/CartSummaryPrice";
import {
  SHIPPING_FEE,
  showTotalPrice,
  showTotalPriceInCart,
} from "@/helpers/cart";
import { formatCurrency } from "@/utils/currencyUtils";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import PaystackPaymentUi from "@/components/PaystackPaymentUi";
import { PaystackVerifyTransactionRes } from "@/types/paystack";
import { finalizePayment } from "@/services/paymentService";
import AppLoader from "@/common/Loaders/AppLoader";
import { InitializePayment } from "@/types/payment";

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

const getValidationSchema = (isLoggedInUser: boolean) =>
  Yup.object({
    userId: !isLoggedInUser
      ? Yup.string().notRequired()
      : Yup.string().required("Required"),
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
    email: !isLoggedInUser
      ? Yup.string().email("Invalid email address").notRequired()
      : Yup.string().email("Invalid email address").required("Required"),
    address: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    firstName: Yup.string().required("Required"),
    phoneNumber: Yup.string().required("Required"),
    country: !isLoggedInUser
      ? Yup.string().notRequired()
      : Yup.string().required("Required"),
    countryCode: !isLoggedInUser
      ? Yup.string().notRequired()
      : Yup.string().required("Required"),
  });

const Checkout = () => {
  const {
    addToCart,
    removeFromCart,
    cart,
    clearCart,
    incrementQty,
    decrementQty,
  } = useCartStore();
  const { user } = useUserStore();
  const [countryOptions] = useState<[]>(countryList().getData());
  const router = useRouter();

  const isLoggedInUser = !!user;
  const validationSchema = getValidationSchema(isLoggedInUser);

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

  const isProductInCart = (cartQty: number) => {
    return cartQty > 1;
  };

  const handleIncrement = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    incrementQty(id);
  };

  const handleDecrement = (event: React.MouseEvent, id: number) => {
    event.stopPropagation();
    decrementQty(id);
  };

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const payloadToSubmit = transformCartArray(String(user?.id), cart);
    const offlineUser = {
      email: values.email,
      address: values.address,
      firstName: values.firstName,
      lastName: values.lastName,
      country: values.country,
      countryCode: values.countryCode,
      phoneNumber: values.phoneNumber,
      phone: `+${values.countryCode}${values.phoneNumber}`,
    };

    const userId = {
      userId: user?.id,
    };

    orderProduct({
      ...payloadToSubmit,
      // ...(!isLoggedInUser && { offlineUser }),
      ...{ offlineUser },
      ...(!isLoggedInUser && userId),
    } as any);
    setSubmitting(false);
  };

  const extractPhoneDetails = (phone: string) => {
    const phoneNumber = parsePhoneNumberFromString(phone || "");
    if (phoneNumber) {
      return {
        countryCode: phoneNumber.countryCallingCode,
        phoneNumber: phoneNumber.nationalNumber,
      };
    }
    return {
      countryCode: "",
      phoneNumber: "",
    };
  };

  const phoneDetails = extractPhoneDetails(user?.phone || "");

  const initialValues: FormValues = {
    userId: String(user?.id) || "",
    items: [],
    email: user?.email || "",
    address: user?.address || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    country: formatPhoneToCountry(user?.phone ?? "")?.country || "",
    countryCode: phoneDetails.countryCode || "",
    phoneNumber: phoneDetails.phoneNumber || "",
  };

  const verifyTransaction = async (reference: string): Promise<boolean> => {
    try {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY}`,
          },
        }
      );

      const data: PaystackVerifyTransactionRes = await response.json();

      if (data?.status) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("Verification error", error);
      return false;
    }
  };

  const verifyTransactionBackend = async (
    initializePaymentPayload: InitializePayment
  ): Promise<any> => {
    try {
      const isVerified = await finalizePayment(initializePaymentPayload);

      if (isVerified) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error("BE Verification error", error);
      return false;
    }
  };

  const handlePaymentCancel = () => {
    NotifyError("Payment cancelled.");
  };

  if (isPending) {
    return <AppLoader />;
  }

  return (
    <section className="wrapper mt-10 bg-white">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched, handleSubmit }) => {
          const disableBtn = !(
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.address ||
            !values.phoneNumber ||
            !values.countryCode ||
            isPending
          );

          // console.log("formik values ::", values);

          const focusClassName =
            "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
          const placeholderClassName =
            "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";

          const offlineUser = {
            id: null,
            email: values.email,
            address: values.address,
            firstName: values.firstName,
            lastName: values.lastName,
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber,
            phone: `+${values.countryCode}${values.phoneNumber}`,
          };

          const payload = !!user ? user : offlineUser;

          const paystackPaymentProps = {
            isDisabled: !disableBtn,
            isPending: isPending,
            email: payload?.email || "",
            userId: payload?.id || payload?.email,
            amount:
              showTotalPrice(showTotalPriceInCart(cart), SHIPPING_FEE) || 0,
            currency: "NGN",
            handleSubmit: handleSubmit,
            buttonText: "Make Payment",
            onSuccess: async (
              response: any,
              reference: any,
              handleSubmit: () => void
            ) => {
              const initializePaymentPayload: InitializePayment = {
                reference: response?.reference,
                backendReference: reference,
                transactionLog: response,
              };
              const isVerified = await verifyTransaction(
                initializePaymentPayload?.reference
              );
              const isBackendVerified = await verifyTransactionBackend(
                initializePaymentPayload
              );

              if (isVerified && isBackendVerified) {
                NotifySuccess("Creating order.");
                handleSubmit();
              } else {
                NotifyError("Transaction verification failed.");
                console.error("Transaction verification failed.", {
                  isVerified,
                  isBackendVerified,
                });
              }
            },
            onCancel: handlePaymentCancel,
          };

          return (
            <Form className="flex flex-col items-center justify-start w-full h-screen my-20 bg-background">
              <div className="flex flex-col items-center justify-start w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20">
                  {isLoggedInUser ? (
                    <div className="w-full mx-auto md:max-w-screen-sm space-y-11">
                      <h2 className="font-bold text-mobile-3xl md:text-3xl">
                        Customer Information
                      </h2>

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
                                type="number"
                                placeholder={
                                  isLoggedInUser
                                    ? values.countryCode
                                    : getDialingCodeByValue(
                                        values.countryCode
                                      ) || "Code"
                                }
                                value={
                                  isLoggedInUser
                                    ? values.countryCode
                                    : getDialingCodeByValue(values.countryCode)
                                }
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

                      {/* Submit */}
                      <div className="w-full mt-8">
                        <PaystackPaymentUi {...paystackPaymentProps} />
                      </div>

                      <div className="flex items-center justify-center w-full">
                        <Link href={RoutesEnum.LANDING_PAGE}>
                          <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                            Continue shopping
                          </p>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full mx-auto md:max-w-screen-sm space-y-11">
                      <h2 className="font-bold text-mobile-3xl md:text-3xl">
                        Customer Information
                      </h2>

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
                                type="number"
                                placeholder={values.countryCode}
                                value={values.countryCode}
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

                      {/* Submit */}
                      <div className="w-full mt-8">
                        <PaystackPaymentUi {...paystackPaymentProps} />
                      </div>

                      <div className="flex items-center justify-center w-full">
                        <Link href={RoutesEnum.LANDING_PAGE}>
                          <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                            Continue shopping
                          </p>
                        </Link>
                      </div>
                    </div>
                  )}

                  <div className="bg-[#F0F0F0] py-14 px-32 flex flex-col items-center">
                    <div className="space-y-6 flex flex-col items-center">
                      <p className="text-[#828282] font-bold text-mobile-3xl md:text-3xl">
                        Total amount
                      </p>
                      <p className="text-[#000] font-bold text-mobile-4xl md:text-7xl">
                        {formatCurrency(
                          showTotalPrice(
                            showTotalPriceInCart(cart),
                            SHIPPING_FEE
                          ) || 0
                        )}
                      </p>

                      <div className="flex items-center gap-2">
                        <Lock size={24} />
                        <p className="font-medium text-mobile-2xl md:text-2xl">
                          Secure Payment
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[#828282] font-medium text-mobile-2xl md:text-2xl mt-20">
                        Order Summary
                      </p>

                      {cart?.map((cart: TCart) => (
                        <div
                          key={cart?.id}
                          className="flex flex-col gap-4 max-w-2xl mt-8 border-none"
                        >
                          <CartItem
                            cart={{
                              ...cart,
                            }}
                            isProductInCart={isProductInCart}
                            handleDecrement={(event, id) =>
                              handleDecrement(event, cart?.id)
                            }
                            handleIncrement={(event, id) =>
                              handleIncrement(event, cart?.id)
                            }
                            className=""
                          />
                        </div>
                      ))}

                      <div className="mt-12 text-[#828282] space-y-8">
                        <CartSummaryPrice />

                        <PaystackPaymentUi
                          {...paystackPaymentProps}
                          buttonText="Pay Now"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </section>
  );
};

export default Checkout;
