import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ZipIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M8 8.667V14M8 2v2m4 0H3.333A1.333 1.333 0 0 0 2 5.333v2a1.333 1.333 0 0 0 1.333 1.334H12l2.667-2.334L12 4Z"
    />
  </Svg>
);
export default ZipIcon;
