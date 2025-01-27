import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Path,
  RadialGradient,
  Stop,
  SvgProps,
} from "react-native-svg";
const MastercardIcon = (props: SvgProps) => (
  <Svg width={24} height={16} fill="none" {...props}>
    <Path fill="#FF5F00" d="M15.245 2.179h-6.49v11.662h6.49V2.18Z" />
    <Path
      fill="#EB001B"
      d="M9.167 8.01A7.404 7.404 0 0 1 12 2.18a7.417 7.417 0 1 0 0 11.662A7.403 7.403 0 0 1 9.167 8.01Z"
    />
    <Path
      fill="#F79E1B"
      d="M24 8.01a7.417 7.417 0 0 1-12 5.832 7.417 7.417 0 0 0 0-11.663 7.417 7.417 0 0 1 12 5.832ZM23.293 12.606v-.239h.096v-.048h-.245v.048h.096v.24h.053Zm.476 0v-.288h-.076l-.086.198-.087-.198h-.075v.288h.053v-.217l.081.187h.055l.081-.187v.217h.053Z"
    />
  </Svg>
);
export default MastercardIcon;
