import { styles } from "./PopperOverlayStyles";

import { FC, ReactNode } from "react";
import { TouchableOpacity } from "react-native";
import { Menu, MenuOptions, MenuTrigger } from "react-native-popup-menu";

export type PopperOverlayProps = {
  buttonText: string;
  children: ReactNode;
};

export const PopperOverlay: FC<PopperOverlayProps> = (props) => {
  return (
    <Menu style={styles.popperShell}>
      <MenuTrigger
        text={props.buttonText}
        style={styles.popperButton}
        customStyles={{
          TriggerTouchableComponent: TouchableOpacity,
        }}
      />
      <MenuOptions
        optionsContainerStyle={{
          marginTop: 40,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 5,
        }}
      >
        {props.children}
      </MenuOptions>
    </Menu>
  );
};
