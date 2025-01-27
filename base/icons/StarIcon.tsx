import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const StarIcon = (props: SvgProps) => (
  <Svg width={16} height={17} fill="none" {...props}>
    <Path
      stroke="#20244F"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.2}
      d="m8 1.833 2.06 4.174 4.607.673-3.333 3.247.786 4.587L8 12.347l-4.12 2.167.787-4.587L1.334 6.68l4.606-.673L8 1.834Z"
    />
  </Svg>
);
export default StarIcon;
