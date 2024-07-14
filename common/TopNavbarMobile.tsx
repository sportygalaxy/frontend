"use client";
import LogoIcon from "@/assets/icons/pack/Logo";
import { Search } from "@/components/search";
import { useState } from "react";

const TopNavbarMobile = () => {
  const [inputValue, setInputValue] = useState("");

  const handleSearchClick = () => {
    console.log("Search icon clicked");
  };

  const handleClearClick = () => {
    setInputValue("");
    console.log("Clear icon clicked");
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const logoSize = {
    width: "49",
    height: "45",
  };
  return (
    <div className="wrapper flex flex-col w-full gap-3">
      <div className="flex flex-col gap-2">
        <LogoIcon {...logoSize} />
        <p className="text-primary opacity-50 font-light text-sm">
          What are you buying today?
        </p>
      </div>

      <Search
        placeholder="Search.."
        onSearchClick={handleSearchClick}
        onClearClick={handleClearClick}
        value={inputValue}
        onChange={handleChange}
      />
    </div>
  );
};

export default TopNavbarMobile;
