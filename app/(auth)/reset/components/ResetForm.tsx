"use client";
import React from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { reset } from "@/lib/apiAuth";
import { IResetUserPayload, UserData } from "@/types/auth";
import SpinnerIcon from "@/assets/icons/pack/Spinner";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { IResetUserResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";
import Link from "next/link";
import useUserStore from "@/store/userStore";

interface FormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
});

const LoginForm: React.FC = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const {
    mutate: resetUser,
    isPending,
    error,
    data,
  } = useMutation<IResetUserResponse, Error, IResetUserPayload>({
    mutationFn: (resetData: IResetUserPayload) => reset(resetData),
    onMutate: async () => {},
    onSuccess: (data) => {
      setUser(data?.data as UserData);
      NotifySuccess(data?.message as string);
      router.push(RoutesEnum.OTP);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const resetData: IResetUserPayload = {
      email: values.email,
    };

    resetUser(resetData);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => {
        const disableBtn = !(
          Object.keys(errors).length > 0 ||
          !values.email ||
          isPending
        );

        const focusClassName =
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent";
        const placeholderClassName =
          "placeholder-[#808080] placeholder:font-light focus:placeholder-opacity-50 disabled:placeholder-opacity-70";

        return (
          <>
            <Form className="flex flex-col items-center justify-start w-full h-screen my-20 bg-background">
              <div className="flex flex-col items-center justify-start w-full">
                <div className="w-full mx-auto md:max-w-screen-sm space-y-11">
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
                      placeholder="eg name@domain.com"
                    />
                    {errors.email && touched.email ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.email}
                      </div>
                    ) : null}
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
                      Send Otp
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-center w-full py-6 mx-auto md:max-w-screen-sm">
                  <Link href={RoutesEnum.LOGIN}>
                    <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                      Login
                    </p>
                  </Link>
                </div>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default LoginForm;
