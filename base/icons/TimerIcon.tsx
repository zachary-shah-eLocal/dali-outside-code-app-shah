import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const TimerIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M6.667 1.333h2.667M8 9.334l2-2m3.334 2a5.333 5.333 0 1 1-10.667 0 5.333 5.333 0 0 1 10.667 0Z"
    />
  </Svg>
);
export default TimerIcon;
