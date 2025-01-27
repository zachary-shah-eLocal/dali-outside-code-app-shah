import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const LocationIconS = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M13.333 6.667c0 4-5.333 8-5.333 8s-5.333-4-5.333-8a5.333 5.333 0 0 1 10.666 0Z"
    />
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M8 8.667a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"
    />
  </Svg>
);
export default LocationIconS;
