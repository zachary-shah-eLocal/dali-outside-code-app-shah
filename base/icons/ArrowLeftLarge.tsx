import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowLeftLarge = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#344054"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.67}
      d="M15.833 10H4.167m0 0L10 15.833M4.167 10 10 4.167"
    />
  </Svg>
);
export default ArrowLeftLarge;
