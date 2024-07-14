import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type UserIconType = Partial<SVGIconProps>;

const UserIcon: FC<UserIconType> = ({ ...props }) => (
  <SVGIcon width="26" height="26" viewBox="0 0 26 26" fill="none" {...props}>
    <path
      d="M12.9993 13.448C15.8758 13.448 18.2077 11.1162 18.2077 8.23971C18.2077 5.36322 15.8758 3.03137 12.9993 3.03137C10.1229 3.03137 7.79102 5.36322 7.79102 8.23971C7.79102 11.1162 10.1229 13.448 12.9993 13.448Z"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.9486 23.8647C21.9486 19.8334 17.9381 16.573 13.0006 16.573C8.06315 16.573 4.05273 19.8334 4.05273 23.8647"
      stroke="#828282"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </SVGIcon>
);

export default UserIcon;
