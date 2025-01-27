import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CampingIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="m14 5 3-3m0 0 3 3m-3-3v12m-3-4 3-3 3 3m-3 4H7l-5 8h20l-5-8Zm-9 0v8m1-8 5 8M6 4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </Svg>
);
export default CampingIcon;
