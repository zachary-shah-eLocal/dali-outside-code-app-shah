import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const DownloadIcon = (props: SvgProps) => (
  <Svg width={18} height={18} fill="none" {...props}>
    <Path
      stroke="#20244F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M9 12.75V2.25m0 10.5-4.5-4.5m4.5 4.5 4.5-4.5m.75 7.5H3.75"
    />
  </Svg>
);
export default DownloadIcon;
