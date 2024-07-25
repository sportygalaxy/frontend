export type TUser = {
  id: number;
  name: string;
  email: string;
};

export type TUserState = {
  user: TUser | null;
  setUser: (user: TUser) => void;
  clearUser: () => void;
};
