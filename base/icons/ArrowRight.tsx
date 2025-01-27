import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ArrowRight = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path fill="#fff" d="m9.729 7.678 4.4 4.521-4.4 4.521" />
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9.729 7.678 4.4 4.521-4.4 4.521"
    />
  </Svg>
);
export default ArrowRight;
