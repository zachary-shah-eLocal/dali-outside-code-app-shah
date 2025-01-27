import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const ProfileIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      fill="#7A7D9E"
      fillRule="evenodd"
      d="M8 2.5a2.167 2.167 0 1 0 0 4.333A2.167 2.167 0 0 0 8 2.5ZM4.833 4.667a3.167 3.167 0 1 1 6.334 0 3.167 3.167 0 0 1-6.333 0Zm-1.072 5.76a3.167 3.167 0 0 1 2.24-.927h4a3.166 3.166 0 0 1 3.166 3.167V14a.5.5 0 1 1-1 0v-1.333A2.166 2.166 0 0 0 10 10.5H6a2.167 2.167 0 0 0-2.167 2.167V14a.5.5 0 0 1-1 0v-1.333c0-.84.334-1.646.928-2.24Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default ProfileIcon;
