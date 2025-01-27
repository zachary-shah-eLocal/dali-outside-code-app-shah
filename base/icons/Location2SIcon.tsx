import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const Location2SIcon = (props: SvgProps) => (
  <Svg width={17} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M6.39 9.334H3.833a.667.667 0 0 0-.6.466l-1.333 4c-.067.067-.067.133-.067.2 0 .4.267.667.667.667h12c.4 0 .666-.267.666-.667 0-.066 0-.133-.066-.2l-1.334-4a.666.666 0 0 0-.6-.466H10.61m1.89-4c0 3-4 6-4 6s-4-3-4-6a4 4 0 1 1 8 0Zm-2.667 0a1.333 1.333 0 1 1-2.667 0 1.333 1.333 0 0 1 2.667 0Z"
    />
  </Svg>
);
export default Location2SIcon;
