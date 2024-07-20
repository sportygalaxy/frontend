import SVGIcon, { SVGIconProps } from "@/common/Icons/SVGIcon";
import { FC } from "react";

type SpinnerIconType = Partial<SVGIconProps>;

const SpinnerIcon: FC<SpinnerIconType> = ({ ...props }) => (
  <SVGIcon
    width="200"
    height="200"
    viewBox="0 0 200 200"
    fill="none"
    {...props}
  >
    <defs>
      <linearGradient id="spinner-secondHalf">
        <stop offset="0%" stopOpacity="0" stopColor={props.color} />
        <stop offset="100%" stopOpacity="0.5" stopColor={props.color} />
      </linearGradient>
      <linearGradient id="spinner-firstHalf">
        <stop offset="0%" stopOpacity="1" stopColor={props.color} />
        <stop offset="100%" stopOpacity="0.5" stopColor={props.color} />
      </linearGradient>
    </defs>

    <g strokeWidth="8">
      <path
        stroke="url(#spinner-secondHalf)"
        d="M 4 100 A 96 96 0 0 1 196 100"
      />
      <path
        stroke="url(#spinner-firstHalf)"
        d="M 196 100 A 96 96 0 0 1 4 100"
      />

      {/* 1deg extra path to have the round end cap  */}
      <path
        stroke={props.color}
        strokeLinecap="round"
        d="M 4 100 A 96 96 0 0 1 4 98"
      />
    </g>

    <animateTransform
      from="0 0 0"
      to="360 0 0"
      attributeName="transform"
      type="rotate"
      repeatCount="indefinite"
      dur="600ms"
    />
  </SVGIcon>
);

export default SpinnerIcon;
