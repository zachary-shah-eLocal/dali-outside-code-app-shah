import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CircleDollarIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M13.334 6.667h-5a1.667 1.667 0 0 0 0 3.333h3.333a1.667 1.667 0 1 1 0 3.333h-5M10 15V5m8.334 5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0Z"
    />
  </Svg>
);
export default CircleDollarIcon;
