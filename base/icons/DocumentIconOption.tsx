import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const DocumentIconOption = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      stroke="#20244F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.167 1.167v3.5h3.5m-7 2.916h1.167M4.667 9.916h1.167m2.333-2.333h1.167M8.167 9.916h1.167m-.875-8.75H3.5a1.167 1.167 0 0 0-1.167 1.167v9.334A1.167 1.167 0 0 0 3.5 12.832h7a1.167 1.167 0 0 0 1.167-1.167V4.375L8.459 1.167Z"
    />
  </Svg>
);
export default DocumentIconOption;
