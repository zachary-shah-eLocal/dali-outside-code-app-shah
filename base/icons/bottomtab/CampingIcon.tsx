import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
const CampingIcon = ({ color = "#20244F", ...rest }: SvgProps) => (
  <Svg width={21} height={20} fill="none" {...rest}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="m14.375 2.317-8.708 3.95H2a.63.63 0 0 0-.625.625v5.858a.63.63 0 0 0 .625.625h.342v2.767c0 .108 0 .483.191.841.109.2.267.392.517.542.242.142.533.217.858.217.325 0 .609-.084.842-.242.233-.158.375-.366.458-.558.159-.35.159-.709.159-.792v-2.766h.416l8.6 3.825a.623.623 0 0 0 .875-.575V2.884a.638.638 0 0 0-.283-.525.615.615 0 0 0-.6-.042Zm-11.75 5.2h2.608v4.608H2.625V7.517Zm1.492 8.625v.125c0 .058-.025.108-.042.15-.017.041-.033.05-.033.05s-.034.025-.125.025c-.142 0-.209-.034-.225-.042a.085.085 0 0 1-.042-.05c-.042-.075-.042-.175-.042-.258v-2.767h.525v2.767h-.016Zm9.891-.475-7.525-3.35v-5.05l7.525-3.417v11.817ZM17.217 7.325l1.55-1.942a.615.615 0 0 0-.1-.875.615.615 0 0 0-.875.1l-1.55 1.942a.615.615 0 0 0 .1.875.615.615 0 0 0 .875-.1ZM17.217 12.092a.623.623 0 0 0-.975.775l1.55 1.941a.623.623 0 0 0 .975-.775l-1.55-1.941ZM18.667 9.083h-2.325a.63.63 0 0 0-.625.625.63.63 0 0 0 .625.625h2.325a.63.63 0 0 0 .625-.625.63.63 0 0 0-.625-.625Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default CampingIcon;
