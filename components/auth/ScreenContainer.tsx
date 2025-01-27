import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SignInLogo } from "../atoms";
import { SignInBars, SignInGrid } from "../../svgs";
import { Colors } from "../../theme/colors";


type Props = {
  children: React.ReactNode;
};

const ScreenContainer = ({ children }: Props) => {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={["#66A8E1", "#007ad1", "#4db0fc", "#2c73a5"]}
      style={[styles.container, { paddingTop: insets.top }]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "padding"}
      >
        <View style={styles.backgroundContainer}>
          <SignInGrid style={styles.grid} />
          <SignInBars style={styles.bars} width={"100%"}/>
        </View>
        <View style={styles.topContainer}>
          <SignInLogo/>
        </View>
        <View style={styles.bottomContainer}>{children}</View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

export default ScreenContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
  },
  topContainer: {
    height: "30%",
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  backgroundContainer: {
    position: 'static',
    zIndex: 1,
    opacity: 0.1,
  },
  grid: {
    position: 'absolute',
    top: -100,
  },
  bars: {
    position: 'absolute',
    top: -220,
  },
  subtitle: {
    textAlign: "center",
    color: Colors.white,
    fontSize: 18,
    lineHeight: 22.4,
    fontWeight: "600",
    maxWidth: "70%",
    opacity: 0.7,
  },
  bottomContainer: {
    height: "200%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 32,
    paddingHorizontal: 24,
  },
});
