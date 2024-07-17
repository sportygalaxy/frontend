"use client";
import { Search } from "@/components/search";
import { useState } from "react";
import Upload from "./Upload";
import Logo from "./Logo";
import useToggle from "@/hooks/useToggle";

const TopNavbarMobile = () => {
  const [openUploadModal, toggleUploadModal] = useToggle();
  const [inputValue, setInputValue] = useState("");

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
    <div className="relative wrapper flex flex-col w-full gap-3">
      <div className="flex flex-col gap-2">
        {/* logged in
         */}
        <Logo />

        {/* not logged in */}
        {/* <p className="text-xl font-medium">Hello Chibueze,</p> */}

        <p className="text-primary opacity-50 font-light text-sm">
          What are you buying today?
        </p>
      </div>

      <div className="mt-7">
        <Search
          placeholder="Search.."
          onSearchClick={handleSearchClick}
          onClearClick={handleCameraClick}
          value={inputValue}
          onChange={handleChange}
          onClose={toggleUploadModal}
        />
      </div>

      <Upload onClose={toggleUploadModal} open={openUploadModal} />
    </div>
  );
};

export default TopNavbarMobile;
