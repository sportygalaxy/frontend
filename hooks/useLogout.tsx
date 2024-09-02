import { RoutesEnum } from "@/constants/routeEnums";
import { NotifyError, NotifySuccess } from "@/helpers/toasts";
import { logout } from "@/lib/apiAuth";
import useUserStore from "@/store/userStore";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useLogout() {
  const { clearUser } = useUserStore();
  const router = useRouter();

  const {
    mutate: logoutUser,
    isPending,
    error,
    data,
  } = useMutation<any, Error, void>({
    mutationFn: () => logout(),
    onMutate: async () => {},
    onSuccess: (data) => {
      clearUser();
      NotifySuccess((data?.message as string) || "logout successful");
      router.push(RoutesEnum.LOGIN);
    },
    onError: (error, variables, context) => {
      NotifyError(error?.message || "An error occured");
    },
  });

  return { logoutUser, isPending, error, data };
}
