import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const LocationIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z"
    />
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
    />
  </Svg>
);
export default LocationIcon;
