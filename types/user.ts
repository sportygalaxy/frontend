import { UserData } from "./auth";

export type TUserState = {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
};
