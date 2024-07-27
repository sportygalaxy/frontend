export interface RegisterUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  
  isVerified?: boolean;
  googleId?: string;
  avatar?: string;
  bio?: string;
  location?: Location;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface LoginUserDto {
  email: string;
  password: string;
}

// export type CanRegisterResponse = {
//   id: string;
//   email: string;
//   avatar: string | null;
//   createdAt: Date;
// };

export type CanRegisterResponse = {
  isCanRegister: boolean;
  isEmailExist: boolean;
};
