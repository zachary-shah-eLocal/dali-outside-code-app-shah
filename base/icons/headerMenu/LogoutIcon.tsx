import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const LogoutIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#7A7D9E"
      fillRule="evenodd"
      d="M3.333 2.5a.833.833 0 0 0-.833.833v9.334a.833.833 0 0 0 .833.833H6a.5.5 0 0 1 0 1H3.333A1.833 1.833 0 0 1 1.5 12.667V3.333A1.833 1.833 0 0 1 3.333 1.5H6a.5.5 0 0 1 0 1H3.333Zm6.98 1.813a.5.5 0 0 1 .707 0l3.334 3.333a.5.5 0 0 1 0 .708l-3.334 3.333a.5.5 0 0 1-.707-.707l2.48-2.48H6a.5.5 0 0 1 0-1h6.793l-2.48-2.48a.5.5 0 0 1 0-.707Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default LogoutIcon;
