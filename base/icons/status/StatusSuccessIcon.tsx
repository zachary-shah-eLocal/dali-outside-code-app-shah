import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const StatusSuccessIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#277239"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M11 5.54V6a5 5 0 1 1-2.965-4.57M11 2 6 7.005l-1.5-1.5"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StatusSuccessIcon;
