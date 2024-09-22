"use client";
import React, { useState } from "react";
import { Formik, Field, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { cn } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/apiAuth";
import { ILoginUserPayload, UserData } from "@/types/auth";
import SpinnerIcon from "@/assets/icons/pack/Spinner";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { ILoginUserResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";
import useUserStore from "@/store/userStore";
import Link from "next/link";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface FormValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginForm: React.FC = () => {
  const { setUser } = useUserStore();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    mutate: loginUser,
    isPending,
    error,
    data,
  } = useMutation<ILoginUserResponse, Error, ILoginUserPayload>({
    mutationFn: (loginData: ILoginUserPayload) => login(loginData),
    onMutate: async () => {},
    onSuccess: (data) => {
      setUser(data?.data as UserData);
      NotifySuccess(data?.message as string);
      router.push(RoutesEnum.LANDING_PAGE);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const handleSubmit = async (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    const loginData: ILoginUserPayload = {
      email: values.email,
      password: values.password,
    };

    loginUser(loginData);
    setSubmitting(false);
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ values, errors, touched }) => {
        const disableBtn = !(
          Object.keys(errors).length > 0 ||
          !values.email ||
          !values.password ||
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
                  <div className="relative flex flex-col items-center sm:min-w-[480px] gap-5 xs:flex-row">
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

                  <div className="relative flex flex-col items-center gap-5 xs:flex-row">
                    <label
                      className="flex justify-start flex-1 w-full xs:justify-end"
                      htmlFor="password"
                    >
                      * Login Password
                    </label>
                    <div className="relative flex flex-[3] w-full sm:min-w-[480px] items-center">
                      <Field
                        className={cn(
                          "w-full border-1 lightDarkGrey rounded-xl py-3 xs:py-4 px-4 xs:px-8 m-0",
                          placeholderClassName,
                          focusClassName
                        )}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="******"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2"
                      >
                        {showPassword ? (
                          <EyeIcon className="w-5 h-5 text-gray-500" />
                        ) : (
                          <EyeOffIcon className="w-5 h-5 text-gray-500" />
                        )}
                      </button>
                    </div>
                    {errors.password && touched.password ? (
                      <div className="absolute right-0 text-sm text-destructive top-24 xs:top-16">
                        {errors.password}
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
                      Login
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full py-6 mx-auto md:max-w-screen-sm">
                  <Link href={RoutesEnum.REGISTER}>
                    <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                      Create account
                    </p>
                  </Link>
                  <Link href={RoutesEnum.RESET}>
                    <p className="font-normal text-black underline cursor-pointer text-mobile-2xl md:text-xl font-jost hover:underline-offset-4 underline-offset-2">
                      Forgot password?
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
