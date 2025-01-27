import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const PhoneIcon = (props: SvgProps) => (
  <Svg width={14} height={15} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M12.833 10.37v1.75a1.165 1.165 0 0 1-1.271 1.167 11.545 11.545 0 0 1-5.034-1.791 11.375 11.375 0 0 1-3.5-3.5 11.544 11.544 0 0 1-1.791-5.058 1.167 1.167 0 0 1 1.16-1.271h1.75A1.167 1.167 0 0 1 5.314 2.67c.074.56.211 1.11.409 1.64a1.167 1.167 0 0 1-.263 1.23l-.74.74a9.333 9.333 0 0 0 3.5 3.5l.74-.74a1.167 1.167 0 0 1 1.23-.263c.53.198 1.08.335 1.64.409a1.166 1.166 0 0 1 1.003 1.184Z"
    />
  </Svg>
);
export default PhoneIcon;
