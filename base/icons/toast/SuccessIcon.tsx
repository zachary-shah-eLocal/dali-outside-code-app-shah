import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SuccessIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#0DA432"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M16.667 5 7.5 14.167 3.333 10"
    />
  </Svg>
);
export default SuccessIcon;
