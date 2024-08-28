export interface ICreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

type UserData = Partial<{
  token: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  googleId: string | null;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}>;

export type ICreateUserResponse = ServerResponse<UserData>;
