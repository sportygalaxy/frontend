"use client";
import AddIcon from "@/assets/icons/pack/Add";
import AddMobileIcon from "@/assets/icons/pack/AddMobile";

const Add = () => {
  return (
    <div>
      <div className="desktop-tablet-view">
        <AddIcon />
      </div>
      <div className="mobile-desktop-tablet-view">
        <AddMobileIcon />
      </div>
    </div>
  );
};

export default Add;
