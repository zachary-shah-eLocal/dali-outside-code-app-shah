import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const StatusInfoIcon = (props: SvgProps) => (
  <Svg width={12} height={12} fill="none" viewBox="0 0 12 12" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#7A7D9E"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.2}
        d="M6 4v2m0 2h.005M11 6A5 5 0 1 1 1 6a5 5 0 0 1 10 0Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h12v12H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default StatusInfoIcon;
