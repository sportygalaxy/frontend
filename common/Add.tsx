"use client";
import AddIcon from "@/assets/icons/pack/Add";
import AddMobileIcon from "@/assets/icons/pack/AddMobile";

const Add = () => {
  return (
    <div>
      <div className="desktop-view">
        <AddIcon />
      </div>
      <div className="mobile-view">
        <AddMobileIcon />
      </div>
    </div>
  );
};

export default Add;
