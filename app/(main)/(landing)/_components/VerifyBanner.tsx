"use client";
import { Button } from "@/components/ui/button";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { reSendActivationLink } from "@/lib/apiAuth";
import useUserStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { Send2 } from "iconsax-react";
import { FC } from "react";

interface VerifyBannerProps {}
const VerifyBanner: FC<VerifyBannerProps> = () => {
  const { user } = useUserStore();

  const {
    mutate: resend,
    isPending: isPendingResend,
    error: isErrorResend,
    data: dataResend,
  } = useMutation<any, any>({
    mutationFn: () => reSendActivationLink(user?.token),
    onMutate: async () => {},
    onSuccess: (data) => {
      NotifySuccess(data?.message as string);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  return (
    <>
      {user?.isVerified ? null : (
        <div className="flex w-full mx-auto text-center justify-center gap-0 py-2">
          <div className="bg-[#7a0000] rounded-sm px-8 py-3 flex items-center justify-center">
            <p className="min-w-fit text-white capitalize">
              Verify your account. Check your inbox
            </p>
            <Button
              onClick={() => resend()}
              loading={isPendingResend}
              variant="link"
              className="text-base min-w-fit text-[#18dd81] capitalize space-x-2"
            >
              <span>Resend link</span> <Send2 size="20" color="#18dd81" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default VerifyBanner;
