import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ErrorIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#F52821"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M10 7.5v3.333m0 3.333h.008m8.1.834L11.442 3.333a1.667 1.667 0 0 0-2.9 0L1.875 15a1.666 1.666 0 0 0 1.459 2.5h13.333a1.667 1.667 0 0 0 1.441-2.5Z"
    />
  </Svg>
);
export default ErrorIcon;
