import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const SwitchIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#7A7D9E"
      fillRule="evenodd"
      d="M5.687 1.646a.5.5 0 0 1 0 .708L3.874 4.167h9.46a.5.5 0 0 1 0 1h-9.46L5.687 6.98a.5.5 0 1 1-.707.707L2.313 5.02a.5.5 0 0 1 0-.707L4.98 1.646a.5.5 0 0 1 .707 0Zm4.626 6.667a.5.5 0 0 1 .707 0l2.667 2.667a.5.5 0 0 1 0 .707l-2.667 2.667a.5.5 0 0 1-.707-.708l1.813-1.813h-9.46a.5.5 0 1 1 0-1h9.46L10.313 9.02a.5.5 0 0 1 0-.707Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SwitchIcon;
