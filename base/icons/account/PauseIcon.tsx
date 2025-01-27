import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const PauseIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M10 15V9m4 6V9m8 3c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10Z"
    />
  </Svg>
);
export default PauseIcon;
