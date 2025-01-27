import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CategoryIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <Path
      stroke="#7A7D9E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="M6 2H2.667A.667.667 0 0 0 2 2.667V6c0 .368.298.667.667.667H6A.667.667 0 0 0 6.667 6V2.667A.667.667 0 0 0 6 2ZM13.333 2H10a.667.667 0 0 0-.667.667V6c0 .368.299.667.667.667h3.333A.667.667 0 0 0 14 6V2.667A.667.667 0 0 0 13.333 2ZM13.333 9.333H10a.667.667 0 0 0-.667.667v3.333c0 .368.299.667.667.667h3.333a.667.667 0 0 0 .667-.667V10a.667.667 0 0 0-.667-.667ZM6 9.333H2.667A.667.667 0 0 0 2 10v3.333c0 .368.298.667.667.667H6a.667.667 0 0 0 .667-.667V10A.667.667 0 0 0 6 9.333Z"
    />
  </Svg>
);
export default CategoryIcon;
