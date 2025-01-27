import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowLeft = (props: SvgProps) => (
  <Svg width={28} height={28} fill="none" {...props}>
    <Path
      stroke="#20244F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m16.334 21-7-7 7-7"
    />
  </Svg>
);
export default ArrowLeft;
