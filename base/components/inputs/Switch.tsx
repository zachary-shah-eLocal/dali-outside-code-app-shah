import React from "react";
import { Switch as RNSwitch, SwitchProps } from "react-native";
import { Colors } from "../../../theme/colors";

type Props = {};

const Switch: React.FC<SwitchProps> = (props: Props) => {
  return (
    <RNSwitch
      trackColor={{
        false: Colors.divider,
        true: Colors.secondary,
      }}
      {...props}
      style={{ transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }] }}
    />
  );
};

export default Switch;
