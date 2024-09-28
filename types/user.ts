import { UserData } from "./auth";

export type TUserState = {
  user: UserData | null;
  setUser: (user: UserData) => void;
  clearUser: () => void;
};

export interface IUserPayload {
  avatar: string;
}
export interface IUserQueryParam {
  id: string;
}

export type IUserResponse = ServerResponse<UserData>;