import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const ErrorStatusIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <Path
      stroke="#F52821"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M7.5 7 10 4.5m0 0L7.5 2M10 4.5H4.75a2.75 2.75 0 1 0 0 5.5H6.5"
    />
  </Svg>
);
export default ErrorStatusIcon;
