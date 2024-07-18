import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type BriefCaseIconType = Partial<SVGIconProps>;

const FacebookIcon: FC<BriefCaseIconType> = ({ ...props }) => (
  <SVGIcon width="50" height="50" viewBox="0 0 50 50" fill="none" {...props}>
    <path
      d="M29.1667 19.375V25.4167H34.5833C35 25.4167 35.2083 25.8333 35.2083 26.25L34.375 30.2083C34.375 30.4167 33.9583 30.625 33.75 30.625H29.1667V45.8333H22.9167V30.8333H19.375C18.9583 30.8333 18.75 30.625 18.75 30.2083V26.25C18.75 25.8333 18.9583 25.625 19.375 25.625H22.9167V18.75C22.9167 15.2083 25.625 12.5 29.1667 12.5H34.7917C35.2083 12.5 35.4167 12.7083 35.4167 13.125V18.125C35.4167 18.5417 35.2083 18.75 34.7917 18.75H29.7917C29.375 18.75 29.1667 18.9583 29.1667 19.375Z"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M31.2498 45.8332H18.7498C8.33317 45.8332 4.1665 41.6665 4.1665 31.2498V18.7498C4.1665 8.33317 8.33317 4.1665 18.7498 4.1665H31.2498C41.6665 4.1665 45.8332 8.33317 45.8332 18.7498V31.2498C45.8332 41.6665 41.6665 45.8332 31.2498 45.8332Z"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default FacebookIcon;
