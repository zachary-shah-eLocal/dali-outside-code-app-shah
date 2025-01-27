import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ContactIcon = (props: SvgProps) => (
  <Svg width={24} height={24} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.6}
      d="M17 18a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2M8 2v2m8-2v2M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Zm9 6a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
    />
  </Svg>
);
export default ContactIcon;
