import Navbar from "@/common/Navbar";
import React, { FC } from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}
const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className={`relative grid grid-cols-12 gap-0 auto-rows-max`}>
      <Navbar isAuth />

      <main className="col-span-12 auto-rows-auto w-full h-full-minus-80 sm:h-full overflow-auto sm:overflow-hidden">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
