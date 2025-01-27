import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ShowIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#E65333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M1.667 10S4.167 4.167 10 4.167 18.333 10 18.333 10s-2.5 5.833-8.333 5.833S1.667 10 1.667 10Z"
    />
    <Path
      stroke="#E65333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
    />
  </Svg>
);
export default ShowIcon;
