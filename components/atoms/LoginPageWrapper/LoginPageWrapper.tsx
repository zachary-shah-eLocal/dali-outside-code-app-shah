import { LinearGradient } from "expo-linear-gradient";
import { ReactNode } from "react";
import { ScrollView, Text, View } from "react-native";

import { SignInBars, SignInGrid } from "../../../svgs";
import { SignInLogo } from "../SignInLogo";
import { styles } from "./LoginPageWrapperStyles";

interface WrapperProps {
  children: ReactNode;
}

export const LoginPageWrapper: React.FC<WrapperProps> = ({ children }) => {
  return (
    <LinearGradient
      colors={["#66A8E1", "#007ad1", "#4db0fc", "#2c73a5"]}
      style={styles.loginContainer}
    >
      <View style={styles.backgroundContainer}>
        <SignInGrid style={styles.grid} />
        <SignInBars style={styles.bars} />
      </View>

      <ScrollView
        style={styles.loginWrapper}
        automaticallyAdjustKeyboardInsets={true}
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
      >
        <SignInLogo />
        <View style={styles.loginFlowWrapper}>{children}</View>
      </ScrollView>
    </LinearGradient>
  );
};
