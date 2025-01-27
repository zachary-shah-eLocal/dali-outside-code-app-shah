import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const UserIcon = (props: SvgProps) => (
  <Svg
    width={17}
    height={17}
    fill="#7A7D9E"
    stroke="#7A7D9E"
    strokeWidth={0}
    viewBox="0 0 32 32"
    {...props}
  >
    <Path
      stroke="none"
      d="M16 5c-3.855 0-7 3.145-7 7 0 2.41 1.23 4.55 3.094 5.813C8.527 19.343 6 22.883 6 27h2c0-4.43 3.57-8 8-8s8 3.57 8 8h2c0-4.117-2.527-7.656-6.094-9.188A7.024 7.024 0 0 0 23 12c0-3.855-3.145-7-7-7Zm0 2c2.773 0 5 2.227 5 5s-2.227 5-5 5-5-2.227-5-5 2.227-5 5-5Z"
    />
  </Svg>
);
export default UserIcon;
