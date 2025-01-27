import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CurrencyIcon = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" viewBox="0 0 17 16" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M11.166 5.333h-4a1.333 1.333 0 1 0 0 2.667h2.667a1.333 1.333 0 1 1 0 2.667h-4M8.5 12V4m6.666 4A6.667 6.667 0 1 1 1.833 8a6.667 6.667 0 0 1 13.333 0Z"
    />
  </Svg>
);
export default CurrencyIcon;
