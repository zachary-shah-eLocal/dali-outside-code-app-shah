import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const DollarIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 0 1 0 4H8m4 2V6M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4.001 4.001 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4.001 4.001 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
    />
  </Svg>
);
export default DollarIcon;
