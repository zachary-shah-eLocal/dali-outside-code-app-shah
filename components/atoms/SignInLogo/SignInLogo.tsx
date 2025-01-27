import { View } from "react-native";

import Text from "../../../base/components/Text";
import { LogoWhiteSignIn } from "../../../svgs";
import { styles } from "./SignInLogoStyles";

export const SignInLogo = () => (
  <View style={styles.signInLogoContainer}>
    <LogoWhiteSignIn style={styles.logo} />
    <Text style={styles.subHeader}>
      Seamlessly Manage Leads and Elevate Your Business
    </Text>
  </View>
);
