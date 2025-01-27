import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowDownOption = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props} viewBox="0 0 14 14">
    <Path
      stroke="#9FA3C4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m3.5 5.833 3.5 3.5 3.5-3.5"
    />
  </Svg>
);
export default ArrowDownOption;
