import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const MailIconC = (props: SvgProps) => (
  <Svg width={20} height={20} fill="none" {...props}>
    <Path
      stroke="#0293D2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.8}
      d="m18.334 5.833-7.475 4.75a1.617 1.617 0 0 1-1.717 0l-7.475-4.75m1.667-2.5h13.333c.92 0 1.667.747 1.667 1.667v10c0 .92-.747 1.667-1.667 1.667H3.334c-.92 0-1.667-.746-1.667-1.667V5c0-.92.746-1.667 1.667-1.667Z"
    />
  </Svg>
);
export default MailIconC;
