import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const IOIcon = (props: SvgProps) => (
  <Svg width={19} height={20} fill="none" {...props}>
    <Path
      stroke="#0DA432"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9.5 2.083V10m5.067-4.275a7.125 7.125 0 1 1-10.11.032"
    />
  </Svg>
);
export default IOIcon;
