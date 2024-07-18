"use client";
import CameraIcon from "@/assets/icons/pack/Camera";
import CameraMobileIcon from "@/assets/icons/pack/CameraMobile";

const Camera = () => {
  return (
    <div>
      <div className="desktop-view">
        <CameraIcon />
      </div>
      <div className="mobile-view">
        <CameraMobileIcon />
      </div>
    </div>
  );
};

export default Camera;
