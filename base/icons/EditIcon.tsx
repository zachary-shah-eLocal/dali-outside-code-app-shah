import * as React from "react";
import Svg, { ClipPath, Defs, G, Path, SvgProps } from "react-native-svg";
const EditIcon = (props: SvgProps) => (
  <Svg width={16} height={16} fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        stroke="#20244F"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.4}
        d="M7.333 2.667H2.666A1.333 1.333 0 0 0 1.333 4v9.333a1.333 1.333 0 0 0 1.333 1.334H12a1.333 1.333 0 0 0 1.333-1.334V8.667m-1-7a1.414 1.414 0 1 1 2 2L8 10l-2.667.667L6 8l6.333-6.333Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h16v16H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);
export default EditIcon;
