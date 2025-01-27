import React from "react";
import { useErrorBoundary } from "react-error-boundary";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Navigation } from "../../../helpers/Navigationhelper";
import { Stacks } from "../../../navigation/consts/Stacks";
import ErrorScreenIcon from "../../icons/ErrorScreenIcon";
import Button from "../buttons/Button";
import { Container } from "../containers/Container";

const ErrorBoundaryScreen = () => {
  const { resetBoundary } = useErrorBoundary();
  const handlePress = () => {
    resetBoundary();
  };
  return (
    <Container>
      <SafeAreaView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
          gap: 24,
        }}
      >
        <ErrorScreenIcon />
        <View style={{ gap: 8, alignItems: "center" }}>
          <Text style={styles.title}>Something Went Wrong!</Text>
          <Text style={styles.subTitle}>Please try again later</Text>
        </View>
        <View style={{ width: "70%" }}>
          <Button title="Try again" onPress={handlePress} />
        </View>
      </SafeAreaView>
    </Container>
  );
};

export default ErrorBoundaryScreen;

const styles = StyleSheet.create({
  title: {
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  subTitle: {
    fontWeight: "700",
    color: "#7A7D9E",
    textAlign: "center",
  },
});
