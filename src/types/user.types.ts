// interface

export interface User {
  id: string;
  name: string;
  avatar: string | null;
}

export type UpdateUserDto = {
  password?: string;
  avatar?: string;
  // Add other fields from your user model here
};

export type UpdateUserParams = {
  id: string;
  payload: {
    inputs?: Partial<UpdateUserDto>;
    password?: string;
    avatar?: string | null;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    address?: string;
    isVerified?: boolean;

    googleId?: string;
    bio?: string;
    location?: Location;
  };
};

export type UpdateUserResponse = {
  id: string;
  email: string;
  avatar?: string | null;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
};
