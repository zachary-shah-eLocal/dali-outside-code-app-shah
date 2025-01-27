import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const HistoryIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="M2 8a6 6 0 1 0 6-6 6.5 6.5 0 0 0-4.493 1.827L2 5.333m0 0V2m0 3.333h3.333M8 4.667V8l2.667 1.333"
    />
  </Svg>
);
export default HistoryIcon;
