import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type GalleryIconType = Partial<SVGIconProps>;

const GalleryIcon: FC<GalleryIconType> = ({ ...props }) => (
  <SVGIcon width="49" height="49" viewBox="0 0 49 49" fill="none" {...props}>
    <path
      d="M18.3747 44.9166H30.6247C40.833 44.9166 44.9163 40.8333 44.9163 30.625V18.375C44.9163 8.16665 40.833 4.08331 30.6247 4.08331H18.3747C8.16634 4.08331 4.08301 8.16665 4.08301 18.375V30.625C4.08301 40.8333 8.16634 44.9166 18.3747 44.9166Z"
      stroke="black"
      strokeWidth="3.0625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.3753 20.4167C20.6305 20.4167 22.4587 18.5885 22.4587 16.3333C22.4587 14.0782 20.6305 12.25 18.3753 12.25C16.1202 12.25 14.292 14.0782 14.292 16.3333C14.292 18.5885 16.1202 20.4167 18.3753 20.4167Z"
      stroke="black"
      strokeWidth="3.0625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.45117 38.6896L15.5166 31.9316C17.1295 30.8496 19.457 30.9721 20.9066 32.2175L21.5803 32.8096C23.1728 34.1775 25.7453 34.1775 27.3378 32.8096L35.8312 25.5208C37.4237 24.1529 39.9962 24.1529 41.5887 25.5208L44.9166 28.3791"
      stroke="black"
      strokeWidth="3.0625"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default GalleryIcon;
