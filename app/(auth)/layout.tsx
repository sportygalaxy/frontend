import Navbar from "@/common/Navbar";
import React, { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={`relative grid grid-cols-12 gap-0 auto-rows-max`}>
      <Navbar isAuth />
      {children}
    </div>
  );
};

export default AuthLayout;
