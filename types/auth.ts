export interface ICreateUserPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
}

export interface ILoginUserPayload {
  email: string;
  password: string;
}

export interface IResetUserPayload {
  email: string;
}

export interface IOtpUserPayload {
  code: string;
  newPassword: string;
  email: string;
}

export type UserData = Partial<{
  token: string;
  id: string | number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  isVerified: boolean;
  googleId: string | null;
  avatar: string | null;
  bio: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}>;

export type ICreateUserResponse = ServerResponse<UserData>;
export type ILoginUserResponse = ServerResponse<UserData>;
export type IResetUserResponse = ServerResponse<{ email: string }>;
export type IOtpUserResponse = ServerResponse<any>;
