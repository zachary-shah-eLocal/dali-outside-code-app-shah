import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const MailIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m14.667 4.667-5.98 3.8a1.293 1.293 0 0 1-1.373 0l-5.98-3.8m1.333-2h10.666c.737 0 1.334.597 1.334 1.333v8c0 .736-.597 1.333-1.333 1.333H2.667A1.333 1.333 0 0 1 1.334 12V4c0-.736.596-1.333 1.333-1.333Z"
    />
  </Svg>
);
export default MailIcon;
