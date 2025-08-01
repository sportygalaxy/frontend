"use client";
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import CartIcon from "@/assets/icons/pack/Cart";
import SpinnerIcon from "@/assets/icons/pack/Spinner";
import Divider from "@/common/Divider";
import { useLogout } from "@/hooks/useLogout";
import useUserStore from "@/store/userStore";
import {
  InfoCircle,
  MessageQuestion,
  ShoppingCart,
  LogoutCurve,
  Edit2,
  CloseCircle,
} from "iconsax-react";
import Image from "next/image";
import { DEFAULT_USER_IMAGE } from "@/constants/appConstants";
import ProfileAvatarUploader from "./components/ProfileAvatarUploader";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { IUserPayload, IUserQueryParam, IUserResponse } from "@/types/user";
import { mergeObjects } from "@/utils/objectUtils";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { UserData } from "@/types/auth";
import { updateUser } from "@/lib/apiUser";
import Link from "next/link";

// Validation schema for Formik
const validationSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  address: Yup.string().required("Address is required"),
  phone: Yup.string().required("Phone number is required"),
});

export default function Profile() {
  const { user, setUser } = useUserStore();
  const { logoutUser } = useLogout();
  const [openUploadModal, toggleUploadModal] = useToggle();

  // Prepopulate initial values for the Formik form
  const initialValues = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    address: user?.address || "",
    phone: user?.phone || "",
  };

  // Handle form submission
  const handleSubmit = (values: any) => {
    const payloadData = {
      userData: {
        ...values,
      },
      params: {
        id: `${user?.id}`,
      },
    };

    update(payloadData);
  };

  const profileCtas = [
    { id: 1, icon: <CartIcon />, path: "cart", name: "My Orders" },
    { id: 2, icon: <></>, path: "", name: "" },
    { id: 3, icon: <></>, path: "", name: "" },
    { id: 4, icon: <></>, path: "", name: "" },
    { id: 5, icon: <></>, path: "", name: "" },
    { id: 6, icon: <></>, path: "", name: "" },
  ];

  // const profileInfoCtas = [
  //   {
  //     id: 1,
  //     icon: <InfoCircle size="20" color="#292D32" />,
  //     path: "help",
  //     name: "Help",
  //   },
  //   {
  //     id: 2,
  //     icon: <MessageQuestion size="20" color="#828282" />,
  //     path: "faq",
  //     name: "FAQ",
  //   },
  //   {
  //     id: 3,
  //     icon: <ShoppingCart size="20" color="#828282" />,
  //     path: "support",
  //     name: "Support",
  //   },
  // ];

  const profileInfoCtas = [
    {
      id: 1,
      icon: <MessageQuestion size="20" color="#828282" />,
      path: "contact-us",
      name: "Contact Us",
    },
  ];
  const {
    mutate: update,
    isPending,
    error,
    data,
  } = useMutation<
    IUserResponse,
    Error,
    { userData: IUserPayload; params: IUserQueryParam }
  >({
    mutationFn: ({ userData, params }) => updateUser({ userData, params }),
    onMutate: async () => {},
    onSuccess: (data) => {
      setUser(mergeObjects(user ?? {}, data?.data ?? {}) as UserData);
      toggleUploadModal();
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const focusClassName =
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const placeholderClassName =
    "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";

  return (
    <section className="wrapper my-10 bg-white">
      <div className="flex items-center justify-center flex-col gap-3 p-7">
        {isPending && (
          <>
            Updating..
            <SpinnerIcon
              className="w-4 h-4 ml-2 text-white bg-white"
              size={10}
            />
          </>
        )}
        {/* Profile Picture and Edit Avatar */}
        <div className="relative flex items-center justify-center flex-col text-center">
          <Image
            width={200}
            height={200}
            className="bg-gray-500 w-40 h-40 rounded-full text-center"
            src={user?.avatar || DEFAULT_USER_IMAGE}
            alt="profile-placeholder"
          />
          <Edit2
            color="green"
            className={cn("absolute top-0 cursor-pointer", {
              "-right-[75px]": !openUploadModal,
              "right-2 hidden": openUploadModal,
            })}
            onClick={toggleUploadModal}
          />
          <CloseCircle
            color="red"
            className={cn("absolute top-0 cursor-pointer", {
              "-right-20 hidden": !openUploadModal,
              "-right-8": openUploadModal,
            })}
            onClick={toggleUploadModal}
          />

          {/* Modal for Avatar Upload */}
          {openUploadModal && (
            <ProfileAvatarUploader
              toggle={toggleUploadModal}
              show={openUploadModal}
            />
          )}
        </div>

        <div className="text-center mt-6">
          {/* User Information */}
          <p className="text-black font-medium text-mobile-3xl md:text-3xl capitalize">
            {user?.firstName} {user?.lastName}
          </p>

          {openUploadModal ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col md:flex-row items-center justify-center gap-2">
                  <div className="flex items-center sm:flex-row flex-col justify-center gap-4">
                    {/* First Name Input */}
                    <Field
                      name="firstName"
                      placeholder="Update First Name"
                      className={cn(
                        "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 capitalize",
                        placeholderClassName,
                        focusClassName
                      )}
                    />
                    {touched.firstName && errors.firstName && (
                      <p className="text-red-500">{errors.firstName}</p>
                    )}

                    {/* Last Name Input */}
                    <Field
                      name="lastName"
                      placeholder="Update Last Name"
                      className={cn(
                        "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 capitalize",
                        placeholderClassName,
                        focusClassName
                      )}
                    />
                    {touched.lastName && errors.lastName && (
                      <p className="text-red-500">{errors.lastName}</p>
                    )}
                  </div>

                  <Button
                    size="sm"
                    type="submit"
                    className="hover:bg-[#18dd81]"
                    disabled={isPending}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <p className="text-black font-normal lowercase">{user?.email}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-3 space-y-5 py-6 w-full">
        <div className="flex items-center justify-center flex-col">
          <p className="capitalize font-bold">Pick up location</p>
          {openUploadModal ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col md:flex-row items-center justify-center gap-2">
                  <Field
                    as="textarea" // This changes the input to a textarea
                    name="address"
                    placeholder="Update Pick up Location"
                    rows={4} // Ensures at least 4 lines
                    className={cn(
                      "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 normal-case",
                      placeholderClassName,
                      focusClassName
                    )}
                  />
                  {touched.address && errors.address && (
                    <p className="text-red-500">{errors.address}</p>
                  )}

                  <Button
                    size="sm"
                    type="submit"
                    className="hover:bg-[#18dd81]"
                    disabled={isPending}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <p>{user?.address}</p>
          )}
        </div>

        <div className="flex items-center justify-center flex-col">
          <p className="capitalize font-bold">Payment Method</p>
          <p>PayStack</p>
        </div>

        <div className="flex items-center justify-center flex-col">
          <p className="capitalize font-bold">Phone Number</p>
          {openUploadModal ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col md:flex-row items-center justify-center gap-2">
                  <Field
                    name="phone"
                    placeholder="Update Phone Number"
                    className={cn(
                      "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 normal-case",
                      placeholderClassName,
                      focusClassName
                    )}
                  />
                  {touched.phone && errors.phone && (
                    <p className="text-red-500">{errors.phone}</p>
                  )}

                  <Button
                    size="sm"
                    type="submit"
                    className="hover:bg-[#18dd81]"
                    disabled={isPending}
                  >
                    Update
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <p>+{user?.phone}</p>
          )}
        </div>
      </div>

      <Divider className="border-[0.5px] border-[#DEE2E6]" />

      {/* Profile Info CTAs */}
      <div className="space-y-7 py-4">
        {profileInfoCtas.map((info) => (
          <Link
            href={info.path}
            className="flex items-center justify-start gap-2"
            key={info.id}
          >
            <span>{info.icon}</span>
            <p className="text-secondary">{info.name}</p>
          </Link>
        ))}

        <div className="flex items-center justify-start gap-2 cursor-pointer">
          <span>
            <LogoutCurve size="20" color="#828282" />
          </span>
          <p
            className="text-secondary hover:text-primary hover:font-semibold"
            onClick={() => logoutUser()}
          >
            Logout {isPending ? <SpinnerIcon width={15} height={15} /> : null}
          </p>
        </div>
      </div>
    </section>
  );
}
