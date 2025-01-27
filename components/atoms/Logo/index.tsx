import { styles } from "./LogoStyles";

import { TouchableOpacity } from "react-native";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Stacks } from "../../../navigation/consts/Stacks";
import { ElocalLogo } from "../../../svgs";

export const Logo = () => {
  return (
    <TouchableOpacity
      onPress={() => {
        Navigation.replace(Stacks.HOME_STACK);
      }}
      style={styles.mainLogo}
      // underlayColor={"transparent"}
    >
      <ElocalLogo />
    </TouchableOpacity>
  );
};
