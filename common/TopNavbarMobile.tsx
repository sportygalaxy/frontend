"use client";
import { Search } from "@/components/search";
import { FC, useEffect, useState } from "react";
import Upload from "./Upload";
import Logo from "./Logo";
import useToggle from "@/hooks/useToggle";
import useUserStore from "@/store/userStore";
import { getCookie } from "cookies-next";
import GlobalSearch from "./GlobalSearch";

interface TopNavbarMobileProps {
  isAuth: boolean;
}
const TopNavbarMobile: FC<TopNavbarMobileProps> = (props) => {
  const { isAuth } = props;
  const { user } = useUserStore();
  const [authenticated, setAuthenticated] = useState(false);

  const [openUploadModal, toggleUploadModal] = useToggle();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const AUTHENTIATED = getCookie("token");
    setAuthenticated(!!AUTHENTIATED);
  }, []);

  const handleSearchClick = () => {
    //
  };

  const handleCameraClick = () => {
    setInputValue("");
    toggleUploadModal();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="relative flex flex-col w-full gap-3 wrapper">
      <div className="flex flex-col gap-2">
        {/* logged in
         */}
        <Logo />

        {/* not logged in */}
        {!!user || authenticated ? (
          <p className="text-xl font-medium capitalize">
            Hello {user?.firstName},
          </p>
        ) : null}

        <p className="text-sm font-light opacity-50 text-primary">
          What are you buying today?
        </p>
      </div>

      {isAuth ? null : (
        <div className="mt-7">
          {/* <Search
            placeholder="Search.."
            onSearchClick={handleSearchClick}
            onClearClick={handleCameraClick}
            value={inputValue}
            onChange={handleChange}
            onClose={toggleUploadModal}
          /> */}
          <GlobalSearch onClearClick={handleCameraClick} />
        </div>
      )}

      {isAuth ? null : (
        <Upload onClose={toggleUploadModal} open={openUploadModal} />
      )}
    </div>
  );
};

export default TopNavbarMobile;
