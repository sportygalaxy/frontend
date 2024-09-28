"use client";
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
import FileUploadForm from "./FileUploadForm";
import { DEFAULT_USER_IMAGE } from "@/constants/appConstants";
import ProfileAvatarUploader from "./components/ProfileAvatarUploader";
import useToggle from "@/hooks/useToggle";
import { cn } from "@/lib/utils";

export default function Profile() {
  const { user } = useUserStore();
  const { logoutUser, isPending } = useLogout();
  const [openUploadModal, toggleUploadModal] = useToggle();

  const profileCtas = [
    {
      id: 1,
      icon: <CartIcon />,
      path: "cart",
      name: "My Orders",
    },
    {
      id: 2,
      icon: <></>,
      path: "",
      name: "",
    },
    {
      id: 3,
      icon: <></>,
      path: "",
      name: "",
    },
    {
      id: 4,
      icon: <></>,
      path: "",
      name: "",
    },
    {
      id: 5,
      icon: <></>,
      path: "",
      name: "",
    },
    {
      id: 6,
      icon: <></>,
      path: "",
      name: "",
    },
  ];

  const profileInfoCtas = [
    {
      id: 1,
      icon: <InfoCircle size="20" color="#292D32" />,
      path: "help",
      name: "Help",
    },
    {
      id: 2,
      icon: <MessageQuestion size="20" color="#828282" />,
      path: "faq",
      name: "FAQ",
    },
    {
      id: 3,
      icon: <ShoppingCart size="20" color="#828282" />,
      path: "support",
      name: "Support",
    },
  ];

  const focusClassName =
    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
  const placeholderClassName =
    "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";
  return (
    <section className="wrapper my-10 bg-white">
      <div className="flex items-center justify-center flex-col gap-3 p-7">
        <div className="relative flex items-center justify-center flex-col text-center">
          <Image
            width={200}
            height={200}
            className="bg-gray-500 w-40 h-40 rounded-full text-center"
            src={user?.avatar || DEFAULT_USER_IMAGE}
            alt="profic-placeholder"
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

          {openUploadModal ? (
            <ProfileAvatarUploader
              toggle={toggleUploadModal}
              show={openUploadModal}
            />
          ) : null}
        </div>
        <div className="text-center">
          <p className="text-black font-medium text-mobile-3xl md:text-3xl capitalize">
            {user?.firstName} {user?.lastName}
          </p>

          {openUploadModal ? (
            <div
              className={cn(
                "flex items-center sm:flex-row flex-col justify-center gap-4"
              )}
            >
              <input
                className={cn(
                  "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 capitalize",
                  placeholderClassName,
                  focusClassName
                )}
                defaultValue={user?.firstName}
                placeholder="Update First Name"
                name="firstName"
                type="text"
              />
              <input
                className={cn(
                  "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 capitalize",
                  placeholderClassName,
                  focusClassName
                )}
                defaultValue={user?.lastName}
                placeholder="Update Last Name"
                name="lastName"
                type="text"
              />
            </div>
          ) : (
            <p className="text-black font-normal lowercase">{user?.email}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-center flex-col gap-3 space-y-5 py-6 w-full">
        <div className="flex items-center justify-center flex-col">
          <p className="capitalize font-bold">Pick up location</p>

          {openUploadModal ? (
            <input
              className={cn(
                "flex flex-[3] justify-start border-1 lightDarkGrey w-full rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0 normal-case",
                placeholderClassName,
                focusClassName
              )}
              defaultValue={user?.address}
              placeholder="Update Pick up Location"
              name="firstName"
              type="text"
            />
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
          <p>+{user?.phone}</p>
        </div>
      </div>

      <Divider className="border-[0.5px] border-[#DEE2E6]" />

      <div className="space-y-7 py-4">
        {profileInfoCtas.map((info) => (
          <div className="flex items-center justify-start gap-2" key={info.id}>
            <span>{info.icon}</span>
            <p className="text-secondary">{info.name}</p>
          </div>
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

      <div className="flex items-center justify-start gap-4 mt-6">
        <p className="underline ring-offset-4 font-semibold">Privacy policy</p>|
        <p className="underline ring-offset-4 font-semibold">
          Terms & Conditions
        </p>
        |<p className="underline ring-offset-4 font-semibold">Version 1.0.0</p>
      </div>
    </section>
  );
}
