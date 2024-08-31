import Navbar from "@/common/Navbar";
import React, { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div
      className={`relative grid grid-cols-12 gap-0 auto-rows-max min-h-screen`}
    >
      <Navbar isAuth />

      <main className="w-full col-span-12">{children}</main>
    </div>
  );
};

export default AuthLayout;
