import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CalendarIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M10.667 1.333V4M5.333 1.333V4M2 6.667h12m-10.667-4h9.334C13.403 2.667 14 3.264 14 4v9.333c0 .737-.597 1.334-1.333 1.334H3.333A1.333 1.333 0 0 1 2 13.333V4c0-.736.597-1.333 1.333-1.333Z"
    />
  </Svg>
);
export default CalendarIcon;
