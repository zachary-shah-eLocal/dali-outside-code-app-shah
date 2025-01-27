import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SearchIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.3}
      d="m17.5 17.5-3.583-3.583m1.916-4.75a6.667 6.667 0 1 1-13.333 0 6.667 6.667 0 0 1 13.333 0Z"
    />
  </Svg>
);
export default SearchIcon;
