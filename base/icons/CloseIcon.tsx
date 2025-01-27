import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CloseIcon = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="M15 5 5 15M5 5l10 10"
    />
  </Svg>
);
export default CloseIcon;
