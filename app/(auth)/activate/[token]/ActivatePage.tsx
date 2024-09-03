"use client";

import React, { FC } from "react";
import { useMutation } from "@tanstack/react-query";
import { activate, reSendActivationLink } from "@/lib/apiAuth";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { useRouter } from "next/navigation";
import { RoutesEnum } from "@/constants/routeEnums";
import { Button } from "@/components/ui/button";
import useUserStore from "@/store/userStore";

interface ActivateProps {
  params: { token: string };
  searchParams: {};
}

const ActivatePage: FC<ActivateProps> = (props) => {
  const { setUser } = useUserStore();
  const { params, searchParams } = props;

  const router = useRouter();

  const token = params?.token || "";

  const {
    mutate: activatee,
    isPending,
    error,
    data,
  } = useMutation<any, any>({
    mutationFn: () => activate(token),
    onMutate: async () => {},
    onSuccess: (data) => {
      setUser(data?.data);
      NotifySuccess(data?.message as string);
      router.push(RoutesEnum.LANDING_PAGE);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  const {
    mutate: resend,
    isPending: isPendingResend,
    error: isErrorResend,
    data: dataResend,
  } = useMutation<any, any>({
    mutationFn: () => reSendActivationLink(token),
    onMutate: async () => {},
    onSuccess: (data) => {
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  return (
    <div className="h-80 w-full flex items-center justify-center flex-col space-y-3">
      {isPending ? (
        <span>loading.......</span>
      ) : (
        <>
          <p>Your request to activate account has been confirmed</p>
          <Button
            onClick={() => activatee()}
            variant="default"
            size="lg"
            loading={isPending}
          >
            Activate account
          </Button>
          <Button
            onClick={() => resend()}
            loading={isPendingResend}
            variant="link"
            className="text-xs"
          >
            Resend link
          </Button>
        </>
      )}
    </div>
  );
};

export default ActivatePage;
