"use client";

import AppLoader from "@/common/Loaders/AppLoader";
import CartItem from "@/components/cart/CartItem";
import CartSummaryPrice from "@/components/cart/CartSummaryPrice";
import PaystackPaymentUi from "@/components/PaystackPaymentUi";
import { PAYMENT_OPTION } from "@/constants/appEnums";
import { RoutesEnum } from "@/constants/routeEnums";
import {
  SHIPPING_STATE_OPTIONS,
  showShippingFeePrice,
  showTotalPrice,
  showTotalPriceInCart,
} from "@/helpers/cart";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { createOrderData } from "@/lib/apiOrder";
import { cn } from "@/lib/utils";
import { finalizePayment } from "@/services/paymentService";
import useCartStore from "@/store/cartStore";
import useUserStore from "@/store/userStore";
import { TCart } from "@/types/cart";
import {
  ICreateOrderPayload,
  ICreateOrderResponse,
  OrderItem,
} from "@/types/order";
import { InitializePayment } from "@/types/payment";
import { PaystackVerifyTransactionRes } from "@/types/paystack";
import {
  formatPhoneToCountry,
  getDialingCodeByValue,
} from "@/utils/countyUtils";
import { formatCurrency } from "@/utils/currencyUtils";
import { transformCartArray } from "@/utils/productUtils";
import { useMutation } from "@tanstack/react-query";
import { Field, Form, Formik, FormikHelpers } from "formik";
import { Lock } from "iconsax-react";
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import * as Yup from "yup";
import {
  MINIMUM_CHECKOUT_AMOUNT,
  PARTIAL_PAYMENT_DISCOUNT,
  SHIPPING_FEE,
} from "../products/ProductConstant";

