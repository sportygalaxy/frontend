import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type NotificationIconType = Partial<SVGIconProps>;

const NotificationIcon: FC<NotificationIconType> = ({ ...props }) => (
  <SVGIcon width="26" height="27" viewBox="0 0 26 27" fill="none" {...props}>
    <path
      d="M13.0209 3.92493C9.57295 3.92493 6.77086 6.74306 6.77086 10.2107V13.2384C6.77086 13.8775 6.50003 14.8518 6.17711 15.3965L4.9792 17.3975C4.23961 18.6337 4.75003 20.0061 6.1042 20.4671C10.5938 21.9757 15.4375 21.9757 19.9271 20.4671C21.1875 20.048 21.7396 18.5499 21.0521 17.3975L19.8542 15.3965C19.5417 14.8518 19.2709 13.8775 19.2709 13.2384V10.2107C19.2709 6.75354 16.4584 3.92493 13.0209 3.92493Z"
      stroke={props?.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
    />
    <path
      d="M14.9479 4.22859C14.625 4.1343 14.2917 4.06097 13.9479 4.01906C12.9479 3.89335 11.9896 3.96668 11.0938 4.22859C11.3958 3.45334 12.1458 2.90857 13.0208 2.90857C13.8958 2.90857 14.6458 3.45334 14.9479 4.22859Z"
      stroke={props?.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16.1465 20.8442C16.1465 22.5728 14.7402 23.9871 13.0215 23.9871C12.1673 23.9871 11.3757 23.6309 10.8132 23.0652C10.2507 22.4995 9.89648 21.7033 9.89648 20.8442"
      stroke={props?.color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
    />
  </SVGIcon>
);

export default NotificationIcon;
