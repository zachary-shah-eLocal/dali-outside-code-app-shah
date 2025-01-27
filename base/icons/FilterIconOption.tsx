import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const FilterIconOption = (props: SvgProps) => (
  <Svg width={14} height={14} fill="none" {...props}>
    <Path
      stroke="#20244F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.833 1.75H1.167l4.666 5.518v3.815l2.333 1.167V7.268l4.667-5.518Z"
    />
  </Svg>
);
export default FilterIconOption;