type FormValues = {
  userId: string;
  items: OrderItem[];
  email: string;
  address: string;
  state: string;
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
    state: Yup.string().required("Required"),
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
  const [paymentOption, setPaymentOption] = useState<"FULL" | "PARTIAL">(
    "FULL"
  );
  const [isGlobalLoading, setIsGlobalLoading] = useState<boolean>(false);
  const router = useRouter();

  const isLoggedInUser = !!user;
  const validationSchema = getValidationSchema(isLoggedInUser);

  const handleTabChange = (option: "FULL" | "PARTIAL") => {
    setPaymentOption(option);
  };

  const calculatePaymentAmount = (checkoutAmountToPay: number) => {
    const normalizedAmount = Number(checkoutAmountToPay || 0);
    if (paymentOption === PAYMENT_OPTION.PARTIAL) {
      return (normalizedAmount / 100) * PARTIAL_PAYMENT_DISCOUNT;
    }
    return normalizedAmount || 0;
  };

  const computeCheckoutAmounts = (stateValue: string) => {
    const cartTotal = showTotalPriceInCart(cart);
    const shippingTarget = stateValue || SHIPPING_FEE;
    const shippingFeeAmount = showShippingFeePrice(cartTotal, shippingTarget);
    const checkoutAmount = showTotalPrice(cartTotal, shippingFeeAmount) || 0;
    const paymentAmount = calculatePaymentAmount(checkoutAmount);
    const isAllowedToCheckoutOut = checkoutAmount < MINIMUM_CHECKOUT_AMOUNT;

    return {
      shippingFeeAmount,
      checkoutAmount,
      paymentAmount,
      isAllowedToCheckoutOut,
    };
  };

  const {
    mutate: orderProduct,
    isPending: isOrderPending,
    error: orderError,
    data: orderData,
  } = useMutation<ICreateOrderResponse, Error, ICreateOrderPayload>({
    mutationFn: async (orderData: ICreateOrderPayload) => {
      const result = await createOrderData(orderData);

      if (!result?.success || result?.statusCode === 400) {
        NotifyError(result?.error as string);
        return {};
      }
      NotifySuccess("Order created.");
      return result;
    },
    onMutate: async () => {},
    onSuccess: (data) => {
      if (data?.data) {
        NotifySuccess(data?.message as string);
        clearCart();
        router.push(RoutesEnum.LANDING_PAGE);
      }
      setIsGlobalLoading(false);
    },
    onError: (error) => {
      setIsGlobalLoading(false);
      NotifyError(error?.message || "An error occurred during order creation.");
    },
  });

  const isProductInCart = (cartQty: number) => cartQty > 1;

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
    try {
      const {
        shippingFeeAmount,
        checkoutAmount,
        paymentAmount: amountToPay,
      } = computeCheckoutAmounts(values.state);
      const payloadToSubmit = transformCartArray(String(user?.id), cart);

      const offlineUser = {
        email: values.email,
        address: values.address,
        state: values.state,
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
      setIsGlobalLoading(true);

      // NOTE: ENSURE cart total is not less than MINIMUM_CHECKOUT_AMOUNT
      // if (
      //   (calculatePaymentAmount(payloadToSubmit?.variant?.prices || 0) ||
      //     calculatePaymentAmount()) < MINIMUM_CHECKOUT_AMOUNT
      // ) {
      //   const message = `A minimum of ${
      //     formatCurrency(MINIMUM_CHECKOUT_AMOUNT) || 0
      //   } worth of
      //     item should be in your cart to proceed`;

      //   console.log({
      //     variant: calculatePaymentAmount(
      //       payloadToSubmit?.variant?.prices || 0
      //     ),
      //     normal: calculatePaymentAmount(),
      //     check:
      //       (calculatePaymentAmount(payloadToSubmit?.variant?.prices || 0) ||
      //         calculatePaymentAmount()) < MINIMUM_CHECKOUT_AMOUNT,
      //   });

      //   return NotifyError(message);
      // }

      orderProduct({
        ...payloadToSubmit,
        ...(paymentOption === PAYMENT_OPTION.PARTIAL && {
          variant: {
            ...payloadToSubmit?.variant,
            paymentSplitValue: PARTIAL_PAYMENT_DISCOUNT,
            amountToPay,
          },
        }),
        offlineUser,
        paymentOption,
        amountToPay: 0,
        amountPaid: amountToPay,
        shippingFee: shippingFeeAmount,
        shippingState: values.state,
        ...(!isLoggedInUser && userId),
      } as any);
      setSubmitting(false);
    } catch (error: any) {
      NotifyError("Order submission error:", error?.error);
      console.error("Order submission error:", error);
    } finally {
      setSubmitting(false);
    }
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
    state: "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    country: formatPhoneToCountry(user?.phone ?? "")?.country || "",
    countryCode: phoneDetails.countryCode || "234",
    phoneNumber: phoneDetails.phoneNumber || "",
  };

  const verifyTransaction = async (reference: string): Promise<boolean> => {
    const secretKey = process.env.NEXT_PUBLIC_PAYSTACK_SECRET_KEY?.trim();

    try {
      setIsGlobalLoading(true);
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${secretKey}`,
          },
        }
      );

      const data: PaystackVerifyTransactionRes = await response.json();
      setIsGlobalLoading(false);
      return data?.status || false;
    } catch (error) {
      console.error("Transaction verification error:", error);
      NotifyError("Failed to verify transaction.");
      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const verifyTransactionBackend = async (
    initializePaymentPayload: InitializePayment
  ): Promise<boolean> => {
    try {
      setIsGlobalLoading(true);
      const data = await finalizePayment(initializePaymentPayload);
      setIsGlobalLoading(false);
      return data;
    } catch (error) {
      console.error("Backend transaction verification error:", error);
      NotifyError("Failed to verify transaction on the backend.");
      return false;
    } finally {
      setIsGlobalLoading(false);
    }
  };

  const handlePaymentCancel = () => {
    setIsGlobalLoading(false);
    NotifyError("Payment was cancelled by the user.");
  };

  // Render loader during pending states
  if (isOrderPending || isGlobalLoading) {
    return <AppLoader />;
  }

  // Handle errors globally
  if (orderError) {
    console.error("Order error:", orderError);
    NotifyError(
      orderError?.message || "An error occurred during order creation."
    );
  }

  return (
    <section className="wrapper mt-6 bg-white pb-16">
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, errors, touched, handleSubmit }) => {
          const {
            shippingFeeAmount: shippingFee,
            checkoutAmount,
            paymentAmount,
            isAllowedToCheckoutOut,
          } = computeCheckoutAmounts(values.state);
          const disableBtn = !(
            !values.firstName ||
            !values.lastName ||
            !values.email ||
            !values.address ||
            !values.state ||
            !values.phoneNumber ||
            !values.countryCode ||
            isAllowedToCheckoutOut ||
            isOrderPending ||
            isGlobalLoading
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
            state: values.state,
            firstName: values.firstName,
            lastName: values.lastName,
            countryCode: values.countryCode,
            phoneNumber: values.phoneNumber,
            phone: `+${values.countryCode}${values.phoneNumber}`,
          };

          const payload = !!user ? user : offlineUser;
          const userId = {
            userId: user?.id,
          };

          const paystackPaymentProps = {
            isDisabled: !disableBtn,
            isPending: isOrderPending || isGlobalLoading,
            isAllowedToCheckoutOut,
            email: payload?.email || "",
            userId: payload?.id || payload?.email,
            amount: paymentAmount,
            currency: "NGN",
            handleSubmit: handleSubmit,
            buttonText: "Make Payment",
            metadata: {
              items: transformCartArray(String(user?.id), cart),
              offlineUser,
              paymentOption,
              amountToPay: paymentAmount,
              shippingFee,
              shippingState: values.state,
              checkoutAmount,
              ...(!isLoggedInUser && userId),
            },
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
                setIsGlobalLoading(false);
                NotifyError("Transaction verification failed.");
                console.error("Transaction verification failed.", {
                  isVerified,
                  isBackendVerified,
                });
              }
            },
            onCancel: handlePaymentCancel,
          };

          const paymentMood = (): JSX.Element => {
            return (
              <div className="flex flex-col items-center justify-center gap-5 xs:flex-row">
                <label
                  className="flex justify-start flex-1 xs:justify-end w-full"
                  htmlFor="phoneNumber"
                >
                  * Payment options
                </label>
                <div className="flex flex-[3] items-center justify-start tabs w-full  gap-0">
                  <button
                    type="button"
                    className={`tab ${
                      paymentOption === "FULL"
                        ? "bg-black text-white p-5 font-semibold"
                        : "border-2 border-black p-5 font-semibold"
                    }`}
                    onClick={() => handleTabChange("FULL")}
                  >
                    100% Payment
                  </button>
                  <button
                    type="button"
                    className={`tab ${
                      paymentOption === "PARTIAL"
                        ? "bg-black text-white p-5 font-semibold"
                        : "border-2 border-black p-5 font-semibold"
                    }`}
                    onClick={() => handleTabChange("PARTIAL")}
                  >
                    30% Down Payment
                  </button>
                </div>
              </div>
            );
          };

          const amount = formatCurrency(checkoutAmount) || 0;

          return (
            <Form className="flex w-full flex-col gap-10 bg-background py-0 md:py-14">
              <div className="flex w-full flex-col gap-10">
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14 lg:gap-20">
                  {isLoggedInUser ? (
                    <div className="mx-auto w-full space-y-6 md:space-y-11 md:max-w-screen-sm">
                      <h2 className="text-mobile-3xl font-bold md:text-3xl">
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

                      <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                        <label
                          className="flex justify-start flex-1 w-full xs:justify-end"
                          htmlFor="state"
                        >
                          * State
                        </label>
                        <Field
                          as="select"
                          className={cn(
                            "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 bg-white",
                            placeholderClassName,
                            focusClassName
                          )}
                          name="state"
                        >
                          <option value="">Select your state</option>
                          {SHIPPING_STATE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        {errors.state && touched.state ? (
                          <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                            {errors.state}
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

                      {paymentMood()}

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
                    <div className="mx-auto w-full space-y-11 md:max-w-screen-sm">
                      <h2 className="text-mobile-3xl font-bold md:text-3xl">
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

                      <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                        <label
                          className="flex justify-start flex-1 w-full xs:justify-end"
                          htmlFor="state"
                        >
                          * State
                        </label>
                        <Field
                          as="select"
                          className={cn(
                            "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 bg-white",
                            placeholderClassName,
                            focusClassName
                          )}
                          name="state"
                        >
                          <option value="">Select your state</option>
                          {SHIPPING_STATE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </Field>
                        {errors.state && touched.state ? (
                          <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                            {errors.state}
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
                            <div className="relative col-span-2 xs:col-span-3">
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
                            <div className="relative col-span-4 xs:col-span-5">
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

                      {paymentMood()}

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

                  <div className="flex flex-col items-center rounded-2xl border border-neutral-200 bg-[#F7F7F7] px-4 py-8 shadow-sm md:px-10 md:py-12 lg:sticky lg:top-24">
                    <div className="flex flex-col items-center space-y-6">
                      <p className="text-[#828282] font-bold text-mobile-3xl md:text-2xl">
                        Total amount
                      </p>
                      <p className="text-[#000] font-bold text-mobile-4xl md:text-7xl">
                        {/* {formatCurrency(paymentAmount)} */}
                        {/* {formatCurrency(
                          transformCartArray(String(user?.id), cart)?.variant
                            ?.prices || 0
                        )} */}
                        {amount}
                      </p>

                      <div className="flex items-center gap-2">
                        <Lock size={24} />
                        <p className="font-medium text-mobile-2xl md:text-xl">
                          Secure Payment
                        </p>
                      </div>
                    </div>

                    <div className="w-full">
                      <p className="mt-14 text-mobile-2xl font-medium text-[#828282] md:text-2xl">
                        Order Summary
                      </p>

                      <div className="mt-6 max-h-[50vh] w-full overflow-y-auto rounded-xl bg-white p-4 shadow-inner sm:max-h-[420px]">
                        {cart?.map((cart: TCart) => (
                          <div
                            key={cart?.id}
                            className="mb-6 flex max-w-2xl flex-col gap-4 border-b border-neutral-200 pb-6 last:mb-0 last:border-b-0"
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

                            <div className="mt-1 text-sm">
                              <p className="font-medium text-[#828282]">
                                Color: {cart?.colors || "N/A"}
                              </p>
                              <p className="font-medium text-[#828282]">
                                Size: {cart?.sizes || "N/A"}
                              </p>
                              <p className="font-medium text-[#828282]">
                                Weight: {cart?.weights || "N/A"}
                              </p>
                              <p className="font-medium text-[#828282]">
                                Dimensions: {cart?.dimensions || "N/A"}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-10 space-y-8 text-[#828282]">
                        <CartSummaryPrice
                          paymentAmount={paymentAmount}
                          shippingState={values.state}
                        />

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
