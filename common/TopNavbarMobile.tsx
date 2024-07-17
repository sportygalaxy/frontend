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
    console.log("Search icon clicked");
  };

  const handleCameraClick = () => {
    setInputValue("");
    toggleUploadModal();
    console.log("Clear icon clicked");
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

      <Search
        placeholder="Search.."
        onSearchClick={handleSearchClick}
        onClearClick={handleCameraClick}
        value={inputValue}
        onChange={handleChange}
        onClose={toggleUploadModal}
      />

      <Upload onClose={toggleUploadModal} open={openUploadModal} />
    </div>
  );
};

export default TopNavbarMobile;
