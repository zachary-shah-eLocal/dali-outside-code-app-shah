import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ListingIcon = (props: SvgProps) => (
  <Svg width={18} height={12} fill="none" {...props}>
    <Path
      stroke="#4C34C5"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M5.333 1h10.834M5.332 6h10.833M5.333 11h10.833m-15-10h.009m-.008 5h.008m-.008 5h.008"
    />
  </Svg>
);
export default ListingIcon;
