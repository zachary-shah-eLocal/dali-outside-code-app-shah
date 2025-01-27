import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LoadingSpinner } from "../../../components/atoms";
import { Container } from "../containers/Container";

const { width, height } = Dimensions.get("window");
const AppLoader = () => {
  return (
    <Container containerStyle={styles.container}>
      <View style={styles.spinnerContainer}>
        <LoadingSpinner />
      </View>
    </Container>
  );
};

export default AppLoader;

const styles = StyleSheet.create({
  container: {
    height,
    width,
    zIndex: 1000,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  spinnerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
